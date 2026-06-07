import { contextBridge, ipcRenderer } from 'electron';
import type { CreateLaneInput, CreatePullRequestInput, LaneMessage } from '../shared/types';

const api = {
  addProject: (rootPath: string) => ipcRenderer.invoke('projects:add', rootPath),
  listProjects: () => ipcRenderer.invoke('projects:list'),
  listProviders: () => ipcRenderer.invoke('providers:list'),
  checkGhAuth: () => ipcRenderer.invoke('github:auth'),
  listIssues: (projectId: string) => ipcRenderer.invoke('github:issues:list', projectId),
  listPullRequests: (projectId: string) => ipcRenderer.invoke('github:prs:list', projectId),
  listLanes: () => ipcRenderer.invoke('lanes:list'),
  createLane: (input: CreateLaneInput) => ipcRenderer.invoke('lanes:create', input),
  startLane: (laneId: string) => ipcRenderer.invoke('lanes:start', laneId),
  stopLane: (laneId: string) => ipcRenderer.invoke('lanes:stop', laneId),
  cleanupLane: (laneId: string) => ipcRenderer.invoke('lanes:cleanup', laneId),
  createPullRequest: (input: CreatePullRequestInput) => ipcRenderer.invoke('lanes:create-pr', input),
  listMessages: (projectId: string) => ipcRenderer.invoke('messages:list', projectId),
  addMessage: (message: Omit<LaneMessage, 'id' | 'createdAt'>) => ipcRenderer.invoke('messages:add', message),
};

contextBridge.exposeInMainWorld('devCrew', api);

export type DevCrewApi = typeof api;
