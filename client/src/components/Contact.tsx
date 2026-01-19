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
    <section id="contact" className="py-16 md:py-20 px-4 bg-gray-800/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8">
          Vamos <span className="text-gradient">Conversar?</span>
        </h2>
        <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 px-4">
          Estou sempre aberto a novas oportunidades e colaborações
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
          <a
            href={profile.gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700"
          >
            <FaGithub className="text-2xl md:text-4xl" />
            <span className="font-semibold text-sm md:text-base">GitHub</span>
          </a>
          <a
            href={profile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700"
          >
            <FaLinkedin className="text-2xl md:text-4xl text-blue-500" />
            <span className="font-semibold text-sm md:text-base">LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/fragas_gustavo/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700"
          >
            <FaInstagram className="text-2xl md:text-4xl text-pink-500" />
            <span className="font-semibold text-sm md:text-base">Instagram</span>
          </a>
          <a
            href="https://wa.me/5511980192710"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700"
          >
            <FaWhatsapp className="text-2xl md:text-4xl text-green-500" />
            <span className="font-semibold text-sm md:text-base">WhatsApp</span>
          </a>
        </div>

        <div className="mt-6 md:mt-8 relative inline-block">
          <button
            onClick={copyEmail}
            className="font-mono text-blue-400 hover:text-blue-300 transition-colors cursor-pointer text-sm md:text-lg break-all px-4"
          >
            {profile.email}
          </button>
          {showTooltip && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
              Copiado
            </div>
          )}
        </div>

        <div className="text-gray-400 mt-4 md:mt-6 text-sm md:text-base">
          <p>{profile.location}</p>
        </div>
      </div>
    </section>
  );
}
