import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';
import type { ProjectVision, ProjectVisionSource } from '../../shared/types';

const visionPriority: Exclude<ProjectVisionSource, 'missing'>[] = [
  'VISION.md',
  'AGENTS.md',
  'CLAUDE.md',
  'DEV_CREW.md',
  'README.md',
];

export class VisionService {
  async detectProjectVision(rootPath: string, now = new Date().toISOString()): Promise<ProjectVision> {
    for (const source of visionPriority) {
      const path = join(rootPath, source);
      if (await fileExists(path)) {
        return {
          found: true,
          source,
          path,
          content: await readFile(path, 'utf8'),
          detectedAt: now,
        };
      }
    }

    return {
      found: false,
      source: 'missing',
      content: '',
      detectedAt: now,
    };
  }
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}
