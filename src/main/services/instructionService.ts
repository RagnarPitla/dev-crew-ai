import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { Lane, Project, ProjectVision } from '../../shared/types';

export class InstructionService {
  async writeLaneInstructions(lane: Lane, project: Project, vision?: ProjectVision): Promise<string> {
    const path = join(lane.worktreePath, 'DEV_CREW_LANE.md');
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, this.render(lane, project, vision), 'utf8');
    return path;
  }

  render(lane: Lane, project: Project, vision?: ProjectVision): string {
    return `# Dev Crew AI Lane: ${lane.title}

## Mission

Work only on this lane's task: **${lane.title}**.

## Project

- Project: ${project.name}
- Root: ${project.rootPath}
- Worktree: ${lane.worktreePath}
- Branch: ${lane.branchName}
- Base branch: ${lane.baseBranch}
- GitHub issue: ${lane.linkedIssueNumber ?? 'none'}
- GitHub PR: ${lane.linkedPrNumber ?? 'none'}
${this.renderVisionSection(vision)}
## Rules

1. Stay inside this worktree.
2. Do not modify unrelated files.
3. Run tests or checks before reporting done.
4. Do not merge or force-push.
5. If another lane owns a conflicting file, stop and ask through the Dev Crew AI message bus.

## Done criteria

- Changes are implemented.
- Tests/checks are run or blockers are documented.
- Git diff is reviewable.
- PR can be created by the user from Dev Crew AI.
`;
  }

  private renderVisionSection(vision?: ProjectVision): string {
    if (!vision?.found) {
      return `
## Project Vision

- Source: none detected
- Note: Add VISION.md, AGENTS.md, CLAUDE.md, or DEV_CREW.md to give agents a project constitution.
`;
    }

    return `
## Project Vision

- Source: ${vision.source}
- Path: ${vision.path ?? 'unknown'}

${vision.content.trim()}
`;
  }
}
