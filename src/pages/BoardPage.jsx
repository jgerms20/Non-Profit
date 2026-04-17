import { Users, Mail, Linkedin, Award, BookOpen, DollarSign, FileText } from 'lucide-react'
import boardData from '../data/board.json'

export default function BoardPage() {
  const { foundingBoard, boardStructure } = boardData

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Board of Directors</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          The SCAiL Initiative founding board. Three leaders, one mission: AI literacy for every community in South Carolina.
        </p>
      </div>

      {/* Board Structure Overview */}
      <div className="rounded-xl border border-slate-200 dark:border-surface-border bg-white dark:bg-surface-secondary p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Board Structure</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(boardStructure).map(([role, info]) => (
            <div key={role} className="p-4 rounded-lg bg-slate-50 dark:bg-surface-tertiary">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                {role === 'president' ? '👤 President' : role === 'treasurer' ? '💰 Treasurer' : '📋 Secretary'}
              </p>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">{info.name}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{info.responsibilities}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Board Members */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Founding Board Members</h2>
        {foundingBoard.map((member) => (
          <div key={member.id} className="rounded-xl border border-slate-200 dark:border-surface-border overflow-hidden">
            {/* Header bar */}
            <div
              className={`h-1.5 ${
                member.id === 'joshua-german'
                  ? 'bg-gradient-to-r from-brand-navy to-brand-teal'
                  : member.id === 'janel-moore'
                    ? 'bg-gradient-to-r from-brand-gold to-amber-600'
                    : 'bg-gradient-to-r from-teal-500 to-green-600'
              }`}
            />
            <div className="p-6 bg-white dark:bg-surface-secondary">
              {/* Name and title */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-brand-gold font-medium">{member.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{member.organization}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 dark:text-slate-500">Joined {member.joinDate}</p>
                </div>
              </div>

              {/* Background */}
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{member.background}</p>

              {/* Two-column grid for details */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Education */}
                {member.education && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      Education
                    </h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      {member.education.map((edu, i) => (
                        <li key={i} className="leading-tight">
                          • {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Responsibilities */}
                {member.responsibilities && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      Responsibilities
                    </h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      {member.responsibilities.map((resp, i) => (
                        <li key={i} className="leading-tight">
                          • {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Awards */}
                {member.awards && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" />
                      Awards
                    </h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      {member.awards.map((award, i) => (
                        <li key={i} className="leading-tight">
                          • {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Organizations */}
                {member.organizations && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      Memberships
                    </h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      {member.organizations.map((org, i) => (
                        <li key={i} className="leading-tight">
                          • {org}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Contact / Links */}
              {member.linkedin && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-surface-border flex gap-2">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-teal hover:text-brand-navy dark:hover:text-brand-gold transition-colors"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Meeting Schedule */}
      <div className="rounded-xl p-6 bg-gradient-to-br from-brand-navy to-blue-900 text-white">
        <h3 className="font-semibold text-lg mb-2">Board Meetings</h3>
        <p className="text-sm text-white/80 mb-3">Quarterly meetings scheduled throughout 2026 to guide SCAiL's growth and impact.</p>
        <p className="text-xs text-white/60">
          <strong>Frequency:</strong> Quarterly | <strong>Next Meeting:</strong> TBD | <strong>Status:</strong> Inaugural board formed April 2026
        </p>
      </div>
    </div>
  )
}
