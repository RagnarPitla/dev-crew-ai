import type { GhIssue, Project, ProviderConfig } from '../shared/types';

interface Props {
  project: Project;
  issues: GhIssue[];
  providers: ProviderConfig[];
}

export function ProjectSidebar({ project, issues, providers }: Props) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">DC</div>
        <div>
          <strong>Dev Crew AI</strong>
          <span>Local-first agent lanes</span>
        </div>
      </div>

      <section className="panel">
        <h2>Project</h2>
        <strong>{project.name}</strong>
        <small>{project.githubOwner}/{project.githubRepo}</small>
        <small>{project.rootPath}</small>
      </section>

      <section className="panel">
        <h2>Open Issues</h2>
        {issues.map((issue) => (
          <div className="issue-row" key={issue.number}>
            <span>#{issue.number}</span>
            <p>{issue.title}</p>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Providers</h2>
        {providers.map((provider) => (
          <div className="provider-pill" key={provider.id}>{provider.name}</div>
        ))}
      </section>
    </aside>
  );
}
