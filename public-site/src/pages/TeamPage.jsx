import { Link } from 'react-router-dom'
import {
  Linkedin,
  Mail,
  ArrowRight,
  Users,
  DollarSign,
  BookOpen,
  Cpu,
  Leaf,
  GraduationCap,
  Heart,
  Star,
  Megaphone,
  Award,
  Briefcase,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const boardMembers = [
  {
    initials: 'JM',
    name: 'Janel Moore',
    title: 'Board Member, Treasurer',
    role: 'Finance & Treasury',
    organization: 'JP Morgan',
    gradient: 'linear-gradient(135deg, #D4A843 0%, #b8860b 100%)',
    background:
      "Finance professional at JP Morgan. USC class of 2021, studied International Affairs. Active in Alpha Kappa Psi (AK PSI). Brings strategic finance expertise and an international perspective to SCAiL's board.",
    education: [
      'Bachelor of Arts, International Affairs, University of South Carolina (2021)',
    ],
    organizations: ['Alpha Kappa Psi (AK PSI) — co-ed business fraternity'],
    responsibilities: [
      'Oversee nonprofit budget and financial planning',
      'Manage grant reporting and compliance',
      'Oversee banking relationships and cash management',
      'Review and approve financial controls',
    ],
    linkedin: 'https://www.linkedin.com/in/janel-moore/',
  },
  {
    initials: 'KM',
    name: 'Kinsey Meggett',
    title: 'Board Member, Secretary',
    role: 'Community Engagement & Education',
    organization: 'Furman University (Postdoc)',
    gradient: 'linear-gradient(135deg, #2EC4B6 0%, #0e9488 100%)',
    background:
      "Public health researcher with PhD in health equity. Clemson University graduate (BS 2020, PhD 2025). Childhood friend of Joshua. Deep community leadership experience. Dissertation focused on health equity in underserved communities — core to SCAiL's mission.",
    education: [
      'PhD, Public Health Science, Clemson University (2025)',
      'M.S., University of South Carolina School of Medicine',
      'B.S., Clemson University (2020)',
    ],
    awards: [
      'MLK Excellence in Service Award, Clemson University',
      'Dr. Karen Kemper Award, Public Health Sciences (2025)',
    ],
    responsibilities: [
      'Help refine and validate curriculum design',
      'Ensure programs serve communities authentically',
      'Measure and report on learning outcomes',
      'Build partnerships with community organizations',
    ],
    linkedin: 'https://www.linkedin.com/in/kinsey-meggett-265a2b9b/',
  },
]

const advisorAreas = [
  {
    icon: Cpu,
    area: 'AI / Technology',
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
      'Help set up workshops, assist with logistics, and support community events across South Carolina. Flexible hours — any involvement makes a difference.',
  },
  {
    icon: Star,
    title: 'Workshop Facilitator',
    description:
      'Deliver SCAiL\'s courses in communities across the state. We provide training, materials, and support — you bring the energy and a passion for teaching.',
  },
  {
    icon: Megaphone,
    title: 'Community Ambassador',
    description:
      'Spread the word in your community, connect us with local organizations, and help identify people who would benefit most from our programs.',
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  return (
    <div className="flex flex-col">

      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-brand-navy text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Our <span className="text-brand-gold">Team</span>
          </h1>
          <p className="text-xl text-slate-300 font-light">
            The people behind SCAiL
          </p>
        </div>
      </section>

      {/* ── 2. Founder ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div
                  className="h-24 w-24 rounded-full flex items-center justify-center text-white text-2xl font-extrabold tracking-tight shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #2EC4B6 0%, #D4A843 100%)',
                  }}
                >
                  JG
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-semibold text-brand-teal tracking-widest uppercase mb-1">
                  Founder
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy dark:text-white mb-1">
                  Joshua German
                </h2>
                <p className="text-base text-slate-500 dark:text-slate-400 font-medium mb-5">
                  Founder &amp; Executive Director
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base mb-4">
                  Born and raised in Irmo, South Carolina, Joshua is a proud Dutch Fork High School
                  graduate with deep roots in the Lowcountry — his family lineage traces back to
                  Walterboro and Charleston. He studied journalism at the University of South Carolina's
                  School of Journalism and Mass Communications and attended Midlands Technical College.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base mb-6">
                  Joshua built his career in advertising and marketing before founding SCAiL in 2026.
                  After seeing firsthand how South Carolina communities were being left behind in the
                  AI revolution, he's channeling his communications expertise into a new mission:
                  ensuring AI doesn't just benefit major tech hubs — it reaches every community
                  across the state that needs it.
                </p>

                {/* Social links */}
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <a
                    href="https://www.linkedin.com/in/joshua-german/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="h-9 w-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-brand-navy dark:hover:text-white hover:border-brand-navy dark:hover:border-brand-teal transition-colors duration-150"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:joshua@scail.org"
                    aria-label="Email"
                    className="h-9 w-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-brand-navy dark:hover:text-white hover:border-brand-navy dark:hover:border-brand-teal transition-colors duration-150"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Board of Directors ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Founding Board of Directors
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Three leaders, one mission: AI literacy for every community in South Carolina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-5xl mx-auto">
            {boardMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col"
              >
                <div
                  className="h-1.5"
                  style={{ background: member.gradient }}
                />
                <div className="p-6 sm:p-7 flex flex-col gap-5 flex-1">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div
                      className="h-16 w-16 rounded-full flex items-center justify-center text-white text-lg font-extrabold tracking-tight shadow-md flex-shrink-0"
                      style={{ background: member.gradient }}
                    >
                      {member.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-brand-navy dark:text-white leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-sm text-brand-gold font-semibold mt-0.5">
                        {member.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {member.organization}
                      </p>
                    </div>
                  </div>

                  {/* Background */}
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {member.background}
                  </p>

                  {/* Education */}
                  {member.education && (
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5" />
                        Education
                      </h4>
                      <ul className="space-y-1">
                        {member.education.map((edu) => (
                          <li
                            key={edu}
                            className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-snug"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0 mt-1.5" />
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Awards */}
                  {member.awards && (
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5" />
                        Awards
                      </h4>
                      <ul className="space-y-1">
                        {member.awards.map((award) => (
                          <li
                            key={award}
                            className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-snug"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
                            {award}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Organizations */}
                  {member.organizations && (
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        Memberships
                      </h4>
                      <ul className="space-y-1">
                        {member.organizations.map((org) => (
                          <li
                            key={org}
                            className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-snug"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0 mt-1.5" />
                            {org}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Responsibilities */}
                  {member.responsibilities && (
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" />
                        Board Responsibilities
                      </h4>
                      <ul className="space-y-1">
                        {member.responsibilities.map((resp) => (
                          <li
                            key={resp}
                            className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-snug"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-navy dark:bg-brand-teal flex-shrink-0 mt-1.5" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* LinkedIn */}
                  {member.linkedin && (
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal hover:text-brand-navy dark:hover:text-white transition-colors"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Board CTA */}
          <div className="max-w-2xl mx-auto text-center bg-brand-navy rounded-2xl p-8">
            <Users className="h-8 w-8 text-brand-teal mx-auto mb-4" />
            <p className="text-white text-base leading-relaxed">
              Our founding board was formed April 2026. Meetings are held quarterly.
              Questions for the board? Reach out at{' '}
              <a
                href="mailto:board@scail.org"
                className="text-brand-gold font-semibold hover:opacity-80 transition-opacity"
              >
                board@scail.org
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Advisors ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-800">
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
            {advisorAreas.map(({ icon: Icon, area, description }) => (
              <div
                key={area}
                className="bg-slate-50 dark:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-3 hover:border-brand-teal/40 dark:hover:border-brand-teal/50 hover:shadow-sm transition-all duration-200"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-navy flex items-center justify-center">
                  <Icon className="h-5 w-5 text-brand-teal" />
                </div>
                <h3 className="font-bold text-brand-navy dark:text-white text-base">{area}</h3>
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

      {/* ── 5. Join the Team ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900">
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
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-4 hover:border-brand-teal/40 hover:shadow-md transition-all duration-200"
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
