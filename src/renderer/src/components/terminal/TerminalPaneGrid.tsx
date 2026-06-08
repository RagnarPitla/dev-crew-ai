import { useMemo, useState } from 'react';
import type { Project, RunCommandResult } from '../../../../shared/types';
import { devCrewApi } from '../../../lib/ipcClient';
import { TerminalPane } from './TerminalPane';
import {
  createInitialTerminalPanes,
  getNextPaneLayout,
  type TerminalPaneLayout,
  type TerminalPaneModel,
} from './terminalPaneDisplay';

interface TerminalPaneGridProps {
  project: Project;
}

export function TerminalPaneGrid({ project }: TerminalPaneGridProps) {
  const initialPanes = useMemo(() => createInitialTerminalPanes(project), [project]);
  const [panes, setPanes] = useState<TerminalPaneModel[]>(initialPanes);
  const [focusedPaneId, setFocusedPaneId] = useState(initialPanes[0]?.id ?? '');
  const [layout, setLayout] = useState<TerminalPaneLayout>('two-by-two');

  const handleCommandChange = (paneId: string, command: string) => {
    setPanes((current) => current.map((pane) => (pane.id === paneId ? { ...pane, command } : pane)));
  };

  const handleRun = async (paneId: string) => {
    const pane = panes.find((item) => item.id === paneId);
    if (!pane || !pane.command.trim()) return;

    setPanes((current) =>
      current.map((item) =>
        item.id === paneId
          ? {
              ...item,
              status: 'running',
              output: `Running ${item.command} in ${item.cwd}…`,
              lastResult: undefined,
            }
          : item,
      ),
    );

    try {
      const result = (await devCrewApi.runCommand({
        command: pane.command,
        cwd: pane.cwd,
        timeoutMs: 120_000,
      })) as RunCommandResult;
      setPanes((current) =>
        current.map((item) =>
          item.id === paneId
            ? {
                ...item,
                status: result.exitCode === 0 ? 'completed' : 'failed',
                output: result.stdout || result.stderr || `Command exited ${result.exitCode}`,
                lastResult: result,
              }
            : item,
        ),
      );
    } catch (error) {
      setPanes((current) =>
        current.map((item) =>
          item.id === paneId
            ? {
                ...item,
                status: 'failed',
                output: error instanceof Error ? error.message : 'Command failed before it could start.',
                lastResult: { exitCode: 1, stdout: '', stderr: error instanceof Error ? error.message : 'Unknown error' },
              }
            : item,
        ),
      );
    }
  };

  return (
    <section className="terminal-grid-panel">
      <header className="section-heading terminal-grid-heading">
        <div>
          <p className="eyebrow">Real command lanes</p>
          <h2>Terminal Pane Grid</h2>
          <p>Run project commands from the four operating lanes without losing the project sidebar or progress context.</p>
        </div>
        <button className="primary-button" onClick={() => setLayout((current) => getNextPaneLayout(current))}>
          Layout: {layout.replaceAll('-', ' ')}
        </button>
      </header>
      <div className={`terminal-pane-grid ${layout}`}>
        {panes.map((pane) => (
          <TerminalPane
            key={pane.id}
            pane={pane}
            focused={pane.id === focusedPaneId}
            onFocus={setFocusedPaneId}
            onCommandChange={handleCommandChange}
            onRun={handleRun}
          />
        ))}
      </div>
    </section>
  );
}
