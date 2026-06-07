import type { CreateLaneInput, CreatePullRequestInput, LaneMessage } from '../../shared/types';
import type { DevCrewApi } from '../../preload';

declare global {
  interface Window {
    devCrew: DevCrewApi;
  }
}

export const devCrewApi = {
  addProject: (rootPath: string) => window.devCrew.addProject(rootPath),
  listProjects: () => window.devCrew.listProjects(),
  listProviders: () => window.devCrew.listProviders(),
  checkGhAuth: () => window.devCrew.checkGhAuth(),
  listIssues: (projectId: string) => window.devCrew.listIssues(projectId),
  listPullRequests: (projectId: string) => window.devCrew.listPullRequests(projectId),
  listLanes: () => window.devCrew.listLanes(),
  createLane: (input: CreateLaneInput) => window.devCrew.createLane(input),
  startLane: (laneId: string) => window.devCrew.startLane(laneId),
  stopLane: (laneId: string) => window.devCrew.stopLane(laneId),
  cleanupLane: (laneId: string) => window.devCrew.cleanupLane(laneId),
  createPullRequest: (input: CreatePullRequestInput) => window.devCrew.createPullRequest(input),
  listMessages: (projectId: string) => window.devCrew.listMessages(projectId),
  addMessage: (message: Omit<LaneMessage, 'id' | 'createdAt'>) => window.devCrew.addMessage(message),
};
