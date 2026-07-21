import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-sm font-display font-bold text-white">
            M
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">MeetMind</span>
        </Link>
        {isHome ? (
          <nav className="hidden gap-8 text-sm text-ink-500 sm:flex">
            <a href="#how-it-works" className="transition-colors hover:text-ink">How it works</a>
            <a href="#features" className="transition-colors hover:text-ink">Features</a>
          </nav>
        ) : (
          <Link to="/analyze" className="text-sm font-medium text-ink-500 transition-colors hover:text-ink">
            New meeting
          </Link>
        )}
      </div>
    </header>
  )
}