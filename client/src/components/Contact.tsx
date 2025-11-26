import { useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import type { Profile } from '../types';

interface ContactProps {
  profile: Profile | null;
}

export default function Contact({ profile }: ContactProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!profile) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-800/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">
          Vamos <span className="text-gradient">Conversar?</span>
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Estou sempre aberto a novas oportunidades e colaborações
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <a
            href={profile.gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
          >
            <FaGithub className="text-4xl" />
            <span className="font-semibold">GitHub</span>
          </a>
          <a
            href={profile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
          >
            <FaLinkedin className="text-4xl text-blue-500" />
            <span className="font-semibold">LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/fragas_gustavo/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
          >
            <FaInstagram className="text-4xl text-pink-500" />
            <span className="font-semibold">Instagram</span>
          </a>
          <a
            href="https://wa.me/5511980192710"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
          >
            <FaWhatsapp className="text-4xl text-green-500" />
            <span className="font-semibold">WhatsApp</span>
          </a>
        </div>

        <div className="mt-8 relative inline-block">
          <button
            onClick={copyEmail}
            className="font-mono text-blue-400 hover:text-blue-300 transition-colors cursor-pointer text-lg"
          >
            {profile.email}
          </button>
          {showTooltip && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
              Copiado
            </div>
          )}
        </div>

        <div className="text-gray-400 mt-6">
          <p>{profile.location}</p>
        </div>
      </div>
    </section>
  );
}
