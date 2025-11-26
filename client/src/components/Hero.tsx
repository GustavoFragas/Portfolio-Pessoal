import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { smoothScrollTo } from '../utils/smoothScroll';
import type { Profile } from '../types';

interface HeroProps {
  profile: Profile | null;
}

export default function Hero({ profile }: HeroProps) {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = profile?.role || 'Desenvolvedor de Software';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [fullText]);

  if (!profile) return null;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 hover:scale-105 transition-transform duration-300">
            <img 
              src="/images/profile.jpg" 
              alt={profile.name}
              className="w-full h-full rounded-full object-cover object-center"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {profile.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-gradient font-semibold mb-6 h-10">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            {profile.bio}
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#projects');
            }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Ver Projetos
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#contact');
            }}
            className="px-8 py-3 border border-gray-600 rounded-lg font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Contato
          </a>
        </div>

        <div className="flex gap-6 justify-center text-2xl mb-6">
          <a
            href={profile.gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 hover:scale-110 transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={profile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 hover:scale-110 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://wa.me/5511980192710"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500 hover:scale-110 transition-all duration-300"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/fragas_gustavo/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 hover:scale-110 transition-all duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        <p className="text-gray-400 text-sm">
          📧 {profile.email}
        </p>
      </div>
    </section>
  );
}
