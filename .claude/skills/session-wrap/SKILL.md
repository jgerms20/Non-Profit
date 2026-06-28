---
name: session-wrap
description: End-of-session wrap-up for SCAiL — summarize what was built, estimate token cost, recommend next skills to use, and give Joshua a clear list of what to do next. Run at the end of every work session.
---

# Session Wrap

Closes out a SCAiL work session with a full debrief.

## Usage

```
/session-wrap
```

## What this produces

### 1. What shipped this session
- Bullet list of every file changed / created
- Description of what it does and why it matters

### 2. What's still in progress
- Anything started but not finished
- Any blockers

### 3. Skill recommendations
- Which skill should have been used (wasn't)
- Which skill would have saved time
- Any new skills to create

### 4. Token cost estimate
- Rough estimate based on conversation length
- Model breakdown if multiple models used

### 5. Joshua's action list
The 3–5 things Joshua needs to do *in the real world* that can't be done by an agent:
- Calls to make
- Things to sign
- In-person meetings
- Decisions only he can make

### 6. Next session priorities
What to tackle next time, ranked by:
1. Most urgent (legal / compliance)
2. Most impactful (fundraising / partnerships)
3. Most overdue (things sliding)

## Always check

- [ ] Is work committed and pushed?
- [ ] Is Notion updated?
- [ ] Are calendar events created for upcoming deadlines?
- [ ] Are there overdue items in the tracker that need date resets?
