import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { Lane, Project } from '../../shared/types';

export class InstructionService {
  async writeLaneInstructions(lane: Lane, project: Project): Promise<string> {
    const path = join(lane.worktreePath, 'DEV_CREW_LANE.md');
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, this.render(lane, project), 'utf8');
    return path;
  }

  render(lane: Lane, project: Project): string {
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
}
