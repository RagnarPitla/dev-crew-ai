import type { RunCommandInput } from '../../shared/types';

export type SupportedDesktopPlatform = 'win32' | 'darwin' | 'linux';

export interface PlatformCommandPlan extends RunCommandInput {
  platform: SupportedDesktopPlatform;
  description: string;
}

export function getSupportedPlatform(platform: NodeJS.Platform = process.platform): SupportedDesktopPlatform {
  if (platform === 'win32' || platform === 'darwin' || platform === 'linux') {
    return platform;
  }
  return 'linux';
}

export function buildGitHubAuthLoginCommand(platform: NodeJS.Platform = process.platform): PlatformCommandPlan {
  const supportedPlatform = getSupportedPlatform(platform);
  return {
    platform: supportedPlatform,
    command: 'gh',
    args: ['auth', 'login', '--web', '--hostname', 'github.com', '--git-protocol', 'https'],
    description: `Login to GitHub with gh CLI using the browser on ${platformLabel(supportedPlatform)}.`,
  };
}

export function buildOpenUrlCommand(url: string, platform: NodeJS.Platform = process.platform): PlatformCommandPlan {
  const supportedPlatform = getSupportedPlatform(platform);
  if (supportedPlatform === 'win32') {
    return {
      platform: supportedPlatform,
      command: 'cmd.exe',
      args: ['/d', '/s', '/c', 'start', '', url],
      description: `Open ${url} in the default browser on Windows.`,
    };
  }
  if (supportedPlatform === 'darwin') {
    return {
      platform: supportedPlatform,
      command: 'open',
      args: [url],
      description: `Open ${url} in the default browser on macOS.`,
    };
  }
  return {
    platform: supportedPlatform,
    command: 'xdg-open',
    args: [url],
    description: `Open ${url} in the default browser on Linux.`,
  };
}

export function buildCopilotSuggestCommand(
  prompt: string,
  platform: NodeJS.Platform = process.platform,
): PlatformCommandPlan {
  const supportedPlatform = getSupportedPlatform(platform);
  return {
    platform: supportedPlatform,
    command: 'gh',
    args: ['copilot', 'suggest', '-t', 'shell', prompt],
    description: `Ask GitHub Copilot CLI for a shell suggestion on ${platformLabel(supportedPlatform)}.`,
  };
}

function platformLabel(platform: SupportedDesktopPlatform): string {
  if (platform === 'win32') return 'Windows';
  if (platform === 'darwin') return 'macOS';
  return 'Linux';
}
