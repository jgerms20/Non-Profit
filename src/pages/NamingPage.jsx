import { useState, useMemo } from 'react'
import { Sparkles, Plus, Trash2, Check, Star, Globe, Hash } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const DEFAULT_CANDIDATES = [
  {
    id: '1',
    name: 'Southern AI Literacy Initiative',
    acronym: 'SALI',
    pros: ['Clear and descriptive', 'Immediately communicates mission', 'Professional'],
    cons: ['Long name', 'SALI acronym not very memorable'],
    favorite: false,
  },
  {
    id: '2',
    name: 'Palmetto AI Project',
    acronym: 'PAP',
    pros: ['SC state symbol reference', 'Shorter', 'Regional identity'],
    cons: ['PAP acronym not ideal', 'Limits to SC only'],
    favorite: false,
  },
  {
    id: '3',
    name: 'The Digital Harvest Initiative',
    acronym: 'DHI',
    pros: ['Agricultural metaphor suits rural focus', 'Evocative and memorable', 'Implies growth and cultivation'],
    cons: ["Doesn't mention AI explicitly", 'DHI not immediately clear'],
    favorite: false,
  },
  {
    id: '4',
    name: 'Roots & Algorithms',
    acronym: 'R&A',
    pros: ['Cultural roots + technical identity', 'Memorable and unique', 'Tells a story'],
    cons: ['Might confuse some people', 'Harder to search online'],
    favorite: false,
  },
  {
    id: '5',
    name: 'SAIL - Southern AI Literacy',
    acronym: 'SAIL',
    pros: ['Great acronym', 'Implies forward movement and navigation', 'Easy to remember'],
    cons: ['Might be confused with sailing orgs'],
    favorite: false,
  },
  {
    id: '6',
    name: 'RAISE - Rural AI Skills & Education',
    acronym: 'RAISE',
    pros: ['Powerful acronym', 'Action-oriented', 'Covers mission completely'],
    cons: ['Might already be taken'],
    favorite: false,
  },
]

export default function NamingPage() {
  const [candidates, setCandidates] = useLocalStorage('naming-candidates', DEFAULT_CANDIDATES)
  const [newName, setNewName] = useState('')
  const [newAcronym, setNewAcronym] = useState('')
  const [newPros, setNewPros] = useState('')
  const [newCons, setNewCons] = useState('')
  const [checkerInput, setCheckerInput] = useState('')

  // Generate acronym from input
  const generatedAcronym = useMemo(() => {
    if (!checkerInput.trim()) return ''
    return checkerInput
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
  }, [checkerInput])

  // Check if acronym is pronounceable (has vowels)
  const isPronounceable = useMemo(() => {
    if (!generatedAcronym) return false
    return /[aeiou]/i.test(generatedAcronym)
  }, [generatedAcronym])

  const handleAddCandidate = () => {
    if (newName.trim()) {
      const prosArray = newPros
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p)
      const consArray = newCons
        .split(',')
        .map((c) => c.trim())
        .filter((c) => c)

      const newCandidate = {
        id: Date.now().toString(),
        name: newName,
        acronym: newAcronym || generatedAcronym || 'N/A',
        pros: prosArray,
        cons: consArray,
        favorite: false,
      }

      setCandidates([...candidates, newCandidate])
      setNewName('')
      setNewAcronym('')
      setNewPros('')
      setNewCons('')
    }
  }

  const toggleFavorite = (id) => {
    setCandidates(
      candidates.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    )
  }

  const deleteCandidate = (id) => {
    setCandidates(candidates.filter((c) => c.id !== id))
  }

  const favorites = candidates.filter((c) => c.favorite)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-lg bg-phase-1/10 dark:bg-phase-1/5">
          <Sparkles className="w-6 h-6 text-phase-1" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Naming Workshop
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">
            Finding the perfect name for the initiative
          </p>
        </div>
      </div>

      {/* Current Candidates Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Current Candidates
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} in total
            {favorites.length > 0 && ` • ${favorites.length} favorite${favorites.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white dark:bg-surface-secondary rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              {/* Title and Actions */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {candidate.name}
                  </h3>
                  <Badge variant="info" className="mt-2">
                    {candidate.acronym}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite(candidate.id)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title={candidate.favorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        candidate.favorite
                          ? 'fill-phase-3 text-phase-3'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => deleteCandidate(candidate.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    title="Delete candidate"
                  >
                    <Trash2 className="w-5 h-5 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="space-y-4">
                {/* Pros */}
                {candidate.pros.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                      Pros
                    </p>
                    <ul className="space-y-2">
                      {candidate.pros.map((pro, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                        >
                          <Check className="w-4 h-4 text-phase-2 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cons */}
                {candidate.cons.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                      Cons
                    </p>
                    <ul className="space-y-2">
                      {candidate.cons.map((con, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                        >
                          <span className="text-red-400 dark:text-red-500 font-bold flex-shrink-0 mt-0.5">
                            ✕
                          </span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {candidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">
              No candidates yet. Add your first suggestion below!
            </p>
          </div>
        )}
      </div>

      {/* Add New Candidate Form */}
      <Card
        title="Add New Candidate"
        icon={Plus}
        className="bg-gradient-to-br from-phase-1/5 to-phase-2/5 dark:from-phase-1/5 dark:to-phase-2/5 border-phase-1/20 dark:border-phase-1/10"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Southern AI Literacy Initiative"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-phase-1 dark:focus:ring-phase-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Acronym
              </label>
              <input
                type="text"
                value={newAcronym}
                onChange={(e) => setNewAcronym(e.target.value)}
                placeholder="e.g., SALI (optional)"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-phase-1 dark:focus:ring-phase-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Pros (comma-separated)
              </label>
              <textarea
                value={newPros}
                onChange={(e) => setNewPros(e.target.value)}
                placeholder="e.g., Clear mission, Professional, Easy to remember"
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-phase-1 dark:focus:ring-phase-1 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Cons (comma-separated)
              </label>
              <textarea
                value={newCons}
                onChange={(e) => setNewCons(e.target.value)}
                placeholder="e.g., Long name, Not memorable, Hard to spell"
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-phase-1 dark:focus:ring-phase-1 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAddCandidate}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-phase-1 hover:bg-phase-1/90 text-white font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Candidate
            </button>
          </div>
        </div>
      </Card>

      {/* Acronym Checker Section */}
      <Card
        title="Acronym Checker"
        icon={Hash}
        className="bg-gradient-to-br from-phase-2/5 to-phase-3/5 dark:from-phase-2/5 dark:to-phase-3/5 border-phase-2/20 dark:border-phase-2/10"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Enter a name
            </label>
            <input
              type="text"
              value={checkerInput}
              onChange={(e) => setCheckerInput(e.target.value)}
              placeholder="e.g., Southern AI Literacy Initiative"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-phase-2 dark:focus:ring-phase-2"
            />
          </div>

          {checkerInput.trim() && (
            <div className="pt-2 space-y-3 border-t border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                  Generated Acronym
                </p>
                <div className="inline-block">
                  <Badge variant="info" className="text-lg px-3 py-1">
                    {generatedAcronym}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Pronounceability
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isPronounceable
                          ? 'bg-phase-2'
                          : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {isPronounceable ? (
                        <span className="text-phase-2 font-medium">
                          Good - Contains vowels
                        </span>
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400">
                          Difficult - No vowels
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Decision Criteria */}
      <Card
        title="Decision Criteria"
        icon={Globe}
        className="bg-gradient-to-br from-phase-3/5 to-phase-1/5 dark:from-phase-3/5 dark:to-phase-1/5 border-phase-3/20 dark:border-phase-3/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-phase-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Easy to remember</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Simple, intuitive, and sticks in people's minds
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-phase-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Tells people what you do</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Mission or focus area is clear from the name
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-phase-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Good acronym</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Ideally a real word or easily pronounceable
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-phase-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Domain available</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  .org domain preferred for nonprofits
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-phase-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Not already taken</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Check SC business filings and national registries
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-phase-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Works on social media</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Short enough for handles and easy to type
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
