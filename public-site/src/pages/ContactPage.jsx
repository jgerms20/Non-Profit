import { useState } from 'react'
import { MapPin, Users, Handshake, CheckCircle } from 'lucide-react'
import PageHero from '../components/PageHero'

// lucide-react does not export HandHeart — use a heart-with-hands substitute
function HandHeartIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11 14H4a2 2 0 0 1 0-4h2.5" />
      <path d="M16 10h3.5a2 2 0 0 1 0 4H17" />
      <path d="M12 6c0-1.7 1.3-3 3-3s3 1.3 3 3c0 2.4-3 5-3 5s-3-2.6-3-5Z" />
      <path d="M6 6c0-1.7 1.3-3 3-3s3 1.3 3 3c0 2.4-3 5-3 5S6 8.4 6 6Z" />
    </svg>
  )
}

const involvementCards = [
  {
    icon: MapPin,
    title: 'Request a Workshop',
    description:
      'Want SCAiL to host an AI literacy workshop in your community? We bring everything — all you need is a room and people who want to learn.',
    email: 'workshops@scail.org',
    emailLabel: 'Email',
  },
  {
    icon: Users,
    title: 'Join Our Advisory Network',
    description:
      'Our founding board is in place — now we\'re building an advisory network of experts in AI, education, law, and community development.',
    email: 'board@scail.org',
    emailLabel: 'Email',
  },
  {
    icon: HandHeartIcon,
    title: 'Volunteer',
    description:
      'Help us run workshops, mentor youth, or spread the word. Every hour makes a difference.',
    email: 'volunteer@scail.org',
    emailLabel: 'Email',
  },
  {
    icon: Handshake,
    title: 'Partner With Us',
    description:
      'Organizations, companies, and government agencies — let\'s work together to close the AI divide.',
    email: 'partnerships@scail.org',
    emailLabel: 'Email',
  },
]

export default function ContactPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div>
      {/* Hero Header */}
      <PageHero
        title="Get"
        accent="Involved"
        subtitle="There are many ways to support SCAiL"
      />

      {/* Ways to Get Involved */}
      <section className="py-16 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Ways to Get Involved</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {involvementCards.map(({ icon: Icon, title, description, email: cardEmail, emailLabel }) => (
              <div
                key={title}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-brand-navy flex items-center justify-center">
                    <Icon className="h-5 w-5 text-brand-gold" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{title}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{emailLabel}: </span>
                  <a
                    href={`mailto:${cardEmail}`}
                    className="text-brand-teal hover:underline"
                  >
                    {cardEmail}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate / Support */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Support Our Mission</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              SCAiL is applying for 501(c)(3) tax-exempt status. In the meantime, your support
              helps us reach more communities across South Carolina.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 italic">
              Tax-exempt status pending. Donations will be tax-deductible once approved.
            </p>
            <a
              href="mailto:donate@scail.org"
              className="inline-block bg-brand-navy text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Contact Us About Giving
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Contact Info</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
            <ul className="space-y-4 text-slate-700 dark:text-slate-300">
              <li className="flex gap-2">
                <span className="font-medium text-slate-900 dark:text-white w-44 flex-shrink-0">General Inquiries:</span>
                <a href="mailto:info@scail.org" className="text-brand-teal hover:underline">
                  info@scail.org
                </a>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-slate-900 dark:text-white w-44 flex-shrink-0">Location:</span>
                <span>South Carolina, USA</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-slate-900 dark:text-white w-44 flex-shrink-0">Follow us:</span>
                <a href="https://x.com/SCAiLorg" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">@SCAiLorg</a>
              </li>
            </ul>
            <p className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
              We typically respond within 48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-brand-navy dark:bg-slate-950 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
          <p className="text-slate-300 dark:text-slate-400 mb-8">
            Get monthly updates on SCAiL workshops, programs, and community impact.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-brand-teal/40 bg-brand-teal/10 px-6 py-4 text-brand-teal">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium text-left">
                You&apos;re on the list! We&apos;ll keep you posted on workshops, programs, and community impact.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                if (email) {
                  setEmail('')
                  setSubscribed(true)
                }
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-gold text-brand-navy font-semibold rounded-xl hover:bg-brand-gold-light transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}
