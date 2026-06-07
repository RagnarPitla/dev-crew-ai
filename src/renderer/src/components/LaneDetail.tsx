import type { Lane, ProviderConfig } from '../shared/types';
import { DiffView } from './DiffView';
import { TerminalView } from './TerminalView';

interface Props {
  lane?: Lane;
  provider?: ProviderConfig;
}

export function LaneDetail({ lane, provider }: Props) {
  if (!lane) {
    return <aside className="detail-panel">Select a lane</aside>;
  }

  return (
    <aside className="detail-panel">
      <div className="detail-header">
        <span className="eyebrow">Selected lane</span>
        <h2>{lane.title}</h2>
        <p>{lane.worktreePath}</p>
      </div>

      <div className="detail-actions">
        <button>Start</button>
        <button>Stop</button>
        <button>Create PR</button>
        <button>Cleanup</button>
      </div>

      <section className="panel">
        <h3>Provider</h3>
        <strong>{provider?.name ?? lane.providerId}</strong>
        <small>{provider?.command} {provider?.argsTemplate.join(' ')}</small>
      </section>

      <TerminalView lane={lane} />
      <DiffView lane={lane} />
    </aside>
  );
}
