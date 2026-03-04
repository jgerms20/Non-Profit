import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, Send, X, Settings, Bot, ChevronDown, Key, Trash2, Sparkles } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// ---------------------------------------------------------------------------
// System prompt that gives Claude deep knowledge about the SCAiL project
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are the SCAiL AI Assistant — a knowledgeable, friendly, and encouraging guide embedded in the SCAiL Project Tracker dashboard.

SCAiL (South Carolina AI Literacy) is a nonprofit being built to teach AI literacy in South Carolina, eventually growing into a startup incubator and investment fund.

## The Three-Phase Flywheel

**Phase 1 — AI Literacy Nonprofit (501(c)(3))**
Teach communities about AI. Build trust. Generate grant revenue. This is the current phase and involves:
- Choosing a nonprofit name (SCAiL) and reserving it with SC Secretary of State
- Identifying 3 unrelated board members (nonprofit governance, tech/AI, community ties)
- Choosing a registered agent (completed — Registered Agents Inc., 6650 Rivers Ave, STE 100, Charleston, SC 29406)
- Drafting a mission statement focused on AI literacy in underserved rural communities
- Filing Articles of Incorporation with SC (Form NP, $32.50 — completed 3/3/2026, Transaction ID: 2155274)
- Getting an EIN from the IRS (free, instant online)
- Filing Initial Report with SC Secretary of State
- Drafting Bylaws and Conflict of Interest Policy
- Holding an Organizational Board Meeting
- Applying for 501(c)(3) tax-exempt status (Form 1023-EZ $275 or Form 1023 $600)
- Filing for SC state tax exemptions (Form ST-387)
- Registering for SC Charitable Solicitation ($50/year)
- Opening a nonprofit bank account
- Setting up website, email, and social media
- Applying for Google for Nonprofits (free Workspace + $10K/month Ad Grants)
- Beginning grant applications (OpenAI People-First AI Fund is priority #1)

**Phase 2 — AI Startup Incubator**
Turn educated community members into founders. Run hackathons, cohorts, and demo days. 8-12 week program for 5-10 rural founders building AI-native businesses.

**Phase 3 — Rural AI Investment Fund**
Fund the strongest companies from the incubator. Angel syndicate or registered fund targeting SC AI startups. Study the VentureSouth model.

## South Carolina Specifics
- Secretary of State: businessfilings.sc.gov
- Form NP for nonprofit incorporation ($32.50 online)
- SC Department of Revenue for state tax exemptions
- Charitable solicitation registration through SC SOS ($50/year, renew by April 15)
- Key SC organizations: VentureSouth, SCRA, NextGEN SC, Beaufort Digital Corridor, USC Columbia Tech Incubator

## Current Status
- Phase 1 is in progress
- Articles of Incorporation: FILED (3/3/2026)
- Registered Agent: SECURED (Registered Agents Inc.)
- Next priorities: Get EIN, draft bylaws, identify board members, draft mission statement

## Your Role
- Answer questions about nonprofit formation, legal steps, grants, and the SCAiL project
- Provide specific, actionable guidance about each step in the process
- Be encouraging but honest — nonprofit formation is real work but very doable
- When discussing legal matters, remind users to consult with an attorney for their specific situation
- Keep responses concise but thorough — use bullet points for actionable steps
- You can reference specific costs, timelines, and resources from the project data
- If asked about something outside your knowledge, say so honestly`

// ---------------------------------------------------------------------------
// Smart pre-built responses when no API key is available
// ---------------------------------------------------------------------------
const KNOWLEDGE_BASE = [
  {
    keywords: ['phase 1', 'phase one', 'nonprofit', '501c3', '501(c)(3)', 'literacy', 'first phase'],
    response: `**Phase 1: AI Literacy Nonprofit (501(c)(3))**

This is the current active phase. The goal is to build a nonprofit that teaches AI literacy in South Carolina.

**Completed so far:**
- Registered Agent secured (Registered Agents Inc., Charleston, SC)
- Articles of Incorporation filed (3/3/2026, Transaction ID: 2155274)

**Next steps:**
- Get an EIN from the IRS (free, instant online at irs.gov)
- Identify 3 board members (nonprofit governance, tech/AI, community ties)
- Draft mission statement and bylaws
- File for 501(c)(3) status ($275-$600)

The total estimated cost for Phase 1 is $470-$2,570 with a target launch date of June 2026.`
  },
  {
    keywords: ['phase 2', 'phase two', 'incubator', 'startup', 'founders', 'cohort'],
    response: `**Phase 2: AI Startup Incubator**

This phase turns AI-literate community members into founders through an 8-12 week accelerator program.

**Key components:**
- Design AI-native curriculum (problem identification, prototyping, pitching)
- Secure physical or virtual space (USC Columbia, SOCO, Beaufort Digital Corridor)
- Build mentor network from SCRA, VentureSouth, NextGEN SC
- Plan Demo Day pitch events for investors
- Establish legal support pipeline (pro bono partnerships)
- Define revenue model (grants + equity stakes + sponsorships)
- Launch first cohort of 5-10 rural founders

**Target launch:** September 2027
**Estimated cost:** $5,000-$50,000`
  },
  {
    keywords: ['phase 3', 'phase three', 'fund', 'investment', 'angel', 'venture'],
    response: `**Phase 3: Rural AI Investment Fund**

The final phase creates an investment vehicle to fund promising AI startups from the incubator.

**Key steps:**
- Study the VentureSouth angel syndicate model
- Choose fund structure (angel syndicate vs. registered fund)
- SEC compliance research (Regulation D, accredited investors)
- Build investor network (VentureSouth, Upstate Carolina Angels, Palmetto Angel Fund)
- Establish fund operations (fund admin, legal, compliance)
- Make first investment in an incubator graduate

**Target launch:** January 2029
**Estimated cost:** $10,000-$100,000`
  },
  {
    keywords: ['flywheel', 'three phase', 'three-phase', 'overall', 'plan', 'strategy', 'big picture'],
    response: `**The SCAiL Three-Phase Flywheel**

SCAiL is built as a self-reinforcing flywheel with three phases:

**Phase 1: AI Literacy Nonprofit** (Current - Target: June 2026)
Teach communities about AI. Build trust. Generate grant revenue.

**Phase 2: AI Startup Incubator** (Target: September 2027)
Turn educated community members into founders. Run cohorts and demo days.

**Phase 3: Investment Fund** (Target: January 2029)
Fund the strongest incubator companies. Returns reinvest into Phase 1.

The flywheel effect: Phase 1 builds trust and talent -> Phase 2 creates companies -> Phase 3 generates returns that fund more Phase 1 education. Each phase strengthens the others.`
  },
  {
    keywords: ['ein', 'employer identification', 'tax id', 'irs number'],
    response: `**Getting Your EIN (Employer Identification Number)**

An EIN is like a Social Security number for your nonprofit. Here is how to get one:

- **Cost:** Free
- **Time:** Instant (online application takes ~15 minutes)
- **Where:** irs.gov -> "Apply for an EIN Online"
- **Available:** Monday-Friday, 7am-10pm Eastern

**Steps:**
1. Go to IRS.gov EIN application
2. Select "View Additional Types, Including Tax-Exempt and Governmental Organizations"
3. Complete the online form
4. Your EIN is issued immediately at the end

**Important:** Screenshot the confirmation page right away -- you cannot retrieve it from the same session. A CP575 confirmation letter arrives by mail in 4-5 weeks.`
  },
  {
    keywords: ['board', 'directors', 'board member', 'governance'],
    response: `**Identifying Board Members**

South Carolina requires at least 3 board members who are not all related by blood or marriage.

**Ideal board composition for SCAiL:**
- One person with nonprofit governance experience
- One person with tech/AI background
- One person with deep community ties in SC

**Tips:**
- Board members bring credibility -- their names on your letterhead open doors
- Choose people who complement your own skills
- Diversity in background and perspective strengthens everything
- Board members can donate but cannot be paid employees
- Consider reaching out to Kim Bowman (SCRIN) or UofSC network contacts

**Time estimate:** 1-2 weeks to identify and confirm commitments`
  },
  {
    keywords: ['grant', 'funding', 'openai', 'money', 'revenue'],
    response: `**Grant Strategy for SCAiL**

**Priority #1: OpenAI People-First AI Fund**
This is the single best match for SCAiL's mission -- they are looking for exactly what you are building.

**Other target funders:**
- SC Humanities Council
- Candid Foundation Directory (candid.org)
- Grants.gov (federal opportunities)
- Google.org and Google Ad Grants ($10K/month free advertising)

**Grant application tips:**
- Tailor each narrative to the funder's stated priorities
- Use the funder's own language from their website
- Tell a clear story: problem -> solution -> budget -> impact measurement
- Submit 3-5 days before deadlines -- never on the last day
- Follow up politely after 30 days if you have not heard back

**Note:** Most major grants require your 501(c)(3) determination letter.`
  },
  {
    keywords: ['legal', 'incorporation', 'articles', 'bylaws', 'formation'],
    response: `**Legal Formation Steps for SCAiL**

**Completed:**
- Registered Agent: Registered Agents Inc. (Charleston, SC)
- Articles of Incorporation: Filed 3/3/2026 ($32.50)

**Next legal steps:**
1. Get EIN from IRS (free, instant)
2. File Initial Report with SC Secretary of State (free)
3. Draft Bylaws (organizational rules) and Conflict of Interest Policy
4. Hold Organizational Board Meeting (vote on bylaws, elect officers)
5. Apply for 501(c)(3) status ($275 for 1023-EZ or $600 for full 1023)
6. File for SC state tax exemptions (Form ST-387, free)
7. Register for Charitable Solicitation ($50/year)

**Total estimated legal costs:** $325-$883
**Timeline:** 3-6 months for full 501(c)(3) approval`
  },
  {
    keywords: ['south carolina', 'sc', 'rural', 'community', 'state'],
    response: `**South Carolina Specifics for SCAiL**

**Key state resources:**
- SC Secretary of State: businessfilings.sc.gov (filings, annual reports)
- SC Department of Revenue: dor.sc.gov (tax exemptions)
- SC Nonprofit Association: scnonprofits.org (resources, networking)

**Important SC organizations to connect with:**
- VentureSouth (angel investor network)
- SCRA (SC Research Authority -- portfolio companies, innovation)
- NextGEN SC (entrepreneurship ecosystem)
- Beaufort Digital Corridor (tech hub in Lowcountry)
- USC Columbia Tech Incubator (potential incubator partner)

**SC-specific requirements:**
- Form NP for incorporation ($32.50 online)
- Charitable solicitation registration ($50/year, renew by April 15)
- Annual reports to maintain good standing
- Physical SC address required for registered agent (no P.O. boxes)`
  },
  {
    keywords: ['mission', 'statement', 'purpose', 'about'],
    response: `**SCAiL Mission Statement**

**Suggested mission statement:**
"To increase AI literacy, foster innovation, and build economic opportunity in underserved and rural communities across the American South."

**Tips for finalizing:**
- Keep it to 1-3 sentences maximum
- Include the geographic area (South Carolina / the rural South)
- Use active verbs: advance, empower, bridge, equip, transform
- Make it clear enough that someone unfamiliar immediately understands what you do
- The IRS reviews this -- ensure it describes charitable/educational purposes
- Test it by reading it to someone unfamiliar with your work

**This statement appears in:**
- Articles of Incorporation
- Grant applications
- Website and marketing materials
- 501(c)(3) application`
  },
  {
    keywords: ['cost', 'budget', 'expense', 'how much', 'price'],
    response: `**SCAiL Cost Breakdown**

**Phase 1 (Nonprofit Formation): $470-$2,570**
- Name reservation: $0-$10
- Registered agent: $100-$200/year
- Articles of Incorporation: $32.50
- EIN: Free
- Bylaws drafting: $0-$500 (free if DIY, up to $500 with attorney)
- 501(c)(3) filing: $275-$600
- Charitable solicitation: $50/year
- Bank account: $0-$100
- Website/email: $0-$200
- Google for Nonprofits: Free

**Phase 2 (Incubator): $5,000-$50,000**
**Phase 3 (Investment Fund): $10,000-$100,000**

Many costs can be minimized by using free tools (Google for Nonprofits, TechSoup, GitHub Pages) and doing legal work yourself with templates.`
  },
  {
    keywords: ['help', 'what can you', 'how do you', 'what do you'],
    response: `I am the SCAiL AI Assistant, and I can help you with:

**Project Knowledge:**
- The three-phase flywheel (AI Literacy -> Incubator -> Investment Fund)
- Current project status and next steps
- Detailed information about each phase and its steps

**Nonprofit Formation:**
- Legal steps for forming a 501(c)(3) in South Carolina
- SC-specific filing requirements and costs
- EIN application, bylaws, articles of incorporation guidance

**Strategy & Resources:**
- Grant opportunities and application tips
- Board member identification strategies
- South Carolina ecosystem contacts and organizations

**General Guidance:**
- Cost estimates and budgeting
- Timeline planning
- Best practices for nonprofit operations

Try asking me about any specific step, phase, or topic! For example:
- "What are the next legal steps?"
- "Tell me about the grant strategy"
- "How does the three-phase flywheel work?"`
  },
]

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: `Welcome to the SCAiL AI Assistant! I am here to help you navigate the SCAiL project -- from nonprofit formation to incubator planning to investment fund strategy.

**I can help with:**
- Nonprofit legal steps and SC-specific requirements
- The three-phase flywheel strategy
- Grant opportunities and application guidance
- Board member identification and governance
- Cost estimates and timeline planning

Ask me anything about the project, or connect me to Claude AI for deeper conversations using the settings gear icon.`,
}

// ---------------------------------------------------------------------------
// Offline response matching
// ---------------------------------------------------------------------------
function getOfflineResponse(userMessage) {
  const lower = userMessage.toLowerCase()

  // Check each knowledge base entry
  let bestMatch = null
  let bestScore = 0

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.split(' ').length // multi-word matches score higher
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response
  }

  // Fallback response
  return `I am not sure I have specific information about that topic in my offline knowledge base. Here are some things I can help with:

- **"What is the three-phase flywheel?"** -- Overview of the SCAiL strategy
- **"What are the legal steps?"** -- Nonprofit formation walkthrough
- **"Tell me about grants"** -- Funding opportunities and tips
- **"What is the current status?"** -- Where things stand right now
- **"How much does it cost?"** -- Budget breakdown for each phase

For deeper or more specific questions, you can connect me to Claude AI using the settings gear icon and providing an Anthropic API key.`
}

// ---------------------------------------------------------------------------
// API call to Claude
// ---------------------------------------------------------------------------
async function callClaude(messages, apiKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData?.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text || 'I received an empty response. Please try again.'
}

// ---------------------------------------------------------------------------
// Markdown-lite renderer (bold, bullet points, code)
// ---------------------------------------------------------------------------
function renderMarkdown(text) {
  const lines = text.split('\n')
  const elements = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Empty line -> spacer
    if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />)
      continue
    }

    // Bullet points
    if (line.match(/^[\s]*[-*]\s/)) {
      const content = line.replace(/^[\s]*[-*]\s/, '')
      elements.push(
        <div key={key++} className="flex gap-2 ml-2">
          <span className="text-brand-gold mt-1 flex-shrink-0">&#8226;</span>
          <span>{renderInline(content)}</span>
        </div>
      )
      continue
    }

    // Numbered list items
    if (line.match(/^[\s]*\d+\.\s/)) {
      const num = line.match(/^[\s]*(\d+)\./)[1]
      const content = line.replace(/^[\s]*\d+\.\s/, '')
      elements.push(
        <div key={key++} className="flex gap-2 ml-2">
          <span className="text-brand-gold font-medium flex-shrink-0">{num}.</span>
          <span>{renderInline(content)}</span>
        </div>
      )
      continue
    }

    // Regular lines
    elements.push(<p key={key++}>{renderInline(line)}</p>)
  }

  return elements
}

function renderInline(text) {
  // Split on bold markers (**text**) and inline code (`text`)
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-brand-gold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-surface-tertiary text-brand-teal text-xs font-mono"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    // Handle links [text](url) and --
    return part.replace(/--/g, '\u2014')
  })
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [messages, setMessages] = useLocalStorage('scail_chat_messages', [WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useLocalStorage('anthropic_api_key', '')
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [hasNewMessage, setHasNewMessage] = useState(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const chatPanelRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  // Reset new message indicator when chat opens
  useEffect(() => {
    if (isOpen) setHasNewMessage(false)
  }, [isOpen])

  // Pre-fill API key input from stored value
  useEffect(() => {
    if (apiKey) setApiKeyInput(apiKey)
  }, [apiKey])

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        if (showSettings) {
          setShowSettings(false)
        } else {
          setIsOpen(false)
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, showSettings])

  const handleSend = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')

    setIsLoading(true)
    try {
      let responseText
      if (apiKey) {
        // Filter to only user/assistant messages for the API (skip welcome)
        const apiMessages = updatedMessages
          .filter(m => m.role === 'user' || m.role === 'assistant')
          .slice(-20) // Keep last 20 messages for context window management
        responseText = await callClaude(apiMessages, apiKey)
      } else {
        // Simulate a slight delay for offline responses
        await new Promise(resolve => setTimeout(resolve, 400))
        responseText = getOfflineResponse(trimmed)
      }

      const assistantMessage = { role: 'assistant', content: responseText }
      setMessages(prev => [...prev, assistantMessage])

      if (!isOpen) setHasNewMessage(true)
    } catch (err) {
      const errorMessage = {
        role: 'assistant',
        content: `**Error:** ${err.message}\n\nPlease check your API key in settings or try again. If the issue persists, the chatbot will work in offline mode with pre-built responses about the SCAiL project.`,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages, apiKey, isOpen, setMessages])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  const handleSaveApiKey = () => {
    setApiKey(apiKeyInput.trim())
    setShowSettings(false)
  }

  const handleRemoveApiKey = () => {
    setApiKey('')
    setApiKeyInput('')
  }

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE])
  }

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Floating action button                                            */}
      {/* ----------------------------------------------------------------- */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`
          fixed bottom-6 right-6 z-[9999]
          w-14 h-14 rounded-full
          flex items-center justify-center
          shadow-lg shadow-black/25
          transition-all duration-300 ease-in-out
          ${isOpen
            ? 'bg-surface-tertiary hover:bg-surface-border rotate-0 scale-90'
            : 'bg-brand-gold hover:bg-brand-gold/90 scale-100'
          }
        `}
        aria-label={isOpen ? 'Close chat' : 'Open SCAiL AI Assistant'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-100" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-surface-primary" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-teal border-2 border-surface-primary animate-pulse" />
            )}
          </>
        )}
      </button>

      {/* ----------------------------------------------------------------- */}
      {/* Chat panel                                                        */}
      {/* ----------------------------------------------------------------- */}
      <div
        ref={chatPanelRef}
        className={`
          fixed bottom-24 right-6 z-[9998]
          w-[400px] max-w-[calc(100vw-2rem)]
          transition-all duration-300 ease-in-out origin-bottom-right
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }
        `}
      >
        <div className="flex flex-col h-[520px] rounded-2xl border border-surface-border bg-surface-primary shadow-2xl shadow-black/40 overflow-hidden">
          {/* -------------------------------------------------------------- */}
          {/* Header                                                         */}
          {/* -------------------------------------------------------------- */}
          <div className="flex items-center justify-between px-4 py-3 bg-surface-secondary border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-gold/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">SCAiL Assistant</h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  {apiKey ? (
                    <>
                      <Sparkles className="w-3 h-3 text-brand-teal" />
                      <span className="text-brand-teal">Claude AI Connected</span>
                    </>
                  ) : (
                    'Offline Knowledge Base'
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-surface-tertiary transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowSettings(prev => !prev)}
                className={`p-1.5 rounded-lg transition-colors ${
                  showSettings
                    ? 'text-brand-gold bg-brand-gold/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-surface-tertiary'
                }`}
                title="API Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-surface-tertiary transition-colors"
                title="Close chat"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Settings panel (slides down)                                   */}
          {/* -------------------------------------------------------------- */}
          {showSettings && (
            <div className="px-4 py-3 bg-surface-secondary/80 border-b border-surface-border">
              <label className="block text-xs font-medium text-slate-300 mb-2">
                <Key className="w-3 h-3 inline mr-1.5 text-brand-gold" />
                Anthropic API Key
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="sk-ant-..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-surface-primary border border-surface-border text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20"
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveApiKey()}
                />
                <button
                  onClick={handleSaveApiKey}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-brand-gold text-surface-primary hover:bg-brand-gold/90 transition-colors"
                >
                  Save
                </button>
              </div>
              {apiKey && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-brand-teal">
                    Key saved -- Claude AI is active
                  </span>
                  <button
                    onClick={handleRemoveApiKey}
                    className="text-[11px] text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove key
                  </button>
                </div>
              )}
              {!apiKey && (
                <p className="mt-2 text-[11px] text-slate-500">
                  Without an API key, I will use a built-in knowledge base about SCAiL. Add a key for full Claude AI responses.
                </p>
              )}
            </div>
          )}

          {/* -------------------------------------------------------------- */}
          {/* Messages area                                                  */}
          {/* -------------------------------------------------------------- */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-brand-gold/20 text-slate-100 rounded-br-md'
                      : 'bg-surface-secondary text-slate-300 rounded-bl-md border border-surface-border/50'
                    }
                  `}
                >
                  {msg.role === 'assistant' ? (
                    <div className="space-y-1">{renderMarkdown(msg.content)}</div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface-secondary rounded-2xl rounded-bl-md px-4 py-3 border border-surface-border/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Input area                                                     */}
          {/* -------------------------------------------------------------- */}
          <div className="px-4 py-3 bg-surface-secondary border-t border-surface-border">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about SCAiL..."
                rows={1}
                className="flex-1 resize-none px-3 py-2 text-sm rounded-xl bg-surface-primary border border-surface-border text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 max-h-24 scrollbar-thin"
                style={{ minHeight: '40px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px'
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`
                  flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                  transition-all duration-200
                  ${input.trim() && !isLoading
                    ? 'bg-brand-gold text-surface-primary hover:bg-brand-gold/90 shadow-md shadow-brand-gold/20'
                    : 'bg-surface-tertiary text-slate-500 cursor-not-allowed'
                  }
                `}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5 text-center">
              {apiKey ? 'Powered by Claude AI' : 'Offline mode -- add API key for AI responses'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
