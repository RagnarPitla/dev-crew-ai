import { describe, expect, it } from 'vitest';
import {
  approveGate,
  canPushToGitHub,
  createActionItem,
  getNextRequiredGate,
} from '../../src/main/services/actionGateService';

describe('Action Gates', () => {
  it('creates action items with PM, Dev, QA, and PM Final gates blocked by default', () => {
    const item = createActionItem({
      id: 'action-1',
      title: 'Add GitHub login',
      problem: 'Users need to connect GitHub before using issue and PR workflows.',
      acceptanceCriteria: ['GitHub auth status is visible'],
      nonGoals: ['Do not store GitHub tokens in app state'],
      targetFiles: ['src/main/services/ghService.ts'],
      visibility: 'public_candidate',
    });

    expect(item.pushApproval).toBe('not_allowed');
    expect(item.status).toBe('pm_spec');
    expect(Object.keys(item.gates)).toEqual(['pm_spec', 'dev', 'qa', 'pm_final']);
    expect(canPushToGitHub(item)).toBe(false);
    expect(getNextRequiredGate(item)).toBe('pm_spec');
  });

  it('requires PM Spec before Dev, QA, and final PM approval', () => {
    const item = createActionItem({
      id: 'action-2',
      title: 'Build action gates',
      problem: 'Work needs a safe approval process before GitHub push.',
      acceptanceCriteria: ['Push blocked until final PM approval'],
      nonGoals: [],
      targetFiles: [],
      visibility: 'private',
    });

    expect(() => approveGate(item, 'dev', 'Ruby', 'Implemented early', [])).toThrow(/Cannot approve dev before pm_spec/);
  });

  it('allows GitHub push only after final PM approval', () => {
    let item = createActionItem({
      id: 'action-3',
      title: 'Ship safe workflow',
      problem: 'Only approved work should be pushed.',
      acceptanceCriteria: ['Final PM approval unlocks push'],
      nonGoals: [],
      targetFiles: [],
      visibility: 'public_candidate',
    });

    item = approveGate(item, 'pm_spec', 'Ragnar', 'Spec approved', ['Acceptance criteria are clear']);
    expect(canPushToGitHub(item)).toBe(false);
    expect(getNextRequiredGate(item)).toBe('dev');

    item = approveGate(item, 'dev', 'Ruby Dev', 'Implementation complete', ['Tests added']);
    expect(canPushToGitHub(item)).toBe(false);
    expect(getNextRequiredGate(item)).toBe('qa');

    item = approveGate(item, 'qa', 'Ruby QA', 'Verification passed', ['npm test passed']);
    expect(canPushToGitHub(item)).toBe(false);
    expect(getNextRequiredGate(item)).toBe('pm_final');

    item = approveGate(item, 'pm_final', 'Ragnar', 'Approved to push', ['QA evidence accepted']);
    expect(canPushToGitHub(item)).toBe(true);
    expect(item.pushApproval).toBe('approved');
    expect(item.status).toBe('ready_to_push');
    expect(getNextRequiredGate(item)).toBeUndefined();
  });
});
