import type { ProviderConfig, StartAgentInput, StartProcessInput } from '../../shared/types';
import type { AgentProvider } from './providerTypes';

export class OllamaProvider implements AgentProvider {
  id = 'ollama';
  displayName = 'Ollama Local Model';
  config: ProviderConfig = {
    id: this.id,
    name: this.displayName,
    kind: 'ollama',
    command: 'ollama',
    argsTemplate: ['run', 'qwen2.5-coder:7b'],
    supportsInteractiveInput: true,
    supportsPrintMode: true,
  };

  async detect() {
    return { available: true, reason: 'Run `ollama list` in Settings to verify local models.' };
  }

  buildStartCommand(input: StartAgentInput): StartProcessInput {
    return { command: 'ollama', args: ['run', 'qwen2.5-coder:7b'], cwd: input.lane.worktreePath };
  }
}
