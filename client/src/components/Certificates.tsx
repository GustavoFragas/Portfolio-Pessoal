import { Award, ExternalLink } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';
import ScrollReveal from './ScrollReveal';

export default function Certificates() {
  const { content } = usePortfolioContent();
  const { credentials, ui } = content;

  return (
    <section id="credenciais" className="section section--dark section--tight">
      <ScrollReveal className="section-shell" direction="left">
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-kicker">{ui.certificates.kicker}</p>
            <h2>{ui.certificates.title}</h2>
          </div>
          <p>{ui.certificates.description}</p>
        </div>
        <div className="credential-rail">
          {credentials.map(([issuer, name, url]) => (
            <a className="credential-item" href={url} target="_blank" rel="noopener noreferrer" key={issuer + name}>
              <Award aria-hidden="true" />
              <span>{issuer}</span>
              <strong>{name}</strong>
              <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
