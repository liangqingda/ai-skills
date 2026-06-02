# AI Skills

This repository stores the user-maintained Codex skills that are installed under:

```text
/Users/lqd/.codex/skills
```

## Skills

- `answer-sql-question`
- `english-practice-tracker`
- `frontend-interview-tracker`
- `take-notes`

## Sync Back To Codex

After editing skills in this repository, sync them back to Codex with:

```bash
rsync -a --delete --exclude='.git/' --exclude='.DS_Store' --exclude='.system/' --exclude='.gitignore' --exclude='README.md' /Users/lqd/projects/ai-skills/ /Users/lqd/.codex/skills/
```

The `.system` skills are managed by Codex and are intentionally not stored here.
