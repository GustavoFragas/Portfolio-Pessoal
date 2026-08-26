import { Component, StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/mona-sans'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App.tsx'
import { LocaleProvider } from './LocaleProvider.tsx'
import { portfolioLocales } from './data/portfolioLocales.ts'
import { readInitialLocale } from './localeRuntime.ts'

class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      const fatal = portfolioLocales[readInitialLocale()].ui.fatal

      return (
        <main className="fatal-fallback">
          <p className="section-kicker">{fatal.kicker}</p>
          <h1>{fatal.title}</h1>
          <p>{fatal.description}</p>
          <a className="button button--primary" href={window.location.href}>{fatal.action}</a>
        </main>
      )
    }

    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </AppErrorBoundary>
  </StrictMode>,
)
