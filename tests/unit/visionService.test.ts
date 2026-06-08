import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { VisionService } from '../../src/main/services/visionService';

describe('VisionService', () => {
  it('detects VISION.md as the highest-priority project constitution', async () => {
    await withTempProject(async (root) => {
      await writeFile(join(root, 'README.md'), '# Readme fallback', 'utf8');
      await writeFile(join(root, 'AGENTS.md'), '# Agent rules', 'utf8');
      await writeFile(join(root, 'VISION.md'), '# Product Vision\nBuild the thing that builds the thing.', 'utf8');

      const vision = await new VisionService().detectProjectVision(root);

      expect(vision.found).toBe(true);
      expect(vision.source).toBe('VISION.md');
      expect(vision.content).toContain('Build the thing that builds the thing');
    });
  });

  it('falls back through AGENTS, CLAUDE, DEV_CREW, and README files', async () => {
    await withTempProject(async (root) => {
      await writeFile(join(root, 'README.md'), '# Readme fallback', 'utf8');
      await writeFile(join(root, 'DEV_CREW.md'), '# Dev Crew guide', 'utf8');
      await writeFile(join(root, 'CLAUDE.md'), '# Claude guide', 'utf8');
      await writeFile(join(root, 'AGENTS.md'), '# Agent constitution', 'utf8');

      const vision = await new VisionService().detectProjectVision(root);

      expect(vision.found).toBe(true);
      expect(vision.source).toBe('AGENTS.md');
      expect(vision.content).toContain('Agent constitution');
    });
  });

  it('returns a missing result when no project vision file exists', async () => {
    await withTempProject(async (root) => {
      const vision = await new VisionService().detectProjectVision(root);

      expect(vision.found).toBe(false);
      expect(vision.source).toBe('missing');
      expect(vision.content).toBe('');
    });
  });
});

async function withTempProject(run: (root: string) => Promise<void>): Promise<void> {
  const root = await mkdtemp(join(tmpdir(), 'dev-crew-vision-'));
  try {
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}
