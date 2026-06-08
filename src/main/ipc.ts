import { ipcMain } from 'electron';
import { nanoid } from 'nanoid';
import { GitService } from './services/gitService';
import { GhService } from './services/ghService';
import { LaneService } from './services/laneService';
import { MessageBusService } from './services/messageBusService';
import { ProviderService } from './services/providerService';
import type { CreateLaneInput, CreatePullRequestInput, LaneMessage, Project } from '../shared/types';

const projects = new Map<string, Project>();
const gitService = new GitService();
const ghService = new GhService();
const providerService = new ProviderService();
const messageBusService = new MessageBusService();
const laneService = new LaneService({ gitService, ghService, providerService, messageBusService, projects });

export function registerIpcHandlers(): void {
  ipcMain.handle('projects:add', async (_event, rootPath: string) => {
    const scan = await gitService.scanProject(rootPath);
    const now = new Date().toISOString();
    const project: Project = {
      id: nanoid(),
      name: scan.githubRepo ?? scan.rootPath.split(/[\\/]/).pop() ?? 'Project',
      rootPath: scan.rootPath,
      mode: scan.mode,
      gitInitialized: scan.isGitRepo,
      githubConnected: scan.hasGitHubRemote,
      remoteUrl: scan.remoteUrl,
      githubOwner: scan.githubOwner,
      githubRepo: scan.githubRepo,
      defaultBranch: scan.defaultBranch ?? 'main',
      createdAt: now,
      updatedAt: now,
    };
    projects.set(project.id, project);
    return project;
  });

  ipcMain.handle('projects:scan', async (_event, rootPath: string) => gitService.scanProject(rootPath));
  ipcMain.handle('projects:init-git', async (_event, rootPath: string) => gitService.initRepo(rootPath));
  ipcMain.handle('projects:create-gitignore', async (_event, rootPath: string) => gitService.createGitignoreIfMissing(rootPath));
  ipcMain.handle('projects:git-identity', async (_event, rootPath: string) => gitService.ensureGitIdentity(rootPath));
  ipcMain.handle('projects:create-baseline', async (_event, rootPath: string, message?: string) =>
    gitService.createBaselineCommit(rootPath, message),
  );
  ipcMain.handle('projects:list', async () => Array.from(projects.values()));
  ipcMain.handle('providers:list', async () => providerService.listProviders());
  ipcMain.handle('github:auth', async () => ghService.checkGhAuth());
  ipcMain.handle('github:issues:list', async (_event, projectId: string) => {
    const project = requireProject(projectId);
    return ghService.listIssues(project.rootPath);
  });
  ipcMain.handle('github:prs:list', async (_event, projectId: string) => {
    const project = requireProject(projectId);
    return ghService.listPullRequests(project.rootPath);
  });
  ipcMain.handle('lanes:list', async () => laneService.listLanes());
  ipcMain.handle('lanes:create', async (_event, input: CreateLaneInput) => laneService.createLane(input));
  ipcMain.handle('lanes:start', async (_event, laneId: string) => laneService.startLane(laneId));
  ipcMain.handle('lanes:stop', async (_event, laneId: string) => laneService.stopLane(laneId));
  ipcMain.handle('lanes:cleanup', async (_event, laneId: string) => laneService.cleanupLane(laneId));
  ipcMain.handle('lanes:create-pr', async (_event, input: CreatePullRequestInput) => laneService.createPrForLane(input));
  ipcMain.handle('messages:list', async (_event, projectId: string) => messageBusService.listMessages(projectId));
  ipcMain.handle('messages:add', async (_event, message: Omit<LaneMessage, 'id' | 'createdAt'>) =>
    messageBusService.addMessage(message),
  );
}

function requireProject(projectId: string): Project {
  const project = projects.get(projectId);
  if (!project) {
    throw new Error(`Project not found: ${projectId}`);
  }
  return project;
}
