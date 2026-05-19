import { useState } from 'react'
import { ScrollText, ChevronDown, ChevronUp, Building2, Users, Calendar, DollarSign, Shield, FileText, BookOpen, Scale, AlertTriangle, Pencil, Gavel } from 'lucide-react'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const FOUNDING_BOARD = [
  { name: 'Joshua German', title: 'Founder & President', focus: 'Executive Leadership', group: 'A', term: '3-year' },
  { name: 'Janel Moore', title: 'Board Member — Treasurer', focus: 'Finance & Treasury', group: 'A', term: '3-year' },
  { name: 'Kinsey Meggett PhD', title: 'Board Member — Secretary', focus: 'Community Engagement & Education', group: 'A', term: '3-year' },
  { name: 'Tre Jenkins', title: 'Board Member — Technology & Data', focus: 'Technology Strategy & Data', group: 'B', term: '2-year' },
  { name: 'Darren Burton', title: 'Board Member — Education Policy & Operations', focus: 'Education Policy & Organizational Operations', group: 'B', term: '2-year' },
]

const ARTICLES = [
  {
    id: 'art-1',
    number: 'I',
    title: 'Name and Principal Office',
    icon: Building2,
    sections: [
      { id: '1.1', label: 'Name', text: 'The SCAiL Initiative, Inc.' },
      { id: '1.2', label: 'Principal Office', text: 'Located in the State of South Carolina.' },
      { id: '1.3', label: 'Registered Agent', text: 'A registered agent shall be maintained in South Carolina as required by law.' },
    ],
  },
  {
    id: 'art-2',
    number: 'II',
    title: 'Mission and Purpose',
    icon: BookOpen,
    sections: [
      {
        id: '2.1',
        label: 'Mission',
        text: 'Advance AI literacy across South Carolina, with particular focus on underserved, rural, and overlooked communities.',
      },
      {
        id: '2.2',
        label: 'Exempt Purpose',
        text: 'The organization operates exclusively for 501(c)(3) charitable and educational purposes, including:',
        list: [
          'Providing free or low-cost AI literacy education to the public',
          'Developing curriculum for non-technical individuals',
          'Training community educators in AI topics',
          'Conducting research on AI literacy gaps',
          'Forming partnerships with schools, libraries, and community organizations',
          'Eventually supporting a community innovation incubator',
        ],
      },
      {
        id: '2.3',
        label: 'Limitations',
        text: 'No net earnings shall inure to private persons. No activities shall be conducted outside the scope of 501(c)(3) status.',
      },
    ],
  },
  {
    id: 'art-3',
    number: 'III',
    title: 'Membership',
    icon: Users,
    sections: [
      {
        id: '3.1',
        label: 'No Membership Class',
        text: 'The corporation shall have no members as defined by the South Carolina Nonprofit Corporation Act. All authority vested in members by law shall be exercised by the Board of Directors.',
      },
    ],
  },
  {
    id: 'art-4',
    number: 'IV',
    title: 'Board of Directors',
    icon: Users,
    hasFoundingBoard: true,
    sections: [
      { id: '4.1', label: 'General Powers', text: 'The Board of Directors shall manage the affairs of the corporation.' },
      { id: '4.2', label: 'Number of Directors', text: 'The Board shall consist of not fewer than 3 and not more than 15 directors.' },
      { id: '4.3', label: 'Founding Board', text: 'See table below for the initial founding board members.' },
      {
        id: '4.4',
        label: 'Terms',
        text: 'Directors serve 2-year terms. Initial staggered terms: Group A (Joshua German, Janel Moore, Kinsey Meggett) serve 3-year initial terms; Group B (Tre Jenkins, Darren Burton) serve 2-year initial terms.',
      },
      { id: '4.5', label: 'Qualifications', text: 'Directors must be at least 18 years of age. No residency requirement.' },
      { id: '4.6', label: 'Election', text: 'Directors are nominated and elected by majority vote of the Board.' },
      { id: '4.7', label: 'Vacancies', text: 'Vacancies shall be filled by majority vote of the remaining directors.' },
      { id: '4.8', label: 'Removal', text: 'A director may be removed by a 2/3 vote of the Board. Absence from 3 consecutive meetings shall be deemed resignation.' },
      { id: '4.9', label: 'Resignation', text: 'A director may resign by providing written notice to the Board.' },
      { id: '4.10', label: 'Compensation', text: 'Directors shall receive no compensation for board service. Reasonable expenses may be reimbursed.' },
    ],
  },
  {
    id: 'art-5',
    number: 'V',
    title: 'Meetings of the Board',
    icon: Calendar,
    sections: [
      { id: '5.1', label: 'Annual Meeting', text: 'An annual meeting shall be held each year at a time and place determined by the Board.' },
      { id: '5.2', label: 'Regular Meetings', text: 'The Board shall meet at least quarterly (4 times per year minimum).' },
      { id: '5.3', label: 'Special Meetings', text: 'Special meetings may be called by the President or any 2 directors with at least 48 hours notice.' },
      { id: '5.4', label: 'Notice', text: 'At least 5 days notice shall be provided by email or text message.' },
      { id: '5.5', label: 'Quorum', text: 'A majority of directors then in office constitutes a quorum.' },
      { id: '5.6', label: 'Voting', text: 'Each director has one vote. A majority vote of those present is required to pass a resolution.' },
      { id: '5.7', label: 'Remote Participation', text: 'Directors may participate in meetings via telephone or video conference.' },
      { id: '5.8', label: 'Action Without Meeting', text: 'The Board may take action without a meeting if all directors consent to the action in writing.' },
    ],
  },
  {
    id: 'art-6',
    number: 'VI',
    title: 'Officers',
    icon: Shield,
    sections: [
      { id: '6.1', label: 'Officer Positions', text: 'The officers of the corporation shall be a President, Treasurer, and Secretary. No person may hold more than one officer position simultaneously.' },
      { id: '6.2', label: 'President', text: 'The President serves as Chief Executive Officer, presides at all meetings, and executes contracts on behalf of the corporation.' },
      { id: '6.3', label: 'Treasurer', text: 'The Treasurer shall have custody of all funds, prepare financial reports, and ensure grant compliance.' },
      { id: '6.4', label: 'Secretary', text: 'The Secretary shall maintain minutes of all meetings, keep corporate records, and provide notices.' },
      { id: '6.5', label: 'Terms', text: 'Officers serve 2-year terms. Consecutive terms are permitted.' },
      { id: '6.6', label: 'Removal', text: 'Officers may be removed by majority vote of the Board.' },
      { id: '6.7', label: 'Current Officers', text: 'Joshua German (President), Janel Moore (Treasurer), Kinsey Meggett PhD (Secretary).' },
    ],
  },
  {
    id: 'art-7',
    number: 'VII',
    title: 'Committees',
    icon: Users,
    sections: [
      {
        id: '7.1',
        label: 'Standing Committees',
        text: 'The Board shall maintain the following standing committees:',
        list: [
          'Finance & Audit Committee',
          'Program & Curriculum Committee',
          'Technology & Data Committee',
          'Governance & Nominating Committee',
        ],
      },
      { id: '7.2', label: 'Board Representation', text: 'Each standing committee shall include at least one board member.' },
      { id: '7.3', label: 'Authority Limits', text: 'Committees exercise only delegated authority and may not take binding action without full Board approval.' },
      { id: '7.4', label: 'Advisory Board', text: 'An Advisory Board of non-voting advisors may be established to provide guidance and expertise.' },
    ],
  },
  {
    id: 'art-8',
    number: 'VIII',
    title: 'Financial Management',
    icon: DollarSign,
    sections: [
      { id: '8.1', label: 'Fiscal Year', text: 'The fiscal year of the corporation shall begin January 1 and end December 31.' },
      { id: '8.2', label: 'Expenditure Approval', text: 'Expenditures greater than $1,000 require President approval. Expenditures greater than $5,000 require full Board approval.' },
      { id: '8.3', label: 'Checks & Disbursements', text: 'Checks and disbursements shall be signed by the Treasurer and/or President.' },
      { id: '8.4', label: 'Loans Prohibited', text: 'No loans shall be made to directors or officers of the corporation.' },
      { id: '8.5', label: 'Audit Requirements', text: 'An annual financial review shall be conducted. A full audit is required when annual revenue exceeds $250,000.' },
      { id: '8.6', label: 'Grant Tracking', text: 'All grant funds shall be tracked separately and expended in accordance with grant requirements.' },
    ],
  },
  {
    id: 'art-9',
    number: 'IX',
    title: 'Indemnification and Liability',
    icon: Shield,
    sections: [
      { id: '9.1', label: 'Indemnification', text: 'The corporation shall indemnify its directors and officers to the fullest extent permitted by the South Carolina Nonprofit Corporation Act.' },
      { id: '9.2', label: 'Insurance', text: 'The corporation may purchase Directors and Officers (D&O) liability insurance.' },
    ],
  },
  {
    id: 'art-10',
    number: 'X',
    title: 'Records and Reports',
    icon: FileText,
    sections: [
      {
        id: '10.1',
        label: 'Corporate Records',
        text: 'The corporation shall maintain the following records:',
        list: [
          'Articles of Incorporation and all amendments',
          'Bylaws and all amendments',
          'Minutes of all board meetings',
          'Financial statements and reports',
          'Conflict of Interest disclosures',
          'Executed contracts',
        ],
      },
      { id: '10.2', label: 'Public Inspection', text: 'The corporation shall make available for public inspection its Form 1023 application, Form 990 annual returns, and IRS determination letter.' },
    ],
  },
  {
    id: 'art-11',
    number: 'XI',
    title: 'Conflict of Interest',
    icon: AlertTriangle,
    sections: [
      { id: '11.1', label: 'COI Policy', text: 'The corporation shall adopt a written Conflict of Interest policy. All directors and officers shall review and sign the policy annually.' },
      { id: '11.2', label: 'Recusal', text: 'Any director or officer with a personal financial interest in a transaction must disclose the interest and recuse themselves from the vote.' },
    ],
  },
  {
    id: 'art-12',
    number: 'XII',
    title: 'Dissolution',
    icon: Scale,
    sections: [
      { id: '12.1', label: 'Vote to Dissolve', text: 'Dissolution of the corporation requires approval by 2/3 of the Board of Directors.' },
      { id: '12.2', label: 'Asset Distribution', text: 'Upon dissolution, all remaining assets shall be distributed to one or more organizations recognized as 501(c)(3) tax-exempt organizations. Assets shall never be distributed to private individuals.' },
    ],
  },
  {
    id: 'art-13',
    number: 'XIII',
    title: 'Amendments',
    icon: Pencil,
    sections: [
      { id: '13.1', label: 'Amendment Process', text: 'These bylaws may be amended by a 2/3 vote of the Board of Directors, provided that at least 10 days written notice of the proposed amendment has been given to all directors.' },
    ],
  },
  {
    id: 'art-14',
    number: 'XIV',
    title: 'Parliamentary Authority',
    icon: Gavel,
    sections: [
      { id: '14.1', label: 'Robert\'s Rules', text: "The rules contained in the most recent edition of Robert's Rules of Order shall govern the proceedings of the corporation in all cases to which they are applicable and in which they are not inconsistent with these bylaws." },
    ],
  },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ArticleCard({ article }) {
  const [open, setOpen] = useState(false)
  const Icon = article.icon

  return (
    <div className="rounded-xl border border-slate-200 dark:border-surface-border bg-white dark:bg-surface-secondary overflow-hidden transition-all duration-200">
      {/* Article header — always visible, clickable */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-surface-tertiary transition-colors group"
        aria-expanded={open}
      >
        {/* Article number badge */}
        <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-navy text-brand-gold text-xs font-bold select-none">
          {article.number}
        </span>

        {/* Icon + title */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block leading-none mb-0.5">
              Article {article.number}
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white truncate block">
              {article.title}
            </span>
          </div>
        </div>

        {/* Section count + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
            {article.sections.length} section{article.sections.length !== 1 ? 's' : ''}
          </span>
          {open
            ? <ChevronUp className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
            : <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          }
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-slate-200 dark:border-surface-border px-5 py-5 space-y-4">
          {article.sections.map((section) => (
            <SectionItem key={section.id} section={section} />
          ))}

          {/* Founding board table for Article IV */}
          {article.hasFoundingBoard && (
            <FoundingBoardTable />
          )}
        </div>
      )}
    </div>
  )
}

function SectionItem({ section }) {
  return (
    <div className="flex gap-3">
      {/* Section number */}
      <span className="flex-shrink-0 mt-0.5 text-xs font-mono font-semibold text-brand-gold w-8 text-right leading-5">
        §{section.id}
      </span>

      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {section.label}
        </span>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-0.5">
          {section.text}
        </p>
        {section.list && (
          <ul className="mt-2 space-y-1">
            {section.list.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="flex-shrink-0 text-brand-gold mt-1">&#8226;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function FoundingBoardTable() {
  return (
    <div className="mt-2 rounded-lg border border-slate-200 dark:border-surface-border overflow-hidden">
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-surface-tertiary border-b border-slate-200 dark:border-surface-border">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Founding Board — Section 4.3
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-surface-border bg-slate-50/60 dark:bg-surface-tertiary/60">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Name</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Title</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide hidden md:table-cell">Focus Area</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Group</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide hidden sm:table-cell">Initial Term</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-surface-border">
            {FOUNDING_BOARD.map((member) => (
              <tr key={member.name} className="hover:bg-slate-50 dark:hover:bg-surface-tertiary/50 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">{member.name}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{member.title}</td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400 hidden md:table-cell">{member.focus}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    member.group === 'A'
                      ? 'bg-brand-navy/10 text-brand-navy dark:bg-brand-gold/10 dark:text-brand-gold'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    Group {member.group}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs hidden sm:table-cell">{member.term}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function BylawsPage() {
  const [allOpen, setAllOpen] = useState(false)

  function handleExpandAll() {
    setAllOpen((prev) => !prev)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-xl bg-brand-navy/10 dark:bg-brand-navy/30">
          <ScrollText className="w-6 h-6 text-brand-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Bylaws</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Governing bylaws of The SCAiL Initiative, Inc. — the legal rules that define how we operate.
          </p>
        </div>
      </div>

      {/* Meta info banner */}
      <div className="rounded-xl border border-slate-200 dark:border-surface-border bg-white dark:bg-surface-secondary overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-brand-navy via-brand-gold to-brand-navy" />
        <div className="px-6 py-5 flex flex-wrap gap-6 items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Organization</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">The SCAiL Initiative, Inc.</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">SC Filing ID</p>
            <p className="text-sm font-mono font-semibold text-brand-gold">260320-1607524</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Adopted</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">April 2026</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Articles</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{ARTICLES.length} Articles</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">State</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">South Carolina</p>
          </div>
        </div>
      </div>

      {/* Expand / Collapse all toggle */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click any article to expand its sections.
        </p>
        <button
          onClick={handleExpandAll}
          className="text-xs font-medium text-brand-gold hover:text-amber-400 dark:hover:text-amber-300 transition-colors underline underline-offset-2"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {/* Articles list */}
      <div className="space-y-3">
        {ARTICLES.map((article) => (
          <ControlledArticleCard key={article.id} article={article} forceOpen={allOpen} />
        ))}
      </div>

      {/* Footer note */}
      <div className="rounded-lg bg-slate-50 dark:bg-surface-secondary border border-slate-200 dark:border-surface-border px-5 py-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Note:</span> These bylaws govern the internal operations of The SCAiL Initiative, Inc. and are subject to the South Carolina Nonprofit Corporation Act. Amendments require a 2/3 Board vote with 10 days written notice (Article XIII).
        </p>
      </div>
    </div>
  )
}

// Wrapper that supports both internal toggle and external "expand all" override
function ControlledArticleCard({ article, forceOpen }) {
  const [localOpen, setLocalOpen] = useState(false)
  const Icon = article.icon

  // forceOpen=true overrides local state to open; forceOpen=false collapses
  const isOpen = forceOpen || localOpen

  function handleToggle() {
    if (forceOpen) {
      // When all are force-expanded, clicking individual card closes only that one
      // We can't easily do this without lifting state further; just toggle local
      setLocalOpen((o) => !o)
    } else {
      setLocalOpen((o) => !o)
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-surface-border bg-white dark:bg-surface-secondary overflow-hidden transition-all duration-200">
      {/* Article header */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-surface-tertiary transition-colors group"
        aria-expanded={isOpen}
      >
        <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-navy text-brand-gold text-xs font-bold select-none">
          {article.number}
        </span>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block leading-none mb-0.5">
              Article {article.number}
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white truncate block">
              {article.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
            {article.sections.length} section{article.sections.length !== 1 ? 's' : ''}
          </span>
          {isOpen
            ? <ChevronUp className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
            : <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          }
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div className="border-t border-slate-200 dark:border-surface-border px-5 py-5 space-y-4">
          {article.sections.map((section) => (
            <SectionItem key={section.id} section={section} />
          ))}

          {article.hasFoundingBoard && (
            <FoundingBoardTable />
          )}
        </div>
      )}
    </div>
  )
}
