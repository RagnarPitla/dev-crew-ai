import type { OneShotAgentInput, ProviderConfig, ProviderDetectionResult, RunCommandInput, StartAgentInput, StartProcessInput } from '../../shared/types';

export interface AgentProvider {
  id: string;
  displayName: string;
  config: ProviderConfig;
  detect(): Promise<ProviderDetectionResult>;
  buildStartCommand(input: StartAgentInput): StartProcessInput;
  buildOneShotCommand?(input: OneShotAgentInput): RunCommandInput;
}

export function renderTemplate(template: string[], values: Record<string, string>): string[] {
  return template.map((part) =>
    Object.entries(values).reduce((acc, [key, value]) => acc.split(`{${key}}`).join(value), part),
  );
}
