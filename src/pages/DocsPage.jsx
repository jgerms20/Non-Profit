import { useState, useMemo } from 'react'
import { FileText, ArrowLeft, Search, BookOpen, Tag } from 'lucide-react'
import Badge from '../components/ui/Badge'
import SearchInput from '../components/ui/SearchInput'

// Import markdown files as raw strings
import missionMd from '../../docs/mission-statements.md?raw'
import brandMd from '../../docs/brand-guide.md?raw'
import logoMd from '../../docs/logo-prompt.md?raw'

const DOCS = [
  {
    id: 'mission',
    title: 'Mission Statements',
    filename: 'mission-statements.md',
    description: 'Five draft versions of the SCAiL mission statement',
    category: 'Strategy',
  },
  {
    id: 'brand',
    title: 'Brand Guide',
    filename: 'brand-guide.md',
    description: 'Colors, typography, voice, and logo usage guidelines',
    category: 'Brand',
  },
  {
    id: 'logo',
    title: 'Logo Generation Prompts',
    filename: 'logo-prompt.md',
    description: 'AI prompts for generating the SCAiL logo',
    category: 'Brand',
  },
]

// Map doc IDs to their raw content
const DOC_CONTENT = {
  mission: missionMd,
  brand: brandMd,
  logo: logoMd,
}

const CATEGORY_VARIANTS = {
  Strategy: 'purple',
  Brand: 'info',
}

// --- Simple Markdown Parser ---

function parseInline(text) {
  const tokens = []
  let remaining = text

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
    if (boldMatch) {
      tokens.push({ type: 'bold', content: boldMatch[1] })
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Italic: *text* (but not **)
    const italicMatch = remaining.match(/^\*([^*]+?)\*/)
    if (italicMatch) {
      tokens.push({ type: 'italic', content: italicMatch[1] })
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // Inline code: `code`
    const codeMatch = remaining.match(/^`([^`]+?)`/)
    if (codeMatch) {
      tokens.push({ type: 'code', content: codeMatch[1] })
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // Link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+?)\]\(([^)]+?)\)/)
    if (linkMatch) {
      tokens.push({ type: 'link', text: linkMatch[1], url: linkMatch[2] })
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // Plain text — consume until next special character or end
    const plainMatch = remaining.match(/^[^*`[]+/)
    if (plainMatch) {
      tokens.push({ type: 'text', content: plainMatch[0] })
      remaining = remaining.slice(plainMatch[0].length)
      continue
    }

    // If nothing matched, consume one character to avoid infinite loop
    tokens.push({ type: 'text', content: remaining[0] })
    remaining = remaining.slice(1)
  }

  return tokens.map((token, i) => {
    switch (token.type) {
      case 'bold':
        return (
          <strong key={i} className="font-semibold text-slate-100">
            {token.content}
          </strong>
        )
      case 'italic':
        return (
          <em key={i} className="italic text-slate-300">
            {token.content}
          </em>
        )
      case 'code':
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-slate-800 dark:bg-slate-700 text-teal-300 dark:text-teal-300 text-sm font-mono"
          >
            {token.content}
          </code>
        )
      case 'link':
        return (
          <a
            key={i}
            href={token.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors"
          >
            {token.text}
          </a>
        )
      default:
        return <span key={i}>{token.content}</span>
    }
  })
}

function parseMarkdown(md) {
  if (!md) return []

  const lines = md.split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line.trim())) {
      blocks.push({ type: 'hr' })
      i++
      continue
    }

    // Headings
    const h3Match = line.match(/^###\s+(.+)/)
    if (h3Match) {
      blocks.push({ type: 'h3', content: h3Match[1] })
      i++
      continue
    }

    const h2Match = line.match(/^##\s+(.+)/)
    if (h2Match) {
      blocks.push({ type: 'h2', content: h2Match[1] })
      i++
      continue
    }

    const h1Match = line.match(/^#\s+(.+)/)
    if (h1Match) {
      blocks.push({ type: 'h1', content: h1Match[1] })
      i++
      continue
    }

    // List items (collect consecutive list items)
    if (/^\s*[-*]\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''))
        i++
      }
      blocks.push({ type: 'list', items })
      continue
    }

    // Paragraph — collect consecutive non-empty, non-special lines
    const paragraphLines = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^#{1,3}\s/.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i].trim()) &&
      !/^\s*[-*]\s+/.test(lines[i])
    ) {
      paragraphLines.push(lines[i])
      i++
    }
    if (paragraphLines.length > 0) {
      blocks.push({ type: 'paragraph', content: paragraphLines.join(' ') })
    }
  }

  return blocks
}

function RenderedMarkdown({ content }) {
  const blocks = useMemo(() => parseMarkdown(content), [content])

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={i}
                className="text-2xl font-bold text-navy-100 dark:text-slate-100 mt-8 mb-4 first:mt-0"
              >
                {parseInline(block.content)}
              </h1>
            )
          case 'h2':
            return (
              <h2
                key={i}
                className="text-xl font-semibold text-navy-200 dark:text-slate-200 mt-6 mb-3 pb-2 border-b border-slate-700/50"
              >
                {parseInline(block.content)}
              </h2>
            )
          case 'h3':
            return (
              <h3
                key={i}
                className="text-lg font-semibold text-navy-300 dark:text-slate-300 mt-5 mb-2"
              >
                {parseInline(block.content)}
              </h3>
            )
          case 'paragraph':
            return (
              <p key={i} className="text-sm text-slate-300 dark:text-slate-400 leading-relaxed">
                {parseInline(block.content)}
              </p>
            )
          case 'list':
            return (
              <ul key={i} className="space-y-1.5 ml-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-sm text-slate-300 dark:text-slate-400 leading-relaxed">
                    <span className="text-teal-400 mt-1 flex-shrink-0">&#8226;</span>
                    <span>{parseInline(item)}</span>
                  </li>
                ))}
              </ul>
            )
          case 'hr':
            return (
              <hr key={i} className="border-slate-700/50 my-6" />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

// --- Document Card ---

function DocCard({ doc, onView }) {
  const variant = CATEGORY_VARIANTS[doc.category] || 'default'

  return (
    <div className="flex flex-col rounded-xl bg-surface-secondary border border-slate-700 hover:border-slate-600 transition-all duration-150 overflow-hidden group">
      <div className="flex-1 p-5 space-y-3">
        {/* Category badge */}
        <div className="flex items-center gap-2">
          <Badge variant={variant}>{doc.category}</Badge>
        </div>

        {/* Title */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 rounded-lg bg-slate-800">
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100 leading-snug group-hover:text-blue-300 transition-colors">
              {doc.title}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">{doc.filename}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed">{doc.description}</p>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-700/50 flex items-center justify-end">
        <button
          onClick={() => onView(doc.id)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          View Document
        </button>
      </div>
    </div>
  )
}

// --- Main Page ---

export default function DocsPage() {
  const [search, setSearch] = useState('')
  const [activeDocId, setActiveDocId] = useState(null)

  // Filter documents by search
  const filteredDocs = useMemo(() => {
    if (!search.trim()) return DOCS
    const q = search.trim().toLowerCase()
    return DOCS.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q) ||
        doc.filename.toLowerCase().includes(q)
    )
  }, [search])

  const activeDoc = activeDocId ? DOCS.find((d) => d.id === activeDocId) : null
  const activeContent = activeDocId ? DOC_CONTENT[activeDocId] || '' : ''

  // Document viewer
  if (activeDoc) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back button */}
        <button
          onClick={() => setActiveDocId(null)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Documents
        </button>

        {/* Document header */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 rounded-xl bg-blue-500/10">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={CATEGORY_VARIANTS[activeDoc.category] || 'default'}>
                {activeDoc.category}
              </Badge>
              <span className="text-xs text-slate-500 font-mono">{activeDoc.filename}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100">{activeDoc.title}</h1>
            <p className="text-slate-400 mt-1 text-sm">{activeDoc.description}</p>
          </div>
        </div>

        {/* Document content */}
        <div className="rounded-xl bg-surface-secondary border border-slate-700 overflow-hidden">
          <div className="px-8 py-8 max-w-3xl mx-auto leading-relaxed">
            {activeContent ? (
              <RenderedMarkdown content={activeContent} />
            ) : (
              <div className="text-center py-12 text-slate-500">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">This document is not yet available.</p>
                <p className="text-xs mt-1 text-slate-600">
                  The file may still be in progress.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // List view
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-xl bg-blue-500/10">
          <BookOpen className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Documentation</h1>
          <p className="text-slate-400 mt-1">
            Internal documents, guides, and references
          </p>
        </div>
      </div>

      {/* Search */}
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search documents by title, description, or category..."
      />

      {/* Results count when searching */}
      {search && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {filteredDocs.length} result{filteredDocs.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
          </p>
          <button
            onClick={() => setSearch('')}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Document grid */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <DocCard key={doc.id} doc={doc} onView={setActiveDocId} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No documents found.</p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  )
}
