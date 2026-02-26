import { useState, useMemo } from 'react'
import {
  Users,
  Building2,
  Landmark,
  GraduationCap,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  Star,
  MessageSquare,
} from 'lucide-react'
import contactsData from '../data/contacts.json'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useFilterSort } from '../hooks/useFilterSort'
import Badge from '../components/ui/Badge'
import CopyButton from '../components/ui/CopyButton'
import Modal from '../components/ui/Modal'
import SearchInput from '../components/ui/SearchInput'
import Select from '../components/ui/Select'
import StatusBadge from '../components/ui/StatusBadge'
import Tabs from '../components/ui/Tabs'

const CATEGORY_ICONS = {
  Users,
  Building2,
  Landmark,
  GraduationCap,
}

const STATUS_OPTIONS = [
  { value: 'not-contacted', label: 'Not Contacted' },
  { value: 'reached-out', label: 'Reached Out' },
  { value: 'meeting-scheduled', label: 'Meeting Scheduled' },
  { value: 'connected', label: 'Connected' },
]

const OUTREACH_TABS = [
  { id: 'intro', label: 'Intro' },
  { id: 'meetingRequest', label: 'Meeting Request' },
  { id: 'followUp', label: 'Follow Up' },
  { id: 'partnershipProposal', label: 'Partnership' },
]

const PRIORITY_STYLES = {
  high: {
    dot: 'bg-red-500',
    glow: 'shadow-red-500/10',
    border: 'border-l-red-500',
    label: 'High',
    badge: 'danger',
  },
  medium: {
    dot: 'bg-amber-500',
    glow: '',
    border: 'border-l-amber-500',
    label: 'Medium',
    badge: 'warning',
  },
  low: {
    dot: 'bg-slate-400',
    glow: '',
    border: 'border-l-slate-500',
    label: 'Low',
    badge: 'default',
  },
}

const STATUS_BORDER = {
  'not-contacted': 'border-l-slate-500',
  'reached-out': 'border-l-blue-500',
  'meeting-scheduled': 'border-l-amber-500',
  connected: 'border-l-green-500',
}

function ContactCard({ contact, status, onOpen }) {
  const priority = PRIORITY_STYLES[contact.priority] || PRIORITY_STYLES.medium
  const effectiveStatus = status || contact.status
  const borderColor = STATUS_BORDER[effectiveStatus] || 'border-l-slate-500'
  const isHighPriority = contact.priority === 'high'

  return (
    <button
      onClick={() => onOpen(contact)}
      className={`
        w-full text-left
        bg-white dark:bg-surface-secondary
        rounded-xl border border-slate-200 dark:border-slate-700
        border-l-4 ${borderColor}
        shadow-sm hover:shadow-md
        ${isHighPriority ? 'shadow-red-500/5 hover:shadow-red-500/10' : ''}
        transition-all duration-200
        hover:border-slate-300 dark:hover:border-slate-600
        hover:-translate-y-0.5
        group
        overflow-hidden
      `}
    >
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {contact.name}
              </h3>
              {isHighPriority && (
                <Star className="w-3 h-3 text-red-400 flex-shrink-0 fill-red-400" />
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {contact.role}
            </p>
            <p className="text-xs text-blue-400 font-medium truncate mt-0.5">
              {contact.organization}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <StatusBadge status={effectiveStatus} size="sm" />
          </div>
        </div>

        {/* Why they matter */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {contact.whyTheyMatter}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${priority.dot}`}
            />
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {priority.label} priority
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 group-hover:text-blue-400 transition-colors">
            <span>View details</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </button>
  )
}

function ContactDetailModal({ contact, status, notes, onClose, onStatusChange, onNotesChange }) {
  const [activeOutreachTab, setActiveOutreachTab] = useState('intro')

  if (!contact) return null

  const effectiveStatus = status || contact.status
  const activeMessage = contact.outreachMessages?.[activeOutreachTab] || ''

  return (
    <div className="flex flex-col gap-0 -mx-6 -my-4">
      {/* Contact header */}
      <div className="px-6 pt-6 pb-5 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {contact.name}
              </h2>
              {contact.priority === 'high' && (
                <Star className="w-4 h-4 text-red-400 fill-red-400 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {contact.role}
            </p>
            <p className="text-sm text-blue-400 font-medium mt-0.5">
              {contact.organization}
            </p>
          </div>
          <StatusBadge status={effectiveStatus} size="lg" />
        </div>

        {/* Contact links */}
        {(contact.email || contact.phone || contact.website) && (
          <div className="flex flex-wrap gap-3 mt-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {contact.phone}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                Website
              </a>
            )}
          </div>
        )}
      </div>

      {/* Body content */}
      <div className="px-6 py-5 overflow-y-auto max-h-[calc(90vh-280px)] space-y-6">
        {/* Why they matter */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Why They Matter
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {contact.whyTheyMatter}
          </p>
        </div>

        {/* Status + Notes row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Relationship Status
            </label>
            <Select
              value={effectiveStatus}
              onChange={(e) => onStatusChange(contact.id, e.target.value)}
              options={STATUS_OPTIONS}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Priority
            </label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-[38px]">
              <span
                className={`w-2.5 h-2.5 rounded-full ${PRIORITY_STYLES[contact.priority]?.dot || 'bg-slate-400'}`}
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {PRIORITY_STYLES[contact.priority]?.label || 'Medium'} Priority
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Notes
          </label>
          <textarea
            value={notes || ''}
            onChange={(e) => onNotesChange(contact.id, e.target.value)}
            placeholder="Add notes about this contact, conversations, next steps..."
            rows={3}
            className="
              w-full px-3 py-2 text-sm
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              placeholder:text-slate-400 dark:placeholder:text-slate-500
              border border-slate-200 dark:border-slate-700
              rounded-lg resize-none
              outline-none
              focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
              transition-colors duration-150
            "
          />
        </div>

        {/* Outreach messages */}
        {contact.outreachMessages && (
          <div>
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Outreach Messages
            </h4>
            <Tabs
              tabs={OUTREACH_TABS}
              activeTab={activeOutreachTab}
              onChange={setActiveOutreachTab}
            />
            <div className="mt-3">
              <div className="relative">
                <pre className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 whitespace-pre-wrap font-sans leading-relaxed overflow-auto max-h-64">
                  {activeMessage}
                </pre>
                <div className="absolute top-2 right-2">
                  <CopyButton text={activeMessage} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ContactsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContact, setSelectedContact] = useState(null)
  const [contactStatuses, setContactStatuses] = useLocalStorage('contact-statuses', {})
  const [contactNotes, setContactNotes] = useLocalStorage('contact-notes', {})

  const { categories, contacts } = contactsData

  // Build tabs with counts
  const tabs = useMemo(() => {
    const all = { id: 'all', label: 'All', count: contacts.length }
    const catTabs = categories.map((cat) => {
      const Icon = CATEGORY_ICONS[cat.icon]
      return {
        id: cat.id,
        label: cat.label,
        icon: Icon,
        count: contacts.filter((c) => c.category === cat.id).length,
      }
    })
    return [all, ...catTabs]
  }, [categories, contacts])

  // Filter contacts
  const filteredContacts = useFilterSort(contacts, {
    searchQuery,
    searchFields: ['name', 'organization', 'role'],
    filterFn: activeCategory === 'all' ? undefined : (c) => c.category === activeCategory,
    sortFn: (a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return (priorityOrder[a.priority] ?? 1) - (priorityOrder[b.priority] ?? 1)
    },
  })

  function handleStatusChange(contactId, newStatus) {
    setContactStatuses((prev) => ({ ...prev, [contactId]: newStatus }))
  }

  function handleNotesChange(contactId, newNotes) {
    setContactNotes((prev) => ({ ...prev, [contactId]: newNotes }))
  }

  function handleOpenContact(contact) {
    setSelectedContact(contact)
  }

  function handleCloseModal() {
    setSelectedContact(null)
  }

  // Stats for header
  const stats = useMemo(() => {
    const statusCounts = contacts.reduce((acc, c) => {
      const s = contactStatuses[c.id] || c.status
      acc[s] = (acc[s] || 0) + 1
      return acc
    }, {})
    return {
      total: contacts.length,
      connected: statusCounts['connected'] || 0,
      meetingScheduled: statusCounts['meeting-scheduled'] || 0,
      reachedOut: statusCounts['reached-out'] || 0,
    }
  }, [contacts, contactStatuses])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Contacts
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Key relationships for the Southern AI Literacy Initiative
          </p>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {stats.total}
            </div>
            <div className="text-xs text-slate-400">Total</div>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
          <div>
            <div className="text-xl font-bold text-green-400">
              {stats.connected}
            </div>
            <div className="text-xs text-slate-400">Connected</div>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
          <div>
            <div className="text-xl font-bold text-amber-400">
              {stats.meetingScheduled}
            </div>
            <div className="text-xs text-slate-400">Meetings</div>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
          <div>
            <div className="text-xl font-bold text-blue-400">
              {stats.reachedOut}
            </div>
            <div className="text-xs text-slate-400">Reached Out</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Search + filters bar */}
      <div className="flex items-center gap-3">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, organization, or role..."
          className="flex-1 max-w-md"
        />
        {searchQuery && (
          <span className="text-sm text-slate-400">
            {filteredContacts.length} result{filteredContacts.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Contact grid */}
      {filteredContacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <MessageSquare className="w-10 h-10 text-slate-400 mb-3" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            No contacts found
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            {searchQuery
              ? 'Try a different search term'
              : 'No contacts in this category yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              status={contactStatuses[contact.id]}
              onOpen={handleOpenContact}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedContact}
        onClose={handleCloseModal}
        title={null}
        size="lg"
      >
        <ContactDetailModal
          contact={selectedContact}
          status={selectedContact ? contactStatuses[selectedContact.id] : null}
          notes={selectedContact ? contactNotes[selectedContact.id] : null}
          onClose={handleCloseModal}
          onStatusChange={handleStatusChange}
          onNotesChange={handleNotesChange}
        />
      </Modal>
    </div>
  )
}
