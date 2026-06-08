import type { ProjectScanResult } from '../../shared/types';

interface Props {
  onSelectDemo: () => void;
}

export function WelcomeScreen({ onSelectDemo }: Props) {
  const plainFolderScan: ProjectScanResult = {
    rootPath: 'C:/Users/ragnar/projects/local-prototype',
    exists: true,
    isGitRepo: false,
    hasCommits: false,
    hasGitHubRemote: false,
    dirtyFiles: [],
    detectedStack: ['Node.js'],
    recommendedAction: 'init-git',
    mode: 'plain-folder',
  };

  return (
    <section className="welcome-screen">
      <div className="welcome-copy">
        <p className="eyebrow">Resume Dev Crew AI</p>
        <h1>Bring your project. Spin up your dev crew.</h1>
        <p>
          Start with a GitHub repo, a local Git repo, or a plain folder. Dev Crew AI works locally first and can
          initialize Git so agent changes are trackable and reversible.
        </p>
      </div>
      <div className="onboarding-cards">
        <article className="onboarding-card github">
          <h2>Open a GitHub repo</h2>
          <p>Use issues, PRs, branches, CI, and remote workflows.</p>
          <span>Create lanes from issues</span>
        </article>
        <article className="onboarding-card local">
          <h2>Open a local Git repo</h2>
          <p>Use local branches and worktrees. Connect GitHub later.</p>
          <span>Create manual lanes</span>
        </article>
        <article className="onboarding-card folder">
          <h2>Open a folder</h2>
          <p>Initialize local Git so agent work is safe and reversible.</p>
          <span>No publishing required</span>
        </article>
      </div>
      <ProjectScanCard scan={plainFolderScan} />
      <div className="welcome-actions">
        <button className="primary-button" onClick={onSelectDemo}>Open demo workspace</button>
        <button className="secondary-button">Add local project soon</button>
      </div>
    </section>
  );
}

export function ProjectScanCard({ scan }: { scan: ProjectScanResult }) {
  return (
    <section className="scan-card">
      <div>
        <p className="eyebrow">Project scan preview</p>
        <h2>{scan.mode === 'plain-folder' ? 'Plain folder detected' : scan.mode}</h2>
        <p>{scan.rootPath}</p>
      </div>
      <div className="scan-grid">
        <ScanFact label="Git" value={scan.isGitRepo ? 'Initialized' : 'Not initialized'} />
        <ScanFact label="GitHub" value={scan.hasGitHubRemote ? 'Connected' : 'Optional later'} />
        <ScanFact label="Stack" value={scan.detectedStack.join(', ') || 'Unknown'} />
        <ScanFact label="Recommended" value={scan.recommendedAction.replace('-', ' ')} />
      </div>
      {!scan.isGitRepo ? <InitializeGitStep /> : null}
    </section>
  );
}

function ScanFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="scan-fact">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function InitializeGitStep() {
  return (
    <div className="init-git-step">
      <h3>Initialize local Git for safety</h3>
      <p>Dev Crew AI can create a local Git history before any agent edits files. You do not need GitHub.</p>
      <pre>{`git init\ngit add .\ngit commit -m "chore: baseline before Dev Crew AI lanes"`}</pre>
    </div>
  );
}
