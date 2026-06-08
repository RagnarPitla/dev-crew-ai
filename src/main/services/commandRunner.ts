import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import type { RunCommandInput, RunCommandResult, StartProcessInput } from '../../shared/types';

export class CommandRunner {
  async run(input: RunCommandInput): Promise<RunCommandResult> {
    const args = input.args ?? [];
    const cwd = normalizeCwd(input.cwd);
    return new Promise((resolve) => {
      const child = spawn(input.command, args, {
        cwd,
        env: { ...process.env, ...input.env },
        shell: true,
      });
      let stdout = '';
      let stderr = '';
      const timeout = input.timeoutMs
        ? setTimeout(() => {
            child.kill('SIGTERM');
          }, input.timeoutMs)
        : undefined;

      child.stdout?.on('data', (chunk: Buffer) => {
        stdout += chunk.toString();
      });
      child.stderr?.on('data', (chunk: Buffer) => {
        stderr += chunk.toString();
      });
      child.on('error', (error) => {
        if (timeout) clearTimeout(timeout);
        resolve({ exitCode: 1, stdout, stderr: stderr + error.message });
      });
      child.on('close', (code) => {
        if (timeout) clearTimeout(timeout);
        resolve({ exitCode: code ?? 0, stdout, stderr });
      });
    });
  }

  start(input: StartProcessInput, onData?: (stream: 'stdout' | 'stderr', data: string) => void, onExit?: (code: number | null) => void) {
    const cwd = normalizeCwd(input.cwd);
    const child = spawn(input.command, input.args ?? [], {
      cwd,
      env: { ...process.env, ...input.env },
      shell: true,
    });
    child.stdout?.on('data', (chunk: Buffer) => onData?.('stdout', chunk.toString()));
    child.stderr?.on('data', (chunk: Buffer) => onData?.('stderr', chunk.toString()));
    child.on('close', (code) => onExit?.(code));
    return child;
  }
}

function normalizeCwd(cwd?: string): string | undefined {
  if (!cwd) return undefined;
  const expanded = cwd.startsWith('~/') || cwd === '~' ? resolve(homedir(), cwd.slice(2)) : cwd;
  return existsSync(expanded) ? expanded : process.cwd();
}
