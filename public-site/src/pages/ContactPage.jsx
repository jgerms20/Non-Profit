import { useState } from 'react'
import { MapPin, Users, Handshake } from 'lucide-react'

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
    title: 'Join Our Board',
    description:
      "We're recruiting founding board members with experience in law, finance, education, or community development.",
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

  return (
    <div>
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Get <span className="text-brand-gold">Involved</span>
          </h1>
          <p className="text-xl text-slate-300 font-light">
            There are many ways to support SCAiL
          </p>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Ways to Get Involved</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {involvementCards.map(({ icon: Icon, title, description, email: cardEmail, emailLabel }) => (
              <div
                key={title}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-brand-navy flex items-center justify-center">
                    <Icon className="h-5 w-5 text-brand-gold" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg">{title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
                <p className="text-sm text-slate-500 border-t border-slate-100 pt-3">
                  <span className="font-medium text-slate-700">{emailLabel}: </span>
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
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Support Our Mission</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <p className="text-slate-700 leading-relaxed mb-4">
              SCAiL is applying for 501(c)(3) tax-exempt status. In the meantime, your support
              helps us reach more communities across rural South Carolina.
            </p>
            <p className="text-sm text-slate-500 mb-8 italic">
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
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Contact Info</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <ul className="space-y-4 text-slate-700">
              <li className="flex gap-2">
                <span className="font-medium text-slate-900 w-44 flex-shrink-0">General Inquiries:</span>
                <a href="mailto:info@scail.org" className="text-brand-teal hover:underline">
                  info@scail.org
                </a>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-slate-900 w-44 flex-shrink-0">Location:</span>
                <span>South Carolina, USA</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-slate-900 w-44 flex-shrink-0">Follow us:</span>
                <span className="text-slate-500">@SCAiLorg</span>
              </li>
            </ul>
            <p className="mt-6 pt-6 border-t border-slate-100 text-sm text-slate-500">
              We typically respond within 48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
          <p className="text-slate-300 mb-8">
            Get monthly updates on SCAiL workshops, programs, and community impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <button
              type="button"
              className="px-6 py-3 bg-brand-gold text-brand-navy font-semibold rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}
