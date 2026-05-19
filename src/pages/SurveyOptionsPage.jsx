import { useState } from 'react'
import {
  ClipboardList,
  Zap,
  FileText,
  MessageSquare,
  Users,
  Star,
  ChevronRight,
} from 'lucide-react'

// ── Response Type Badge ─────────────────────────────────────────────
const BADGE_STYLES = {
  'Short answer':  'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  'Select one':    'bg-brand-teal/15 text-teal-400 border border-brand-teal/30',
  'Check all':     'bg-purple-500/15 text-purple-400 border border-purple-500/30',
  'Paragraph':     'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  'Scale':         'bg-pink-500/15 text-pink-400 border border-pink-500/30',
  'Contact info':  'bg-slate-400/15 text-slate-400 border border-slate-400/30',
}

function ResponseBadge({ type }) {
  const style = BADGE_STYLES[type] || BADGE_STYLES['Short answer']
  return (
    <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${style}`}>
      {type}
    </span>
  )
}

// ── Question Row ────────────────────────────────────────────────────
function Question({ number, text, responseType, optional = false, options = [] }) {
  return (
    <div className="flex gap-3 py-3.5 border-b border-slate-200/60 dark:border-slate-700/60 last:border-b-0">
      {/* Number bubble */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-navy/10 dark:bg-brand-navy/40 border border-brand-navy/20 dark:border-brand-navy/60 flex items-center justify-center">
        <span className="text-xs font-bold text-brand-navy dark:text-brand-gold">{number}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-wrap items-start gap-2">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug flex-1">
            {text}
            {optional && (
              <span className="ml-1.5 text-xs text-slate-400 font-normal">(optional)</span>
            )}
          </p>
          <ResponseBadge type={responseType} />
        </div>

        {/* Multiple-choice options */}
        {options.length > 0 && (
          <ul className="space-y-1 ml-0.5">
            {options.map((opt, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ChevronRight className="w-3 h-3 text-brand-teal flex-shrink-0" />
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// ── Section Header ──────────────────────────────────────────────────
function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 pt-2 pb-1">
      <div className="h-px flex-1 bg-gradient-to-r from-brand-gold/40 to-transparent" />
      <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold px-2">
        {title}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-brand-gold/40 to-transparent" />
    </div>
  )
}

// ── Cohort Badge ────────────────────────────────────────────────────
const COHORT_STYLES = {
  A: 'bg-brand-teal/15 text-teal-400 border border-brand-teal/40 ring-1 ring-brand-teal/20',
  B: 'bg-brand-gold/15 text-amber-400 border border-brand-gold/40 ring-1 ring-brand-gold/20',
  C: 'bg-purple-500/15 text-purple-400 border border-purple-500/40 ring-1 ring-purple-500/20',
}

function CohortBadge({ letter, label }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${COHORT_STYLES[letter]}`}>
      <span className="font-black">Cohort {letter}</span>
      <span className="opacity-80">{label}</span>
    </span>
  )
}

// ── Option 1: Quick & Casual ────────────────────────────────────────
function Option1Content() {
  return (
    <div className="space-y-1">
      <p className="text-xs text-slate-500 dark:text-slate-400 pb-2">
        Best for low-friction outreach — send via text link. Gets you core demographics, comfort level, and intent in under 7 minutes.
      </p>

      <Question number={1} text="What's your name?" responseType="Short answer" />
      <Question
        number={2}
        text="Which age group are you in?"
        responseType="Select one"
        options={['20–35', '35–60', '60+']}
      />
      <Question number={3} text="What do you do for work (or what did you do)?" responseType="Short answer" />
      <Question
        number={4}
        text="How would you describe your comfort level with technology?"
        responseType="Select one"
        options={['Very comfortable', 'Comfortable', 'Okay', 'Not very comfortable']}
      />
      <Question
        number={5}
        text="Have you ever used an AI tool?"
        responseType="Select one"
        options={[
          'Yes — regularly',
          'Yes — a few times',
          'Heard of them but not used',
          'Not sure what counts',
        ]}
      />
      <Question
        number={6}
        text='In one sentence, what comes to mind when you hear "artificial intelligence"?'
        responseType="Short answer"
      />
      <Question
        number={7}
        text="What would you most want to learn about AI? (Check all that apply)"
        responseType="Check all"
        options={[
          'How it can help with my job or business',
          'How to use it for everyday tasks',
          'How it actually works (non-technical)',
          'How to detect AI-generated content',
          'How to protect myself from AI-powered scams',
          "I'm just curious",
        ]}
      />
      <Question number={8} text="Any concerns or fears about AI?" responseType="Short answer" optional />
      <Question
        number={9}
        text="What's the best way to reach you?"
        responseType="Select one"
        options={['Email', 'Phone call', 'Text message']}
      />
    </div>
  )
}

// ── Option 2: Detailed Intake ───────────────────────────────────────
function Option2Content() {
  return (
    <div className="space-y-1">
      <p className="text-xs text-slate-500 dark:text-slate-400 pb-2">
        Best for rich data, curriculum design, and grant reporting. Gives you career context, tech baseline, and attitude nuance in 10–12 minutes.
      </p>

      <SectionHeader title="Section 1 — About You" />
      <Question number={1} text="Full name" responseType="Short answer" />
      <Question
        number={2}
        text="Age range"
        responseType="Select one"
        options={['20–25', '26–30', '31–35', '36–45', '46–55', '56–65', '66–75', '75+']}
      />
      <Question number={3} text="City or town in SC" responseType="Short answer" />
      <Question
        number={4}
        text="Employment status"
        responseType="Select one"
        options={[
          'Employed full-time',
          'Employed part-time',
          'Self-employed / freelance',
          'Retired',
          'Unemployed / job-seeking',
          'Student',
          'Other',
        ]}
      />
      <Question number={5} text="Job title or field (current or most recent)" responseType="Short answer" />
      <Question
        number={6}
        text="Highest level of education completed"
        responseType="Select one"
        options={[
          'Some high school',
          'High school diploma / GED',
          'Some college',
          "Associate's degree",
          "Bachelor's degree",
          "Graduate degree",
          'Trade / vocational certification',
          'Prefer not to say',
        ]}
      />

      <SectionHeader title="Section 2 — Technology Comfort" />
      <Question
        number={7}
        text="How often do you use the internet?"
        responseType="Select one"
        options={['Multiple times per day', 'Once a day', 'A few times a week', 'Rarely', 'Never']}
      />
      <Question
        number={8}
        text="Which devices do you regularly use? (Check all that apply)"
        responseType="Check all"
        options={['Smartphone', 'Tablet', 'Laptop or desktop computer', 'Smart TV', 'None of the above']}
      />
      <Question
        number={9}
        text="On a scale of 1–5, how confident are you with technology? (1 = not at all, 5 = very confident)"
        responseType="Scale"
        options={['1 — Not at all confident', '2', '3 — Somewhat confident', '4', '5 — Very confident']}
      />

      <SectionHeader title="Section 3 — AI Knowledge & Attitudes" />
      <Question
        number={10}
        text="How would you describe your current understanding of AI?"
        responseType="Select one"
        options={[
          "I've never heard of it",
          "I've heard the term but don't know much",
          'I have a basic understanding',
          'I use AI tools occasionally',
          'I use AI tools regularly',
        ]}
      />
      <Question
        number={11}
        text="Which AI tools have you used? (Check all that apply)"
        responseType="Check all"
        options={[
          'ChatGPT, Claude, or Gemini (chatbots)',
          'Siri or Google Assistant (voice)',
          'Amazon Alexa',
          'Grammarly or similar writing tools',
          'DALL-E, Midjourney, or image generators',
          'AI features inside social media',
          'None of the above',
        ]}
      />
      <Question number={12} text="If you've used an AI tool — what did you use it for?" responseType="Short answer" optional />
      <Question
        number={13}
        text="Overall, how do you feel about AI right now?"
        responseType="Select one"
        options={['Excited', 'Curious', 'Neutral', 'Cautious', 'Worried']}
      />
      <Question
        number={14}
        text="What concerns you about AI? (Check all that apply)"
        responseType="Check all"
        options={[
          'Job loss or automation',
          "Hard to understand — I don't know what's real",
          'Manipulation and misinformation',
          'Moving too fast',
          'Privacy and data security',
          'Bias against certain groups',
          "I'm not concerned",
          'Other',
        ]}
      />
      <Question
        number={15}
        text="What excites you about AI? (Check all that apply)"
        responseType="Check all"
        options={[
          'Saving time on everyday tasks',
          'Learning and education',
          'Growing my business or career',
          'Helping my community',
          'Better job opportunities',
          'Creating content (writing, images, video)',
          "Nothing — I'm not excited",
          'Other',
        ]}
      />

      <SectionHeader title="Section 4 — What You Want" />
      <Question number={16} text="What would make this session worth your time?" responseType="Short answer" />
      <Question number={17} text="What's one thing you'd want to DO with AI after this session?" responseType="Short answer" />
      <Question number={18} text="Do you have any accessibility needs we should know about?" responseType="Short answer" optional />
      <Question
        number={19}
        text="Preferred way to stay in touch?"
        responseType="Select one"
        options={['Email', 'Phone call', 'Text message', 'No follow-up needed']}
      />
      <Question number={20} text="Your contact information (email and/or phone)" responseType="Contact info" />
    </div>
  )
}

// ── Option 3: Conversational / Storytelling ─────────────────────────
function Option3Content() {
  return (
    <div className="space-y-1">
      <p className="text-xs text-slate-500 dark:text-slate-400 pb-2">
        Best for older adults. Feels like a conversation, not a form. Produces powerful quotes for grant applications and storytelling.
      </p>

      <Question number={1} text="What's your name, and where in South Carolina are you from?" responseType="Short answer" />
      <Question
        number={2}
        text="Which age group are you in?"
        responseType="Select one"
        options={['20–35', '35–60', '60+']}
      />
      <Question
        number={3}
        text="Tell us a little about yourself — what do you do, or what did you spend most of your working life doing?"
        responseType="Paragraph"
      />
      <Question
        number={4}
        text="What's the first thing that pops into your head when you hear the words 'artificial intelligence'?"
        responseType="Paragraph"
      />
      <Question
        number={5}
        text='Have you ever used something powered by AI — even accidentally — and thought "wow, that was useful" or "that was kind of scary"? Tell us about it.'
        responseType="Paragraph"
        optional
      />
      <Question
        number={6}
        text="On a scale of 1–10, how confident do you feel with technology in general? (1 = totally lost, 10 = totally comfortable)"
        responseType="Scale"
        options={["1–3: I struggle with technology", "4–6: I manage, but it’s not easy", "7–10: I’m pretty comfortable"]}
      />
      <Question
        number={7}
        text='"AI can help you with ___________." Fill in the blank — what would you put there, based on what you know or imagine?'
        responseType="Paragraph"
      />
      <Question
        number={8}
        text="What makes you nervous or cautious about AI? There are no wrong answers here."
        responseType="Paragraph"
        optional
      />
      <Question
        number={9}
        text={'Have you ever felt "left behind" when technology changed? What was that like?'}
        responseType="Paragraph"
        optional
      />
      <Question
        number={10}
        text="If you had 30 minutes with an AI expert — someone who could explain anything, no jargon — what would you ask them?"
        responseType="Paragraph"
      />
      <Question
        number={11}
        text="What would make this session feel like time well spent for you?"
        responseType="Short answer"
      />
      <Question
        number={12}
        text="Is there anything else you'd like us to know before we meet?"
        responseType="Paragraph"
        optional
      />
      <Question
        number={13}
        text="What's the best way to reach you? (Name, email, and/or phone — whatever you're comfortable sharing)"
        responseType="Contact info"
      />
    </div>
  )
}

// ── Recommendations Table ───────────────────────────────────────────
function RecommendationsTable() {
  const rows = [
    {
      cohort: 'A',
      label: 'Younger Adults (20–35)',
      best: 'Option 1 or 2',
      reason: 'Comfortable with digital forms; willing to complete longer intakes',
      optionKeys: [1, 2],
    },
    {
      cohort: 'B',
      label: 'Working Adults (35–60)',
      best: 'Option 2',
      reason: 'Richest career and employer context; best for grant reporting narrative',
      optionKeys: [2],
    },
    {
      cohort: 'C',
      label: 'Older Adults (60+)',
      best: 'Option 3',
      reason: 'Stories, not checkboxes — builds trust and surfaces powerful quotes',
      optionKeys: [3],
    },
  ]

  const cohortColor = { A: 'text-teal-400', B: 'text-amber-400', C: 'text-purple-400' }
  const optionColor = { 1: 'text-blue-400', 2: 'text-green-400', 3: 'text-orange-400' }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-5 py-3 bg-brand-navy/5 dark:bg-brand-navy/40 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-teal" />
          Cohort Recommendations
        </h3>
      </div>
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {rows.map((row) => (
          <div
            key={row.cohort}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr_1fr] gap-3 px-5 py-4"
          >
            {/* Cohort */}
            <div className="flex flex-col gap-1">
              <span className={`text-xs font-black uppercase tracking-wide ${cohortColor[row.cohort]}`}>
                Cohort {row.cohort}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300">{row.label}</span>
            </div>

            {/* Best option */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Best Fit</span>
              <div className="flex gap-1.5 flex-wrap">
                {row.optionKeys.map((k) => (
                  <span
                    key={k}
                    className={`text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 ${optionColor[k]}`}
                  >
                    Option {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Why</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{row.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Bonus Questions ─────────────────────────────────────────────────
function BonusQuestions() {
  const questions = [
    { text: 'How did you hear about SCAiL?', type: 'Short answer' },
    {
      text: 'Would you be interested in attending future SCAiL sessions?',
      type: 'Select one',
      options: ['Yes, definitely', 'Maybe', 'Not right now'],
    },
    {
      text: "Would you be willing to share your experience as a testimonial (anonymously if you prefer)?",
      type: 'Select one',
      options: ['Yes — use my name', 'Yes — anonymously', 'Not at this time'],
    },
    {
      text: "Do you know anyone else in your community who might benefit from SCAiL? If so, feel free to share their info or encourage them to sign up.",
      type: 'Paragraph',
      optional: true,
    },
  ]

  return (
    <div className="rounded-xl border border-brand-gold/30 overflow-hidden bg-brand-gold/5 dark:bg-brand-gold/5">
      <div className="px-5 py-3 bg-brand-gold/10 dark:bg-brand-gold/10 border-b border-brand-gold/30">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Star className="w-4 h-4 text-brand-gold" />
          Bonus Universal Add-On Questions
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Append to any option — great for building community and collecting testimonials
        </p>
      </div>
      <div className="px-5 py-2">
        {questions.map((q, i) => (
          <Question
            key={i}
            number={i + 1}
            text={q.text}
            responseType={q.type}
            optional={q.optional}
            options={q.options || []}
          />
        ))}
      </div>
    </div>
  )
}

// ── Main Page ───────────────────────────────────────────────────────
const OPTIONS = [
  {
    id: 'opt1',
    label: 'Option 1',
    sublabel: 'Quick & Casual',
    duration: '5–7 min',
    icon: Zap,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    accentColor: 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10',
    inactiveAccent: 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800',
    content: Option1Content,
  },
  {
    id: 'opt2',
    label: 'Option 2',
    sublabel: 'Detailed Intake',
    duration: '10–12 min',
    icon: FileText,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
    accentColor: 'border-green-500 text-green-600 dark:text-green-400 bg-green-500/5 dark:bg-green-500/10',
    inactiveAccent: 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800',
    content: Option2Content,
  },
  {
    id: 'opt3',
    label: 'Option 3',
    sublabel: 'Conversational',
    duration: '8–10 min',
    icon: MessageSquare,
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
    accentColor: 'border-orange-500 text-orange-600 dark:text-orange-400 bg-orange-500/5 dark:bg-orange-500/10',
    inactiveAccent: 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800',
    content: Option3Content,
  },
]

export default function SurveyOptionsPage() {
  const [activeOption, setActiveOption] = useState('opt1')

  const active = OPTIONS.find((o) => o.id === activeOption)
  const ActiveContent = active.content

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-xl bg-brand-navy/10 dark:bg-brand-navy/40">
          <ClipboardList className="w-6 h-6 text-brand-gold" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Pilot Focus Group Surveys
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Three intake options for SCAiL focus group cohorts — pick the right fit for your audience.
          </p>
        </div>
      </div>

      {/* ── Cohort Badges ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-1">Cohorts:</span>
        <CohortBadge letter="A" label="Younger Adults (20–35)" />
        <CohortBadge letter="B" label="Working Adults (35–60)" />
        <CohortBadge letter="C" label="Older Adults (60+)" />
      </div>

      {/* ── Tab Navigation ───────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <div className="flex items-end gap-1 border-b border-slate-200 dark:border-slate-700 min-w-max">
          {OPTIONS.map((opt) => {
            const isActive = opt.id === activeOption
            const Icon = opt.icon
            return (
              <button
                key={opt.id}
                onClick={() => setActiveOption(opt.id)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium
                  border-b-2 -mb-px transition-colors duration-150 whitespace-nowrap rounded-t-lg
                  ${isActive ? opt.accentColor : opt.inactiveAccent}
                `}
                role="tab"
                aria-selected={isActive}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-bold">{opt.label}</span>
                <span className="hidden sm:inline opacity-80">— {opt.sublabel}</span>
                <span className={`
                  inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold
                  ${isActive ? 'bg-current/10' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}
                `}>
                  {opt.duration}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Active Option Panel ───────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-secondary overflow-hidden">

        {/* Panel header */}
        <div className={`flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-tertiary/40`}>
          <div className={`p-2 rounded-lg ${active.iconBg}`}>
            <active.icon className={`w-5 h-5 ${active.iconColor}`} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {active.label}: {active.sublabel}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Estimated completion time: {active.duration}
            </p>
          </div>
        </div>

        {/* Questions */}
        <div className="px-5 py-4">
          <ActiveContent />
        </div>
      </div>

      {/* ── Cohort Recommendations Table ─────────────────────────── */}
      <RecommendationsTable />

      {/* ── Bonus Universal Questions ─────────────────────────────── */}
      <BonusQuestions />

      {/* ── Footer note ──────────────────────────────────────────── */}
      <p className="text-xs text-center text-slate-400 pb-4">
        All three options can be deployed as a Google Form, Typeform, Tally, or printed handout.
        Questions marked <span className="italic">optional</span> can be skipped without affecting data quality.
      </p>
    </div>
  )
}
