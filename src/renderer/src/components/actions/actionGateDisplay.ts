import type { ActionGateRole, ActionVisibility, PrivateActionItem } from '../../shared/types';

export const actionGateOrder: ActionGateRole[] = ['pm_spec', 'dev', 'qa', 'pm_final'];

export type PushStatusTone = 'blocked' | 'approved';

export interface PushStatusView {
  label: string;
  tone: PushStatusTone;
  detail: string;
}

export function actionGateLabel(role: ActionGateRole): string {
  const labels: Record<ActionGateRole, string> = {
    pm_spec: 'PM Spec',
    dev: 'Dev',
    qa: 'QA',
    pm_final: 'PM Final',
  };
  return labels[role];
}

export function actionVisibilityLabel(visibility: ActionVisibility): string {
  const labels: Record<ActionVisibility, string> = {
    private: 'Private',
    public_candidate: 'Public candidate',
    public: 'Public',
  };
  return labels[visibility];
}

export function actionPushStatus(action: PrivateActionItem): PushStatusView {
  if (action.pushApproval === 'approved') {
    return {
      label: 'Push allowed',
      tone: 'approved',
      detail: 'PM Final approved. Product-controlled GitHub push is allowed.',
    };
  }

  return {
    label: 'Push blocked',
    tone: 'blocked',
    detail: 'PM Final approval is required before GitHub push.',
  };
}
