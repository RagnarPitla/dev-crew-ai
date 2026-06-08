import { describe, expect, it } from 'vitest';
import { InstructionService } from '../../src/main/services/instructionService';
import type { Lane, Project, ProjectVision } from '../../src/shared/types';

describe('InstructionService', () => {
  it('includes project vision content in generated lane instructions', () => {
    const lane: Lane = {
      id: 'lane-1',
      projectId: 'project-1',
      title: 'Build onboarding',
      type: 'feature',
      status: 'ready',
      branchName: 'feature/build-onboarding',
      worktreePath: '/tmp/worktree',
      baseBranch: 'main',
      providerId: 'custom-command',
      instructionPath: '/tmp/worktree/DEV_CREW_LANE.md',
      createdAt: '2026-06-07T00:00:00.000Z',
      updatedAt: '2026-06-07T00:00:00.000Z',
    };
    const project: Project = {
      id: 'project-1',
      name: 'Dev Crew AI',
      rootPath: '/tmp/dev-crew-ai',
      mode: 'local-git',
      gitInitialized: true,
      githubConnected: false,
      createdAt: '2026-06-07T00:00:00.000Z',
      updatedAt: '2026-06-07T00:00:00.000Z',
    };
    const vision: ProjectVision = {
      found: true,
      source: 'VISION.md',
      path: '/tmp/dev-crew-ai/VISION.md',
      content: 'Build the thing that builds the thing.',
      detectedAt: '2026-06-07T00:00:00.000Z',
    };

    const markdown = new InstructionService().render(lane, project, vision);

    expect(markdown).toContain('## Project Vision');
    expect(markdown).toContain('Source: VISION.md');
    expect(markdown).toContain('Build the thing that builds the thing.');
  });
});
