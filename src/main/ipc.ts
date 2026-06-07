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
    const repoInfo = await gitService.getRepoInfo(rootPath);
    const now = new Date().toISOString();
    const project: Project = {
      id: nanoid(),
      name: repoInfo.githubRepo ?? rootPath.split(/[\\/]/).pop() ?? 'Project',
      rootPath: repoInfo.rootPath,
      remoteUrl: repoInfo.remoteUrl,
      githubOwner: repoInfo.githubOwner,
      githubRepo: repoInfo.githubRepo,
      defaultBranch: repoInfo.defaultBranch,
      createdAt: now,
      updatedAt: now,
    };
    projects.set(project.id, project);
    return project;
  });

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
