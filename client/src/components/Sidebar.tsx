import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';
import { supportedLocales, type PortfolioLocale } from '../data/portfolioLocales';

type LanguageSwitcherProps = {
  className: string;
  label: string;
  locale: PortfolioLocale;
  onSelect: (locale: PortfolioLocale) => void;
};

function LanguageSwitcher({ className, label, locale, onSelect }: LanguageSwitcherProps) {
  return (
    <div className={`language-switcher ${className}`} role="group" aria-label={label}>
      {supportedLocales.map((option) => (
        <button
          type="button"
          key={option}
          aria-pressed={locale === option}
          onClick={() => onSelect(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { content, locale, selectLocale } = usePortfolioContent();
  const { navItems, profile, ui } = content;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a className="brand-lockup" href="#home" onClick={closeMenu}>
          <span>{profile.name}</span>
          <small>{profile.displayTitle}</small>
        </a>
        <nav className="topbar__nav" aria-label={ui.navigation.mainLabel}>
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <LanguageSwitcher
          className="topbar__languages"
          label={ui.navigation.languageLabel}
          locale={locale}
          onSelect={selectLocale}
        />
        <a className="button button--small button--primary topbar__contact" href="#contato">{ui.navigation.contact}</a>
        <button
          className="icon-button topbar__menu"
          type="button"
          aria-label={isOpen ? ui.navigation.closeMenu : ui.navigation.openMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`} id="mobile-navigation">
        <nav aria-label={ui.navigation.mobileLabel}>
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
          <LanguageSwitcher
            className="mobile-nav__languages"
            label={ui.navigation.languageLabel}
            locale={locale}
            onSelect={(nextLocale) => {
              selectLocale(nextLocale);
              closeMenu();
            }}
          />
          <a className="button button--primary" href="#contato" onClick={closeMenu}>{ui.navigation.directContact}</a>
        </nav>
      </div>
    </header>
  );
}
