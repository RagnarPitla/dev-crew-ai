import type { OneShotAgentInput, ProviderConfig, RunCommandInput, StartAgentInput, StartProcessInput } from '../../shared/types';
import type { AgentProvider } from './providerTypes';

export class ClaudeCodeProvider implements AgentProvider {
  id = 'claude-code';
  displayName = 'Claude Code';
  config: ProviderConfig = {
    id: this.id,
    name: this.displayName,
    kind: 'claude-code',
    command: 'claude',
    argsTemplate: [],
    supportsInteractiveInput: true,
    supportsPrintMode: true,
  };

  async detect() {
    return { available: true, reason: 'Run `claude --version` in Settings to verify local installation.' };
  }

  buildStartCommand(input: StartAgentInput): StartProcessInput {
    const args = input.prompt ? [input.prompt] : [];
    return { command: 'claude', args, cwd: input.lane.worktreePath };
  }

  buildOneShotCommand(input: OneShotAgentInput): RunCommandInput {
    return { command: 'claude', args: ['-p', input.prompt, '--max-turns', '10'], cwd: input.lane.worktreePath };
  }
}
