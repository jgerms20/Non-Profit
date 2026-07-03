import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Rocket,
  Check,
  Copy,
  Zap,
  Send,
  Plane,
  Phone,
  Mail,
  Linkedin,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  CalendarCheck,
  Compass,
  Star,
  ArrowRight,
  FileText,
  TrendingUp,
} from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { copyToClipboard } from '../utils/clipboard'

// ─── Trip window ───────────────────────────────────────────────────────────────

const TRIP_START = '2026-07-06'
const TRIP_END = '2026-07-12'

// ─── "Do This Now" actions ─────────────────────────────────────────────────────

const DO_NOW_ACTIONS = [
  {
    id: 'text-kinsey',
    title: 'Text Kinsey to lock in Thursday in Greenville',
    why: 'She is the anchor meeting of the trip',
    time: '2 min',
  },
  {
    id: 'email-bradley',
    title: 'Send the Rep. Bradley email (full text in the queue below)',
    why: 'Legislative relationships take weeks; start now',
    time: '5 min',
  },
  {
    id: 'email-usc',
    title: 'Send Dr. Valafar + USC Incubator emails (copy from queue below)',
    why: 'University partnerships unlock credibility and space',
    time: '5 min',
  },
]

const KIM_BOWMAN_MESSAGE =
  "Hi Kim — hope you're doing well! I'm heading back to Columbia the week of July 6th and would love to reconnect. A lot has moved forward with SCAiL since we last spoke — incorporated, founding board in place, and launching our first community pilot sessions this summer. Would love to share where we are and explore how SCAiL and SCRIN might work together. Would you be available for a coffee that week?"

const IRMO_PHONE_SCRIPT =
  "Hi, my name is Joshua German and I'm from the Irmo area. I recently founded The SCAiL Initiative, a nonprofit that brings free AI workshops to South Carolina communities. We're launching pilot sessions this fall and looking for community spaces — a room for 15-30 people is all we need, we provide everything else. Would you be open to a brief conversation about hosting a free workshop?"

const NEXT_ACTIONS = [
  {
    id: 'linkedin-kim',
    title: 'LinkedIn message to Kim Bowman (SCRIN)',
    type: 'copy',
    copyText: KIM_BOWMAN_MESSAGE,
  },
  {
    id: 'call-irmo',
    title: 'Call Irmo library about hosting a fall workshop',
    type: 'script',
    script: IRMO_PHONE_SCRIPT,
  },
  {
    id: 'file-1023ez',
    title: 'File Form 1023-EZ — the big one',
    type: 'link',
    to: '/legal',
    linkLabel: 'Open Legal checklist',
  },
]

// ─── Outreach queue ────────────────────────────────────────────────────────────

const OUTREACH_ITEMS = [
  {
    id: 'kinsey-meggett',
    person: 'Kinsey Meggett',
    org: 'Board Secretary',
    channel: 'Text',
    message:
      "Hey Kinsey! Coming home to SC the week of July 6th and would love to connect in person. Are you around the Upstate that week? Even a lunch or coffee in Greenville would be great — want to catch up on SCAiL board stuff and talk through the pilot curriculum. Let me know what works!",
  },
  {
    id: 'rep-bradley',
    person: 'Rep. Jeff Bradley',
    org: 'SC House',
    channel: 'Email',
    note: 'Verify address at scstatehouse.gov before sending',
    message:
      "Subject: Introducing The SCAiL Initiative — AI Literacy for All 46 Counties\n\nDear Representative Bradley,\n\nMy name is Joshua German, and I'm the founder of The SCAiL Initiative (South Carolina AI Literacy), a nonprofit bringing free, hands-on AI education to communities across all 46 counties.\n\nI'm a Dutch Fork High School graduate, born and raised in Irmo, and I founded SCAiL in 2026 after seeing firsthand how the AI revolution is leaving South Carolina communities behind — not because they lack talent, but because they lack access.\n\nWe meet people where they are: churches, libraries, community centers, and schools. No tech background required, no cost to attendees.\n\nI'll be in Columbia the week of July 7th and would welcome the chance to introduce myself. I'd especially love to hear your perspective on House Bill 3201 (the Computer Science Education Initiative Act) and how SCAiL might align with that work.\n\nWould you or your office have 20 minutes that week?\n\nWith appreciation,\nJoshua German\nFounder & President, The SCAiL Initiative\njoshua@scail.org",
  },
  {
    id: 'kim-bowman',
    person: 'Kim Bowman',
    org: 'SCRIN',
    channel: 'LinkedIn',
    message: KIM_BOWMAN_MESSAGE,
  },
  {
    id: 'dr-valafar',
    person: 'Dr. Homayoun Valafar',
    org: 'USC',
    channel: 'Email',
    note: 'valafar@cec.sc.edu — verify before sending',
    message:
      "Subject: SCAiL Initiative — Community AI Literacy Partnership Inquiry\n\nDear Dr. Valafar,\n\nI'm Joshua German, founder of The SCAiL Initiative, a new South Carolina nonprofit bringing free AI literacy education to communities across the state. We're incorporated, board-seated, and launching pilot sessions this summer.\n\nI believe there's strong alignment between USC's AI research mission and SCAiL's community education work. I'll be in Columbia the week of July 7th and would welcome a 20-minute introduction to explore potential partnership and curriculum advisement.\n\nThank you for your time.\n\nJoshua German\nFounder & President, The SCAiL Initiative\njoshua@scail.org | scail.org",
  },
  {
    id: 'usc-incubator',
    person: 'USC Technology Incubator',
    org: 'USC',
    channel: 'Email',
    note: 'Look up current contact at sc.edu before sending',
    message:
      "Subject: SCAiL Initiative — Nonprofit AI Education Intro\n\nHello,\n\nI'm Joshua German, founder of The SCAiL Initiative, a South Carolina nonprofit (SC Filing ID: 260320-1607524) building free AI literacy programs across all 46 counties. I'm an Irmo native and USC alum and I'll be in Columbia the week of July 7th.\n\nI'd love to introduce SCAiL and learn how the incubator supports social impact organizations. We have a clear roadmap: AI education, then a community innovation incubator, then a community investment fund.\n\nWould anyone be available for a brief intro meeting?\n\nJoshua German\njoshua@scail.org | scail.org",
  },
  {
    id: 'irmo-library',
    person: 'Irmo Branch Library',
    org: 'Community venue',
    channel: 'Call',
    message: IRMO_PHONE_SCRIPT,
  },
]

const CHANNEL_ICONS = {
  Text: MessageSquare,
  Email: Mail,
  LinkedIn: Linkedin,
  Call: Phone,
}

const STATUS_ORDER = ['not-sent', 'sent', 'replied', 'meeting']

const STATUS_CONFIG = {
  'not-sent': {
    label: 'Not sent',
    classes: 'border-slate-600 bg-slate-700/30 text-slate-400 hover:border-slate-500',
  },
  sent: {
    label: 'Sent',
    classes: 'border-blue-500/40 bg-blue-500/10 text-blue-400 hover:border-blue-400/60',
  },
  replied: {
    label: 'Replied',
    classes: 'border-amber-500/40 bg-amber-500/10 text-amber-400 hover:border-amber-400/60',
  },
  meeting: {
    label: 'Meeting set',
    classes: 'border-green-500/40 bg-green-500/10 text-green-400 hover:border-green-400/60',
  },
}

// ─── Trip week agenda ──────────────────────────────────────────────────────────

const TRIP_DAYS = [
  {
    date: '2026-07-06',
    day: 'Mon',
    label: 'Jul 6',
    focus: 'Arrive',
    items: ['Arrive in SC', 'Family time'],
  },
  {
    date: '2026-07-07',
    day: 'Tue',
    label: 'Jul 7',
    focus: 'Columbia',
    items: ['Rep. Bradley office', 'USC Incubator visit'],
  },
  {
    date: '2026-07-08',
    day: 'Wed',
    label: 'Jul 8',
    focus: 'Columbia',
    items: ['Kim Bowman (SCRIN)', 'Dr. Valafar (USC)'],
  },
  {
    date: '2026-07-09',
    day: 'Thu',
    label: 'Jul 9',
    focus: 'Greenville',
    anchor: true,
    items: ['Kinsey Meggett ⭐ (anchor meeting)'],
  },
  {
    date: '2026-07-10',
    day: 'Fri',
    label: 'Jul 10',
    focus: 'Irmo',
    items: ['Library visit', 'Community site visits'],
  },
  {
    date: '2026-07-11',
    day: 'Sat',
    label: 'Jul 11',
    focus: 'Family',
    items: ['Family time', 'Reflection'],
  },
  {
    date: '2026-07-12',
    day: 'Sun',
    label: 'Jul 12',
    focus: 'Fly back',
    items: ['Fly back', 'Write trip recap'],
  },
]

// ─── "The Angle" strategy bullets ──────────────────────────────────────────────

const ANGLE_BULLETS = [
  {
    heading: 'The story',
    text: 'Irmo native, Dutch Fork grad, USC alum who came home to close the AI gap — lead with roots, not tech.',
  },
  {
    heading: 'The ask',
    text: 'Never "support us" — always something specific: 20 minutes, one introduction, one room to host a workshop.',
  },
  {
    heading: 'The proof',
    text: "Incorporated, five-member board, bylaws adopted, pilot curriculum for 3 cohorts ready — you're further along than you feel.",
  },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────

function toLocalMidnight(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function getTripCountdown(now) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const start = toLocalMidnight(TRIP_START)
  const end = toLocalMidnight(TRIP_END)
  const daysToStart = Math.round((start - today) / (1000 * 60 * 60 * 24))

  if (daysToStart > 0) {
    return {
      text: `SC trip starts in ${daysToStart} day${daysToStart === 1 ? '' : 's'}`,
      tone: 'amber',
    }
  }
  if (daysToStart === 0) {
    return { text: 'Trip starts TODAY', tone: 'green' }
  }
  if (today <= end) {
    return { text: 'Trip in progress', tone: 'blue' }
  }
  return { text: 'Trip complete', tone: 'slate' }
}

const CHIP_TONES = {
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  green: 'border-green-500/40 bg-green-500/10 text-green-300',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  slate: 'border-slate-600 bg-slate-700/40 text-slate-300',
}

// ─── Shared UI pieces ──────────────────────────────────────────────────────────

function CopyMessageButton({ text, label = 'Copy message' }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
        copied
          ? 'border-green-600/40 text-green-400 bg-green-500/10'
          : 'border-slate-600 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10'
      }`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied!' : label}
    </button>
  )
}

function StatusPill({ status, onAdvance }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['not-sent']
  return (
    <button
      onClick={onAdvance}
      title="Click to advance status"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${config.classes}`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </button>
  )
}

// ─── Section 2: Do This Now ────────────────────────────────────────────────────

function DoNowCard({ action, index, done, onToggle }) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        done
          ? 'border-green-700/40 bg-green-500/5'
          : 'border-slate-700 bg-surface-secondary hover:border-slate-600'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          aria-label={done ? 'Mark not done' : 'Mark done'}
          className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 transition-colors ${
            done
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-slate-500 hover:border-blue-400'
          }`}
        >
          {done && <Check className="w-4 h-4" strokeWidth={3} />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500">#{index + 1}</span>
            <span
              className={`text-sm font-semibold ${
                done ? 'text-slate-500 line-through' : 'text-slate-100'
              }`}
            >
              {action.title}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{action.why}</p>
          <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
            <Zap className="w-3 h-3" />
            {action.time}
          </span>
        </div>
      </div>
    </div>
  )
}

function NextActionCard({ action, index }) {
  const [showScript, setShowScript] = useState(false)

  return (
    <div className="rounded-xl border border-slate-700 bg-surface-secondary p-4 hover:border-slate-600 transition-all">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400 mt-0.5">
          {index + 4}
        </span>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-slate-100">{action.title}</span>
          <div className="mt-2.5">
            {action.type === 'copy' && <CopyMessageButton text={action.copyText} />}
            {action.type === 'script' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setShowScript((s) => !s)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors"
                  >
                    {showScript ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {showScript ? 'Hide phone script' : 'Show phone script'}
                  </button>
                  <CopyMessageButton text={action.script} label="Copy script" />
                </div>
                {showScript && (
                  <p className="text-xs text-slate-300 leading-relaxed bg-surface-tertiary/40 border border-slate-700 rounded-lg p-3">
                    {action.script}
                  </p>
                )}
              </div>
            )}
            {action.type === 'link' && (
              <Link
                to={action.to}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-600 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-colors"
              >
                <FileText className="w-3 h-3" />
                {action.linkLabel}
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section 3: Outreach queue ─────────────────────────────────────────────────

function OutreachRow({ item, status, onAdvance }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = CHANNEL_ICONS[item.channel] || Send

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-100">{item.person}</span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">{item.org}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs font-medium text-slate-500">{item.channel}</span>
            {item.note && (
              <span className="text-xs text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                {item.note}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-11 sm:ml-0">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700 transition-colors"
            aria-label={expanded ? 'Collapse message' : 'Expand message'}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <CopyMessageButton text={item.message} />
          <StatusPill status={status} onAdvance={onAdvance} />
        </div>
      </div>
      {expanded && (
        <p className="mt-3 ml-11 text-xs text-slate-300 leading-relaxed bg-surface-tertiary/40 border border-slate-700 rounded-lg p-3 whitespace-pre-line">
          {item.message}
        </p>
      )}
    </div>
  )
}

// ─── Section 4: Trip day card ──────────────────────────────────────────────────

function buildDayCalendarUrl(day) {
  const start = day.date.replace(/-/g, '')
  const next = new Date(day.date + 'T12:00:00')
  next.setDate(next.getDate() + 1)
  const pad = (n) => String(n).padStart(2, '0')
  const end = `${next.getFullYear()}${pad(next.getMonth() + 1)}${pad(next.getDate())}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `SCAiL SC Trip — ${day.focus}`,
    dates: `${start}/${end}`,
    details: day.items.join(' · '),
    location: 'South Carolina',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function TripDayCard({ day, isTodayCard }) {
  return (
    <div
      className={`flex-shrink-0 w-44 sm:w-auto rounded-xl border p-3 transition-all ${
        isTodayCard
          ? 'ring-2 ring-blue-500 border-blue-500/50 bg-blue-500/5'
          : day.anchor
            ? 'border-amber-500/40 bg-amber-500/5'
            : 'border-slate-700 bg-surface-secondary'
      }`}
    >
      <div className="flex items-baseline justify-between gap-1">
        <span className={`text-xs font-bold uppercase tracking-wider ${isTodayCard ? 'text-blue-400' : 'text-slate-500'}`}>
          {day.day}
        </span>
        <span className="text-xs text-slate-400">{day.label}</span>
      </div>
      <div className="flex items-center gap-1 mt-1.5">
        {day.anchor && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
        <span className={`text-sm font-semibold ${day.anchor ? 'text-amber-300' : 'text-slate-200'}`}>
          {day.focus}
        </span>
      </div>
      <ul className="mt-2 space-y-1">
        {day.items.map((it, i) => (
          <li key={i} className="text-xs text-slate-400 leading-snug flex items-start gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-slate-600 mt-1.5 flex-shrink-0" />
            {it}
          </li>
        ))}
      </ul>
      <a
        href={buildDayCalendarUrl(day)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 mt-3 pt-2 border-t border-slate-700/60 text-slate-500 hover:text-blue-400 transition-colors"
      >
        <CalendarCheck className="w-3 h-3" />
        <span style={{ fontSize: '0.65rem' }}>Add to Google Calendar</span>
      </a>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MissionControlPage() {
  const [doneMap, setDoneMap] = useLocalStorage('scail-mission-done', {})
  const [outreachStatus, setOutreachStatus] = useLocalStorage('scail-outreach-status', {})
  const [lastAction, setLastAction] = useLocalStorage('scail-last-action', null)

  const now = new Date()
  const countdown = useMemo(() => getTripCountdown(now), [now.toDateString()])
  const todayStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  function recordAction() {
    setLastAction(new Date().toISOString())
  }

  function toggleDone(id) {
    setDoneMap((prev) => ({ ...prev, [id]: !prev[id] }))
    recordAction()
  }

  function advanceStatus(id) {
    setOutreachStatus((prev) => {
      const current = prev[id] || 'not-sent'
      const nextIdx = (STATUS_ORDER.indexOf(current) + 1) % STATUS_ORDER.length
      return { ...prev, [id]: STATUS_ORDER[nextIdx] }
    })
    recordAction()
  }

  const doneCount = DO_NOW_ACTIONS.filter((a) => doneMap[a.id]).length
  const allDone = doneCount === DO_NOW_ACTIONS.length

  const statuses = OUTREACH_ITEMS.map((i) => outreachStatus[i.id] || 'not-sent')
  const sentCount = statuses.filter((s) => s !== 'not-sent').length
  const replyCount = statuses.filter((s) => s === 'replied' || s === 'meeting').length
  const meetingCount = statuses.filter((s) => s === 'meeting').length

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Rocket className="w-5 h-5 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Mission Control</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1.5">
            Your single source of what to do right now.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-secondary border border-slate-700">
            <CalendarDays className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">{todayStr}</span>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-semibold text-sm ${CHIP_TONES[countdown.tone]}`}
          >
            <Plane className="w-4 h-4" />
            {countdown.text}
          </div>
        </div>
      </div>

      {/* ── Do This Now ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Do This Now
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            {doneCount}/{DO_NOW_ACTIONS.length} done
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DO_NOW_ACTIONS.map((action, i) => (
            <DoNowCard
              key={action.id}
              action={action}
              index={i}
              done={!!doneMap[action.id]}
              onToggle={() => toggleDone(action.id)}
            />
          ))}
        </div>

        {allDone && (
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-green-600/40 bg-green-500/10 p-4 text-center">
              <p className="text-sm font-semibold text-green-300">
                🎉 All clear — you're ahead of 99% of founders today
              </p>
              <p className="text-xs text-green-400/70 mt-1">
                Momentum is a habit. Here are your next three.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {NEXT_ACTIONS.map((action, i) => (
                <NextActionCard key={action.id} action={action} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Outreach Queue ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Send className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Outreach Queue
          </h2>
        </div>
        <div className="rounded-xl border border-slate-700 bg-surface-secondary overflow-hidden">
          <div className="divide-y divide-slate-700/50">
            {OUTREACH_ITEMS.map((item) => (
              <OutreachRow
                key={item.id}
                item={item}
                status={outreachStatus[item.id] || 'not-sent'}
                onAdvance={() => advanceStatus(item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Trip Week Agenda ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Plane className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Trip Week Agenda
          </h2>
          <span className="text-xs text-slate-500">Mon Jul 6 → Sun Jul 12</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 lg:grid-cols-7 sm:overflow-visible">
          {TRIP_DAYS.map((day) => (
            <TripDayCard key={day.date} day={day} isTodayCard={day.date === todayIso} />
          ))}
        </div>
      </section>

      {/* ── The Angle ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Compass className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            The Angle
          </h2>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-blue-950/60 to-slate-900/40 p-5">
          <p className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider mb-4">
            Your positioning for every conversation this week
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ANGLE_BULLETS.map((b) => (
              <div key={b.heading} className="flex items-start gap-3">
                <span className="inline-block w-1 self-stretch rounded-full bg-amber-400/60 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-amber-300">{b.heading}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Momentum footer ── */}
      <div className="rounded-xl border border-slate-700 bg-surface-secondary px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap text-sm">
            <span className="flex items-center gap-1.5 text-slate-300">
              <TrendingUp className="w-4 h-4 text-slate-500" />
              <span className="font-semibold text-blue-400">{sentCount}</span> sent
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">
              <span className="font-semibold text-amber-400">{replyCount}</span> replies
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">
              <span className="font-semibold text-green-400">{meetingCount}</span> meetings set
            </span>
          </div>
          <span className="text-xs text-slate-500">
            Last action:{' '}
            {lastAction
              ? new Date(lastAction).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'none yet — check something off above'}
          </span>
        </div>
      </div>
    </div>
  )
}
