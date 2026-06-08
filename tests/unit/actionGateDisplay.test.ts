import { describe, expect, it } from 'vitest';
import type { PrivateActionItem } from '../../src/shared/types';
import {
  actionGateLabel,
  actionGateOrder,
  actionPushStatus,
  actionVisibilityLabel,
} from '../../src/renderer/src/components/actions/actionGateDisplay';

describe('Action Gates UI display helpers', () => {
  it('orders gates PM Spec → Dev → QA → PM Final', () => {
    expect(actionGateOrder).toEqual(['pm_spec', 'dev', 'qa', 'pm_final']);
    expect(actionGateOrder.map(actionGateLabel)).toEqual(['PM Spec', 'Dev', 'QA', 'PM Final']);
  });

  it('shows push blocked until PM Final approves', () => {
    const blocked = sampleAction({ pushApproval: 'not_allowed' });
    expect(actionPushStatus(blocked)).toEqual({
      label: 'Push blocked',
      tone: 'blocked',
      detail: 'PM Final approval is required before GitHub push.',
    });
  });

  it('shows push allowed after approval', () => {
    const approved = sampleAction({ pushApproval: 'approved' });
    expect(actionPushStatus(approved)).toEqual({
      label: 'Push allowed',
      tone: 'approved',
      detail: 'PM Final approved. Product-controlled GitHub push is allowed.',
    });
  });

  it('formats action visibility labels', () => {
    expect(actionVisibilityLabel('private')).toBe('Private');
    expect(actionVisibilityLabel('public_candidate')).toBe('Public candidate');
    expect(actionVisibilityLabel('public')).toBe('Public');
  });
});

function sampleAction(overrides: Partial<PrivateActionItem> = {}): PrivateActionItem {
  const now = '2026-06-07T00:00:00.000Z';
  return {
    id: 'action-1',
    title: 'Add Project Vision detection',
    problem: 'Agents need a project constitution before work starts.',
    visibility: 'public_candidate',
    status: 'pm_spec',
    acceptanceCriteria: ['Detected vision appears in lane instructions'],
    nonGoals: ['Do not generate a vision file automatically yet'],
    targetFiles: ['src/main/services/visionService.ts'],
    gates: {
      pm_spec: { role: 'pm_spec', status: 'approved', reviewer: 'Ragnar', summary: 'Spec approved', checklist: [], evidence: [], reviewedAt: now },
      dev: { role: 'dev', status: 'approved', reviewer: 'Ruby Dev', summary: 'Built with TDD', checklist: [], evidence: [], reviewedAt: now },
      qa: { role: 'qa', status: 'approved', reviewer: 'Ruby QA', summary: 'Tests passed', checklist: [], evidence: [], reviewedAt: now },
      pm_final: { role: 'pm_final', status: overrides.pushApproval === 'approved' ? 'approved' : 'not_started', reviewer: '', summary: '', checklist: [], evidence: [] },
    },
    pushApproval: 'not_allowed',
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}
