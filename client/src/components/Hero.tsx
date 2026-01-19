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
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-16 md:py-20">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="mb-6 md:mb-8">
          <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50">
            <img 
              src="/images/profile.jpg" 
              alt={profile.name}
              className="w-full h-full rounded-full object-cover object-center"
            />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 px-2">
            {profile.name}
          </h1>
          <h2 className="text-lg md:text-2xl lg:text-3xl text-gradient font-semibold mb-4 md:mb-6 h-8 md:h-10 px-2">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto mb-6 md:mb-8 px-4 leading-relaxed">
            {profile.bio}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8 px-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#projects');
            }}
            className="px-6 md:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 cursor-pointer text-sm md:text-base"
          >
            Ver Projetos
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#contact');
            }}
            className="px-6 md:px-8 py-3 border border-gray-600 rounded-lg font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer text-sm md:text-base"
          >
            Contato
          </a>
        </div>

        <div className="flex gap-5 md:gap-6 justify-center text-xl md:text-2xl mb-4 md:mb-6">
          <a
            href={profile.gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 hover:scale-110 transition-all duration-300 p-2"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={profile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 hover:scale-110 transition-all duration-300 p-2"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://wa.me/5511980192710"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500 hover:scale-110 transition-all duration-300 p-2"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/fragas_gustavo/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 hover:scale-110 transition-all duration-300 p-2"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        <p className="text-gray-400 text-xs md:text-sm px-4 break-all">
          📧 {profile.email}
        </p>
      </div>
    </section>
  );
}
