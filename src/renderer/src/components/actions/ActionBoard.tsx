import type { PrivateActionItem } from '../../shared/types';
import { ActionGateCard } from './ActionGateCard';
import { ActionPushStatus } from './ActionPushStatus';
import { actionGateOrder, actionVisibilityLabel } from './actionGateDisplay';

interface Props {
  action: PrivateActionItem;
}

export function ActionBoard({ action }: Props) {
  return (
    <section className="action-board">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Action Gates</p>
          <h2>{action.title}</h2>
        </div>
        <span className="visibility-pill">{actionVisibilityLabel(action.visibility)}</span>
      </div>
      <p className="action-problem">{action.problem}</p>
      <ActionPushStatus action={action} />
      <div className="action-gate-grid">
        {actionGateOrder.map((role) => (
          <ActionGateCard key={role} gate={action.gates[role]} />
        ))}
      </div>
    </section>
  );
}
