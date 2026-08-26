import { createContext, useContext } from 'react';
import type { PortfolioContent, PortfolioLocale } from './data/portfolioLocales';

export type LocaleContextValue = {
  locale: PortfolioLocale;
  content: PortfolioContent;
  selectLocale: (locale: PortfolioLocale) => void;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function usePortfolioContent() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('usePortfolioContent must be used within LocaleProvider');
  return context;
}
