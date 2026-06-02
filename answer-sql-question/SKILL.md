---
name: answer-sql-question
description: Explain SQL questions, query behavior, joins, NULL logic, aggregation, filtering, ordering, subqueries, execution semantics, and schema-design choices with concrete sample data and row-by-row result reasoning. Use when the user asks why a SQL query returns a result, why two SQL statements differ, how NULL affects logic, how JOIN or NOT IN works, which SQL type to choose, or asks for SQL interview-style explanations and exercises that should be taught through table data, intermediate result sets, and final output comparison rather than abstract definitions alone.
---

# Answer SQL Question

## Overview

Use this skill to answer SQL questions in a teaching style that makes query behavior visible.

Prefer concrete sample tables, intermediate result sets, row-by-row predicate evaluation, and final query output over abstract explanation alone.

## Core Rule

When explaining SQL behavior, always make the logic observable.

Unless the user explicitly wants a short answer only, do all of the following:

1. Restate what the SQL is trying to do in plain language.
2. Build or infer a small sample dataset.
3. Show the relevant intermediate result set when a join, filter, grouping, or subquery is involved.
4. Evaluate the key condition row by row when that is the source of confusion.
5. Show the final result and explain why each row stays or disappears.
6. Then summarize the rule or takeaway.

Do not stop at a definition like "NULL leads to UNKNOWN" or "LEFT JOIN keeps left rows." Prove it with data and result comparison.

## Default Workflow

Follow this sequence unless the question is trivially small.

### 1. Identify the confusion point

Classify the main source of confusion:

- filter semantics in `WHERE` or `HAVING`
- `NULL` and three-valued logic
- `JOIN` matching and post-join filtering
- `NOT IN` vs `NOT EXISTS`
- `COUNT(*)` vs `COUNT(column)`
- `GROUP BY`, `DISTINCT`, or `ORDER BY`
- type choice, cast behavior, or implicit conversion
- time range boundaries
- why two similar SQL statements return different results

### 2. Build a minimal dataset

Use 3 to 6 rows when possible. The data should include:

- at least one row that clearly matches
- at least one row that clearly does not match
- one boundary or edge case row
- one `NULL` row when `NULL` behavior matters

Prefer tables that are small enough to inspect visually.

### 3. Show the SQL against the data

When helpful, split the query into conceptual steps:

- source rows
- joined rows
- predicate evaluation
- grouped rows
- final output

### 4. Evaluate row by row

For logic questions, explicitly show lines like:

- `NULL = 'paid' -> UNKNOWN`
- `3 NOT IN (1, 2, NULL) -> UNKNOWN`
- `COUNT(score)` ignores rows where `score` is `NULL`

If the key difference is between two SQL statements, compare them against the same data and show two final result tables.

### 5. State the general rule

End with one concise rule the user can reuse, for example:

- put right-table filtering in `ON` when you want to preserve left-table rows in a `LEFT JOIN`
- prefer `NOT EXISTS` over `NOT IN` when the subquery may contain `NULL`
- use half-open time ranges instead of casting the timestamp column in the predicate

## Explanation Patterns

### Query result questions

For prompts like:

- "这条 SQL 为什么查不到数据"
- "为什么这里是 LEFT JOIN 但结果像 INNER JOIN"
- "为什么 NOT IN 会出问题"

Use this structure:

1. what the user likely expects
2. sample tables
3. query execution effect
4. row-by-row truth evaluation
5. final result
6. correct mental model

### Comparison questions

For prompts like:

- "这两种写法有什么区别"
- "`COUNT(*)` 和 `COUNT(col)` 有什么区别"
- "`TIMESTAMP` 和 `TIMESTAMPTZ` 怎么选"

Use the same sample data or scenario for both sides and compare:

- intention
- behavior
- output
- common pitfall

### Type selection questions

For prompts like:

- "手机号为什么不用 INTEGER"
- "金额为什么用 NUMERIC"
- "billing_date 用什么类型"

Explain through concrete field examples first, then generalize:

1. what the field represents in business terms
2. what operations are performed on it
3. what can go wrong with the wrong type
4. the recommended type and why

### Practice questions

When the user asks for exercises:

1. tailor the questions to the specific SQL note or concept
2. include edge cases involving `NULL`, join filtering, or type semantics when relevant
3. after the user answers, grade each answer against concrete sample data and query behavior
4. do not only mark right or wrong; explain what rows would appear and why

## Formatting Guidance

Prefer clean, teaching-oriented structure:

- a short setup sentence
- compact markdown tables for sample data
- SQL blocks for the query
- brief row-by-row bullet reasoning when needed
- one final takeaway sentence

Keep the explanation detailed but not padded. If the user asks a small follow-up, zoom into the exact misunderstanding instead of rewriting the whole lesson.

## Things To Avoid

Do not:

- answer only with abstract rules when a data example would clarify it
- use huge datasets that hide the key behavior
- skip the intermediate join result when the join is the source of confusion
- say "this becomes UNKNOWN" without showing its effect on `WHERE` or `HAVING`
- explain `NOT IN` only in theory without a subquery result containing `NULL`

## Reference

Load [references/answer-patterns.md](references/answer-patterns.md) when you want reusable mini-templates for common SQL explanation scenarios.
