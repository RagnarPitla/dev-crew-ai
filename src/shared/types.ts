export type LaneType = 'feature' | 'bugfix' | 'review' | 'docs' | 'release' | 'spike';

export type LaneStatus =
  | 'draft'
  | 'ready'
  | 'running'
  | 'blocked'
  | 'review_needed'
  | 'pr_opened'
  | 'merged'
  | 'stopped'
  | 'failed';

export type ProviderKind =
  | 'claude-code'
  | 'github-copilot'
  | 'codex'
  | 'opencode'
  | 'aider'
  | 'ollama'
  | 'custom-command';

export interface Project {
  id: string;
  name: string;
  rootPath: string;
  remoteUrl?: string;
  githubOwner?: string;
  githubRepo?: string;
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lane {
  id: string;
  projectId: string;
  title: string;
  type: LaneType;
  status: LaneStatus;
  branchName: string;
  worktreePath: string;
  baseBranch: string;
  providerId: string;
  linkedIssueNumber?: number;
  linkedPrNumber?: number;
  instructionPath: string;
  processId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LaneMessage {
  id: string;
  projectId: string;
  fromLaneId?: string;
  toLaneId?: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  createdAt: string;
}

export interface ProviderConfig {
  id: string;
  name: string;
  kind: ProviderKind;
  command: string;
  argsTemplate: string[];
  env?: Record<string, string>;
  supportsInteractiveInput: boolean;
  supportsPrintMode: boolean;
}

export interface RepoInfo {
  rootPath: string;
  currentBranch: string;
  defaultBranch: string;
  remoteUrl?: string;
  githubOwner?: string;
  githubRepo?: string;
}

export interface GitStatus {
  branch: string;
  clean: boolean;
  changedFiles: string[];
  raw: string;
}

export interface WorktreeInfo {
  path: string;
  head: string;
  branch?: string;
  bare: boolean;
}

export interface GhIssue {
  number: number;
  title: string;
  body?: string;
  state: string;
  labels: string[];
  url?: string;
}

export interface GhPullRequest {
  number: number;
  title: string;
  state: string;
  url?: string;
  headRefName?: string;
  baseRefName?: string;
}

export interface CreateLaneInput {
  projectId: string;
  title: string;
  type: LaneType;
  baseBranch?: string;
  providerId: string;
  linkedIssueNumber?: number;
  branchName?: string;
}

export interface CreatePullRequestInput {
  laneId: string;
  title: string;
  body: string;
  draft?: boolean;
}

export interface RunCommandInput {
  command: string;
  args?: string[];
  cwd?: string;
  env?: Record<string, string>;
  timeoutMs?: number;
}

export interface RunCommandResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export interface StartProcessInput extends RunCommandInput {
  processId?: string;
}

export interface ProcessEvent {
  processId: string;
  laneId?: string;
  type: 'stdout' | 'stderr' | 'exit' | 'error';
  data: string;
  createdAt: string;
}

export interface ProviderDetectionResult {
  available: boolean;
  version?: string;
  reason?: string;
}

export interface StartAgentInput {
  lane: Lane;
  project: Project;
  prompt?: string;
}

export interface OneShotAgentInput extends StartAgentInput {
  prompt: string;
}
