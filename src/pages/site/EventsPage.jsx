import { Link } from 'react-router-dom'
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Ticket,
  ArrowRight,
  Star,
  Sparkles,
  Laptop,
  Briefcase,
  Rocket,
  PartyPopper,
} from 'lucide-react'

import publicEvents from '../../data/publicEvents.json'

const { meta, eventTypes, upcoming, flagship } = publicEvents

// ─── Event type icon map ─────────────────────────────────────────────────────
const typeIcons = {
  'intro-to-ai': Laptop,
  'ai-for-work': Briefcase,
  'youth-lab': Rocket,
  'demo-day': PartyPopper,
}

// ─── Date helpers ─────────────────────────────────────────────────────────────
function formatDateParts(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`)
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.toLocaleDateString('en-US', { day: 'numeric' }),
    weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
  }
}

export default function EventsPage() {
  return (
    <div>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B365D] via-[#0F172A] to-[#0F172A] pt-28 sm:pt-36 pb-24 sm:pb-32">
        {/* Decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#2EC4B6]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <CalendarDays className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-medium text-white/70 tracking-wider uppercase">
              Events
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
            {meta.tagline}
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
            {meta.recurring}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#upcoming"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-7 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              See what&rsquo;s coming up
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/site/get-involved"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Host a class
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT WE RUN ───────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              What We Run
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              Four formats, one goal &mdash; meet people where they are and
              give them AI skills they can use the same day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {eventTypes.map((type) => {
              const Icon = typeIcons[type.id] || Sparkles
              const isFree = type.cost.toLowerCase() === 'free'
              return (
                <div
                  key={type.id}
                  className="flex flex-col rounded-2xl border border-white/10 bg-[#1e293b] p-6 sm:p-8 transition-all duration-200 hover:border-[#2EC4B6]/40 hover:shadow-xl hover:shadow-black/20"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#2EC4B6]/10 mb-5">
                    <Icon className="w-6 h-6 text-[#2EC4B6]" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {type.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                      <Clock className="w-3.5 h-3.5" />
                      {type.format}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        isFree
                          ? 'bg-[#2EC4B6]/10 text-[#2EC4B6]'
                          : 'bg-[#D4A843]/10 text-[#D4A843]'
                      }`}
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      {type.cost}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed flex-1">
                    {type.description}
                  </p>

                  <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500">
                    <CalendarDays className="w-3.5 h-3.5 text-[#D4A843]" />
                    {type.cadence}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. UPCOMING ──────────────────────────────────────────────────── */}
      <section id="upcoming" className="bg-[#0F172A] py-20 sm:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Upcoming Events
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              New dates are added every month &mdash; check back often or
              host one in your own town.
            </p>
          </div>

          <div className="space-y-5 max-w-4xl mx-auto">
            {upcoming.map((event) => {
              const { month, day, weekday } = formatDateParts(event.date)
              const venueIsTBD = event.venue.includes('TBD')
              const spotsLeft = event.capacity - event.registered

              return (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-white/10 bg-[#1e293b] p-6 sm:p-8 transition-all duration-200 hover:border-[#D4A843]/40 hover:shadow-xl hover:shadow-black/20"
                >
                  {/* Date block */}
                  <div className="flex-shrink-0 flex sm:flex-col items-center justify-center gap-3 sm:gap-0 sm:w-24 sm:h-24 rounded-xl bg-[#1B365D] border border-white/10 py-4 sm:py-0">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#D4A843]">
                      {month}
                    </span>
                    <span className="text-3xl font-extrabold text-white leading-none">
                      {day}
                    </span>
                    <span className="text-xs text-slate-400 sm:mt-1">
                      {weekday}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center rounded-full bg-[#2EC4B6]/10 text-[#2EC4B6] px-2.5 py-0.5 text-xs font-semibold">
                        {event.type}
                      </span>
                      {event.status === 'planning' && (
                        <span className="text-xs font-medium text-slate-500">
                          Registration opening soon
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-500" />
                        {event.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        {event.city}
                        {' — '}
                        <span className={venueIsTBD ? 'text-slate-500 italic' : ''}>
                          {event.venue}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-slate-500" />
                        {event.registered} / {event.capacity} registered
                        {spotsLeft > 0 && event.status !== 'planning' && (
                          <span className="text-[#2EC4B6]"> &middot; {spotsLeft} spots left</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* RSVP */}
                  <div className="flex-shrink-0 flex items-center">
                    <a
                      href={event.rsvpLink}
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-lg bg-[#D4A843] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/20 hover:bg-[#e0b856] transition-colors"
                    >
                      RSVP
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. FLAGSHIP ──────────────────────────────────────────────────── */}
      <section className="bg-[#1B365D] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-14 text-center">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4A843]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2EC4B6]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4A843]/10 border border-[#D4A843]/20 mb-6">
                <Star className="w-8 h-8 text-[#D4A843]" />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-slate-300 mb-5">
                {flagship.status} &middot; {flagship.targetDate}
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                {flagship.name}
              </h2>

              <p className="text-lg sm:text-xl font-semibold text-[#2EC4B6] max-w-2xl mx-auto mb-6">
                {flagship.tagline}
              </p>

              <p className="text-slate-300/80 leading-relaxed max-w-2xl mx-auto">
                {flagship.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA BAND ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1B365D] to-[#0F172A] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4A843]/10 mb-6">
            <MapPin className="w-6 h-6 text-[#D4A843]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Want SCAiL in your town?
          </h2>
          <p className="mt-4 text-slate-300/80 text-lg">
            Libraries, churches, community centers, schools &mdash; wherever
            people gather, we&rsquo;ll bring free AI classes to you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/site/get-involved"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-8 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Host a Class
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/site/academy"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Explore the Academy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
