import type { PrivateActionItem } from '../../shared/types';
import { actionPushStatus } from './actionGateDisplay';

interface Props {
  action: PrivateActionItem;
}

export function ActionPushStatus({ action }: Props) {
  const status = actionPushStatus(action);
  return (
    <div className={`action-push-status ${status.tone}`}>
      <strong>{status.label}</strong>
      <span>{status.detail}</span>
    </div>
  );
}
