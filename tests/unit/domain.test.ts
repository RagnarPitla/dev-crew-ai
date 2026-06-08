import { describe, expect, it } from 'vitest';
import { DEV_CREW_BRAND } from '../../src/shared/brand';
import { parseGitHubRemote } from '../../src/main/services/gitService';
import { slugify } from '../../src/main/services/laneService';
import { laneSchema, projectScanResultSchema, projectSchema } from '../../src/shared/schemas';

describe('Dev Crew AI domain', () => {
  it('keeps the public brand attribution consistent', () => {
    expect(DEV_CREW_BRAND.productName).toBe('Dev Crew AI');
    expect(DEV_CREW_BRAND.founderName).toBe('Ragnar Pitla');
    expect(DEV_CREW_BRAND.companyName).toBe('RBuild.ai');
    expect(DEV_CREW_BRAND.byline).toBe('by Ragnar Pitla and RBuild.ai');
  });

  it('parses https GitHub remotes', () => {
    expect(parseGitHubRemote('https://github.com/RagnarPitla/dev-crew-ai.git')).toEqual({
      owner: 'RagnarPitla',
      repo: 'dev-crew-ai',
    });
  });

  it('parses ssh GitHub remotes', () => {
    expect(parseGitHubRemote('git@github.com:RagnarPitla/dev-crew-ai.git')).toEqual({
      owner: 'RagnarPitla',
      repo: 'dev-crew-ai',
    });
  });

  it('slugifies lane names', () => {
    expect(slugify('Fix: GitHub Issue Lane Flow!')).toBe('fix-github-issue-lane-flow');
  });

  it('validates GitHub project objects', () => {
    const now = new Date().toISOString();
    expect(() =>
      projectSchema.parse({
        id: 'project-1',
        name: 'Dev Crew AI',
        rootPath: '/tmp/dev-crew-ai',
        mode: 'github',
        gitInitialized: true,
        githubConnected: true,
        defaultBranch: 'main',
        createdAt: now,
        updatedAt: now,
      }),
    ).not.toThrow();
  });

  it('validates plain-folder scan results', () => {
    expect(() =>
      projectScanResultSchema.parse({
        rootPath: '/tmp/plain-folder',
        exists: true,
        isGitRepo: false,
        hasCommits: false,
        hasGitHubRemote: false,
        dirtyFiles: [],
        detectedStack: ['Node.js'],
        recommendedAction: 'init-git',
        mode: 'plain-folder',
      }),
    ).not.toThrow();
  });

  it('validates lane objects', () => {
    const now = new Date().toISOString();
    expect(() =>
      laneSchema.parse({
        id: 'lane-1',
        projectId: 'project-1',
        title: 'Build feature',
        type: 'feature',
        status: 'ready',
        branchName: 'feature/build-feature',
        worktreePath: '/tmp/worktree',
        baseBranch: 'main',
        providerId: 'custom-command',
        instructionPath: '/tmp/worktree/DEV_CREW_LANE.md',
        createdAt: now,
        updatedAt: now,
      }),
    ).not.toThrow();
  });
});
