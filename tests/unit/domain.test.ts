import { describe, expect, it } from 'vitest';
import { parseGitHubRemote } from '../../src/main/services/gitService';
import { slugify } from '../../src/main/services/laneService';
import { laneSchema } from '../../src/shared/schemas';

describe('Dev Crew AI domain', () => {
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
