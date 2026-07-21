import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Github,
  Youtube,
  Mail,
  ArrowUpRight,
} from 'lucide-react'

// ─── Public site navigation ──────────────────────────────────────────────────
const navLinks = [
  { to: '/site', label: 'Home', end: true },
  { to: '/site/academy', label: 'Academy' },
  { to: '/site/show', label: 'The Show' },
  { to: '/site/institute', label: 'Institute' },
  { to: '/site/events', label: 'Events' },
  { to: '/site/newsletter', label: 'Newsletter' },
  { to: '/site/about', label: 'About' },
]

// ─── Brand wordmark ──────────────────────────────────────────────────────────
function Wordmark({ className = '' }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      SC<span className="text-[#D4A843]">Ai</span>L
    </span>
  )
}

// ─── Top navigation bar ──────────────────────────────────────────────────────
function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F172A]/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/site" className="flex items-center gap-2 text-white">
            <Wordmark className="text-2xl" />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#D4A843]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/site/get-involved"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#D4A843] px-4 py-2 text-sm font-semibold text-[#0F172A] hover:bg-[#e0b856] transition-colors"
            >
              Get Involved
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0F172A] border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#D4A843] bg-white/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/site/get-involved"
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#D4A843] px-4 py-3 text-sm font-semibold text-[#0F172A]"
            >
              Get Involved
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
const footerColumns = [
  {
    heading: 'Explore',
    links: [
      { to: '/site/academy', label: 'Academy' },
      { to: '/site/show', label: 'The Palmetto AI Show' },
      { to: '/site/institute', label: 'Institute' },
      { to: '/site/events', label: 'Events' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { to: '/site/newsletter', label: 'Newsletter' },
      { to: '/site/get-involved', label: 'Get Involved' },
      { to: '/site/about', label: 'About Us' },
      { to: '/', label: 'Team Tracker →' },
    ],
  },
]

function SiteFooter() {
  return (
    <footer className="bg-[#0F172A] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Wordmark className="text-2xl text-white" />
            <p className="mt-3 max-w-sm text-sm text-slate-400 leading-relaxed">
              South Carolina AI Literacy. Closing the AI divide across all 46
              counties — through education, media, research, and community.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 The SCAiL Initiative · A South Carolina nonprofit
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-3 h-3 text-[#D4A843]" />
            <span>Built and kept current by the SCAiL Content Engine</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Public layout shell ─────────────────────────────────────────────────────
export default function PublicLayout() {
  const { pathname } = useLocation()

  // Scroll to top on route change within the public site
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
