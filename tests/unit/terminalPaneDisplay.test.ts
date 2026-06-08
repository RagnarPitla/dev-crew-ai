import { describe, expect, it } from 'vitest';
import {
  buildTerminalPaneView,
  createInitialTerminalPanes,
  getNextPaneLayout,
  summarizeCommandResult,
} from '../../src/renderer/src/components/terminal/terminalPaneDisplay';

const baseProject = {
  id: 'project-dev-crew',
  name: 'Dev Crew AI',
  rootPath: '/repos/dev-crew-ai',
};

describe('terminal pane display model', () => {
  it('creates four default panes that match the Dev Crew AI operating lanes', () => {
    const panes = createInitialTerminalPanes(baseProject);

    expect(panes).toHaveLength(4);
    expect(panes.map((pane) => pane.title)).toEqual(['PM Spec', 'Build', 'QA Review', 'Ship / PR']);
    expect(panes.every((pane) => pane.projectId === baseProject.id)).toBe(true);
    expect(panes.every((pane) => pane.cwd === baseProject.rootPath)).toBe(true);
  });

  it('summarizes command results into calm evidence copy', () => {
    expect(summarizeCommandResult({ exitCode: 0, stdout: 'ok\n', stderr: '' })).toEqual({
      tone: 'success',
      headline: 'Command completed successfully',
      detail: 'Exit 0 · 3 stdout chars · 0 stderr chars',
    });

    expect(summarizeCommandResult({ exitCode: 2, stdout: '', stderr: 'boom' })).toEqual({
      tone: 'danger',
      headline: 'Command needs review',
      detail: 'Exit 2 · 0 stdout chars · 4 stderr chars',
    });
  });

  it('renders a pane view with command, status, evidence, and approval-friendly next step', () => {
    const [pane] = createInitialTerminalPanes(baseProject);
    const view = buildTerminalPaneView({
      ...pane,
      command: 'npm test',
      status: 'completed',
      lastResult: { exitCode: 0, stdout: 'all green', stderr: '' },
    });

    expect(view.commandLine).toBe('npm test');
    expect(view.statusLabel).toBe('Completed');
    expect(view.evidence).toContain('Exit 0 · 9 stdout chars · 0 stderr chars');
    expect(view.nextStep).toBe('Attach this output to the lane evidence pack.');
  });

  it('cycles pane layout without hiding project context or progress context', () => {
    expect(getNextPaneLayout('two-by-two')).toBe('three-plus-one');
    expect(getNextPaneLayout('three-plus-one')).toBe('focus-plus-stack');
    expect(getNextPaneLayout('focus-plus-stack')).toBe('two-by-two');
  });
});
