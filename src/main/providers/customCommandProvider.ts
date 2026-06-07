import type { ProviderConfig, StartAgentInput, StartProcessInput } from '../../shared/types';
import type { AgentProvider } from './providerTypes';
import { renderTemplate } from './providerTypes';

export class CustomCommandProvider implements AgentProvider {
  id = 'custom-command';
  displayName = 'Custom command';
  config: ProviderConfig = {
    id: this.id,
    name: this.displayName,
    kind: 'custom-command',
    command: process.env.DEV_CREW_CUSTOM_COMMAND || 'node',
    argsTemplate: process.env.DEV_CREW_CUSTOM_ARGS ? process.env.DEV_CREW_CUSTOM_ARGS.split(' ') : ['--version'],
    supportsInteractiveInput: true,
    supportsPrintMode: false,
  };

  async detect() {
    return { available: true, reason: 'Custom commands are configured by the user.' };
  }

  buildStartCommand(input: StartAgentInput): StartProcessInput {
    return {
      command: this.config.command,
      args: renderTemplate(this.config.argsTemplate, {
        laneTitle: input.lane.title,
        branchName: input.lane.branchName,
        worktreePath: input.lane.worktreePath,
      }),
      cwd: input.lane.worktreePath,
      env: this.config.env,
    };
  }
}
