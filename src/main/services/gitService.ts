import { CommandRunner } from './commandRunner';
import type { GitStatus, RepoInfo, WorktreeInfo } from '../../shared/types';

export class GitService {
  constructor(private readonly runner = new CommandRunner()) {}

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
    const branch = await this.git(path, ['branch', '--show-current']);
    const raw = await this.git(path, ['status', '--short']);
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
    await this.git(repoPath, ['fetch', 'origin']);
    await this.git(repoPath, ['worktree', 'add', worktreePath, '-b', branchName, `origin/${baseBranch}`]);
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
    return 'main';
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
  const match = normalized.match(/github\.com[:/](?<owner>[^/]+)\/(?<repo>[^/]+)$/);
  return { owner: match?.groups?.owner, repo: match?.groups?.repo };
}
