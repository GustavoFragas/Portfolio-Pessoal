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
        <header className="cred-head">
          <div>
            <p className="kicker">{copy.kicker}</p>
            <h2 id="credentials-title">{copy.title}</h2>
          </div>
          <p>
            <span className="pointer-fine">{copy.hintPointer}</span>
            <span className="pointer-coarse">{copy.hintTouch}</span>
          </p>
        </header>
        <ul className="cred-grid">
          {credentials.map((item) => {
            const isFlipped = flipped === item.name;
            const isPdf = item.url.endsWith('.pdf');
            return (
              <li className="cred" key={item.issuer + item.name} data-flipped={isFlipped}>
                <div className="cred__card">
                  {/* Same front for every credential: an emblem (issuer art, or a lettered plate when there is none) over the issuer. */}
                  <div className="cred__face cred__front">
                    <span className="cred__emblem">
                      {item.art ? (
                        <img src={item.art} alt={`${copy.badge}: ${item.name}`} loading="lazy" decoding="async" width={600} height={600} />
                      ) : (
                        <span className={`cred__plate ${item.issuer.length <= 4 ? 'cred__plate--short' : ''}`} aria-hidden="true">
                          {item.issuer}
                        </span>
                      )}
                    </span>
                    <span className="cred__caption" aria-hidden="true">{item.issuer}</span>
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
