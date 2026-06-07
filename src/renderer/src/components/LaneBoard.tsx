import type { Lane } from '../shared/types';
import { LaneCard } from './LaneCard';

interface Props {
  lanes: Lane[];
  selectedLaneId?: string;
  onSelectLane: (laneId: string) => void;
}

export function LaneBoard({ lanes, selectedLaneId, onSelectLane }: Props) {
  return (
    <section className="lane-board">
      <div className="section-heading">
        <h2>Active lanes</h2>
        <span>{lanes.length} sessions</span>
      </div>
      <div className="lane-grid">
        {lanes.map((lane) => (
          <LaneCard key={lane.id} lane={lane} selected={lane.id === selectedLaneId} onClick={() => onSelectLane(lane.id)} />
        ))}
      </div>
    </section>
  );
}
