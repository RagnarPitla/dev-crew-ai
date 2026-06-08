import { access, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { constants } from 'node:fs';
import { CommandRunner } from './commandRunner';
import type { GitIdentityStatus, GitStatus, ProjectScanResult, RepoInfo, WorktreeInfo } from '../../shared/types';

export class GitService {
  constructor(private readonly runner = new CommandRunner()) {}

  async scanProject(path: string): Promise<ProjectScanResult> {
    const exists = await pathExists(path);
    if (!exists) {
      return {
        rootPath: path,
        exists: false,
        isGitRepo: false,
        hasCommits: false,
        hasGitHubRemote: false,
        dirtyFiles: [],
        detectedStack: [],
        recommendedAction: 'read-only',
        mode: 'plain-folder',
      };
    }

    const root = (await this.gitOptional(path, ['rev-parse', '--show-toplevel'])) || path;
    const isGitRepo = Boolean(await this.gitOptional(path, ['rev-parse', '--git-dir']));
    if (!isGitRepo) {
      return {
        rootPath: path,
        exists: true,
        isGitRepo: false,
        hasCommits: false,
        hasGitHubRemote: false,
        dirtyFiles: [],
        detectedStack: await detectStack(path),
        recommendedAction: 'init-git',
        mode: 'plain-folder',
      };
    }

    const remoteUrl = await this.gitOptional(root, ['remote', 'get-url', 'origin']);
    const parsed = remoteUrl ? parseGitHubRemote(remoteUrl) : {};
    const hasGitHubRemote = Boolean(parsed.owner && parsed.repo);
    const currentBranch = await this.gitOptional(root, ['branch', '--show-current']);
    const defaultBranch = await this.detectDefaultBranch(root);
    const hasCommits = await this.hasCommits(root);
    const status = await this.getStatus(root);

    return {
      rootPath: root,
      exists: true,
      isGitRepo: true,
      hasCommits,
      hasGitHubRemote,
      remoteUrl: remoteUrl || undefined,
      githubOwner: parsed.owner,
      githubRepo: parsed.repo,
      currentBranch: currentBranch || undefined,
      defaultBranch,
      dirtyFiles: status.changedFiles,
      detectedStack: await detectStack(root),
      recommendedAction: hasGitHubRemote ? 'open-github' : 'open-local-git',
      mode: hasGitHubRemote ? 'github' : 'local-git',
    };
  }

  async initRepo(path: string): Promise<void> {
    const scan = await this.scanProject(path);
    if (scan.isGitRepo) return;
    await this.git(path, ['init', '-b', 'main']);
  }

  async hasCommits(path: string): Promise<boolean> {
    const result = await this.runner.run({ command: 'git', args: ['rev-parse', '--verify', 'HEAD'], cwd: path, timeoutMs: 30_000 });
    return result.exitCode === 0;
  }

  async ensureGitIdentity(path: string): Promise<GitIdentityStatus> {
    const name = await this.gitOptional(path, ['config', 'user.name']);
    const email = await this.gitOptional(path, ['config', 'user.email']);
    return { hasName: Boolean(name), hasEmail: Boolean(email), name: name || undefined, email: email || undefined };
  }

  async createGitignoreIfMissing(path: string): Promise<void> {
    const gitignorePath = join(path, '.gitignore');
    if (await pathExists(gitignorePath)) return;
    await writeFile(
      gitignorePath,
      ['node_modules', 'dist', 'out', 'release', '.env', '.env.*', '*.log', '.DS_Store', ''].join('\n'),
      'utf8',
    );
  }

  async createBaselineCommit(path: string, message = 'chore: baseline before Dev Crew AI lanes'): Promise<void> {
    await this.git(path, ['add', '.']);
    await this.git(path, ['commit', '-m', message]);
  }

  async addRemote(path: string, name: string, url: string): Promise<void> {
    await this.git(path, ['remote', 'add', name, url]);
  }

  async getRepoInfo(path: string): Promise<RepoInfo> {
    const root = await this.git(path, ['rev-parse', '--show-toplevel']);
    const branch = await this.git(root, ['branch', '--show-current']);
    const remote = await this.gitOptional(root, ['remote', 'get-url', 'origin']);
    const defaultBranch = await this.detectDefaultBranch(root);
    const parsed = remote ? parseGitHubRemote(remote) : {};
    return {
      rootPath: root,
      currentBranch: branch || defaultBranch,
      defaultBranch,
      remoteUrl: remote,
      githubOwner: parsed.owner,
      githubRepo: parsed.repo,
    };
  }

  async getStatus(path: string): Promise<GitStatus> {
    const branch = await this.gitOptional(path, ['branch', '--show-current']);
    const raw = await this.gitOptional(path, ['status', '--short']);
    const changedFiles = raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.slice(3).trim());
    return { branch, raw, changedFiles, clean: changedFiles.length === 0 };
  }

  async listWorktrees(path: string): Promise<WorktreeInfo[]> {
    const raw = await this.git(path, ['worktree', 'list', '--porcelain']);
    const entries = raw.split('\n\n').filter(Boolean);
    return entries.map((entry) => {
      const lines = entry.split('\n');
      const worktree = lines.find((line) => line.startsWith('worktree '))?.slice('worktree '.length) ?? '';
      const head = lines.find((line) => line.startsWith('HEAD '))?.slice('HEAD '.length) ?? '';
      const branchRef = lines.find((line) => line.startsWith('branch '))?.slice('branch '.length);
      return { path: worktree, head, branch: branchRef?.replace('refs/heads/', ''), bare: lines.includes('bare') };
    });
  }

  async createWorktree(repoPath: string, worktreePath: string, branchName: string, baseBranch: string): Promise<WorktreeInfo> {
    const scan = await this.scanProject(repoPath);
    if (scan.hasGitHubRemote) {
      await this.git(repoPath, ['fetch', 'origin']);
      await this.git(repoPath, ['worktree', 'add', worktreePath, '-b', branchName, `origin/${baseBranch}`]);
    } else {
      await this.git(repoPath, ['worktree', 'add', worktreePath, '-b', branchName, baseBranch]);
    }
    return { path: worktreePath, head: '', branch: branchName, bare: false };
  }

  async removeWorktree(repoPath: string, worktreePath: string): Promise<void> {
    await this.git(repoPath, ['worktree', 'remove', worktreePath]);
  }

  async getDiff(path: string): Promise<string> {
    return this.git(path, ['diff']);
  }

  private async detectDefaultBranch(path: string): Promise<string> {
    const ref = await this.gitOptional(path, ['symbolic-ref', 'refs/remotes/origin/HEAD']);
    if (ref.includes('/')) return ref.split('/').pop() ?? 'main';
    const branch = await this.gitOptional(path, ['branch', '--show-current']);
    return branch || 'main';
  }

  private async git(cwd: string, args: string[]): Promise<string> {
    const result = await this.runner.run({ command: 'git', args, cwd, timeoutMs: 30_000 });
    if (result.exitCode !== 0) {
      throw new Error(`git ${args.join(' ')} failed: ${result.stderr || result.stdout}`);
    }
    return result.stdout.trim();
  }

  private async gitOptional(cwd: string, args: string[]): Promise<string> {
    const result = await this.runner.run({ command: 'git', args, cwd, timeoutMs: 30_000 });
    return result.exitCode === 0 ? result.stdout.trim() : '';
  }
}

export function parseGitHubRemote(remote: string): { owner?: string; repo?: string } {
  const normalized = remote
    .replace(/^git@github\.com:/, 'https://github.com/')
    .replace(/^ssh:\/\/git@github\.com\//, 'https://github.com/')
    .replace(/\.git$/, '');
  const match = normalized.match(/github\.com[:/]([^/]+)\/([^/]+)$/);
  return { owner: match?.[1], repo: match?.[2] };
}

async function detectStack(path: string): Promise<string[]> {
  const checks: Array<[string, string]> = [
    ['package.json', 'Node.js'],
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'Yarn'],
    ['requirements.txt', 'Python'],
    ['pyproject.toml', 'Python'],
    ['Cargo.toml', 'Rust'],
    ['go.mod', 'Go'],
    ['pom.xml', 'Java/Maven'],
    ['build.gradle', 'Java/Gradle'],
    ['global.json', '.NET'],
  ];
  const found: string[] = [];
  for (const [file, label] of checks) {
    if (await pathExists(join(path, file))) found.push(label);
  }
  return Array.from(new Set(found));
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    await stat(path);
    return true;
  } catch {
    return false;
  }
}
