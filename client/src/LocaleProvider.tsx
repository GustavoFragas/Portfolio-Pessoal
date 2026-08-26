import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  portfolioLocales,
  type PortfolioLocale,
} from './data/portfolioLocales';
import { LocaleContext, type LocaleContextValue } from './LocaleContext';
import { persistLocale, readInitialLocale } from './localeRuntime';

function setMeta(selector: string, value: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value);
}

function getPublicUrl(locale: PortfolioLocale) {
  const url = new URL('/', window.location.origin);
  if (locale !== 'pt') url.searchParams.set('lang', locale);
  return url.toString();
}

function updateStructuredData(url: string, language: string, description: string) {
  const script = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
  if (!script?.textContent) return;

  try {
    const data = JSON.parse(script.textContent) as Record<string, unknown>;
    script.textContent = JSON.stringify({ ...data, url, inLanguage: language, description });
  } catch {
    // Keep the static, CSP-approved JSON-LD if a browser extension changes its contents.
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<PortfolioLocale>(readInitialLocale);
  const content = portfolioLocales[locale];

  const selectLocale = useCallback((nextLocale: PortfolioLocale) => {
    setLocale(nextLocale);

    const url = new URL(window.location.href);
    if (nextLocale === 'pt') url.searchParams.delete('lang');
    else url.searchParams.set('lang', nextLocale);
    window.history.replaceState(window.history.state, '', url);

    persistLocale(nextLocale);
  }, []);

  useEffect(() => {
    const { meta } = content.ui;
    const publicUrl = getPublicUrl(locale);

    document.documentElement.lang = meta.htmlLang;
    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:locale"]', meta.ogLocale);
    setMeta('meta[property="og:site_name"]', meta.siteName);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.socialDescription);
    setMeta('meta[property="og:url"]', publicUrl);
    setMeta('meta[property="og:image:alt"]', meta.socialImageAlt);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.socialDescription);
    setMeta('meta[name="twitter:image:alt"]', meta.socialImageAlt);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', publicUrl);
    updateStructuredData(publicUrl, meta.htmlLang, meta.description);
  }, [content, locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, content, selectLocale }),
    [content, locale, selectLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
