import type { Lane } from '../shared/types';

interface Props {
  lane: Lane;
}

export function TerminalView({ lane }: Props) {
  return (
    <section className="terminal panel">
      <h3>Terminal</h3>
      <pre>{`$ dev-crew start ${lane.id}\nReading DEV_CREW_LANE.md...\nProvider: ${lane.providerId}\nStatus: ${lane.status}\nWaiting for live process stream...`}</pre>
    </section>
  );
}
