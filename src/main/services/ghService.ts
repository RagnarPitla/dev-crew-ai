import { CommandRunner } from './commandRunner';
import type { CreatePullRequestInput, GhIssue, GhPullRequest } from '../../shared/types';

export class GhService {
  constructor(private readonly runner = new CommandRunner()) {}

  async checkGhAuth(): Promise<{ authenticated: boolean; raw: string }> {
    const result = await this.runner.run({ command: 'gh', args: ['auth', 'status'], timeoutMs: 20_000 });
    return { authenticated: result.exitCode === 0, raw: result.stdout + result.stderr };
  }

  async listIssues(repoPath: string): Promise<GhIssue[]> {
    const result = await this.runner.run({
      command: 'gh',
      args: ['issue', 'list', '--state', 'open', '--json', 'number,title,body,state,labels,url'],
      cwd: repoPath,
      timeoutMs: 30_000,
    });
    if (result.exitCode !== 0) throw new Error(result.stderr || result.stdout);
    const rows = JSON.parse(result.stdout || '[]') as Array<{ number: number; title: string; body?: string; state: string; labels?: Array<{ name: string }>; url?: string }>;
    return rows.map((row) => ({ ...row, labels: row.labels?.map((label) => label.name) ?? [] }));
  }

  async listPullRequests(repoPath: string): Promise<GhPullRequest[]> {
    const result = await this.runner.run({
      command: 'gh',
      args: ['pr', 'list', '--state', 'open', '--json', 'number,title,state,url,headRefName,baseRefName'],
      cwd: repoPath,
      timeoutMs: 30_000,
    });
    if (result.exitCode !== 0) throw new Error(result.stderr || result.stdout);
    return JSON.parse(result.stdout || '[]') as GhPullRequest[];
  }

  async createPullRequest(repoPath: string, input: CreatePullRequestInput): Promise<GhPullRequest> {
    const result = await this.runner.run({
      command: 'gh',
      args: ['pr', 'create', '--title', input.title, '--body', input.body, ...(input.draft ? ['--draft'] : [])],
      cwd: repoPath,
      timeoutMs: 60_000,
    });
    if (result.exitCode !== 0) throw new Error(result.stderr || result.stdout);
    return { number: 0, title: input.title, state: input.draft ? 'DRAFT' : 'OPEN', url: result.stdout.trim() };
  }
}
