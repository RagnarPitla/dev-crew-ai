import type { Lane } from '../shared/types';

interface Props {
  projectId: string;
  lanes: Lane[];
}

export function MessageBus({ lanes }: Props) {
  return (
    <section className="message-bus">
      <div className="section-heading">
        <h2>Cross-lane message bus</h2>
        <span>auditable coordination</span>
      </div>
      <div className="bus-grid">
        <div className="bus-message system">System: {lanes.length} lanes are visible. Cross-lane messages require user approval before forwarding.</div>
        <div className="bus-message warning">Conflict watch: no overlapping changed files detected in demo mode.</div>
      </div>
    </section>
  );
}
