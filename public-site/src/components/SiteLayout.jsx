import { useState, useEffect } from 'react'
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import PalmettoTree from './PalmettoTree'
import SCCrescent from './SCCrescent'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/team', label: 'Team' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Get Involved' },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-brand-navy-light to-brand-navy border border-white/20 flex items-center justify-center overflow-hidden group-hover:border-brand-gold/50 transition-colors">
        <SCCrescent className="absolute top-1 left-1.5 h-2 w-2 text-brand-gold" />
        <PalmettoTree className="h-6 w-auto text-brand-teal mt-1" />
      </div>
      <span className="text-white font-bold text-xl tracking-tight">
        SC<span className="text-brand-gold">Ai</span>L
      </span>
    </Link>
  )
}

export default function SiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const { pathname } = useLocation()

  // Scroll to top on route change (hash router keeps scroll otherwise)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMobileOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-brand-navy/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Nav + Theme Toggle */}
            <div className="flex items-center gap-2">
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Theme toggle */}
              <button
                onClick={toggle}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-slate-300 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative bg-brand-navy-deep text-white overflow-hidden">
        {/* Subtle palmetto watermark */}
        <div className="absolute -bottom-8 -right-4 text-white/[0.04] pointer-events-none" aria-hidden="true">
          <PalmettoTree className="h-72 w-auto" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                The SCAiL Initiative — South Carolina AI Literacy. Free, hands-on AI
                education for every community in the Palmetto State.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">Navigate</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-slate-300 hover:text-brand-teal transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">Programs</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><Link to="/programs" className="hover:text-brand-teal transition-colors">AI 101 Workshop</Link></li>
                <li><Link to="/programs" className="hover:text-brand-teal transition-colors">AI for Your Job</Link></li>
                <li><Link to="/programs" className="hover:text-brand-teal transition-colors">Youth AI Lab</Link></li>
                <li><Link to="/programs" className="hover:text-brand-teal transition-colors">Train the Trainer</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="mailto:info@scail.org" className="hover:text-brand-teal transition-colors">info@scail.org</a></li>
                <li>Columbia, South Carolina</li>
                <li><a href="https://x.com/SCAiLorg" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors">@SCAiLorg</a></li>
                <li className="pt-2">
                  <span className="text-xs text-slate-500">
                    SC nonprofit corporation · 501(c)(3) application in progress
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} The SCAiL Initiative — South Carolina AI Literacy. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              Built with purpose in South Carolina
              <SCCrescent className="h-3 w-3 text-brand-gold/60" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
