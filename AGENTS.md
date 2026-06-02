# Repository Skill Overrides

This repository is the source of truth for the user-maintained Codex skills in
this project.

Codex discovers the repository-local skills through `.agents/skills`, which
contains symlinks to the skill source directories in this repository.

When working inside `/Users/lqd/projects/ai-skills`, if one of the following
skills is triggered or explicitly named, use the repository-local skill entry
and ignore any duplicate installed entry with the same name under
`/Users/lqd/.codex/skills`:

- `answer-sql-question` -> `/Users/lqd/projects/ai-skills/answer-sql-question/SKILL.md`
- `english-practice-tracker` -> `/Users/lqd/projects/ai-skills/english-practice-tracker/SKILL.md`
- `frontend-interview-tracker` -> `/Users/lqd/projects/ai-skills/frontend-interview-tracker/SKILL.md`
- `take-notes` -> `/Users/lqd/projects/ai-skills/take-notes/SKILL.md`

For these skills, also resolve relative files such as `memory/`, `references/`,
`agents/`, `scripts/`, and `assets/` from the repository-local skill directory.
Do not read or update the matching files under `/Users/lqd/.codex/skills` unless
the user explicitly asks to sync, install, or inspect the installed copy.

If a user prompt includes a Markdown link to an installed skill path under
`/Users/lqd/.codex/skills/<skill-name>/SKILL.md`, treat it as a reference to the
same skill name and load the repository-local `SKILL.md` above while this
repository is the current workspace.
