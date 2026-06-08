import type {
  ActionGateReview,
  ActionGateRole,
  ActionVisibility,
  PrivateActionItem,
} from '../../shared/types';

const gateOrder: ActionGateRole[] = ['pm_spec', 'dev', 'qa', 'pm_final'];

interface CreateActionItemInput {
  id: string;
  title: string;
  problem: string;
  visibility: ActionVisibility;
  acceptanceCriteria: string[];
  nonGoals: string[];
  targetFiles: string[];
}

export function createActionItem(input: CreateActionItemInput, now = new Date().toISOString()): PrivateActionItem {
  return {
    id: input.id,
    title: input.title,
    problem: input.problem,
    visibility: input.visibility,
    status: 'pm_spec',
    acceptanceCriteria: input.acceptanceCriteria,
    nonGoals: input.nonGoals,
    targetFiles: input.targetFiles,
    gates: {
      pm_spec: createEmptyGate('pm_spec'),
      dev: createEmptyGate('dev'),
      qa: createEmptyGate('qa'),
      pm_final: createEmptyGate('pm_final'),
    },
    pushApproval: 'not_allowed',
    createdAt: now,
    updatedAt: now,
  };
}

export function approveGate(
  item: PrivateActionItem,
  role: ActionGateRole,
  reviewer: string,
  summary: string,
  evidence: string[],
  now = new Date().toISOString(),
): PrivateActionItem {
  const missingPriorGate = gateOrder.slice(0, gateOrder.indexOf(role)).find((priorRole) => {
    return item.gates[priorRole].status !== 'approved';
  });

  if (missingPriorGate) {
    throw new Error(`Cannot approve ${role} before ${missingPriorGate}`);
  }

  const gates = {
    ...item.gates,
    [role]: {
      ...item.gates[role],
      status: 'approved',
      reviewer,
      summary,
      evidence,
      reviewedAt: now,
    } satisfies ActionGateReview,
  };

  const finalApproved = gates.pm_final.status === 'approved';

  return {
    ...item,
    gates,
    status: finalApproved ? 'ready_to_push' : nextStatusAfter(role),
    pushApproval: finalApproved ? 'approved' : 'not_allowed',
    updatedAt: now,
  };
}

export function canPushToGitHub(item: PrivateActionItem): boolean {
  return item.gates.pm_final.status === 'approved' && item.pushApproval === 'approved';
}

export function getNextRequiredGate(item: PrivateActionItem): ActionGateRole | undefined {
  return gateOrder.find((role) => item.gates[role].status !== 'approved');
}

function createEmptyGate(role: ActionGateRole): ActionGateReview {
  return {
    role,
    status: 'not_started',
    reviewer: '',
    summary: '',
    checklist: [],
    evidence: [],
  };
}

function nextStatusAfter(role: ActionGateRole): PrivateActionItem['status'] {
  if (role === 'pm_spec') return 'dev';
  if (role === 'dev') return 'qa';
  if (role === 'qa') return 'pm_final';
  return 'ready_to_push';
}
