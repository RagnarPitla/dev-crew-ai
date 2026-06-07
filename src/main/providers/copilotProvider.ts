import type { ProviderConfig, StartAgentInput, StartProcessInput } from '../../shared/types';
import type { AgentProvider } from './providerTypes';

export class CopilotProvider implements AgentProvider {
  id = 'github-copilot';
  displayName = 'GitHub Copilot';
  config: ProviderConfig = {
    id: this.id,
    name: this.displayName,
    kind: 'github-copilot',
    command: 'gh',
    argsTemplate: ['copilot', 'suggest'],
    supportsInteractiveInput: true,
    supportsPrintMode: false,
  };

  async detect() {
    return {
      available: true,
      reason: 'Dev Crew AI treats Copilot as a configurable command adapter until local Copilot CLI capabilities are verified.',
    };
  }

  buildStartCommand(input: StartAgentInput): StartProcessInput {
    return {
      command: this.config.command,
      args: this.config.argsTemplate,
      cwd: input.lane.worktreePath,
    };
  }
}
