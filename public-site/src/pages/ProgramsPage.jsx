import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Clock,
  Monitor,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ArrowRight,
  Gift,
} from 'lucide-react'
import PageHero from '../components/PageHero'

// ─── Data ─────────────────────────────────────────────────────────────────────

const courses = [
  {
    id: 1,
    title: 'AI 101: What Is AI and Why Should I Care?',
    level: 'Beginner',
    format: 'In-person',
    duration: '90 minutes',
    audience: 'Community members with zero AI experience, all ages',
    description:
      'Your first step into AI. Learn what it actually is, see it in action with hands-on demos, and walk away knowing how to use ChatGPT for real tasks. No jargon, no code, no experience needed.',
    modules: [
      'What AI actually is (plain language)',
      'AI you already use (Siri, Netflix, Maps)',
      'Hands-on ChatGPT demo',
      'What AI can and can\'t do',
      'Q&A',
    ],
  },
  {
    id: 2,
    title: 'AI for Your Job: Practical Skills Workshop',
    level: 'Beginner',
    format: 'In-person',
    duration: 'Half-day (4 hours)',
    audience: 'Working adults, job seekers',
    description:
      'Learn AI tools that make you better at your job — whether you\'re in healthcare, retail, agriculture, or admin. Build a better resume, write professional emails, and find opportunities faster.',
    modules: [
      'AI tools for common jobs',
      'Resume building with AI',
      'Email writing with AI',
      'AI-powered job searching',
      'Hands-on practice',
    ],
  },
  {
    id: 3,
    title: 'AI for Small Business Owners',
    level: 'Beginner',
    format: 'Hybrid (in-person + online)',
    duration: '4 weeks',
    audience: 'Local business owners, entrepreneurs',
    description:
      'Put AI to work in your business. Learn to automate marketing, improve customer service, streamline operations, and build a practical AI strategy — no tech team required.',
    modules: [
      'Week 1: AI for marketing',
      'Week 2: AI for operations',
      'Week 3: AI for customer service',
      'Week 4: Building your AI strategy',
    ],
  },
  {
    id: 4,
    title: 'AI for Farmers and Agriculture',
    level: 'Beginner',
    format: 'In-person',
    duration: 'Half-day',
    audience: 'Farmers, agricultural workers, landowners',
    description:
      'See how AI is transforming agriculture — from crop monitoring to weather prediction to finding grants. Hands-on demos with tools you can use on your farm today.',
    modules: [
      'AI in precision agriculture',
      'Weather prediction tools',
      'Crop monitoring',
      'Livestock management',
      'Finding grants with AI',
    ],
  },
  {
    id: 5,
    title: 'AI Safety and Digital Literacy',
    level: 'Beginner',
    format: 'In-person',
    duration: '2 hours',
    audience: 'All community members, especially seniors',
    description:
      'Protect yourself in the age of AI. Learn to spot AI-generated scams, recognize deepfakes, safeguard your personal data, and know when NOT to trust AI.',
    modules: [
      'Recognizing AI scams',
      'Deepfakes and misinformation',
      'Protecting personal data',
      'Safe AI tool usage',
    ],
  },
  {
    id: 6,
    title: 'Youth AI Lab: Build Your First AI Project',
    level: 'Beginner',
    format: 'In-person',
    duration: '6 weeks',
    audience: 'Ages 14–22',
    description:
      'Build something real with AI. Over 6 weeks, you\'ll learn AI fundamentals, master prompt engineering, create AI-powered projects, and present at a demo day. Great for college applications.',
    modules: [
      'Week 1: AI basics & ethics',
      'Week 2: Prompt engineering',
      'Week 3: No-code AI tools',
      'Week 4: Building chatbots',
      'Week 5: Creative AI projects',
      'Week 6: Demo day',
    ],
  },
  {
    id: 7,
    title: 'AI Leadership Academy',
    level: 'Intermediate',
    format: 'Hybrid',
    duration: '8 weeks',
    audience: 'Community leaders, nonprofit staff, aspiring entrepreneurs',
    description:
      'Lead AI adoption in your organization. Build an AI implementation plan, learn to fundraise with AI tools, and develop the strategic thinking to guide your community into the future.',
    modules: [
      'AI strategy and planning',
      'Leading AI transformation',
      'AI-powered organizations',
      'Fundraising with AI',
      'AI ethics and governance',
      'Capstone project',
    ],
  },
  {
    id: 8,
    title: 'Train the Trainer: AI Education Certification',
    level: 'Intermediate',
    format: 'Hybrid',
    duration: '12 weeks',
    audience: 'Teachers, librarians, community educators',
    description:
      'Become a certified SCAiL AI Educator. Learn to teach AI to non-technical audiences, design curriculum, and deliver workshops independently. Includes a practicum teaching a real workshop.',
    modules: [
      'AI fundamentals deep dive',
      'Teaching to non-technical audiences',
      'Curriculum design',
      'Facilitation techniques',
      'Assessment methods',
      'Practicum',
      'Certification',
    ],
  },
]

const howItWorksSteps = [
  {
    number: '01',
    title: 'We come to you',
    description: 'Request a workshop for your community, school, or organization',
  },
  {
    number: '02',
    title: 'We bring everything',
    description: 'All equipment, materials, and instruction provided at no cost',
  },
  {
    number: '03',
    title: 'You learn and grow',
    description: 'Walk away with real skills you can use immediately',
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function LevelBadge({ level }) {
  const isIntermediate = level === 'Intermediate'
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        isIntermediate
          ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
          : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
      }`}
    >
      {level}
    </span>
  )
}

function FormatBadge({ format }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-700">
      <Monitor className="h-3 w-3" />
      {format}
    </span>
  )
}

function DurationBadge({ duration }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-700">
      <Clock className="h-3 w-3" />
      {duration}
    </span>
  )
}

function CourseCard({ course }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-brand-teal/40 transition-all duration-200 flex flex-col">
      {/* Card body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Title */}
        <h3 className="text-lg font-bold text-brand-navy dark:text-white leading-snug">
          {course.title}
        </h3>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2">
          <LevelBadge level={course.level} />
          <FormatBadge format={course.format} />
          <DurationBadge duration={course.duration} />
        </div>

        {/* Audience */}
        <p className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Users className="h-4 w-4 text-brand-teal flex-shrink-0 mt-0.5" />
          <span>{course.audience}</span>
        </p>

        {/* Description */}
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
          {course.description}
        </p>

        {/* Expandable curriculum */}
        <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal hover:text-brand-navy dark:hover:text-brand-gold transition-colors duration-150"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                Hide curriculum details
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                View curriculum details
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>

          {expanded && (
            <ul className="mt-3 space-y-2">
              {course.modules.map((module) => (
                <li key={module} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle className="h-4 w-4 text-brand-teal flex-shrink-0 mt-0.5" />
                  <span>{module}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProgramsPage() {
  return (
    <div className="flex flex-col">

      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        title="Our"
        accent="Programs"
        subtitle="Free AI education designed for real people in real communities"
      >
        <span className="mt-6 inline-flex items-center gap-2 bg-brand-teal/20 border border-brand-teal/40 text-brand-teal text-sm font-semibold px-4 py-2 rounded-full">
          <Gift className="h-4 w-4" />
          All programs are free for community members
        </span>
      </PageHero>

      {/* ── 2. Course Grid ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              All SC<span className="text-brand-gold">Ai</span>L Courses
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Eight courses designed for every level, every audience, and every corner of South Carolina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. How It Works ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              We make it simple. You show up — we handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorksSteps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-teal/40 hover:shadow-md transition-all duration-200"
              >
                <div className="h-14 w-14 rounded-full bg-brand-navy flex items-center justify-center mb-5">
                  <span className="text-brand-gold font-extrabold text-sm tracking-wider">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to learn?
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Request a workshop for your community, school, church, or organization.
            We bring everything — for free.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity duration-200 text-base shadow-lg"
          >
            Request a Workshop
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  )
}
