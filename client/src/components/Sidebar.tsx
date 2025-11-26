import { useState } from 'react';
import { FaHome, FaUser, FaBriefcase, FaCode, FaGraduationCap, FaCertificate, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { smoothScrollTo } from '../utils/smoothScroll';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <FaHome />, label: 'Início', href: '#home' },
    { icon: <FaUser />, label: 'Sobre Mim', href: '#about' },
    { icon: <FaCode />, label: 'Habilidades', href: '#skills' },
    { icon: <FaBriefcase />, label: 'Projetos', href: '#projects' },
    { icon: <FaBriefcase />, label: 'Experiência', href: '#experience' },
    { icon: <FaGraduationCap />, label: 'Educação', href: '#education' },
    { icon: <FaCertificate />, label: 'Certificados', href: '#certificates' },
    { icon: <FaEnvelope />, label: 'Contato', href: '#contact' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-gradient">Gustavo Fragas</h2>
            <p className="text-sm text-gray-400 mt-1">Desenvolvedor</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-500">
            © 2025 Gustavo Fragas
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
