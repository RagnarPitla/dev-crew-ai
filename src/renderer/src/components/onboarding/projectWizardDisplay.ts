import type { ProjectMode, ProjectRecommendedAction, ProjectScanResult, ProjectVision } from '../../shared/types';

export interface ProjectModeCopy {
  title: string;
  description: string;
  actionLabel: string;
  promise: string;
}

export interface DisplayFact {
  label: string;
  value: string;
}

export interface ProjectNextStep {
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction?: string;
  intent: 'success' | 'info' | 'warning';
}

export interface ProjectVisionSummary {
  title: string;
  sourceLabel: string;
  description: string;
  intent: 'success' | 'warning';
}

const modeCopy: Record<ProjectMode, ProjectModeCopy> = {
  github: {
    title: 'GitHub repo',
    description: 'Connect a GitHub repository so Dev Crew AI can use issues, PRs, remotes, and CI evidence.',
    actionLabel: 'Connect GitHub repo',
    promise: 'Best for issue-driven lanes and PR shipping.',
  },
  'local-git': {
    title: 'Local Git repo',
    description: 'Open an existing local Git repository and create agent lanes without publishing code.',
    actionLabel: 'Open local Git repo',
    promise: 'Best for private work with branches and worktrees.',
  },
  'plain-folder': {
    title: 'Plain folder',
    description: 'Open any folder, scan the stack, then initialize local Git before agents edit files.',
    actionLabel: 'Open folder',
    promise: 'Best for starting safely before GitHub exists.',
  },
};

const recommendedCopy: Record<ProjectRecommendedAction, string> = {
  'open-github': 'Create lanes from GitHub issues and PRs',
  'open-local-git': 'Create a manual lane from local Git',
  'init-git': 'Initialize local Git before agent work',
  'read-only': 'Open read-only until the folder is available',
};

export function getProjectModeCopy(mode: ProjectMode): ProjectModeCopy {
  return modeCopy[mode];
}

export function getProjectScanFacts(scan: ProjectScanResult): DisplayFact[] {
  return [
    { label: 'Mode', value: getProjectModeCopy(scan.mode).title },
    { label: 'Git', value: getGitLabel(scan) },
    { label: 'GitHub', value: getGitHubLabel(scan) },
    { label: 'Branch', value: scan.currentBranch ?? scan.defaultBranch ?? 'Not detected yet' },
    { label: 'Stack', value: scan.detectedStack.join(', ') || 'Unknown' },
    { label: 'Recommended', value: recommendedCopy[scan.recommendedAction] },
  ];
}

export function getProjectNextStep(scan: ProjectScanResult): ProjectNextStep {
  switch (scan.recommendedAction) {
    case 'open-github':
      return {
        title: 'Ready for GitHub lanes',
        description: 'Use issues, PRs, branches, and CI as lane inputs and evidence.',
        primaryAction: 'Add project and load GitHub context',
        intent: 'success',
      };
    case 'open-local-git':
      return {
        title: 'Ready for local lanes',
        description: 'Create manual lanes with local branches and worktrees. GitHub can be connected later.',
        primaryAction: 'Add local Git project',
        intent: 'info',
      };
    case 'init-git':
      return {
        title: 'Initialize local Git for safety',
        description: 'Create .gitignore and a baseline commit before any agent lane changes files.',
        primaryAction: 'Initialize Git + create baseline',
        secondaryAction: 'Open read-only',
        intent: 'warning',
      };
    case 'read-only':
      return {
        title: 'Folder unavailable',
        description: 'Dev Crew AI can keep this as a read-only idea until the path is available.',
        primaryAction: 'Choose another folder',
        intent: 'warning',
      };
  }
}

export function getProjectVisionSummary(vision?: ProjectVision): ProjectVisionSummary {
  if (vision?.found) {
    return {
      title: 'Project Vision found',
      sourceLabel: vision.source,
      description: firstMeaningfulLine(vision.content) || 'This file will guide every new agent lane.',
      intent: 'success',
    };
  }

  return {
    title: 'No Project Vision yet',
    sourceLabel: 'Create VISION.md, AGENTS.md, or CLAUDE.md',
    description: 'Add a project constitution so each lane understands the mission, constraints, and review rules.',
    intent: 'warning',
  };
}

function getGitLabel(scan: ProjectScanResult): string {
  if (!scan.isGitRepo) return 'Not initialized';
  return scan.hasCommits ? 'Initialized with commits' : 'Initialized, no commits yet';
}

function getGitHubLabel(scan: ProjectScanResult): string {
  if (scan.githubOwner && scan.githubRepo) return `${scan.githubOwner}/${scan.githubRepo}`;
  return scan.hasGitHubRemote ? 'Connected' : 'Optional later';
}

function firstMeaningfulLine(content: string): string {
  return content
    .split('\n')
    .map((line) => line.replace(/^#+\s*/, '').trim())
    .find(Boolean) ?? '';
}
