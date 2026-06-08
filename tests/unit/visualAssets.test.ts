import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = join(__dirname, '..', '..');

const requiredVisuals = [
  'assets/dev-crew-ai-onboarding-flow.svg',
  'assets/dev-crew-ai-action-gates-flow.svg',
  'assets/dev-crew-ai-terminal-pane-grid.svg',
  'artifacts/dev-crew-ai-onboarding-flow.html',
  'artifacts/dev-crew-ai-action-gates-flow.html',
  'artifacts/dev-crew-ai-terminal-pane-grid.html',
];

describe('GitHub visual adoption assets', () => {
  it('keeps core SVG and HTML flow artifacts in the repository', () => {
    for (const relativePath of requiredVisuals) {
      expect(existsSync(join(root, relativePath)), `${relativePath} should exist`).toBe(true);
    }
  });

  it('links visual assets and rendered HTML previews from the README', () => {
    const readme = readFileSync(join(root, 'README.md'), 'utf8');

    for (const relativePath of requiredVisuals) {
      expect(readme, `README should link ${relativePath}`).toContain(relativePath);
    }

    expect(readme).toContain('https://raw.githack.com/RagnarPitla/dev-crew-ai/main/artifacts/dev-crew-ai-onboarding-flow.html');
    expect(readme).toContain('https://raw.githack.com/RagnarPitla/dev-crew-ai/main/artifacts/dev-crew-ai-action-gates-flow.html');
    expect(readme).toContain('https://raw.githack.com/RagnarPitla/dev-crew-ai/main/artifacts/dev-crew-ai-terminal-pane-grid.html');
  });

  it('HTML artifacts are self-contained and mobile-friendly', () => {
    for (const relativePath of requiredVisuals.filter((path) => path.endsWith('.html'))) {
      const html = readFileSync(join(root, relativePath), 'utf8');
      expect(html).toContain('<!doctype html>');
      expect(html).toContain('name="viewport"');
      expect(html).toContain('clawpilotTheme');
      expect(html).toContain('--cp-bg');
      expect(html).toContain('Dev Crew AI');
    }
  });
});
