# SCAiL Content Engine — Routine Playbook

The Content Engine is how the SCAiL site and course materials **keep building
themselves**. Joshua does the human work — the meetings, the trust, the
handshakes across South Carolina. The engine does the building work — the
content, the drafts, the updates.

This playbook is the routine an agent runs (on demand, or on a schedule) to
keep everything current. It is intentionally **review-gated**: the loop pushes
to the working branch and updates the open pull request, so a human sees every
change before it reaches the live site.

---

## How to run it

**On demand, this session or any future one:**

> "Run the Content Engine loop."

**On a recurring schedule (self-pacing):**

```
/loop Run the Content Engine weekly routine below, then stop.
```

**Fully scheduled / unattended** (requires enabling a Routine/cron trigger —
ask before turning this on, since it commits autonomously):
Run the routine once per week (suggested: Monday 7:00 AM ET).

---

## The four loops

Each loop delegates to the cheapest capable model and writes to specific data
files. Pages read those files, so updating the data updates the live site.

| Loop | Cadence | Model | Writes to |
|------|---------|-------|-----------|
| **SC AI News Scan** | Weekly | Haiku | `insights.json`, `newsletter.json` |
| **Course Needs Detector** | Weekly | Sonnet | `curriculum.json`, `showEpisodes.json` |
| **Featured Media Rotation** | Weekly | Haiku | `mediaGallery.json` |
| **Event Pipeline Sync** | Weekly | Haiku | `publicEvents.json` |

---

## Weekly routine (step by step)

1. **Sync** — `git fetch` + checkout the working branch `claude/nonprofit-project-setup-ZzKM3`.

2. **SC AI News Scan** (delegate to Haiku)
   - Web-search for **real, verifiable** AI news relevant to South Carolina in
     the last 7 days: state policy, workforce, education, universities, local
     companies, grants.
   - Draft 1–2 new `insights.json` articles (field notes / perspective) and one
     `newsletter.json` issue outline (Headline / Palmetto Watch / Try This /
     From the Field).
   - **Accuracy rule:** never fabricate a source, quote, statistic, or event.
     If a claim can't be verified, mark it `"status": "draft"` and note it.

3. **Course Needs Detector** (delegate to Sonnet)
   - Review recent contact notes, event feedback, and community signals for
     recurring needs.
   - Propose new courses in `curriculum.json` and new episode topics in
     `showEpisodes.json` that answer real, stated needs.

4. **Featured Media Rotation** (delegate to Haiku)
   - Rotate `mediaGallery.json → meta.featuredRotation` so the homepage gallery
     feels fresh. If real photos have been added to `/public/media`, wire their
     `src` fields.

5. **Event Pipeline Sync** (delegate to Haiku)
   - Promote planned classes, archive past events, update registration counts in
     `publicEvents.json`.

6. **Log + ship**
   - Prepend a dated entry to `contentEngine.json → log` summarizing what each
     loop changed and which model did it.
   - `npm run build` to confirm the site still compiles.
   - Commit with a clear message and push to the working branch. Ensure the open
     PR reflects the update.

---

## Guardrails (non-negotiable)

- **Trust is the product.** SCAiL teaches communities to trust AI responsibly —
  the site must never publish an unverified claim. When in doubt, mark it draft.
- **Data-only by default.** Loops edit `src/data/*.json`, not page components.
  Structural/page changes are a human decision.
- **Review before live.** Push to the working branch; a human merges the PR.
- **South Carolina first.** Every item should answer "why does this matter to a
  South Carolinian?" If it doesn't, cut it.

---

## Adding real photos

Drop images into `public/media/` and set the matching `src` in
`mediaGallery.json` (e.g. `"src": "/media/irmo-class.jpg"`). Until then, each
gallery slot renders as a branded gradient placeholder with its caption.
