---
title: "OS-005-AI-Assessment-Service — AI Assessment Service"
type: project-bootstrap
created: "2026-04-18"
---

# OS-005-AI-Assessment-Service — AI Assessment Service

> **Bootstrap order — read these in order before doing any work in this project:**
>
> 1. `~/.claude/CLAUDE.md` → `Open-Memory-Vault/system/identity/MASTER-PROMPT.md` — Phil's identity (auto-loaded via symlink in Claude Code; other tools should mirror this).
> 2. `~/AGENT.md` → `agent-config/AGENT.md` — global operating manual (work style, skills routing, secrets policy, layering rules in §2.10).
> 3. `Open-Memory-Vault/AGENTS.md` — vault operating contract (read **only** if you will write to the vault during this session).
> 4. `Open-Memory-Vault/projects/OS-005-AI-Assessment-Service/README.md` — durable project page (status, decisions, recent activity, vault-side context).
> 5. **This file (`CLAUDE.md`)** — project-specific overrides and live operational references (below).
>
> **The project's `CLAUDE.md` is a bootstrap manifest, not a knowledge dump.** It points at everything else. Durable knowledge lives in the vault project page. Do not duplicate.

---

## At a glance

- **Code**: `OS-005`
- **Name**: AI Assessment Service
- **Stakeholder**: Phil (self)
- **Status**: `active`
- **Priority**: `medium`
- **Revenue lane**: `4-aios`
- **Purpose** (one sentence): small-business AI assessment opportunity
- **Last touched**: `2026-04-18`

---

## Where things live

| Resource | Location |
|---|---|
| **Code root** | this folder (`dev/OS-005-AI-Assessment-Service/`) |
| **Project docs** | `./docs/` |
| **Vault project page** | `Open-Memory-Vault/projects/OS-005-AI-Assessment-Service/README.md` |
| **GitHub repo** | https://github.com/parrysan/OS-005-AI-Assessment-Service |
| **External systems** | {{Drive folder, Linear, Notion, Figma, etc. — or "none"}} |

---

## Live references

> **Operational facts that should never have to be re-discovered.** Deployed URLs, store handles, theme IDs, API endpoints, credentials *location* (never the credentials themselves — those live in the global `.env`, see global AGENT.md §2.5). Update this section whenever a fact changes — it is the canonical source.

- **Production URL**: {{e.g. https://example.com}}
- **Staging / preview URL**: {{or "none"}}
- **Platform handle / project ID**: {{e.g. Shopify store handle, Firebase project ID, Vercel project ID}}
- **Other identifiers**: {{theme IDs, API endpoints, webhook URLs, etc.}}
- **Credentials**: stored in global `.env` under `{{KEY_NAME_PREFIX_*}}`

---

## Tech stack

Depends on project scope — no default web stack. Define as needed.

---

## Project-specific rules

> Domain rules, naming conventions, "do not" lists. Anything an LLM working in this project must know that isn't true globally. If empty, write "None — global rules apply" and stop.

- None — global rules apply.

---

## Skills

> List any project-specific skills in `./.claude/skills/`. If none, the project uses the global library at `agent-config/skills/`. Do not duplicate the global skills inventory here — see global AGENT.md §2.2.

- **Project-local skills**: none — uses global library
- **Most relevant global skills for this project**: `brainstorming`, `research`, `research-deep-dive`

---

## Notes for the next session

> **Optional, ephemeral.** A 2–3 line free-form scratch pad of "where I left off" — not durable knowledge. Durable decisions belong in the vault project page. Wipe and rewrite freely.

Last action (2026-04-18): Shipped 4-page microsite (Home, Opportunity with tabs, Economics, Talk), Warm Editorial theme (cream + terracotta, DM Sans + Instrument Serif). Deployed to GitHub Pages: https://parrysan.github.io/OS-005-AI-Assessment-Service/
In progress: Monday 20 April 11:00–12:00 CET call with Charlie and Roberto — this site is the pre-read. Jitsi URL still generic (meet.jit.si) — swap in specific room URL when calendar invite carries one.
Pending: Port ODS os-001 Header component (shrink-on-scroll + mobile drawer) into the site nav — currently bespoke. Also stake three staging stubs in ODS catalogue/staging/: editorial page nav, editorial tabs variant, editorial lightbox gallery.
Open: After Monday, decide — solo offering vs productized assessment template?
Key links: repo https://github.com/parrysan/OS-005-AI-Assessment-Service · vault page projects/OS-005-AI-Assessment-Service/README.md · theme wiki/warm-editorial-theme.md
