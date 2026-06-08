import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const packageJson = JSON.parse(readFileSync('package.json', 'utf-8')) as {
  main: string;
  scripts: Record<string, string>;
  build: { files: string[]; win: { target: string }; mac: { target: string } };
};

describe('desktop packaging config', () => {
  it('points packaged Electron builds at electron-vite output', () => {
    expect(packageJson.main).toBe('out/main/index.js');
    expect(packageJson.build.files).toContain('out/**/*');
  });

  it('keeps developer smoke testing available as a documented npm script', () => {
    expect(packageJson.scripts['smoke:electron']).toBe('npm run build && node scripts/electron-smoke.cjs');
    expect(packageJson.scripts['smoke:packaged']).toBe('node scripts/electron-packaged-smoke.cjs');
  });

  it('packages Windows and macOS desktop artifacts', () => {
    expect(packageJson.build.win.target).toBe('nsis');
    expect(packageJson.build.mac.target).toBe('dmg');
  });
});
