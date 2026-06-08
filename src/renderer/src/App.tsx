import { useMemo, useState } from 'react';
import type { GhIssue, Lane, PrivateActionItem, Project, ProviderConfig } from './shared/types';
import { LaneBoard } from './components/LaneBoard';
import { LaneDetail } from './components/LaneDetail';
import { MessageBus } from './components/MessageBus';
import { ProjectSidebar } from './components/ProjectSidebar';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { ActionBoard } from './components/actions/ActionBoard';
import { DEV_CREW_BRAND } from './shared/brand';

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

const demoAction: PrivateActionItem = {
  id: 'action-project-vision',
  title: 'Project Vision Detection',
  problem: 'Agents need a stable project constitution before lane work starts.',
  visibility: 'public_candidate',
  status: 'pm_final',
  acceptanceCriteria: ['Detect VISION.md/AGENTS.md/CLAUDE.md/DEV_CREW.md/README.md', 'Include vision in lane instructions'],
  nonGoals: ['Do not auto-generate project vision yet'],
  targetFiles: ['src/main/services/visionService.ts', 'src/main/services/instructionService.ts'],
  gates: {
    pm_spec: {
      role: 'pm_spec',
      status: 'approved',
      reviewer: 'Ragnar',
      summary: 'Project Vision is the next product primitive.',
      checklist: ['Scope is clear', 'OBO stays roadmap only'],
      evidence: ['Private PM spec approved'],
      reviewedAt: new Date().toISOString(),
    },
    dev: {
      role: 'dev',
      status: 'approved',
      reviewer: 'Ruby Dev',
      summary: 'Implemented with TDD and lane instruction integration.',
      checklist: ['RED tests first', 'Minimal implementation'],
      evidence: ['visionService.test.ts', 'instructionService.test.ts'],
      reviewedAt: new Date().toISOString(),
    },
    qa: {
      role: 'qa',
      status: 'approved',
      reviewer: 'Ruby QA',
      summary: 'Tests and production build passed.',
      checklist: ['npm test', 'npm run build'],
      evidence: ['18 tests passed', 'Build passed'],
      reviewedAt: new Date().toISOString(),
    },
    pm_final: {
      role: 'pm_final',
      status: 'not_started',
      reviewer: '',
      summary: '',
      checklist: [],
      evidence: [],
    },
  },
  pushApproval: 'not_allowed',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

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
            <p className="eyebrow">{DEV_CREW_BRAND.productName}</p>
            <h1>Parallel Development Studio</h1>
            <p>Run multiple AI coding sessions safely across projects, GitHub issues, features, PRs, and reviews.</p>
            <p className="brand-byline">{DEV_CREW_BRAND.byline}</p>
          </div>
          <button className="primary-button">Create lane</button>
        </header>
        <LaneBoard lanes={lanes} selectedLaneId={selectedLane?.id} onSelectLane={setSelectedLaneId} />
        <ActionBoard action={demoAction} />
        <MessageBus projectId={selectedProject.id} lanes={lanes} />
      </section>
      <LaneDetail lane={selectedLane} provider={demoProviders.find((provider) => provider.id === selectedLane?.providerId)} />
    </main>
  );
}
