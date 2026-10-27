import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';

export default function Certificates() {
  const { content } = usePortfolioContent();
  const { credentials, ui } = content;
  const copy = ui.certificates;
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section id="credenciais" className="section credentials" aria-labelledby="credentials-title">
      <div className="section__inner">
        <header className="section__head">
          <div>
            <p className="kicker">{copy.kicker}</p>
            <h2 id="credentials-title">{copy.title}</h2>
          </div>
          <p className="section__intro">{copy.hint}</p>
        </header>
        <ul className="cred-grid">
          {credentials.map((item) => {
            const isFlipped = flipped === item.name;
            const isPdf = item.url.endsWith('.pdf');
            return (
              <li className="cred" key={item.issuer + item.name} data-flipped={isFlipped}>
                <div className="cred__card">
                  <div className="cred__face cred__front">
                    {item.art ? (
                      <img src={item.art} alt={`${copy.badge}: ${item.name}`} loading="lazy" decoding="async" width={600} height={600} />
                    ) : (
                      <span className="cred__type" aria-hidden="true">{item.issuer}</span>
                    )}
                  </div>
                  <div className="cred__face cred__back">
                    <p className="cred__issuer">{copy.issuedBy} {item.issuer}</p>
                    <h3>{item.name}</h3>
                  </div>
                </div>
                <button
                  className="cred__toggle"
                  type="button"
                  aria-pressed={isFlipped}
                  aria-label={`${copy.flip}: ${item.name}`}
                  onClick={() => setFlipped(isFlipped ? null : item.name)}
                />
                {item.url && (
                  <a className="cred__link" href={item.url} target="_blank" rel="noopener noreferrer">
                    {isPdf ? copy.openPdf : copy.open} <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
