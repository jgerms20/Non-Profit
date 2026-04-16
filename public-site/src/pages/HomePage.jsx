import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Linkedin, ArrowRight, MapPin } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const phases = [
  {
    num: '01',
    title: 'AI Literacy\nNonprofit',
    description: 'Teach communities about AI. Build trust, generate grant revenue, create proof of impact.',
    color: '#1B365D',
  },
  {
    num: '02',
    title: 'Community\nIncubator',
    description: 'Turn educated members into founders. Run hackathons, cohorts, demo days.',
    color: '#D4A843',
  },
  {
    num: '03',
    title: 'Investment\nFund',
    description: 'Fund the strongest companies. Generate returns, reinvest in Phase 1.',
    color: '#2EC4B6',
  },
]

const boardMembers = [
  {
    name: 'Joshua German',
    title: 'Founder & President',
    color: '#1B365D',
    initials: 'JG',
    linkedin: 'https://www.linkedin.com/in/joshua-german/',
  },
  {
    name: 'Janel Moore',
    title: 'Board Member, Treasurer',
    color: '#D4A843',
    initials: 'JM',
    linkedin: 'https://www.linkedin.com/in/janel-moore/',
  },
  {
    name: 'Kinsey Meggett',
    title: 'Board Member, Secretary',
    color: '#2EC4B6',
    initials: 'KM',
    linkedin: 'https://www.linkedin.com/in/kinsey-meggett-265a2b9b/',
  },
]

const audiences = [
  {
    num: '01',
    title: 'Communities',
    description: 'Rural and underserved communities across South Carolina',
  },
  {
    num: '02',
    title: 'Educators',
    description: 'Teachers and curriculum leaders in K-12 and higher ed',
  },
  {
    num: '03',
    title: 'Founders',
    description: 'First-time founders and entrepreneurs who need AI skills',
  },
  {
    num: '04',
    title: 'Youth',
    description: 'Ages 14–22 looking to build AI skills for their future',
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="antialiased">
      {/* Fixed Header */}
      <header className="fixed top-0 w-full h-24 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <h1>
            <Link to="/" className="text-2xl font-bold text-brand-navy">
              SCA<span className="text-brand-gold">i</span>L
            </Link>
          </h1>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#mission" className="text-sm hover:text-brand-teal transition-colors">
              Mission
            </a>
            <a href="#team" className="text-sm hover:text-brand-teal transition-colors">
              Team
            </a>
            <Link to="/contact" className="text-sm hover:text-brand-teal transition-colors">
              Get Involved
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-7xl md:text-8xl lg:text-8xl font-normal mb-8 leading-tight text-brand-navy">
            Build wealth<br />and knowledge
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            The SCAiL Initiative teaches AI literacy across South Carolina, then incubates founders, then funds the best companies. Three phases. One mission: opportunity for every community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-black text-white rounded-lg hover:bg-slate-900 transition-colors font-medium"
            >
              Get Involved
            </Link>
            <a
              href="#mission"
              className="px-8 py-4 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* The Three Phases */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal text-slate-900 mb-6">
              The flywheel
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Three interconnected phases that build on each other
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {phases.map((phase, idx) => (
              <div
                key={phase.num}
                className="border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div
                  className="text-xs font-bold mb-4 tracking-widest"
                  style={{ color: phase.color }}
                >
                  • PHASE {phase.num}
                </div>
                <h3 className="text-2xl font-normal mb-4 leading-tight whitespace-pre-line text-slate-900">
                  {phase.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Team */}
      <section id="team" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal text-slate-900 mb-6">
              Built by founders
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Three leaders bringing decades of experience in business, finance, and community development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {boardMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div
                  className="h-32 w-32 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-md"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{member.title}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-brand-teal hover:text-brand-navy transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal text-slate-900 mb-6">
              For everyone
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              SCAiL serves all types of people across South Carolina
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {audiences.map((audience) => (
              <div key={audience.num} className="bg-black text-white p-8 rounded-xl">
                <p className="text-xs font-bold mb-3 tracking-widest opacity-60">• USER GROUP {audience.num}</p>
                <h3 className="text-2xl font-normal mb-3">{audience.title}</h3>
                <p className="text-white/80">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-4">Get Involved</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight text-slate-900">
                Join the movement
              </h2>
            </div>
            <div>
              {submitted ? (
                <div className="flex items-center justify-center h-full bg-white border border-slate-200 rounded-lg p-8 text-center">
                  <div>
                    <p className="text-lg font-semibold text-brand-teal mb-2">✓ Thanks for signing up!</p>
                    <p className="text-sm text-slate-600">We'll be in touch soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-slate-900 transition-colors font-medium"
                  >
                    Stay Updated
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="font-medium">SCAiL Initiative</span>
              <span>–</span>
              <a href="mailto:hello@scail.org" className="hover:text-slate-900">
                hello@scail.org
              </a>
              <span>–</span>
              <span>South Carolina</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/scail-initiative/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@scail.org"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
