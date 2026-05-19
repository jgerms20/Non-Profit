import { useState } from 'react'
import { ShieldCheck, ChevronDown, ChevronRight, FileText, Users, DollarSign, ClipboardCheck, Search, AlertTriangle } from 'lucide-react'

const articles = [
  {
    num: 'I',
    title: 'Purpose',
    icon: ShieldCheck,
    sections: [
      {
        label: 'Purpose',
        text: 'The purpose of this Conflict of Interest Policy is to protect the interests of The SCAiL Initiative, Inc. (the "Corporation") when it is contemplating entering into a transaction or arrangement that might benefit the private interest of a director, officer, or key employee of the Corporation, or might result in a possible excess benefit transaction.',
      },
      {
        label: 'Scope',
        text: 'This policy is intended to supplement, but not replace, any applicable state and federal laws governing conflict of interest applicable to nonprofit and charitable organizations.',
      },
    ],
  },
  {
    num: 'II',
    title: 'Definitions',
    icon: FileText,
    sections: [
      {
        label: '2.1 — Interested Person',
        text: 'Any director, officer, or member of a committee with board-delegated powers who has a direct or indirect financial interest, as defined below, is an interested person.',
      },
      {
        label: '2.2 — Financial Interest',
        text: 'A person has a financial interest if the person has, directly or indirectly, through business, investment, or family:',
        bullets: [
          'An ownership or investment interest in any entity with which the Corporation has a transaction or arrangement;',
          'A compensation arrangement with the Corporation or with any entity or individual with which the Corporation has a transaction or arrangement; or',
          'A potential ownership or investment interest in, or compensation arrangement with, any entity or individual with which the Corporation is negotiating a transaction or arrangement.',
        ],
        note: 'Compensation includes direct and indirect remuneration as well as gifts or favors that are not insubstantial. A financial interest is not necessarily a conflict of interest. A person who has a financial interest may have a conflict of interest only if the Board of Directors or appropriate committee decides that a conflict of interest exists.',
      },
    ],
  },
  {
    num: 'III',
    title: 'Procedures',
    icon: ClipboardCheck,
    sections: [
      {
        label: '3.1 — Duty to Disclose',
        text: 'In connection with any actual or possible conflict of interest, an interested person must disclose the existence of the financial interest and be given the opportunity to disclose all material facts to the Board of Directors or committee considering the proposed transaction or arrangement.',
      },
      {
        label: '3.2 — Determining Whether a Conflict Exists',
        text: 'After disclosure of the financial interest and all material facts, and after any discussion with the interested person, the interested person shall leave the Board or committee meeting while the determination of a conflict of interest is discussed and voted upon. The remaining Board or committee members shall decide if a conflict of interest exists.',
      },
      {
        label: '3.3 — Procedures for Addressing the Conflict',
        text: 'If a conflict of interest is determined to exist:',
        bullets: [
          'An interested person may make a presentation at the Board or committee meeting, but after the presentation, the interested person shall leave the meeting during the discussion of, and the vote on, the transaction or arrangement involving the possible conflict of interest.',
          'The President or committee chair shall, if appropriate, appoint a disinterested person or committee to investigate alternatives to the proposed transaction or arrangement.',
          'After exercising due diligence, the Board or committee shall determine whether the Corporation can obtain with reasonable efforts a more advantageous transaction or arrangement from a person or entity that would not give rise to a conflict of interest.',
          'If a more advantageous transaction or arrangement is not reasonably possible under circumstances not producing a conflict of interest, the Board or committee shall determine by a majority vote of the disinterested directors whether the transaction or arrangement is in the Corporation\'s best interest, for its own benefit, and whether it is fair and reasonable.',
        ],
      },
      {
        label: '3.4 — Violations',
        text: 'If the Board or committee has reasonable cause to believe a person has failed to disclose actual or possible conflicts of interest, it shall inform the person of the basis for such belief and afford the person an opportunity to explain the alleged failure to disclose. If, after hearing the response and making further investigation as warranted, the Board determines the person has failed to disclose an actual or possible conflict of interest, it shall take appropriate disciplinary and corrective action.',
      },
    ],
  },
  {
    num: 'IV',
    title: 'Records of Proceedings',
    icon: FileText,
    sections: [
      {
        label: 'Minutes Requirements',
        text: 'The minutes of the Board and all committees with board-delegated powers shall contain:',
        bullets: [
          'The names of the persons who disclosed or otherwise were found to have a financial interest, the nature of the financial interest, any action taken to determine whether a conflict was present, and the Board\'s decision as to whether a conflict existed.',
          'The names of the persons present for discussions and votes relating to the transaction or arrangement, the content of the discussion, including alternatives considered, and a record of any votes taken.',
        ],
      },
    ],
  },
  {
    num: 'V',
    title: 'Compensation',
    icon: DollarSign,
    sections: [
      {
        label: 'Voting Restrictions',
        text: 'A voting member of the Board who receives compensation, directly or indirectly, from the Corporation for services is precluded from voting on matters pertaining to that member\'s compensation.',
      },
      {
        label: 'Committee Restrictions',
        text: 'A voting member of any committee whose jurisdiction includes compensation matters and who receives compensation from the Corporation is precluded from voting on matters pertaining to that member\'s compensation. No such member is prohibited from providing information to any committee regarding compensation.',
      },
    ],
  },
  {
    num: 'VI',
    title: 'Annual Statements',
    icon: ClipboardCheck,
    sections: [
      {
        label: 'Annual Affirmation',
        text: 'Each director, officer, and member of a committee with board-delegated powers shall annually sign a statement which affirms such person:',
        bullets: [
          'Has received a copy of the Conflict of Interest Policy;',
          'Has read and understands the policy;',
          'Has agreed to comply with the policy; and',
          'Understands the Corporation is charitable and that in order to maintain its federal tax exemption it must engage primarily in activities which accomplish one or more of its tax-exempt purposes.',
        ],
      },
    ],
  },
  {
    num: 'VII',
    title: 'Periodic Reviews',
    icon: Search,
    sections: [
      {
        label: 'Review Scope',
        text: 'To ensure the Corporation operates in a manner consistent with charitable purposes, periodic reviews shall include at minimum:',
        bullets: [
          'Whether compensation arrangements and benefits are reasonable, based on competent survey information, and the result of arm\'s length bargaining.',
          'Whether partnerships, joint ventures, and arrangements with management organizations conform to written policies, are properly recorded, reflect reasonable payments, further charitable purposes, and do not result in inurement, impermissible private benefit, or an excess benefit transaction.',
        ],
      },
    ],
  },
]

function ArticleCard({ article, expanded, onToggle }) {
  const Icon = article.icon
  return (
    <div className="rounded-xl border border-slate-200 dark:border-surface-border bg-white dark:bg-surface-secondary overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-surface-tertiary/50 transition-colors"
      >
        <div className="h-9 w-9 rounded-lg bg-brand-navy flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-brand-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-mono text-brand-gold mr-2">Art. {article.num}</span>
          <span className="font-semibold text-slate-900 dark:text-white text-sm">{article.title}</span>
        </div>
        <span className="text-xs text-slate-400 mr-2">{article.sections.length} section{article.sections.length !== 1 ? 's' : ''}</span>
        {expanded ? (
          <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-slate-200 dark:border-surface-border p-4 space-y-4">
          {article.sections.map((section, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-brand-gold mb-1">{section.label}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{section.text}</p>
              {section.bullets && (
                <ul className="mt-2 space-y-1.5 ml-4">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex gap-2">
                      <span className="text-brand-teal mt-0.5 shrink-0">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.note && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">{section.note}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ConflictOfInterestPage() {
  const [expandedArticles, setExpandedArticles] = useState({})
  const [allExpanded, setAllExpanded] = useState(false)

  const toggleArticle = (num) => {
    setExpandedArticles((prev) => ({ ...prev, [num]: !prev[num] }))
  }

  const toggleAll = () => {
    const next = !allExpanded
    setAllExpanded(next)
    const state = {}
    articles.forEach((a) => { state[a.num] = next })
    setExpandedArticles(state)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-brand-navy/10 dark:bg-brand-navy/30 flex items-center justify-center shrink-0">
          <ShieldCheck className="h-6 w-6 text-brand-navy dark:text-brand-teal" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Conflict of Interest Policy</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            The SCAiL Initiative, Inc. — IRS-compliant policy for nonprofit governance
          </p>
        </div>
      </div>

      {/* Meta */}
      <div className="rounded-xl border border-slate-200 dark:border-surface-border bg-gradient-to-r from-brand-navy/5 to-transparent dark:from-brand-navy/20 p-4 flex flex-wrap gap-4 text-xs">
        <span className="text-slate-600 dark:text-slate-300"><strong>SC Filing ID:</strong> 260320-1607524</span>
        <span className="text-slate-600 dark:text-slate-300"><strong>Articles:</strong> 7</span>
        <span className="text-slate-600 dark:text-slate-300"><strong>Includes:</strong> Annual Disclosure Form</span>
      </div>

      {/* Toggle All */}
      <div className="flex justify-end">
        <button
          onClick={toggleAll}
          className="text-xs text-brand-teal hover:text-brand-navy dark:hover:text-white font-medium transition-colors"
        >
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Articles */}
      <div className="space-y-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.num}
            article={article}
            expanded={!!expandedArticles[article.num]}
            onToggle={() => toggleArticle(article.num)}
          />
        ))}
      </div>

      {/* Annual Disclosure Form */}
      <div className="rounded-xl border-2 border-dashed border-brand-gold/40 bg-white dark:bg-surface-secondary p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
            <ClipboardCheck className="h-5 w-5 text-brand-gold" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Annual Disclosure Form</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">To be completed by each director and officer annually</p>
          </div>
        </div>

        {/* Part A */}
        <div>
          <h3 className="text-sm font-semibold text-brand-navy dark:text-brand-teal mb-3 uppercase tracking-wider">Part A — Acknowledgment</h3>
          <div className="space-y-2">
            {[
              'I have received a copy of the Conflict of Interest Policy of The SCAiL Initiative, Inc.',
              'I have read and understand the policy.',
              'I agree to comply with the policy.',
              'I understand that The SCAiL Initiative, Inc. is a tax-exempt organization and that in order to maintain its federal tax exemption it must engage primarily in activities which accomplish one or more of its tax-exempt purposes.',
            ].map((item, i) => (
              <label key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-surface-tertiary/30">
                <div className="h-4 w-4 mt-0.5 rounded border-2 border-slate-300 dark:border-slate-600 shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Part B */}
        <div>
          <h3 className="text-sm font-semibold text-brand-navy dark:text-brand-teal mb-3 uppercase tracking-wider">Part B — Disclosure of Financial Interests</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Do you have any financial interests, as defined in Article II, to disclose?</p>
          <div className="space-y-2 mb-4">
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-surface-tertiary/30">
              <div className="h-4 w-4 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0" />
              <span className="text-sm text-slate-700 dark:text-slate-300">No, I have no financial interests to disclose.</span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-surface-tertiary/30">
              <div className="h-4 w-4 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0" />
              <span className="text-sm text-slate-700 dark:text-slate-300">Yes, I have financial interests to disclose (describe below):</span>
            </label>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-4">{n}.</span>
                <div className="flex-1 h-8 border-b-2 border-dotted border-slate-300 dark:border-slate-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Part C */}
        <div>
          <h3 className="text-sm font-semibold text-brand-navy dark:text-brand-teal mb-3 uppercase tracking-wider">Part C — Relationships</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Are you a director, officer, employee, or agent of any organization that does business with The SCAiL Initiative, Inc.?</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">No</span>
                </label>
                <label className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Yes</span>
                </label>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-slate-400">If yes:</span>
                <div className="flex-1 h-8 border-b-2 border-dotted border-slate-300 dark:border-slate-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Do you have any family members who have a financial interest in any entity that does business with The SCAiL Initiative, Inc.?</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">No</span>
                </label>
                <label className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Yes</span>
                </label>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-slate-400">If yes:</span>
                <div className="flex-1 h-8 border-b-2 border-dotted border-slate-300 dark:border-slate-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="pt-4 border-t border-slate-200 dark:border-surface-border space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400 w-28 shrink-0">Signature:</span>
            <div className="flex-1 h-8 border-b-2 border-slate-300 dark:border-slate-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400 w-28 shrink-0">Printed Name:</span>
            <div className="flex-1 h-8 border-b-2 border-slate-300 dark:border-slate-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400 w-28 shrink-0">Date:</span>
            <div className="flex-1 h-8 border-b-2 border-slate-300 dark:border-slate-600" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-xl p-4 bg-gradient-to-br from-brand-navy to-blue-900 text-white text-center">
        <p className="text-sm font-medium">The SCAiL Initiative, Inc.</p>
        <p className="text-xs text-white/60 mt-1">SC Filing ID: 260320-1607524 — South Carolina AI Literacy</p>
      </div>
    </div>
  )
}
