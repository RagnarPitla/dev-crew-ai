import { z } from 'zod';

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
  remoteUrl: z.string().optional(),
  githubOwner: z.string().optional(),
  githubRepo: z.string().optional(),
  defaultBranch: z.string().min(1),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
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
