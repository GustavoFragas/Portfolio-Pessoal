import { ArrowDownRight } from 'lucide-react';
import { m } from 'motion/react';
import { usePortfolioContent } from '../LocaleContext';
import ChannelIcon from './ChannelIcon';
import HeroEvidenceStage from './HeroEvidenceStage';

export default function Hero() {
  const { content } = usePortfolioContent();
  const { profile, ui } = content;

  return (
    <section id="home" className="hero-section">
      <div className="section-shell hero-grid">
        <m.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="status-line"><span aria-hidden="true" /> {profile.officialTitle} · {profile.location}</p>
          <div className="hero-greeting-row">
            <span className="hero-mobile-avatar" aria-hidden="true">
              <img
                src={profile.image}
                alt=""
                width="1200"
                height="1600"
                decoding="async"
              />
            </span>
            <p className="hero-greeting">{ui.hero.greeting}</p>
          </div>
          <h1>{profile.headline}</h1>
          <p className="hero-lead">{profile.summary}</p>
          <div className="hero-proof" aria-label={ui.hero.proofLabel}>
            {ui.hero.proofTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="hero-actions">
            <a className="button button--primary" href="#cases">{ui.hero.primaryCta} <ArrowDownRight aria-hidden="true" /></a>
            <a className="button button--secondary" href={`mailto:${profile.email}`}>{ui.hero.emailCta} <ChannelIcon channel="email" /></a>
          </div>
          <div className="hero-links" aria-label={ui.hero.externalLinksLabel}>
            <a href={profile.gitHub} target="_blank" rel="noopener noreferrer"><ChannelIcon channel="github" /> GitHub</a>
            <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer"><ChannelIcon channel="linkedin" /> LinkedIn</a>
          </div>
        </m.div>
        <m.div
          className="hero-visual"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroEvidenceStage />
        </m.div>
      </div>
    </section>
  );
}
