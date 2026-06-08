import { describe, expect, it } from 'vitest';
import type { ProjectScanResult, ProjectVision } from '../../src/shared/types';
import {
  getProjectModeCopy,
  getProjectNextStep,
  getProjectScanFacts,
  getProjectVisionSummary,
} from '../../src/renderer/src/components/onboarding/projectWizardDisplay';

const detectedAt = '2026-06-07T00:00:00.000Z';

function scan(overrides: Partial<ProjectScanResult>): ProjectScanResult {
  return {
    rootPath: 'C:/Users/ragnar/projects/demo',
    exists: true,
    isGitRepo: false,
    hasCommits: false,
    hasGitHubRemote: false,
    dirtyFiles: [],
    detectedStack: [],
    recommendedAction: 'init-git',
    mode: 'plain-folder',
    ...overrides,
  };
}

describe('project wizard display helpers', () => {
  it('describes all three project modes with local-first promises', () => {
    expect(getProjectModeCopy('github')).toMatchObject({
      title: 'GitHub repo',
      actionLabel: 'Connect GitHub repo',
    });
    expect(getProjectModeCopy('local-git')).toMatchObject({
      title: 'Local Git repo',
      actionLabel: 'Open local Git repo',
    });
    expect(getProjectModeCopy('plain-folder')).toMatchObject({
      title: 'Plain folder',
      actionLabel: 'Open folder',
    });
  });

  it('turns scan results into onboarding facts', () => {
    const facts = getProjectScanFacts(
      scan({
        isGitRepo: true,
        hasCommits: true,
        hasGitHubRemote: true,
        githubOwner: 'RagnarPitla',
        githubRepo: 'dev-crew-ai',
        currentBranch: 'main',
        detectedStack: ['Node.js', 'Electron'],
        recommendedAction: 'open-github',
        mode: 'github',
      }),
    );

    expect(facts).toEqual([
      { label: 'Mode', value: 'GitHub repo' },
      { label: 'Git', value: 'Initialized with commits' },
      { label: 'GitHub', value: 'RagnarPitla/dev-crew-ai' },
      { label: 'Branch', value: 'main' },
      { label: 'Stack', value: 'Node.js, Electron' },
      { label: 'Recommended', value: 'Create lanes from GitHub issues and PRs' },
    ]);
  });

  it('recommends safe local git setup for plain folders', () => {
    expect(getProjectNextStep(scan({ recommendedAction: 'init-git', mode: 'plain-folder' }))).toMatchObject({
      title: 'Initialize local Git for safety',
      primaryAction: 'Initialize Git + create baseline',
      intent: 'warning',
    });
  });

  it('summarizes found and missing project vision', () => {
    const foundVision: ProjectVision = {
      found: true,
      source: 'VISION.md',
      path: 'C:/Users/ragnar/projects/demo/VISION.md',
      content: 'Build the thing that builds the thing.',
      detectedAt,
    };
    const missingVision: ProjectVision = {
      found: false,
      source: 'missing',
      content: '',
      detectedAt,
    };

    expect(getProjectVisionSummary(foundVision)).toMatchObject({
      title: 'Project Vision found',
      sourceLabel: 'VISION.md',
      intent: 'success',
    });
    expect(getProjectVisionSummary(missingVision)).toMatchObject({
      title: 'No Project Vision yet',
      sourceLabel: 'Create VISION.md, AGENTS.md, or CLAUDE.md',
      intent: 'warning',
    });
  });
});
