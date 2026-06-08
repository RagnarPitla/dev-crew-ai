import { z } from 'zod';

export const projectModeSchema = z.enum(['github', 'local-git', 'plain-folder']);
export const projectRecommendedActionSchema = z.enum(['open-github', 'open-local-git', 'init-git', 'read-only']);
export const laneTypeSchema = z.enum(['feature', 'bugfix', 'review', 'docs', 'release', 'spike']);
export const laneStatusSchema = z.enum([
  'draft',
  'ready',
  'running',
  'blocked',
  'review_needed',
  'pr_opened',
  'merged',
  'stopped',
  'failed',
]);
export const providerKindSchema = z.enum([
  'claude-code',
  'github-copilot',
  'codex',
  'opencode',
  'aider',
  'ollama',
  'custom-command',
]);

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  rootPath: z.string().min(1),
  mode: projectModeSchema,
  gitInitialized: z.boolean(),
  githubConnected: z.boolean(),
  remoteUrl: z.string().optional(),
  githubOwner: z.string().optional(),
  githubRepo: z.string().optional(),
  defaultBranch: z.string().optional(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

export const projectScanResultSchema = z.object({
  rootPath: z.string().min(1),
  exists: z.boolean(),
  isGitRepo: z.boolean(),
  hasCommits: z.boolean(),
  hasGitHubRemote: z.boolean(),
  remoteUrl: z.string().optional(),
  githubOwner: z.string().optional(),
  githubRepo: z.string().optional(),
  currentBranch: z.string().optional(),
  defaultBranch: z.string().optional(),
  dirtyFiles: z.array(z.string()),
  detectedStack: z.array(z.string()),
  recommendedAction: projectRecommendedActionSchema,
  mode: projectModeSchema,
});

export const laneSchema = z.object({
  id: z.string().min(1),
  projectId: z.string().min(1),
  title: z.string().min(1),
  type: laneTypeSchema,
  status: laneStatusSchema,
  branchName: z.string().min(1),
  worktreePath: z.string().min(1),
  baseBranch: z.string().min(1),
  providerId: z.string().min(1),
  linkedIssueNumber: z.number().int().positive().optional(),
  linkedPrNumber: z.number().int().positive().optional(),
  instructionPath: z.string().min(1),
  processId: z.string().optional(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

export const providerConfigSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: providerKindSchema,
  command: z.string().min(1),
  argsTemplate: z.array(z.string()),
  env: z.record(z.string(), z.string()).optional(),
  supportsInteractiveInput: z.boolean(),
  supportsPrintMode: z.boolean(),
});
