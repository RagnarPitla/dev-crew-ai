import type { RunCommandResult } from '../../../../shared/types';

export type TerminalPaneKind = 'pm-spec' | 'build' | 'qa-review' | 'ship-pr';
export type TerminalPaneStatus = 'idle' | 'running' | 'completed' | 'failed';
export type TerminalPaneLayout = 'two-by-two' | 'three-plus-one' | 'focus-plus-stack';
export type TerminalTone = 'neutral' | 'running' | 'success' | 'danger';

export interface TerminalPaneProjectContext {
  id: string;
  name: string;
  rootPath: string;
}

export interface TerminalPaneModel {
  id: string;
  projectId: string;
  title: string;
  kind: TerminalPaneKind;
  cwd: string;
  command: string;
  status: TerminalPaneStatus;
  output: string;
  lastResult?: RunCommandResult;
}

export interface CommandSummary {
  tone: Exclude<TerminalTone, 'running' | 'neutral'>;
  headline: string;
  detail: string;
}

export interface TerminalPaneView {
  title: string;
  commandLine: string;
  statusLabel: string;
  tone: TerminalTone;
  evidence: string[];
  nextStep: string;
}

const defaultPanes: Array<Pick<TerminalPaneModel, 'id' | 'title' | 'kind' | 'command' | 'status' | 'output'>> = [
  {
    id: 'pane-pm-spec',
    title: 'PM Spec',
    kind: 'pm-spec',
    command: 'git status --short',
    status: 'idle',
    output: 'Ready to inspect scope and project state.',
  },
  {
    id: 'pane-build',
    title: 'Build',
    kind: 'build',
    command: 'npm test',
    status: 'idle',
    output: 'Ready to run the implementation/test lane.',
  },
  {
    id: 'pane-qa-review',
    title: 'QA Review',
    kind: 'qa-review',
    command: 'npm run build',
    status: 'idle',
    output: 'Ready to verify build quality and attach evidence.',
  },
  {
    id: 'pane-ship-pr',
    title: 'Ship / PR',
    kind: 'ship-pr',
    command: 'git diff --stat',
    status: 'idle',
    output: 'Ready to review changed-file evidence before push.',
  },
];

export function createInitialTerminalPanes(project: TerminalPaneProjectContext): TerminalPaneModel[] {
  return defaultPanes.map((pane) => ({
    ...pane,
    projectId: project.id,
    cwd: project.rootPath,
  }));
}

export function summarizeCommandResult(result: RunCommandResult): CommandSummary {
  const stdoutLength = result.stdout.length;
  const stderrLength = result.stderr.length;
  return {
    tone: result.exitCode === 0 ? 'success' : 'danger',
    headline: result.exitCode === 0 ? 'Command completed successfully' : 'Command needs review',
    detail: `Exit ${result.exitCode} · ${stdoutLength} stdout chars · ${stderrLength} stderr chars`,
  };
}

export function buildTerminalPaneView(pane: TerminalPaneModel): TerminalPaneView {
  const commandLine = pane.command.trim() || 'No command configured';
  const summary = pane.lastResult ? summarizeCommandResult(pane.lastResult) : undefined;
  const tone: TerminalTone = pane.status === 'running' ? 'running' : summary?.tone ?? 'neutral';

  return {
    title: pane.title,
    commandLine,
    statusLabel: statusLabels[pane.status],
    tone,
    evidence: [pane.cwd, summary?.detail ?? 'No command evidence captured yet'].filter(Boolean),
    nextStep: getNextStep(pane),
  };
}

export function getNextPaneLayout(layout: TerminalPaneLayout): TerminalPaneLayout {
  if (layout === 'two-by-two') return 'three-plus-one';
  if (layout === 'three-plus-one') return 'focus-plus-stack';
  return 'two-by-two';
}

const statusLabels: Record<TerminalPaneStatus, string> = {
  idle: 'Idle',
  running: 'Running',
  completed: 'Completed',
  failed: 'Needs review',
};

function getNextStep(pane: TerminalPaneModel): string {
  if (pane.status === 'running') return 'Wait for command output before making an approval decision.';
  if (pane.status === 'failed') return 'Send back to the lane with the error output attached.';
  if (pane.status === 'completed') return 'Attach this output to the lane evidence pack.';
  return 'Run the command when this lane needs fresh evidence.';
}
