import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Monitor,
  CheckCircle2,
  Layers,
  MapPin,
  Mail,
  Sparkles,
  ExternalLink,
  Target,
} from 'lucide-react'

import curriculumData from '../../data/curriculum.json'

// ─── Brand Colors ────────────────────────────────────────────────────────────
// Primary navy: #1B365D  |  Gold: #D4A843  |  Teal: #2EC4B6

// ─── Level Config ────────────────────────────────────────────────────────────
const levelConfig = {
  beginner: {
    label: 'Beginner',
    bg: 'bg-[#2EC4B6]/10',
    text: 'text-[#2EC4B6]',
    border: 'border-[#2EC4B6]/20',
  },
  intermediate: {
    label: 'Intermediate',
    bg: 'bg-[#D4A843]/10',
    text: 'text-[#D4A843]',
    border: 'border-[#D4A843]/20',
  },
  advanced: {
    label: 'Advanced',
    bg: 'bg-rose-500/10',
    text: 'text-rose-500',
    border: 'border-rose-500/20',
  },
}

// ─── Format Config ───────────────────────────────────────────────────────────
const formatConfig = {
  'in-person': {
    label: 'In-Person',
    bg: 'bg-[#1B365D]/10 dark:bg-blue-500/10',
    text: 'text-[#1B365D] dark:text-blue-300',
  },
  hybrid: {
    label: 'Hybrid',
    bg: 'bg-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
  },
  online: {
    label: 'Online',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
}

// ─── Learning Paths ──────────────────────────────────────────────────────────
const learningPaths = [
  {
    id: 'path-community',
    title: 'Community Member Path',
    subtitle: 'Start your AI journey with the essentials',
    Icon: Users,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    borderColor: 'border-[#2EC4B6]/30',
    gradientFrom: 'from-[#2EC4B6]/20',
    courses: ['AI 101: What Is AI and Why Should I Care?', 'AI Safety and Digital Literacy', 'AI for Your Job: Practical Skills Workshop'],
    duration: '~1 day total',
    courseCount: 3,
  },
  {
    id: 'path-business',
    title: 'Business Owner Path',
    subtitle: 'Transform your business with AI',
    Icon: Briefcase,
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
    borderColor: 'border-[#D4A843]/30',
    gradientFrom: 'from-[#D4A843]/20',
    courses: ['AI 101: What Is AI and Why Should I Care?', 'AI for Small Business Owners', 'AI Leadership Academy'],
    duration: '~13 weeks total',
    courseCount: 3,
  },
  {
    id: 'path-educator',
    title: 'Educator Path',
    subtitle: 'Become a certified AI educator',
    Icon: GraduationCap,
    color: 'text-[#1B365D] dark:text-blue-400',
    bg: 'bg-[#1B365D]/10 dark:bg-blue-500/10',
    borderColor: 'border-[#1B365D]/30 dark:border-blue-500/30',
    gradientFrom: 'from-[#1B365D]/20 dark:from-blue-500/20',
    courses: ['AI 101: What Is AI and Why Should I Care?', 'AI Safety and Digital Literacy', 'Train the Trainer: AI Education Certification'],
    duration: '~15 weeks total',
    courseCount: 3,
  },
]

// ─── Course Card ─────────────────────────────────────────────────────────────
function CourseCard({ course }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const level = levelConfig[course.level] || levelConfig.beginner
  const format = formatConfig[course.format] || formatConfig['in-person']

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-200 overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#1B365D] via-[#2EC4B6] to-[#D4A843]" />

      <div className="p-6">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${level.bg} ${level.text}`}>
            {level.label}
          </span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${format.bg} ${format.text}`}>
            {format.label}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#1B365D] dark:text-white mb-2 leading-snug group-hover:text-[#2EC4B6] dark:group-hover:text-[#2EC4B6] transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {course.description}
        </p>

        {/* Audience */}
        <div className="flex items-start gap-2 mb-4">
          <Users className="w-4 h-4 text-[#D4A843] flex-shrink-0 mt-0.5" />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {course.audience}
          </span>
        </div>

        {/* Expandable section */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-sm font-medium text-[#2EC4B6] hover:text-[#2EC4B6]/80 transition-colors"
        >
          {isExpanded ? 'Hide details' : 'View modules & outcomes'}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-5 animate-in slide-in-from-top-1">
            {/* Modules */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1B365D] dark:text-blue-400" />
                Modules
              </h4>
              <ul className="space-y-1.5">
                {course.modules.map((mod, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[#2EC4B6]" />
                    {mod}
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning Outcomes */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2.5 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#D4A843]" />
                Learning Outcomes
              </h4>
              <ul className="space-y-1.5">
                {course.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#2EC4B6] flex-shrink-0 mt-0.5" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Learning Path Card ──────────────────────────────────────────────────────
function LearningPathCard({ path }) {
  const { title, subtitle, Icon, color, bg, borderColor, gradientFrom, courses, duration, courseCount } = path

  return (
    <div className={`rounded-2xl border ${borderColor} bg-white dark:bg-slate-800 overflow-hidden transition-all duration-200 hover:shadow-lg dark:hover:shadow-black/30`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradientFrom} to-transparent p-6 pb-4`}>
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2.5 rounded-xl ${bg}`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {courseCount} courses
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {duration}
          </span>
        </div>
      </div>

      {/* Course list */}
      <div className="px-6 pb-6">
        <div className="space-y-3">
          {courses.map((courseName, idx) => (
            <div key={idx} className="flex items-center gap-3">
              {/* Step number */}
              <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                idx === 0 ? 'bg-[#1B365D]' : idx === 1 ? 'bg-[#2EC4B6]' : 'bg-[#D4A843]'
              }`}>
                {idx + 1}
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300">{courseName}</span>
              {idx < courses.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0 ml-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ProgramsPage() {
  const { scailCourses } = curriculumData

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ── Hero Header ───────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-[#1B365D] dark:bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B365D] via-[#1B365D] to-[#2EC4B6]/20 dark:from-slate-950 dark:via-slate-950 dark:to-[#2EC4B6]/10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A843]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 mb-6">
            <Sparkles className="w-4 h-4 text-[#D4A843]" />
            <span className="text-sm font-medium text-blue-100">Free for all community members</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Our Programs
          </h1>
          <p className="text-lg sm:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            AI education designed for real people in real communities
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        {/* ── SCAiL Original Courses ──────────────────────────────────────── */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              SCAiL Original Courses
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Eight purpose-built courses designed specifically for South Carolina
              communities. No jargon, no prerequisites, just practical AI skills you can
              use right away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scailCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* ── Learning Paths ──────────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Suggested Learning Paths
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Not sure where to start? Follow one of our recommended paths based on your
              goals and background.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </section>

        {/* ── External Resources ──────────────────────────────────────────── */}
        <section>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 sm:p-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2EC4B6]/10 mb-5">
              <ExternalLink className="w-7 h-7 text-[#2EC4B6]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              External Resources
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6">
              In addition to our original courses, SCAiL curates the best free and
              low-cost AI courses from leading platforms like Coursera, Google, OpenAI,
              IBM, and more.
            </p>
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-2 text-[#2EC4B6] hover:text-[#2EC4B6]/80 font-semibold transition-colors group"
            >
              Browse our full resource library
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* ── Bring SCAiL to Your Community CTA ───────────────────────────── */}
        <section>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B365D] to-[#1B365D]/90" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2EC4B6]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4A843]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative px-8 py-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mb-6">
                <MapPin className="w-8 h-8 text-[#D4A843]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Bring SCAiL to Your Community
              </h2>
              <p className="text-blue-100/70 max-w-2xl mx-auto mb-8 leading-relaxed text-lg">
                Want SCAiL to host a workshop in your town? We bring our courses directly
                to communities across South Carolina. Libraries, churches, community
                centers, schools — wherever people gather, we'll be there.
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {[
                  'No cost to attendees',
                  'All equipment provided',
                  'Customized to your community',
                  'Certified instructors',
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2EC4B6]" />
                    <span className="text-sm text-white/90">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:joshua@scail.org?subject=Bring SCAiL to our community"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4A843] hover:bg-[#D4A843]/90 text-[#1B365D] font-semibold px-8 py-3.5 shadow-lg shadow-[#D4A843]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#D4A843]/30 hover:scale-[1.02]"
                >
                  <Mail className="w-4.5 h-4.5" />
                  Request a Workshop
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:bg-white/10 text-white font-medium px-6 py-3 transition-all duration-200"
                >
                  View our partners
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
