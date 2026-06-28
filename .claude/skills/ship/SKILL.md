---
name: ship
description: Smart commit and push for SCAiL — stage changed files, write a meaningful commit message, push to the feature branch, and report what shipped. Use when you want to save and push work.
---

# Ship — Smart Commit & Push

Commits and pushes all current changes to the SCAiL branch with a meaningful message.

## Usage

```
/ship
/ship [optional context about what changed]
```

## What this does

1. Run `git status` and `git diff --stat` to see what changed
2. Group changes into logical themes (public site / tracker / docs / skills)
3. Write a commit message that reflects the WHY, not just the what
4. Stage all modified files
5. Commit with co-author attribution
6. Push to `origin claude/nonprofit-project-setup-ZzKM3`
7. Report: commit hash + what shipped

## Branch

Always push to: `claude/nonprofit-project-setup-ZzKM3`

Never push to main without explicit user instruction.

## Commit message format

```
feat/fix/docs/chore(scope): short summary

- bullet of change 1
- bullet of change 2

Co-Authored-By: Claude <noreply@anthropic.com>
```

## After pushing

Always report:
- Commit hash
- Files changed
- What the user should see / verify
