import { z } from 'zod';

export const projectVisionSourceSchema = z.enum(['VISION.md', 'AGENTS.md', 'CLAUDE.md', 'DEV_CREW.md', 'README.md', 'missing']);
export const projectVisionSchema = z.object({
  found: z.boolean(),
  source: projectVisionSourceSchema,
  path: z.string().optional(),
  content: z.string(),
  detectedAt: z.string().min(1),
});

export const actionGateRoleSchema = z.enum(['pm_spec', 'dev', 'qa', 'pm_final']);
export const actionGateStatusSchema = z.enum(['not_started', 'in_progress', 'blocked', 'changes_requested', 'approved']);
export const actionVisibilitySchema = z.enum(['private', 'public_candidate', 'public']);
export const actionItemStatusSchema = z.enum(['idea', 'pm_spec', 'dev', 'qa', 'pm_final', 'ready_to_push', 'pushed', 'cancelled']);
export const pushApprovalStatusSchema = z.enum(['not_allowed', 'approved']);

export const actionGateReviewSchema = z.object({
  role: actionGateRoleSchema,
  status: actionGateStatusSchema,
  reviewer: z.string(),
  summary: z.string(),
  checklist: z.array(z.string()),
  evidence: z.array(z.string()),
  reviewedAt: z.string().optional(),
});

export const privateActionItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  problem: z.string().min(1),
  visibility: actionVisibilitySchema,
  status: actionItemStatusSchema,
  acceptanceCriteria: z.array(z.string()),
  nonGoals: z.array(z.string()),
  targetFiles: z.array(z.string()),
  gates: z.object({
    pm_spec: actionGateReviewSchema,
    dev: actionGateReviewSchema,
    qa: actionGateReviewSchema,
    pm_final: actionGateReviewSchema,
  }),
  pushApproval: pushApprovalStatusSchema,
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

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
