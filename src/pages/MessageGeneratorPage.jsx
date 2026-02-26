import { useState, useMemo, useEffect } from 'react'
import {
  Mail,
  Calendar,
  RefreshCw,
  Handshake,
  Copy,
  Check,
  User,
  Building2,
  Eye,
  AlertCircle,
} from 'lucide-react'
import contactsData from '../data/contacts.json'
import templatesData from '../data/messageTemplates.json'
import { useLocalStorage } from '../hooks/useLocalStorage'
import CopyButton from '../components/ui/CopyButton'
import Select from '../components/ui/Select'
import { copyToClipboard } from '../utils/clipboard'

const TEMPLATE_ICONS = {
  Mail,
  Calendar,
  RefreshCw,
  Handshake,
}

// Replace all {{placeholder}} occurrences in a string with values
function renderTemplate(template, values) {
  if (!template) return ''
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const val = values[key]
    return val !== undefined && val !== '' ? val : match
  })
}

// Find all unreplaced placeholders
function findUnreplacedPlaceholders(text) {
  const matches = []
  const regex = /\{\{(\w+)\}\}/g
  let m
  while ((m = regex.exec(text)) !== null) {
    matches.push(m[1])
  }
  return [...new Set(matches)]
}

// Render preview text with highlighted unreplaced placeholders
function PreviewText({ text }) {
  if (!text) return null

  const parts = text.split(/(\{\{[^}]+\}\})/g)

  return (
    <span>
      {parts.map((part, i) => {
        if (/^\{\{[^}]+\}\}$/.test(part)) {
          return (
            <mark
              key={i}
              className="bg-amber-400/20 text-amber-400 rounded px-0.5 not-italic font-medium"
            >
              {part}
            </mark>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

function TemplateCard({ template, isActive, onClick }) {
  const Icon = TEMPLATE_ICONS[template.icon] || Mail

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-xl border transition-all duration-150
        ${
          isActive
            ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
            : 'bg-white dark:bg-surface-secondary border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            p-2 rounded-lg flex-shrink-0
            ${isActive ? 'bg-blue-500/20' : 'bg-slate-100 dark:bg-slate-800'}
          `}
        >
          <Icon
            className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`}
          />
        </div>
        <div className="min-w-0">
          <div
            className={`text-sm font-semibold truncate ${
              isActive
                ? 'text-blue-300'
                : 'text-slate-800 dark:text-slate-200'
            }`}
          >
            {template.name}
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
            {template.description}
          </div>
        </div>
      </div>
    </button>
  )
}

function FieldInput({ field, value, onChange }) {
  const baseClass = `
    w-full px-3 py-2 text-sm
    bg-white dark:bg-slate-800
    text-slate-900 dark:text-slate-100
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    border border-slate-200 dark:border-slate-700
    rounded-lg
    outline-none
    focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500
    transition-colors duration-150
  `

  if (field.type === 'textarea') {
    return (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(field.id, e.target.value)}
        placeholder={field.placeholder || ''}
        rows={3}
        className={`${baseClass} resize-none`}
      />
    )
  }

  if (field.type === 'select') {
    return (
      <Select
        value={value || field.default || ''}
        onChange={(e) => onChange(field.id, e.target.value)}
        options={field.options || []}
        placeholder={field.placeholder}
      />
    )
  }

  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(field.id, e.target.value)}
      placeholder={field.placeholder || ''}
      className={baseClass}
    />
  )
}

function CopyAllButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const success = await copyToClipboard(text)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
        transition-all duration-150
        ${
          copied
            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20'
        }
      `}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy All
        </>
      )}
    </button>
  )
}

export default function MessageGeneratorPage() {
  const { templates, senderDefaults } = templatesData
  const { contacts } = contactsData

  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id || null)
  const [selectedContactId, setSelectedContactId] = useState('')
  const [fieldValues, setFieldValues] = useState({})
  const [senderInfo, setSenderInfo] = useLocalStorage('sender-info', senderDefaults)

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId)
  const selectedContact = contacts.find((c) => c.id === selectedContactId)

  // When template changes, initialize field values with defaults
  useEffect(() => {
    if (!selectedTemplate) return

    const defaults = {}
    selectedTemplate.fields.forEach((field) => {
      if (field.autoFillFromSender && senderInfo[field.autoFillFromSender]) {
        defaults[field.id] = senderInfo[field.autoFillFromSender]
      } else if (field.default !== undefined) {
        defaults[field.id] = field.default
      }
    })
    setFieldValues((prev) => {
      // Keep existing values but add defaults for fields not yet set
      const merged = { ...defaults }
      Object.keys(prev).forEach((k) => {
        if (prev[k] !== '' && prev[k] !== undefined) {
          merged[k] = prev[k]
        }
      })
      return merged
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplateId])

  // When contact is selected, auto-fill contact fields
  useEffect(() => {
    if (!selectedContact || !selectedTemplate) return

    const updates = {}
    selectedTemplate.fields.forEach((field) => {
      if (field.autoFillFromContact && selectedContact[field.autoFillFromContact]) {
        updates[field.id] = selectedContact[field.autoFillFromContact]
      }
    })
    setFieldValues((prev) => ({ ...prev, ...updates }))
  }, [selectedContactId, selectedTemplate, selectedContact])

  function handleFieldChange(fieldId, value) {
    setFieldValues((prev) => ({ ...prev, [fieldId]: value }))

    // Sync sender info fields back to localStorage
    if (selectedTemplate) {
      const field = selectedTemplate.fields.find((f) => f.id === fieldId)
      if (field?.autoFillFromSender) {
        setSenderInfo((prev) => ({ ...prev, [field.autoFillFromSender]: value }))
      }
    }
  }

  function handleTemplateChange(templateId) {
    setSelectedTemplateId(templateId)
    // Don't reset field values — keep sender info across templates
  }

  // Build preview text
  const previewSubject = useMemo(() => {
    if (!selectedTemplate) return ''
    return renderTemplate(selectedTemplate.subject, fieldValues)
  }, [selectedTemplate, fieldValues])

  const previewBody = useMemo(() => {
    if (!selectedTemplate) return ''
    return renderTemplate(selectedTemplate.body, fieldValues)
  }, [selectedTemplate, fieldValues])

  const unreplacedCount = useMemo(() => {
    const inSubject = findUnreplacedPlaceholders(previewSubject)
    const inBody = findUnreplacedPlaceholders(previewBody)
    return [...new Set([...inSubject, ...inBody])].length
  }, [previewSubject, previewBody])

  // Contact options for selector
  const contactOptions = useMemo(() => {
    return contacts.map((c) => ({
      value: c.id,
      label: `${c.name} — ${c.organization}`,
    }))
  }, [contacts])

  // Group template fields: contact fields vs sender fields vs other
  const groupedFields = useMemo(() => {
    if (!selectedTemplate) return { contact: [], sender: [], other: [] }
    const contact = []
    const sender = []
    const other = []
    selectedTemplate.fields.forEach((f) => {
      if (f.autoFillFromContact) contact.push(f)
      else if (f.autoFillFromSender) sender.push(f)
      else other.push(f)
    })
    return { contact, sender, other }
  }, [selectedTemplate])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Message Generator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Craft personalized outreach messages for your contacts
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        {/* ===== LEFT COLUMN — Form ===== */}
        <div className="space-y-5">
          {/* Template selector */}
          <div>
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              1. Choose Template
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isActive={selectedTemplateId === template.id}
                  onClick={() => handleTemplateChange(template.id)}
                />
              ))}
            </div>
          </div>

          {/* Contact selector */}
          <div>
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              2. Select Contact (optional)
            </h2>
            <div className="bg-white dark:bg-surface-secondary rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  Auto-fill from contact
                </span>
              </div>
              <Select
                value={selectedContactId}
                onChange={(e) => setSelectedContactId(e.target.value)}
                options={contactOptions}
                placeholder="Choose a contact to auto-fill fields..."
              />
              {selectedContact && (
                <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <Building2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs text-blue-300 font-medium truncate block">
                      {selectedContact.name}
                    </span>
                    <span className="text-xs text-slate-400 truncate block">
                      {selectedContact.role} · {selectedContact.organization}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic fields */}
          {selectedTemplate && (
            <div>
              <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                3. Fill in Details
              </h2>
              <div className="bg-white dark:bg-surface-secondary rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
                {/* Contact fields */}
                {groupedFields.contact.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Contact Info
                      </span>
                    </div>
                    {groupedFields.contact.map((field) => (
                      <div key={field.id}>
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                          {field.label}
                          {field.required && (
                            <span className="text-red-400 ml-1">*</span>
                          )}
                        </label>
                        <FieldInput
                          field={field}
                          value={fieldValues[field.id]}
                          onChange={handleFieldChange}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Divider */}
                {groupedFields.contact.length > 0 &&
                  (groupedFields.sender.length > 0 || groupedFields.other.length > 0) && (
                    <div className="border-t border-slate-200 dark:border-slate-700" />
                  )}

                {/* Sender fields */}
                {groupedFields.sender.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Your Info
                      </span>
                      <span className="text-xs text-slate-500 italic ml-1">
                        (saved automatically)
                      </span>
                    </div>
                    {groupedFields.sender.map((field) => (
                      <div key={field.id}>
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                          {field.label}
                          {field.required && (
                            <span className="text-red-400 ml-1">*</span>
                          )}
                        </label>
                        <FieldInput
                          field={field}
                          value={fieldValues[field.id] ?? senderInfo[field.autoFillFromSender] ?? ''}
                          onChange={handleFieldChange}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Other fields */}
                {groupedFields.other.length > 0 && (
                  <>
                    {groupedFields.sender.length > 0 && (
                      <div className="border-t border-slate-200 dark:border-slate-700" />
                    )}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                          Message Details
                        </span>
                      </div>
                      {groupedFields.other.map((field) => (
                        <div key={field.id}>
                          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                            {field.label}
                            {field.required && (
                              <span className="text-red-400 ml-1">*</span>
                            )}
                          </label>
                          <FieldInput
                            field={field}
                            value={fieldValues[field.id]}
                            onChange={handleFieldChange}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ===== RIGHT COLUMN — Preview ===== */}
        <div className="flex flex-col gap-0">
          <div className="sticky top-4">
            {/* Preview header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-400" />
                <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Live Preview
                </h2>
                {unreplacedCount > 0 && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-amber-400 font-medium">
                      {unreplacedCount} field{unreplacedCount !== 1 ? 's' : ''} unfilled
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <CopyButton text={previewSubject} className="text-xs" />
                <CopyButton text={previewBody} className="text-xs" />
                <CopyAllButton
                  text={`Subject: ${previewSubject}\n\n${previewBody}`}
                />
              </div>
            </div>

            {/* Preview card */}
            <div className="bg-white dark:bg-surface-secondary rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              {/* Email chrome */}
              <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide w-14 flex-shrink-0 mt-0.5">
                    Subject
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {previewSubject ? (
                      <PreviewText text={previewSubject} />
                    ) : (
                      <span className="text-slate-400 italic font-normal">
                        Subject will appear here...
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Email body */}
              <div className="px-5 py-5">
                {previewBody ? (
                  <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    <PreviewText text={previewBody} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Mail className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
                    <p className="text-slate-400 dark:text-slate-500 text-sm">
                      Select a template to see the preview
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Legend */}
            {unreplacedCount > 0 && (
              <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-amber-500/5 border border-amber-500/15 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <p className="text-xs text-amber-400/80">
                  Highlighted fields need to be filled in before sending. Fill in the form on the left.
                </p>
              </div>
            )}

            {unreplacedCount === 0 && previewBody && (
              <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-green-500/5 border border-green-500/15 rounded-lg">
                <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                <p className="text-xs text-green-400/80">
                  All fields filled — your message is ready to send.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
