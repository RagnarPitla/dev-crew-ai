import type React from 'react';
import type { RunCommandResult } from '../../../../shared/types';
import { buildTerminalPaneView, type TerminalPaneModel } from './terminalPaneDisplay';

interface TerminalPaneProps {
  pane: TerminalPaneModel;
  focused: boolean;
  onFocus: (paneId: string) => void;
  onCommandChange: (paneId: string, command: string) => void;
  onRun: (paneId: string) => Promise<void>;
}

export function TerminalPane({ pane, focused, onFocus, onCommandChange, onRun }: TerminalPaneProps) {
  const view = buildTerminalPaneView(pane);
  const output = renderPaneOutput(pane.lastResult, pane.output);

  return (
    <article className={`terminal-pane ${focused ? 'focused' : ''} ${view.tone}`} onClick={() => onFocus(pane.id)}>
      <header className="terminal-pane-header">
        <div>
          <p className="eyebrow">{pane.kind.replace('-', ' ')}</p>
          <h3>{view.title}</h3>
        </div>
        <span className={`terminal-status ${view.tone}`}>{view.statusLabel}</span>
      </header>

      <label className="terminal-command-label">
        Command
        <input
          value={pane.command}
          onChange={(event) => onCommandChange(pane.id, event.target.value)}
          onClick={(event) => event.stopPropagation()}
          disabled={pane.status === 'running'}
        />
      </label>

      <pre className="terminal-output">{output}</pre>

      <footer className="terminal-pane-footer">
        <div>
          {view.evidence.map((item) => (
            <small key={item}>{item}</small>
          ))}
          <small>{view.nextStep}</small>
        </div>
        <button className="primary-button" disabled={pane.status === 'running'} onClick={(event) => void handleRunClick(event, pane.id, onRun)}>
          {pane.status === 'running' ? 'Running…' : 'Run'}
        </button>
      </footer>
    </article>
  );
}

async function handleRunClick(event: React.MouseEvent<HTMLButtonElement>, paneId: string, onRun: (paneId: string) => Promise<void>) {
  event.stopPropagation();
  await onRun(paneId);
}

function renderPaneOutput(result: RunCommandResult | undefined, fallback: string): string {
  if (!result) return fallback;
  const sections = [];
  if (result.stdout.trim()) sections.push(`stdout\n${result.stdout.trimEnd()}`);
  if (result.stderr.trim()) sections.push(`stderr\n${result.stderr.trimEnd()}`);
  if (sections.length === 0) return `Command exited ${result.exitCode} with no output.`;
  return sections.join('\n\n');
}
