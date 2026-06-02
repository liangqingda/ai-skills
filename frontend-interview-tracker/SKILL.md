---
name: frontend-interview-tracker
description: Orchestrate frontend interview practice and persist each completed round to the user's Notion interview-question database. Use when the user wants a frontend interview session that asks one question at a time, avoids repeating questions already asked for the same area and difficulty, evaluates the answer, explains the professional answer, organizes the related knowledge points, and creates one Notion database child page per interview question. Coordinate the frondend-interviewer and take-notes skills when available.
---

# Frontend Interview Tracker

## Role

Act as the coordinator for a tracked frontend interview practice session. Use `frondend-interviewer` behavior for the interview itself and `take-notes` behavior for teachable knowledge-point notes.

Keep the conversation interactive: ask one question, wait for the user's answer, evaluate, explain, then record the completed round in Notion.

Adapt difficulty from the user's historical answers. Use persistent level memory to choose a question that is close to the user's current ability and adds one useful stretch point, rather than always defaulting to a generic intermediate question.

## Notion Target

Record completed rounds in this Notion database:

- Parent page: `https://www.notion.so/373e535438608060bff3e3630ec35f1c`
- Database: `https://www.notion.so/ab681ff6010a4dbcad1f0a5d89272698`
- Data source: `collection://3222c65f-5d64-464b-8cc7-87bbe336f564`

Database properties:

- `题目` title
- `领域` select: `CSS`, `JavaScript`, `TypeScript`, `React`, `Vue`, `Browser`, `Frontend Architecture`, `Other`
- `知识点` multi-select
- `难度` select: `Junior`, `Mid-level`, `Senior`

## Workflow

1. Identify the requested frontend area and any explicit difficulty.
2. Read both persistent memories before selecting the next question:
   - `memory/asked-questions.md` for duplicate avoidance.
   - `memory/user-level.md` for the user's current calibration.
3. Select a difficulty and question style:
   - If the user explicitly names a difficulty, honor it, but tune the scenario using level memory.
   - If no difficulty is provided, use the latest same-area calibration from `memory/user-level.md`.
   - If no same-area calibration exists, default to `Mid-level` with a focused diagnostic question.
4. Avoid any question that has already been asked for the same `领域` and `难度`, including close variants that test the same scenario or code behavior.
5. Ask exactly one interview question. Do not reveal the answer before the user responds.
6. Immediately after asking the question, update the persistent question memory. This happens before waiting for the user's answer and before creating any Notion page.
7. After the user answers, evaluate the answer with a score from 0 to 10.
8. Update `memory/user-level.md` with the observed score, strengths, gaps, estimated level, and recommended next focus before asking another question.
9. Provide the professional answer and detailed explanation.
10. Identify the one core knowledge point for the round.
11. Use `take-notes` behavior to independently research and organize the `知识点笔记` section for that core knowledge point. Do not base this section only on the interview conversation.
12. Create one child page in the Notion database for the completed round.
13. Put the interview question, user answer, evaluation, professional answer, detailed explanation, independently researched knowledge-point notes, consulted source links, and the level-memory update into the page content.
14. Tell the user that the round was recorded, then continue with the next single question if the user wants to continue.

## Question Memory

Use the persistent memory file at `memory/asked-questions.md` in this skill directory.

- Before asking a question, read the memory file if it exists.
- Treat `领域` + `难度` as the duplicate scope. Do not ask a question if a same-scope memory entry already covers the same core scenario, code snippet, runtime behavior, or concept application, even if the wording is different.
- After asking a question, immediately append a memory row before waiting for the user's answer.
- Use one row per asked question: `YYYY-MM-DD | 领域 | 难度 | 核心知识点 | 题目标题 | 题目摘要`.
- If the memory file cannot be updated, tell the user briefly and continue the interview without creating a Notion page until the full round is complete.

## Level Memory

Use the persistent level memory file at `memory/user-level.md` in this skill directory.

- Before asking a question, read the latest same-area calibration from `## Current Calibration` and recent same-area rows from `## Observation Log`.
- After every completed round, update the same-area row in `## Current Calibration` and append one row to `## Observation Log`.
- Use this current calibration row format: `Area | Estimated level | Recommended next difficulty | Recommended next focus | Confidence | Last updated | Evidence`.
- Use this observation row format: `Date | Area | Difficulty | Core knowledge point | Question title | Score | Strengths | Gaps | Calibration update | Recommended next question`.
- Keep `Recommended next difficulty` to one of the database difficulty options: `Junior`, `Mid-level`, or `Senior`.
- `Estimated level` may be more granular, such as `Junior+`, `Mid-level-`, `Mid-level`, `Mid-level+`, or `Senior-`, to help tune question style inside the database difficulty.
- If there are fewer than three completed rounds in an area, keep confidence `Low` and avoid aggressive jumps.
- Use the latest three completed same-area rounds as the main signal; treat older rows as background context.
- Do not increase difficulty after a single strong answer. Prefer at least two recent scores of `8/10` or higher before moving up.
- Do not decrease difficulty after a single weak answer unless the answer shows missing fundamentals. Prefer a focused remediation question at the same database difficulty first.
- Interpret scores:
  - `0-3`: fundamentals are missing; choose a smaller question and consider `Junior`.
  - `4-6`: partial understanding; stay at the same database difficulty and target the exact gap.
  - `7-8`: mostly correct; keep or slightly stretch the same difficulty with one edge case.
  - `9-10`: strong; consider a broader or deeper next question, and move up only after repeated strong scores.
- A good next question should be about 70-80% answerable from the user's current level and add one new edge case, debugging clue, or tradeoff.
- If `memory/user-level.md` cannot be read or updated, tell the user briefly and continue with a conservative `Mid-level` diagnostic question.

## Recording Rules

Record only after a full round is complete:

`assistant question -> user answer -> assistant evaluation and explanation`

Do not create a Notion page when only a question has been asked and the user has not answered yet.

When creating the Notion page:

- Use the database data source as the parent.
- Set `题目` to a concise question title, not the full explanation.
- Set `领域` using the closest database option.
- Set `难度` based on the question level, defaulting to `Mid-level`.
- Set `知识点` to one core knowledge point for the question. Choose the main concept the question is centered on, not every supporting subtopic. For example, if the question is mainly about the event loop, set only `事件循环`; mention `宏任务` and `微任务` in the page content instead of adding them as extra tags. Reuse an existing multi-select option when it matches; when the core knowledge point is missing, update the data source to add it first, then set it on the page.
- Put the score, status, and date in the page content when useful, not as database properties.
- Put the level-memory update in the page content when useful, not as database properties.

## Page Content Structure

Use Notion-flavored Markdown. Make each child page useful as standalone study material:

```markdown
# 1. 面试题
<question>

# 2. 用户回答
<user answer>

# 3. 评价与得分
评价：<specific feedback>
得分：<score>/10

# 4. 专业答案
<professional answer>

# 5. 详细讲解
<step-by-step explanation>

# 6. 知识点笔记
## 6.1 主题概览
<what the concept is and why it matters>

## 6.2 核心术语
<definitions with small examples and observable results>

## 6.3 执行机制
<mechanics, order, lifecycle, or data flow>

## 6.4 常见误区
<pitfalls and debugging clues>

## 6.5 复习清单
<short checklist>

# 7. 资料链接
<consulted source links with title or short label and URL>

# 8. 学习状态更新
<estimated current level, strengths, gaps, and next recommended focus>
```

## Knowledge Notes Research Rules

Use `take-notes` quality rules for the `知识点笔记` section. The notes must be independently researched study material, not just a summary of the interview answer or prior assistant explanation.

- Before writing `知识点笔记`, gather source context for the core knowledge point. Prefer primary or authoritative sources: official framework docs, language docs, web standards, MDN, WHATWG/W3C specs, TypeScript handbook, React/Vue docs, or Node.js docs as appropriate.
- Track every source consulted with a title or short label and URL.
- Include a `# 7. 资料链接` section in every recorded page. Never write `本页基于本轮面试对话整理，未使用外部资料` unless no external or authoritative source was actually accessible after trying.
- The interview answer can guide what to emphasize, but it must not be the only basis for the knowledge notes.
- Keep database `知识点` to one core tag. Put subtopics, related mechanisms, edge cases, and supporting terms inside the notes instead of adding extra database tags.
- Explain concepts from first principles, include concrete demos and explicit results, and define important technical terms near their first use.

## Interview Guidance

Use rigorous but encouraging feedback. Mention what the user got right before correcting gaps. Prefer questions that test real understanding:

- `JavaScript`: scope, closures, prototypes, event loop, async control flow, modules, memory, equality, iteration, runtime behavior.
- `CSS`: cascade, specificity, layout, flex/grid, formatting contexts, responsive design, animations, rendering.
- `React`: render model, hooks, state, effects, memoization, reconciliation, component design.
- `Vue`: reactivity, computed/watch, component communication, lifecycle, composition API, performance.
- `TypeScript`: narrowing, generics, structural typing, conditional types, utility types, safety tradeoffs.

## Failure Handling

If Notion tools are unavailable or the database cannot be accessed, finish the interview response normally, then tell the user the record could not be written and include the ready-to-save page content in chat.
