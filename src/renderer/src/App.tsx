import { useMemo, useState } from 'react';
import type { GhIssue, Lane, Project, ProviderConfig } from './shared/types';
import { LaneBoard } from './components/LaneBoard';
import { LaneDetail } from './components/LaneDetail';
import { MessageBus } from './components/MessageBus';
import { ProjectSidebar } from './components/ProjectSidebar';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';

const demoProviders: ProviderConfig[] = [
  {
    id: 'custom-command',
    name: 'Custom Command',
    kind: 'custom-command',
    command: 'node',
    argsTemplate: ['--version'],
    supportsInteractiveInput: true,
    supportsPrintMode: false,
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    kind: 'claude-code',
    command: 'claude',
    argsTemplate: [],
    supportsInteractiveInput: true,
    supportsPrintMode: true,
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    kind: 'github-copilot',
    command: 'gh',
    argsTemplate: ['copilot', 'suggest'],
    supportsInteractiveInput: true,
    supportsPrintMode: false,
  },
];

const demoProject: Project = {
  id: 'demo',
  name: 'Dev Crew AI Demo',
  rootPath: '~/projects/demo',
  mode: 'github',
  gitInitialized: true,
  githubConnected: true,
  githubOwner: 'RagnarPitla',
  githubRepo: 'dev-crew-ai',
  defaultBranch: 'main',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const demoLanes: Lane[] = [
  {
    id: 'lane-feature',
    projectId: 'demo',
    title: 'Build GitHub issue lane flow',
    type: 'feature',
    status: 'running',
    branchName: 'feature/github-issue-lanes',
    worktreePath: '~/worktrees/github-issue-lanes',
    baseBranch: 'main',
    providerId: 'claude-code',
    linkedIssueNumber: 12,
    instructionPath: 'DEV_CREW_LANE.md',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'lane-review',
    projectId: 'demo',
    title: 'Review provider adapter safety',
    type: 'review',
    status: 'review_needed',
    branchName: 'review/provider-safety',
    worktreePath: '~/worktrees/provider-safety',
    baseBranch: 'main',
    providerId: 'github-copilot',
    linkedPrNumber: 7,
    instructionPath: 'DEV_CREW_LANE.md',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const demoIssues: GhIssue[] = [
  { number: 12, title: 'Create lane from issue', state: 'OPEN', labels: ['feature'], url: '#' },
  { number: 18, title: 'Detect file conflicts across lanes', state: 'OPEN', labels: ['safety'], url: '#' },
  { number: 21, title: 'Add Ollama summarization adapter', state: 'OPEN', labels: ['local-ai'], url: '#' },
];

export function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedProject] = useState<Project>(demoProject);
  const [lanes] = useState<Lane[]>(demoLanes);
  const [selectedLaneId, setSelectedLaneId] = useState(lanes[0]?.id);
  const selectedLane = useMemo(() => lanes.find((lane) => lane.id === selectedLaneId) ?? lanes[0], [lanes, selectedLaneId]);

  return showWelcome ? (
    <main className="welcome-shell">
      <WelcomeScreen onSelectDemo={() => setShowWelcome(false)} />
    </main>
  ) : (
    <main className="app-shell">
      <ProjectSidebar project={selectedProject} issues={demoIssues} providers={demoProviders} />
      <section className="workspace">
        <header className="hero">
          <div>
            <p className="eyebrow">Dev Crew AI</p>
            <h1>Parallel Development Studio</h1>
            <p>Run multiple AI coding sessions safely across projects, GitHub issues, features, PRs, and reviews.</p>
          </div>
          <button className="primary-button">Create lane</button>
        </header>
        <LaneBoard lanes={lanes} selectedLaneId={selectedLane?.id} onSelectLane={setSelectedLaneId} />
        <MessageBus projectId={selectedProject.id} lanes={lanes} />
      </section>
      <LaneDetail lane={selectedLane} provider={demoProviders.find((provider) => provider.id === selectedLane?.providerId)} />
    </main>
  );
}
