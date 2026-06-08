import { DEV_CREW_BRAND } from '../../shared/brand';
import { AddProjectWizard } from './AddProjectWizard';

interface Props {
  onSelectDemo: () => void;
}

export function WelcomeScreen({ onSelectDemo }: Props) {
  return (
    <section className="welcome-screen">
      <div className="welcome-copy">
        <p className="eyebrow">Resume {DEV_CREW_BRAND.productName}</p>
        <h1>Bring your project. Spin up your dev crew.</h1>
        <p className="brand-byline">{DEV_CREW_BRAND.byline}</p>
        <p>
          Start with a GitHub repo, a local Git repo, or a plain folder. Dev Crew AI works locally first and can
          initialize Git so agent changes are trackable and reversible.
        </p>
      </div>
      <AddProjectWizard onOpenDemo={onSelectDemo} />
    </section>
  );
}
