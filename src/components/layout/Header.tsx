import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="glass sticky top-0 z-40 border-x-0 border-t-0 !rounded-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-display font-bold text-white"
            style={{ background: 'linear-gradient(135deg, var(--color-violet-deep), var(--color-magenta))' }}
          >
            M
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">MeetMind</span>
        </Link>
        {isHome ? (
          <nav className="hidden gap-8 text-sm text-ink-faint sm:flex">
            <a href="#how-it-works" className="transition-colors hover:text-ink">How it works</a>
            <a href="#features" className="transition-colors hover:text-ink">Features</a>
          </nav>
        ) : (
          <Link to="/analyze" className="text-sm font-medium text-ink-faint transition-colors hover:text-ink">
            New meeting
          </Link>
        )}
      </div>
    </header>
  )
}