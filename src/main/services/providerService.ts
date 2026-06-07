import { ClaudeCodeProvider } from '../providers/claudeCodeProvider';
import { CopilotProvider } from '../providers/copilotProvider';
import { CustomCommandProvider } from '../providers/customCommandProvider';
import { OllamaProvider } from '../providers/ollamaProvider';
import type { AgentProvider } from '../providers/providerTypes';

export class ProviderService {
  private readonly providers: AgentProvider[] = [
    new CustomCommandProvider(),
    new ClaudeCodeProvider(),
    new CopilotProvider(),
    new OllamaProvider(),
  ];

  listProviders() {
    return this.providers.map((provider) => provider.config);
  }

  getProvider(id: string): AgentProvider {
    const provider = this.providers.find((candidate) => candidate.id === id);
    if (!provider) {
      throw new Error(`Provider not found: ${id}`);
    }
    return provider;
  }
}
