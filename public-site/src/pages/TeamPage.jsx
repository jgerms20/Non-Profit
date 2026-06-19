import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import {
  Linkedin,
  Mail,
  ArrowRight,
  Users,
  Cpu,
  Leaf,
  GraduationCap,
  Heart,
  Star,
  Megaphone,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

// NOTE: photo URLs below are placeholders generated via ui-avatars.com.
// Replace each `photo` value with a real hosted image URL when photos are available.
// Members without a `photo` field will fall back to the colored initials circle.
const founders = [
  {
    initials: 'JG',
    name: 'Joshua',
    lastName: 'German',
    title: 'Founder & President',
    color: '#1B365D',
    photo: 'https://ui-avatars.com/api/?name=Joshua+German&size=256&background=1B365D&color=fff&bold=true&font-size=0.35',
    bio: 'Born and raised in Irmo, South Carolina. Dutch Fork High School graduate with deep roots in the Lowcountry — family lineage traces back to Walterboro and Charleston. Studied journalism at the University of South Carolina and attended Midlands Technical College. Built his career in advertising and marketing before founding SCAiL in 2026. After seeing firsthand how South Carolina communities were being left behind in the AI revolution, he channeled his communications expertise into a new mission: ensuring AI reaches every community across the state.',
    linkedin: 'https://www.linkedin.com/in/joshua-german/',
    email: 'joshua@scail.org',
    position: 'left',
  },
  {
    initials: 'JM',
    name: 'Janel',
    lastName: 'Moore',
    title: 'Board Member, Treasurer',
    color: '#D4A843',
    // No photo yet — will show initials circle until a real photo is provided
    bio: 'Finance professional at JP Morgan. USC class of 2021, studied International Affairs. Active in Alpha Kappa Psi (AK PSI). Brings strategic finance expertise and an international perspective to the board. Oversees nonprofit budget, grant reporting, banking relationships, and financial controls.',
    linkedin: 'https://www.linkedin.com/in/janel-moore/',
    position: 'right',
  },
  {
    initials: 'KM',
    name: 'Kinsey',
    lastName: 'Meggett',
    title: 'Board Member, Secretary',
    color: '#2EC4B6',
    photo: 'https://ui-avatars.com/api/?name=Kinsey+Meggett&size=256&background=2EC4B6&color=fff&bold=true&font-size=0.35',
    bio: 'Public health researcher with PhD in health equity from Clemson University (2025). Currently postdoctoral researcher at Furman University. Childhood friend of Joshua. Dissertation focused on health equity in underserved communities — core to SCAiL\'s mission. MLK Excellence in Service Award recipient. Helps refine curriculum, ensures programs serve communities authentically, and builds partnerships with community organizations.',
    linkedin: 'https://www.linkedin.com/in/kinsey-meggett-phd-265a2b9b/',
    position: 'left',
  },
  {
    initials: 'TJ',
    name: 'Tre',
    lastName: 'Jenkins',
    title: 'Board Member, Technology & Data',
    color: '#4A6FA5',
    photo: 'https://ui-avatars.com/api/?name=Tre+Jenkins&size=256&background=4A6FA5&color=fff&bold=true&font-size=0.35',
    bio: 'Data Technology Analyst at Bank of America in Charlotte. Winthrop University graduate. Brings hands-on experience in data systems, analytics, and financial technology. Childhood best friend of Joshua from Dutch Fork High School. His tech and data background anchors SCAiL\'s digital infrastructure, impact measurement, and technology strategy.',
    linkedin: 'https://www.linkedin.com/in/tre-jenkins/',
    position: 'right',
  },
  {
    initials: 'DB',
    name: 'Darren',
    lastName: 'Burton',
    title: 'Board Member, Education Policy & Operations',
    color: '#5C4033',
    // No photo yet — will show initials circle until a real photo is provided
    bio: 'USC Darla Moore School of Business graduate with leadership distinction and SC Honors College alumnus. Accounting background with a deep focus on South Carolina education equity — his undergraduate thesis "The Corridor of Shame" examined funding disparities across rural and urban SC school districts. Grew up in Irmo alongside Joshua. Brings financial acumen and education policy perspective that directly aligns with SCAiL\'s community-first mission.',
    linkedin: 'https://www.linkedin.com/in/darren-burton/',
    position: 'left',
  },
]

const advisorAreas = [
  {
    icon: Cpu,
    area: 'AI / Technology',
    areaLabel: <><span className="text-brand-gold">AI</span> / Technology</>,
    description:
      'Practitioners and researchers who can keep SCAiL at the forefront of AI education and tooling.',
  },
  {
    icon: Leaf,
    area: 'Community Development',
    description:
      'Experts in community economic development, workforce readiness, and community revitalization.',
  },
  {
    icon: GraduationCap,
    area: 'Education',
    description:
      'Educators, curriculum designers, and learning strategists with deep K-12 and adult education experience.',
  },
  {
    icon: Heart,
    area: 'Nonprofit Management',
    description:
      'Leaders with experience scaling nonprofits, managing grants, and building sustainable organizations.',
  },
]

const openRoles = [
  {
    icon: Heart,
    title: 'Volunteer',
    description:
      'Help set up workshops, assist with logistics, and support community events across South Carolina.',
  },
  {
    icon: Star,
    title: 'Workshop Facilitator',
    description:
      "Deliver SCAiL's courses in communities across the state. We provide training, materials, and support.",
  },
  {
    icon: Megaphone,
    title: 'Community Ambassador',
    description:
      'Spread the word in your community, connect us with local organizations, and help identify people who need us.',
  },
]

// ─── Components ───────────────────────────────────────────────────────────────

function FounderCard({ founder }) {
  const [expanded, setExpanded] = useState(false)
  const [photoFailed, setPhotoFailed] = useState(false)
  const isLeft = founder.position === 'left'

  // Show photo if provided and hasn't errored; otherwise fall back to initials circle
  const showPhoto = founder.photo && !photoFailed

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-10 ${isLeft ? '' : 'sm:flex-row-reverse'}`}>
      {/* Avatar */}
      {showPhoto ? (
        <img
          src={founder.photo}
          alt={`Photo of ${founder.name} ${founder.lastName}`}
          className="h-36 w-36 rounded-full object-cover shadow-lg flex-shrink-0"
          style={{ outline: `3px solid ${founder.color}`, outlineOffset: '3px' }}
          onError={() => setPhotoFailed(true)}
        />
      ) : (
        <div
          className="h-36 w-36 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0"
          style={{ backgroundColor: founder.color }}
        >
          {founder.initials}
        </div>
      )}

      {/* Info Card */}
      <div className="bg-neutral-100 dark:bg-slate-800 rounded-xl p-6 max-w-md w-full">
        <p className="text-xs text-neutral-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-medium">
          {founder.title}
        </p>
        <h3 className="text-2xl font-medium text-slate-900 dark:text-white mb-1 leading-tight">
          {founder.name}<br />{founder.lastName}
        </h3>

        {expanded && (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-4 mb-4">
            {founder.bio}
          </p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-1 bg-neutral-200 dark:bg-slate-700 hover:bg-neutral-300 dark:hover:bg-slate-600 text-neutral-600 dark:text-slate-300 text-xs rounded-full transition-colors"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
          {founder.linkedin && (
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {founder.email && (
            <a
              href={`mailto:${founder.email}`}
              className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  return (
    <div className="flex flex-col">

      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <PageHero title="Our" accent="Team" subtitle="The people behind SCAiL" />

      {/* ── 2. Founding Board — Othelia-inspired ────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal text-slate-900 dark:text-white tracking-tight mb-6">
              Built by founders
            </h2>
            <p className="text-lg text-neutral-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Five South Carolinians bringing communications, finance, public health research,
              technology, and education policy together to build something this state has never had.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {founders.map((founder) => (
              <FounderCard key={founder.name} founder={founder} />
            ))}
          </div>

          {/* Board CTA */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-black dark:bg-slate-800 text-white rounded-2xl px-10 py-8">
              <Users className="h-7 w-7 text-brand-teal mx-auto mb-3" />
              <p className="text-sm leading-relaxed max-w-md">
                Our founding board was formed April 2026. Meetings are held quarterly.
                Questions? Reach out at{' '}
                <a
                  href="mailto:board@scail.org"
                  className="text-brand-gold font-semibold hover:opacity-80 transition-opacity"
                >
                  board@scail.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Advisors ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Advisory Network
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              We're building an advisory network from South Carolina's innovation and education ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-10">
            {advisorAreas.map(({ icon: Icon, area, areaLabel, description }) => (
              <div
                key={area}
                className="bg-white dark:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-3 hover:border-brand-teal/40 dark:hover:border-brand-teal/50 hover:shadow-sm transition-all duration-200"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-navy flex items-center justify-center">
                  <Icon className="h-5 w-5 text-brand-teal" />
                </div>
                <h3 className="font-bold text-brand-navy dark:text-white text-base">{areaLabel ?? area}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400 text-base mb-4">
              Know someone who should advise SCAiL?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-brand-teal font-semibold text-sm hover:text-brand-navy dark:hover:text-white transition-colors"
            >
              Let us know
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. Join the Team ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              We're Growing
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              SCAiL runs on the energy of people who care about their communities.
              There's a place for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {openRoles.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-4 hover:border-brand-teal/40 hover:shadow-md transition-all duration-200"
              >
                <div className="h-12 w-12 rounded-xl bg-brand-navy dark:bg-slate-700 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-brand-gold dark:text-brand-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
                </div>
                <Link
                  to="/contact"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal hover:text-brand-navy dark:hover:text-white transition-colors"
                >
                  Get involved
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity duration-200 text-base shadow-lg"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
