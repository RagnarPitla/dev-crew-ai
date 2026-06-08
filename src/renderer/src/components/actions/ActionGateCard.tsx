import type { ActionGateReview } from '../../shared/types';
import { actionGateLabel } from './actionGateDisplay';

interface Props {
  gate: ActionGateReview;
}

export function ActionGateCard({ gate }: Props) {
  return (
    <article className={`action-gate-card ${gate.status}`}>
      <div className="action-gate-header">
        <h3>{actionGateLabel(gate.role)}</h3>
        <span>{gate.status.replace('_', ' ')}</span>
      </div>
      <p>{gate.summary || 'Waiting for this gate to complete.'}</p>
      {gate.reviewer ? <small>Reviewer: {gate.reviewer}</small> : <small>No reviewer yet</small>}
      {gate.evidence.length ? (
        <ul>
          {gate.evidence.map((item) => <li key={item}>{item}</li>)}
        </ul>
      ) : null}
    </article>
  );
}
