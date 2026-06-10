import PalmettoTree from './PalmettoTree'
import SCCrescent from './SCCrescent'
import Reveal from './Reveal'

// Shared hero banner for interior pages — navy night sky with palmettos.
export default function PageHero({ title, accent, subtitle, children }) {
  return (
    <section className="relative bg-gradient-to-b from-brand-navy-deep to-brand-navy text-white py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-faint pointer-events-none" aria-hidden="true" />
      <SCCrescent className="absolute top-8 right-[16%] h-8 w-8 text-brand-gold/50 animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-0 -left-2 text-black/20 pointer-events-none" aria-hidden="true">
        <PalmettoTree className="h-36 sm:h-44 w-auto" />
      </div>
      <div className="absolute bottom-0 -right-2 text-black/20 pointer-events-none" aria-hidden="true">
        <PalmettoTree className="h-32 sm:h-40 w-auto" style={{ transform: 'scaleX(-1)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-balance">
            {title} {accent && <span className="text-gradient-gold">{accent}</span>}
          </h1>
          {subtitle && (
            <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">{subtitle}</p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  )
}
