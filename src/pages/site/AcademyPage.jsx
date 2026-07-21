import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  Clock,
  Users,
  BookOpen,
  Layers,
  Award,
  ChevronRight,
  GraduationCap,
  Rocket,
} from 'lucide-react'

import curriculumData from '../../data/curriculum.json'

// ─── Level display config ────────────────────────────────────────────────────
const levelConfig = {
  beginner: {
    label: 'Beginner',
    text: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'border-[#2EC4B6]/20',
  },
  intermediate: {
    label: 'Intermediate',
    text: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
    border: 'border-[#D4A843]/20',
  },
  advanced: {
    label: 'Advanced',
    text: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
  },
}

function levelStyle(level) {
  return levelConfig[level] || levelConfig.beginner
}

function formatLevelLabel(level) {
  if (!level) return 'All Levels'
  return levelStyle(level).label
}

// ─── The three learning levels ───────────────────────────────────────────────
const levels = [
  {
    key: 'beginner',
    title: 'Beginner',
    Icon: BookOpen,
    accent: 'text-[#2EC4B6]',
    accentBg: 'bg-[#2EC4B6]/10',
    accentBorder: 'border-[#2EC4B6]/20',
    description:
      'Start with zero experience required. Plain-language sessions taught in libraries, churches, and community centers — no jargon, no laptop skills assumed, just real answers to "what is AI, and why should I care?"',
  },
  {
    key: 'intermediate',
    title: 'Intermediate',
    Icon: Layers,
    accent: 'text-[#D4A843]',
    accentBg: 'bg-[#D4A843]/10',
    accentBorder: 'border-[#D4A843]/20',
    description:
      'Go deeper on applying AI at work, in your business, or inside your organization. Multi-week programs with hands-on practice, real tools, and deliverables you can use the next day.',
  },
  {
    key: 'advanced',
    title: 'Advanced',
    Icon: Award,
    accent: 'text-rose-400',
    accentBg: 'bg-rose-400/10',
    accentBorder: 'border-rose-400/20',
    description:
      'Lead the movement. Certification and leadership tracks for educators, nonprofit staff, and entrepreneurs ready to teach AI literacy and lead adoption in their own communities.',
  },
]

// ─── Learning path steps ─────────────────────────────────────────────────────
const learningPath = [
  {
    step: 1,
    title: 'Intro to AI',
    Icon: BookOpen,
    accent: 'text-[#2EC4B6]',
    accentBg: 'bg-[#2EC4B6]/10',
    description: 'AI 101 and the foundational courses everyone starts with.',
  },
  {
    step: 2,
    title: 'Practical Skills',
    Icon: Rocket,
    accent: 'text-[#D4A843]',
    accentBg: 'bg-[#D4A843]/10',
    description: 'Apply AI to your job, your business, or your community role.',
  },
  {
    step: 3,
    title: 'Leadership Academy',
    Icon: GraduationCap,
    accent: 'text-rose-400',
    accentBg: 'bg-rose-400/10',
    description: 'Lead AI adoption, get certified, and teach others.',
  },
]

// ─── Course card ──────────────────────────────────────────────────────────────
function CourseCard({ course }) {
  const level = levelStyle(course?.level)

  return (
    <div className="group flex flex-col rounded-2xl border border-white/10 bg-[#1e293b] overflow-hidden hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-200">
      {/* Top color strip */}
      <div className="h-1.5 bg-gradient-to-r from-[#1B365D] via-[#2EC4B6] to-[#D4A843]" />

      <div className="p-6 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${level.bg} ${level.text} border ${level.border}`}
          >
            {formatLevelLabel(course?.level)}
          </span>
          {course?.duration && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-400">
              <Clock className="w-3 h-3" />
              {course.duration}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white leading-snug mb-2 group-hover:text-[#2EC4B6] transition-colors">
          {course?.title || 'Untitled Course'}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed flex-1">
          {course?.description || 'Course details coming soon.'}
        </p>

        {/* Audience footer */}
        {course?.audience && (
          <div className="mt-5 pt-4 border-t border-white/10 flex items-start gap-2">
            <Users className="w-4 h-4 text-[#D4A843] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-400">{course.audience}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// ACADEMY PAGE
// =============================================================================
export default function AcademyPage() {
  const scailCourses = curriculumData?.scailCourses || []
  const catalogCourses = scailCourses.slice(0, 12)

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B365D] via-[#0F172A] to-[#0F172A] pt-28 sm:pt-36 pb-20 sm:pb-24">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#2EC4B6]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-medium text-white/70 tracking-wider uppercase">
              SCAiL Academy
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
            Free, hands-on AI education for every South Carolinian.
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed">
            No cost. No tech background required. Taught in libraries,
            churches, and community centers across South Carolina — by
            people who understand your community.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-7 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Browse the catalog
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/site/get-involved"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Bring a class to your community
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. HOW IT WORKS / LEVELS ─────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Three levels, one journey
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              Every SCAiL course fits into one of three levels, so you always
              know what to take next — whatever your starting point.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levels.map((lvl) => (
              <div
                key={lvl.key}
                className={`flex flex-col rounded-2xl border ${lvl.accentBorder} bg-[#1e293b] p-8 transition-all duration-300 hover:shadow-xl hover:shadow-black/20`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-xl ${lvl.accentBg} mb-5`}
                >
                  <lvl.Icon className={`w-7 h-7 ${lvl.accent}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {lvl.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {lvl.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COURSE CATALOG ────────────────────────────────────────────── */}
      <section id="catalog" className="bg-[#0F172A] py-16 sm:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              The Course Catalog
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              Purpose-built courses for South Carolina communities — from
              your first ChatGPT demo to leading AI adoption in your
              organization.
            </p>
          </div>

          {catalogCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogCourses.map((course) => (
                <CourseCard key={course?.id} course={course} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400">
              Our course catalog is coming soon.
            </p>
          )}
        </div>
      </section>

      {/* ── 4. LEARNING PATH ─────────────────────────────────────────────── */}
      <section className="bg-[#1B365D] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              A simple path forward
            </h2>
            <p className="mt-3 text-slate-300/70 max-w-2xl mx-auto">
              Not sure where to start? Follow the path most SCAiL graduates
              take, one step at a time.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-0">
            {learningPath.map((item, idx) => (
              <div key={item.step} className="flex-1 flex items-stretch">
                <div className="flex-1 flex flex-col items-center text-center rounded-2xl md:rounded-none border border-white/10 md:border-none bg-white/5 md:bg-transparent p-8">
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-full ${item.accentBg} border border-white/10 mb-5`}
                  >
                    <item.Icon className={`w-6 h-6 ${item.accent}`} />
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2">
                    Step {item.step}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300/70 leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </div>

                {idx < learningPath.length - 1 && (
                  <div className="hidden md:flex items-center justify-center px-2">
                    <ChevronRight className="w-6 h-6 text-[#D4A843]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA BAND ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1B365D] to-[#0F172A] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to learn?
          </h2>
          <p className="mt-4 text-slate-300/80 text-lg">
            Find an upcoming class near you, or ask us to bring the SCAiL
            Academy to your community.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/site/events"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-8 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Find a class
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/site/get-involved"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Get involved
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
