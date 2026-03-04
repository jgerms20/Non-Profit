import { Link } from 'react-router-dom'
import { Unlock, MapPin, Wrench, Heart } from 'lucide-react'

const values = [
  {
    icon: Unlock,
    title: 'Access Over Exclusion',
    description: 'AI education for everyone, regardless of background, age, or technical experience.',
  },
  {
    icon: MapPin,
    title: 'Meet People Where They Are',
    description: 'We bring workshops to communities. We don\'t wait for them to come to us.',
  },
  {
    icon: Wrench,
    title: 'Practical Over Theoretical',
    description: 'Real skills you can use today. Not abstract concepts or academic lectures.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'Built by and for the communities we serve. Local ownership, local impact.',
  },
]

const audiences = [
  'Working adults and job seekers',
  'Small business owners and entrepreneurs',
  'Farmers and agricultural workers',
  'Youth ages 14–22',
  'Seniors and retirees',
  'Teachers and community educators',
  'Anyone curious about AI',
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            About <span className="text-brand-gold">SCAiL</span>
          </h1>
          <p className="text-xl text-slate-300 font-light">South Carolina AI Literacy</p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Our Mission</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 p-8">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              SCAiL equips South Carolina communities with the AI skills they need to compete,
              earn, and thrive in a rapidly changing economy — no technical background required.
            </p>
            <p className="text-base text-brand-teal font-medium border-t border-slate-100 dark:border-slate-700 pt-6">
              We teach real people to use real AI tools — and we bring the classroom to them.
            </p>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Why SCAiL Exists</h2>
          <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            <p>
              SCAiL was born from a simple observation: South Carolina communities are being
              left behind in the AI revolution — not because they lack talent, but because they lack
              access.
            </p>
            <p>
              Founded in 2026 by Joshua German, SCAiL exists to close that gap. We don't teach
              theory or code. We teach everyday people how to use AI tools to find jobs, grow
              businesses, protect their families from scams, and build better futures.
            </p>
            <p>
              We go where the need is. Our workshops happen in community centers, libraries,
              churches, and schools across South Carolina — because if you have to drive two
              hours to learn about AI, you're not going to learn about AI.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-100 dark:bg-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex gap-4 items-start"
              >
                <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-brand-navy flex items-center justify-center">
                  <Icon className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Who We Serve</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {audiences.map((audience) => (
              <li
                key={audience}
                className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
              >
                <span className="h-2 w-2 rounded-full bg-brand-teal flex-shrink-0" />
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to learn more?</h2>
          <p className="text-slate-300 mb-8">
            Reach out to find out how SCAiL can come to your community — or how you can help us grow.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-brand-gold text-brand-navy font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
