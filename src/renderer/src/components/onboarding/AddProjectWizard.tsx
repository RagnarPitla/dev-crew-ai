import { useMemo, useState } from 'react';
import type { ProjectMode, ProjectScanResult, ProjectVision } from '../../shared/types';
import {
  getProjectModeCopy,
  getProjectNextStep,
  getProjectScanFacts,
  getProjectVisionSummary,
} from './projectWizardDisplay';

interface Props {
  onOpenDemo: () => void;
}

type WizardStatus = 'idle' | 'scanning' | 'ready' | 'error';

const samplePaths: Record<ProjectMode, string> = {
  github: 'C:/Users/ragnar/projects/dev-crew-ai',
  'local-git': 'C:/Users/ragnar/projects/private-app',
  'plain-folder': 'C:/Users/ragnar/projects/new-idea',
};

const demoVision: ProjectVision = {
  found: true,
  source: 'VISION.md',
  path: 'C:/Users/ragnar/projects/dev-crew-ai/VISION.md',
  content: 'Build the thing that builds the thing.',
  detectedAt: new Date().toISOString(),
};

export function AddProjectWizard({ onOpenDemo }: Props) {
  const [selectedMode, setSelectedMode] = useState<ProjectMode>('plain-folder');
  const [projectPath, setProjectPath] = useState(samplePaths['plain-folder']);
  const [scan, setScan] = useState<ProjectScanResult | undefined>(() => demoPlainFolderScan(projectPath));
  const [vision, setVision] = useState<ProjectVision | undefined>();
  const [status, setStatus] = useState<WizardStatus>('ready');
  const [error, setError] = useState<string>('');

  const mode = getProjectModeCopy(selectedMode);
  const nextStep = scan ? getProjectNextStep(scan) : undefined;
  const visionSummary = getProjectVisionSummary(vision ?? (scan?.mode === 'github' ? demoVision : undefined));
  const scanFacts = useMemo(() => (scan ? getProjectScanFacts(scan) : []), [scan]);

  const chooseMode = (modeName: ProjectMode) => {
    setSelectedMode(modeName);
    const nextPath = samplePaths[modeName];
    setProjectPath(nextPath);
    setScan(demoScanForMode(modeName, nextPath));
    setVision(modeName === 'github' ? demoVision : undefined);
    setStatus('ready');
    setError('');
  };

  const scanProject = async () => {
    if (!projectPath.trim()) {
      setStatus('error');
      setError('Enter a local path before scanning.');
      return;
    }

    setStatus('scanning');
    setError('');
    try {
      const api = window.devCrew;
      if (!api?.scanProject) {
        const demoScan = demoScanForMode(selectedMode, projectPath);
        setScan(demoScan);
        setVision(selectedMode === 'github' ? demoVision : undefined);
        setStatus('ready');
        return;
      }
      const result = await api.scanProject(projectPath);
      setScan(result);
      if (api.detectProjectVision) {
        setVision(await api.detectProjectVision(result.rootPath));
      }
      setStatus('ready');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not scan project.');
    }
  };

  const runPrimaryAction = async () => {
    if (!scan) return;
    const api = window.devCrew;
    try {
      if (scan.recommendedAction === 'init-git' && api?.initGit) {
        await api.createGitignore(scan.rootPath);
        await api.initGit(scan.rootPath);
        const identity = await api.getGitIdentity(scan.rootPath);
        if (identity.hasName && identity.hasEmail) {
          await api.createBaselineCommit(scan.rootPath);
        }
        await scanProject();
        return;
      }

      if (api?.addProject) {
        await api.addProject(scan.rootPath);
      }
      onOpenDemo();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Project action failed.');
    }
  };

  return (
    <section className="project-wizard" aria-label="Add Project Wizard">
      <div className="wizard-header">
        <div>
          <p className="eyebrow">Add Project Wizard</p>
          <h2>Choose how Dev Crew AI should open your work</h2>
          <p>Start local-first. GitHub is powerful, but optional. Git safety comes before agent work.</p>
        </div>
        <button className="secondary-button" onClick={onOpenDemo}>Skip to demo workspace</button>
      </div>

      <div className="wizard-mode-grid">
        {(['github', 'local-git', 'plain-folder'] as ProjectMode[]).map((modeName) => {
          const copy = getProjectModeCopy(modeName);
          return (
            <button
              className={`wizard-mode-card ${modeName} ${selectedMode === modeName ? 'selected' : ''}`}
              key={modeName}
              onClick={() => chooseMode(modeName)}
              type="button"
            >
              <span>{copy.actionLabel}</span>
              <h3>{copy.title}</h3>
              <p>{copy.description}</p>
              <strong>{copy.promise}</strong>
            </button>
          );
        })}
      </div>

      <div className="wizard-path-row">
        <label>
          <span>{mode.actionLabel}</span>
          <input value={projectPath} onChange={(event) => setProjectPath(event.target.value)} placeholder="Paste a local path" />
        </label>
        <button className="primary-button" onClick={scanProject} disabled={status === 'scanning'}>
          {status === 'scanning' ? 'Scanning…' : 'Scan project'}
        </button>
      </div>

      {error ? <div className="wizard-error">{error}</div> : null}

      {scan ? (
        <section className="wizard-results">
          <div className="wizard-scan-panel">
            <div>
              <p className="eyebrow">Scan result</p>
              <h3>{scan.exists ? getProjectModeCopy(scan.mode).title : 'Path not available'}</h3>
              <p>{scan.rootPath}</p>
            </div>
            <div className="wizard-fact-grid">
              {scanFacts.map((fact) => (
                <div className="scan-fact" key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className={`wizard-vision-card ${visionSummary.intent}`}>
            <p className="eyebrow">Project Vision</p>
            <h3>{visionSummary.title}</h3>
            <strong>{visionSummary.sourceLabel}</strong>
            <p>{visionSummary.description}</p>
          </div>

          {nextStep ? (
            <div className={`wizard-next-step ${nextStep.intent}`}>
              <div>
                <p className="eyebrow">Next safe step</p>
                <h3>{nextStep.title}</h3>
                <p>{nextStep.description}</p>
              </div>
              <div className="wizard-action-stack">
                <button className="primary-button" onClick={runPrimaryAction}>{nextStep.primaryAction}</button>
                {nextStep.secondaryAction ? <button className="secondary-button">{nextStep.secondaryAction}</button> : null}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}

function demoScanForMode(mode: ProjectMode, rootPath: string): ProjectScanResult {
  if (mode === 'github') {
    return {
      rootPath,
      exists: true,
      isGitRepo: true,
      hasCommits: true,
      hasGitHubRemote: true,
      remoteUrl: 'https://github.com/RagnarPitla/dev-crew-ai.git',
      githubOwner: 'RagnarPitla',
      githubRepo: 'dev-crew-ai',
      currentBranch: 'main',
      defaultBranch: 'main',
      dirtyFiles: [],
      detectedStack: ['Node.js', 'Electron', 'React'],
      recommendedAction: 'open-github',
      mode: 'github',
    };
  }

  if (mode === 'local-git') {
    return {
      rootPath,
      exists: true,
      isGitRepo: true,
      hasCommits: true,
      hasGitHubRemote: false,
      currentBranch: 'main',
      defaultBranch: 'main',
      dirtyFiles: [],
      detectedStack: ['TypeScript'],
      recommendedAction: 'open-local-git',
      mode: 'local-git',
    };
  }

  return demoPlainFolderScan(rootPath);
}

function demoPlainFolderScan(rootPath: string): ProjectScanResult {
  return {
    rootPath,
    exists: true,
    isGitRepo: false,
    hasCommits: false,
    hasGitHubRemote: false,
    dirtyFiles: [],
    detectedStack: ['Node.js'],
    recommendedAction: 'init-git',
    mode: 'plain-folder',
  };
}
