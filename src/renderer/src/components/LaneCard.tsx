import type { Lane } from '../shared/types';

interface Props {
  lane: Lane;
  selected: boolean;
  onClick: () => void;
}

export function LaneCard({ lane, selected, onClick }: Props) {
  return (
    <button className={`lane-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="lane-card-header">
        <span className={`status-dot ${lane.status}`} />
        <span className="lane-type">{lane.type}</span>
      </div>
      <h3>{lane.title}</h3>
      <p>{lane.branchName}</p>
      <div className="lane-meta">
        <span>{lane.providerId}</span>
        {lane.linkedIssueNumber ? <span>Issue #{lane.linkedIssueNumber}</span> : null}
        {lane.linkedPrNumber ? <span>PR #{lane.linkedPrNumber}</span> : null}
      </div>
    </button>
  );
}
