import { Mail } from 'lucide-react';
import { siGithub, siWhatsapp } from 'simple-icons';

type Channel = 'github' | 'linkedin' | 'email' | 'whatsapp';

type ChannelIconProps = {
  channel: Channel;
};

export default function ChannelIcon({ channel }: ChannelIconProps) {
  if (channel === 'linkedin') {
    return <span className="channel-icon channel-icon--linkedin" aria-hidden="true">in</span>;
  }

  if (channel === 'email') {
    return <Mail className="channel-icon channel-icon--email" aria-hidden="true" />;
  }

  const icon = channel === 'github' ? siGithub : siWhatsapp;

  return (
    <svg
      className={`channel-icon channel-icon--${channel}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
