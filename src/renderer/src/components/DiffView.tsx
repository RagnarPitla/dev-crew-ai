import type { Lane } from '../shared/types';

interface Props {
  lane: Lane;
}

export function DiffView({ lane }: Props) {
  return (
    <section className="panel diff-view">
      <h3>Diff preview</h3>
      <p>Diffs for <code>{lane.branchName}</code> will appear here after the lane edits files.</p>
    </section>
  );
}
