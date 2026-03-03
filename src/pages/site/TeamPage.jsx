import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Linkedin,
  Twitter,
  Mail,
  Scale,
  DollarSign,
  GraduationCap,
  Users,
  Heart,
  Handshake,
  Lightbulb,
  ArrowRight,
  Cpu,
  TreePine,
  BookOpen,
  UserPlus,
  ChevronRight,
} from 'lucide-react'

// ─── Brand Colors (Tailwind arbitrary values) ────────────────────────────────
// Primary navy: #1B365D  |  Gold: #D4A843  |  Teal: #2EC4B6

// ─── Founder Data ────────────────────────────────────────────────────────────
const founder = {
  name: 'Joshua Germain',
  initials: 'JG',
  title: 'Founder & Executive Director',
  bio: "Joshua Germain founded SCAiL in 2026 after seeing firsthand how rural South Carolina communities were being left behind in the AI revolution. With a background in technology and a deep connection to South Carolina, Joshua is building SCAiL to ensure that AI doesn't just benefit coastal tech hubs — it transforms the communities that need it most.",
  social: {
    linkedin: '#',
    twitter: '#',
    email: 'mailto:joshua@scail.org',
  },
}

// ─── Board Positions ─────────────────────────────────────────────────────────
const boardPositions = [
  {
    id: 'board-1',
    role: 'Legal Counsel',
    Icon: Scale,
    description:
      'Nonprofit attorney to advise on 501(c)(3) compliance, governance, contracts, and regulatory requirements. Experience with South Carolina nonprofit law preferred.',
  },
  {
    id: 'board-2',
    role: 'Finance / Treasurer',
    Icon: DollarSign,
    description:
      'Financial professional to oversee budgeting, grant management, financial reporting, and audit preparation. CPA or nonprofit finance background ideal.',
  },
  {
    id: 'board-3',
    role: 'Education / Community',
    Icon: GraduationCap,
    description:
      'Educator or community leader with deep roots in rural South Carolina. Ensures programs meet real community needs and builds trust on the ground.',
  },
]

// ─── Advisory Areas ──────────────────────────────────────────────────────────
const advisoryAreas = [
  { label: 'AI / Technology', Icon: Cpu, color: 'text-[#2EC4B6]', bg: 'bg-[#2EC4B6]/10' },
  { label: 'Rural Development', Icon: TreePine, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Nonprofit Management', Icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { label: 'Education', Icon: BookOpen, color: 'text-[#D4A843]', bg: 'bg-[#D4A843]/10' },
]

// ─── CTA Roles ───────────────────────────────────────────────────────────────
const ctaRoles = [
  {
    title: 'Volunteer',
    description: 'Help deliver workshops, mentor community members, or assist with events across South Carolina.',
    Icon: Heart,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    title: 'Board Member',
    description: 'Shape the strategic direction of SCAiL and bring governance expertise to a growing nonprofit.',
    Icon: Users,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
  },
  {
    title: 'Advisor',
    description: 'Share your expertise in AI, education, rural development, or nonprofit management on a flexible basis.',
    Icon: Lightbulb,
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
  },
  {
    title: 'Partner',
    description: 'Collaborate with SCAiL as an organization — sponsor programs, share resources, or co-deliver workshops.',
    Icon: Handshake,
    color: 'text-[#1B365D] dark:text-blue-400',
    bg: 'bg-[#1B365D]/10 dark:bg-blue-500/10',
  },
]

// ─── Components ──────────────────────────────────────────────────────────────

function SocialLink({ href, Icon, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-[#1B365D] hover:text-white dark:hover:bg-[#1B365D] dark:hover:text-white transition-colors duration-200"
    >
      <Icon className="w-4.5 h-4.5" />
    </a>
  )
}

function BoardCard({ position }) {
  const { role, Icon, description } = position
  return (
    <div className="group relative flex flex-col items-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 p-8 text-center transition-all duration-200 hover:border-[#2EC4B6] hover:shadow-lg dark:hover:shadow-black/30">
      {/* Avatar placeholder */}
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 group-hover:border-[#2EC4B6] transition-colors">
        <UserPlus className="w-8 h-8 text-slate-400 dark:text-slate-500 group-hover:text-[#2EC4B6] transition-colors" />
      </div>
      {/* Role badge */}
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#1B365D]/10 dark:bg-[#1B365D]/30 px-3 py-1">
        <Icon className="w-3.5 h-3.5 text-[#1B365D] dark:text-blue-300" />
        <span className="text-xs font-semibold text-[#1B365D] dark:text-blue-300">{role}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Open Position</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

function RoleCard({ role }) {
  const { title, description, Icon, color, bg } = role
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-5 transition-all duration-200 hover:shadow-md dark:hover:shadow-black/20 hover:border-slate-300 dark:hover:border-slate-600">
      <div className={`flex-shrink-0 p-3 rounded-xl ${bg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ── Hero Header ───────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-[#1B365D] dark:bg-slate-950">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B365D] via-[#1B365D] to-[#2EC4B6]/20 dark:from-slate-950 dark:via-slate-950 dark:to-[#2EC4B6]/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A843]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Meet the Team
          </h1>
          <p className="text-lg sm:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            The people building SCAiL
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        {/* ── Founder Section ─────────────────────────────────────────────── */}
        <section>
          <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl dark:shadow-black/30 overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1B365D] via-[#2EC4B6] to-[#D4A843]" />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 md:p-12">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#1B365D] to-[#2EC4B6] shadow-lg shadow-[#1B365D]/25">
                  <span className="text-4xl font-bold text-white select-none">
                    {founder.initials}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {founder.name}
                </h2>
                <p className="text-[#2EC4B6] font-semibold mb-4">{founder.title}</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-6">
                  {founder.bio}
                </p>

                {/* Social links */}
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <SocialLink href={founder.social.linkedin} Icon={Linkedin} label="LinkedIn" />
                  <SocialLink href={founder.social.twitter} Icon={Twitter} label="Twitter / X" />
                  <SocialLink href={founder.social.email} Icon={Mail} label="Email" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Board of Directors ───────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Board of Directors
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Currently recruiting founding board members to guide SCAiL through its
              formative years and ensure strong governance from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardPositions.map((pos) => (
              <BoardCard key={pos.id} position={pos} />
            ))}
          </div>

          {/* Board CTA */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#D4A843]/10 dark:bg-[#D4A843]/20 px-5 py-2.5 border border-[#D4A843]/20 dark:border-[#D4A843]/30">
              <Mail className="w-4 h-4 text-[#D4A843]" />
              <span className="text-sm font-medium text-[#D4A843]">
                Interested in joining our board? Get in touch.
              </span>
            </div>
          </div>
        </section>

        {/* ── Advisory Board ──────────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Advisory Board
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We're building our advisory network from South Carolina's innovation
              ecosystem. Advisors provide strategic guidance in their areas of expertise
              to help SCAiL maximize its impact.
            </p>
          </div>

          {/* Advisory areas grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {advisoryAreas.map(({ label, Icon, color, bg }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 text-center transition-all duration-200 hover:shadow-md dark:hover:shadow-black/20"
              >
                <div className={`mb-3 p-3 rounded-xl ${bg}`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Advisor placeholders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Advisor 1', 'Advisor 2', 'Advisor 3'].map((label, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/30 p-8 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50">
                  <UserPlus className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
                  Open Position
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Join Us CTA ─────────────────────────────────────────────────── */}
        <section>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B365D] to-[#1B365D]/90" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2EC4B6]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4A843]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative px-8 py-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Want to be part of the SCAiL team?
              </h2>
              <p className="text-blue-100/70 max-w-xl mx-auto mb-10 leading-relaxed">
                We're looking for passionate people who believe AI education should reach
                every community, not just the ones with venture capital.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {ctaRoles.map((role) => (
                  <RoleCard key={role.title} role={role} />
                ))}
              </div>

              <div className="mt-10">
                <a
                  href="mailto:joshua@scail.org"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4A843] hover:bg-[#D4A843]/90 text-[#1B365D] font-semibold px-8 py-3.5 shadow-lg shadow-[#D4A843]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#D4A843]/30 hover:scale-[1.02]"
                >
                  <Mail className="w-4.5 h-4.5" />
                  Reach Out Today
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
