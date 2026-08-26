import { isPortfolioLocale, type PortfolioLocale } from './data/portfolioLocales';

const STORAGE_KEY = 'gustavo-portfolio-locale';

export function readInitialLocale(): PortfolioLocale {
  const queryLocale = new URL(window.location.href).searchParams.get('lang');
  if (isPortfolioLocale(queryLocale)) return queryLocale;

  try {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (isPortfolioLocale(storedLocale)) return storedLocale;
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }

  return 'pt';
}

export function persistLocale(locale: PortfolioLocale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // The URL remains the shareable source of truth when storage is blocked.
  }
}
