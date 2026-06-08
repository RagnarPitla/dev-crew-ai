import { nanoid } from 'nanoid';
import { join } from 'node:path';
import type { ChildProcess } from 'node:child_process';
import { CommandRunner } from './commandRunner';
import type { GitService } from './gitService';
import type { GhService } from './ghService';
import { InstructionService } from './instructionService';
import type { MessageBusService } from './messageBusService';
import type { ProviderService } from './providerService';
import type { CreateLaneInput, CreatePullRequestInput, GhPullRequest, Lane, Project } from '../../shared/types';

interface LaneServiceDeps {
  gitService: GitService;
  ghService: GhService;
  providerService: ProviderService;
  messageBusService: MessageBusService;
  projects: Map<string, Project>;
}

export class LaneService {
  private readonly lanes = new Map<string, Lane>();
  private readonly processes = new Map<string, ChildProcess>();
  private readonly instructionService = new InstructionService();
  private readonly runner = new CommandRunner();

  constructor(private readonly deps: LaneServiceDeps) {}

  listLanes(): Lane[] {
    return Array.from(this.lanes.values());
  }

  async createLane(input: CreateLaneInput): Promise<Lane> {
    const project = this.requireProject(input.projectId);
    const now = new Date().toISOString();
    const baseBranch = input.baseBranch ?? project.defaultBranch ?? 'main';
    const branchName = input.branchName ?? `${input.type}/${slugify(input.title)}`;
    const worktreePath = join(project.rootPath, '..', 'dev-crew-worktrees', slugify(input.title));
    await this.deps.gitService.createWorktree(project.rootPath, worktreePath, branchName, baseBranch);
    const lane: Lane = {
      id: nanoid(),
      projectId: project.id,
      title: input.title,
      type: input.type,
      status: 'ready',
      branchName,
      worktreePath,
      baseBranch,
      providerId: input.providerId,
      linkedIssueNumber: input.linkedIssueNumber,
      instructionPath: join(worktreePath, 'DEV_CREW_LANE.md'),
      createdAt: now,
      updatedAt: now,
    };
    lane.instructionPath = await this.instructionService.writeLaneInstructions(lane, project);
    this.lanes.set(lane.id, lane);
    this.deps.messageBusService.addMessage({
      projectId: project.id,
      toLaneId: lane.id,
      role: 'system',
      content: `Lane created for ${lane.title} on ${lane.branchName}`,
    });
    return lane;
  }

  async startLane(laneId: string): Promise<Lane> {
    const lane = this.requireLane(laneId);
    const project = this.requireProject(lane.projectId);
    const provider = this.deps.providerService.getProvider(lane.providerId);
    const processId = nanoid();
    const start = provider.buildStartCommand({ lane, project, prompt: `Read DEV_CREW_LANE.md and start the lane: ${lane.title}` });
    const child = this.runner.start(
      { ...start, processId },
      (stream, data) => {
        this.deps.messageBusService.addMessage({
          projectId: project.id,
          fromLaneId: lane.id,
          role: 'agent',
          content: `[${stream}] ${data.slice(0, 2000)}`,
        });
      },
      (code) => {
        lane.status = code === 0 ? 'stopped' : 'failed';
        lane.updatedAt = new Date().toISOString();
        this.processes.delete(processId);
      },
    );
    this.processes.set(processId, child);
    lane.processId = processId;
    lane.status = 'running';
    lane.updatedAt = new Date().toISOString();
    return lane;
  }

  async stopLane(laneId: string): Promise<Lane> {
    const lane = this.requireLane(laneId);
    if (lane.processId) {
      this.processes.get(lane.processId)?.kill();
      this.processes.delete(lane.processId);
    }
    lane.status = 'stopped';
    lane.updatedAt = new Date().toISOString();
    return lane;
  }

  async createPrForLane(input: CreatePullRequestInput): Promise<GhPullRequest> {
    const lane = this.requireLane(input.laneId);
    await this.runner.run({ command: 'git', args: ['push', '-u', 'origin', lane.branchName], cwd: lane.worktreePath, timeoutMs: 120_000 });
    const pr = await this.deps.ghService.createPullRequest(lane.worktreePath, input);
    lane.status = 'pr_opened';
    lane.linkedPrNumber = pr.number || undefined;
    lane.updatedAt = new Date().toISOString();
    return pr;
  }

  async cleanupLane(laneId: string): Promise<Lane> {
    const lane = this.requireLane(laneId);
    const project = this.requireProject(lane.projectId);
    await this.stopLane(lane.id);
    await this.deps.gitService.removeWorktree(project.rootPath, lane.worktreePath);
    lane.status = 'merged';
    lane.updatedAt = new Date().toISOString();
    return lane;
  }

  private requireProject(projectId: string): Project {
    const project = this.deps.projects.get(projectId);
    if (!project) throw new Error(`Project not found: ${projectId}`);
    return project;
  }

  private requireLane(laneId: string): Lane {
    const lane = this.lanes.get(laneId);
    if (!lane) throw new Error(`Lane not found: ${laneId}`);
    return lane;
  }
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}
