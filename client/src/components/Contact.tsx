import { usePortfolioContent } from '../LocaleContext';
import ChannelIcon from './ChannelIcon';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const { content } = usePortfolioContent();
  const { profile, ui } = content;

  return (
    <section id="contato" className="section contact-section">
      <ScrollReveal className="section-shell contact-grid" direction="up">
        <div>
          <p className="section-kicker">{ui.contact.kicker}</p>
          <h2>{ui.contact.title}</h2>
          <p>{profile.location}. {ui.contact.description}</p>
        </div>
        <div className="contact-actions">
          <a href={profile.gitHub} target="_blank" rel="noopener noreferrer"><ChannelIcon channel="github" /> GitHub</a>
          <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer"><ChannelIcon channel="linkedin" /> LinkedIn</a>
          <a href={`mailto:${profile.email}`}><ChannelIcon channel="email" /> Email</a>
          <a href={profile.phoneLink} target="_blank" rel="noopener noreferrer"><ChannelIcon channel="whatsapp" /> WhatsApp</a>
        </div>
      </ScrollReveal>
    </section>
  );
}
