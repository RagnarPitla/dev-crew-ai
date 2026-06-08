import type { GhIssue, Project, ProviderConfig } from '../shared/types';
import { DEV_CREW_BRAND } from '../shared/brand';

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
          <strong>{DEV_CREW_BRAND.productName}</strong>
          <span>{DEV_CREW_BRAND.companyName}</span>
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
