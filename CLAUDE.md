# SCAiL — Project Operating Manual

## What Is This?

This is the command center for building SCAiL, a nonprofit that teaches AI literacy in South Carolina, eventually growing into an incubator and investment fund. Three pillars, one mission: build wealth and knowledge in communities that get overlooked.

## The Three Pillars

### 1. The Site (React Dashboard)
- **Location:** GitHub Pages at `jgerms20.github.io/SCAiL-Initiative`
- **Stack:** Vite + React + Tailwind CSS v4
- **Purpose:** Two apps in one repo:
  - **The internal tracker** (routes under `/`) — visual tracker for every step: phases, contacts, legal, grants, timeline, calendar, todos, Mission Control, Content Engine.
  - **The public Brand House** (routes under `/site`, dark-themed, own `PublicLayout`) — SCAiL's public-facing website, SmarterX-inspired but South-Carolina-focused.
- **Data:** localStorage for live edits, JSON defaults in `src/data/`

### The Brand House (public site, `/site`)
Inspired by SmarterX's multi-brand model, adapted for South Carolina:
| Brand | Route | What it is |
|-------|-------|-----------|
| **SCAiL Academy** | `/site/academy` | Free, hands-on AI courses (education pillar) |
| **The Palmetto AI Show** | `/site/show` | Weekly SC AI podcast/show |
| **SCAiL Institute** | `/site/institute` | Research + plain-language briefings |
| **Events** | `/site/events` | Intro classes, workshops, demo days |
| **The Palmetto AI Brief** | `/site/newsletter` | Weekly newsletter |
| **Get Involved / About** | `/site/get-involved`, `/site/about` | Convert + tell the story |

### The Content Engine (self-building loop)
- **Dashboard:** `/content-engine` (internal). **Playbook:** `docs/content-engine-routine.md`.
- **Idea:** On a schedule, delegated agents (Haiku/Sonnet) scan SC AI news, propose
  courses/episodes from real community needs, rotate featured media, and draft
  newsletter/show notes — then commit to the working branch for human review.
- **Data files it maintains:** `showEpisodes.json`, `insights.json`, `publicEvents.json`,
  `newsletter.json`, `mediaGallery.json`, `contentEngine.json`.
- **Guardrail:** data-only, review-gated, accuracy-first. Trust is the product —
  never publish an unverified claim (mark uncertain items as drafts).

### 2. Notion Workspace
- **Purpose:** On-the-go action hub, especially for things only Joshua can do in person (meetings, calls, signatures)
- **Key Databases:** Action Items, Contacts CRM, Legal Checklist, Grant Tracker, Meeting Notes, Weekly Review

### 3. This Workspace (The Engine Room)
- **Purpose:** Where agents execute, skills get built, and the flywheel turns
- **Branch:** `claude/nonprofit-project-setup-ZzKM3`

## The Three-Phase Flywheel

**Phase 1: AI Literacy Nonprofit (501(c)(3))** — Teach communities about AI. Build trust. Generate grant revenue.
**Phase 2: Community Innovation Incubator** — Turn educated community members into founders. Run hackathons, cohorts, demo days.
**Phase 3: Investment Fund / Angel Network** — Fund the strongest companies from the incubator. Generate returns. Reinvest in Phase 1.

## Agent Deployment Guidelines

| Model | Use For | Examples |
|-------|---------|---------|
| **Opus** | Strategy, architecture, complex decisions | Planning, reviewing, complex integrations |
| **Sonnet** | Execution, feature building, content generation | Writing components, creating data files, building pages |
| **Haiku** | Volume, simple tasks, parallel work | Utility files, simple components, formatting, quick edits |

- Deploy Haiku liberally (up to 20 agents)
- Sonnet: up to 5 parallel agents
- Opus: 1-2 for orchestration and strategic thinking

## Skills (Available via slash commands)

| Skill | Command | Description |
|-------|---------|-------------|
| Skill Scout | `/skill-scout` | Identifies repetitive tasks and proposes new skills |
| Agent Cost Tracker | `/cost-report` | Breaks down agent usage and estimated costs |
| Skill Recommender | `/recommend-skills` | Suggests skills to build or that should have been used |
| Proactive Thinker | `/think-bigger` | Strategic thought partner — pushes bigger thinking |
| Notion Sync | `/sync-notion` | Pushes updates to Notion workspace |
| GitHub Pusher | `/ship` | Smart commit + push with meaningful messages |

## Project Structure

```
src/
  components/
    layout/     - AppLayout, Sidebar, TopBar
    ui/         - Reusable: Badge, Card, Checkbox, CopyButton, Modal, etc.
    dashboard/  - Dashboard-specific components
    timeline/   - Timeline and Gantt chart
    calendar/   - Monthly calendar grid
    contacts/   - Contact cards and filters
    messages/   - Message template builder
    legal/      - Legal step cards
    grants/     - Grant tracking
    todos/      - Todo items and timeframes
  pages/        - Route-level page components
  data/         - JSON data files (pre-populated from strategic playbook)
  hooks/        - useLocalStorage, useFilterSort
  utils/        - statusHelpers, phaseColors, dateUtils, clipboard
  context/      - ThemeContext (dark mode)
```

## Key Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Current Priorities

1. Complete site build and deploy to GitHub Pages
2. Set up Notion workspace with all databases
3. Build and install all 6 skills
4. Begin Phase 1 action items (name search, board identification, outreach)

## Session Protocol

At the end of every significant work session, always:
1. Run `/session-wrap` or manually provide: cost report, skill recommendations, and next steps
2. This ensures Joshua always has visibility into spend and knows what to do next
