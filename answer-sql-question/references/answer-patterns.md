# SQL Answer Patterns

Use these compact patterns when answering recurring SQL questions.

## 1. LEFT JOIN plus WHERE on right table

Template:

1. Show left table rows.
2. Show right table rows.
3. Show the `LEFT JOIN` result before `WHERE`.
4. Evaluate the `WHERE` condition on each joined row.
5. Show why rows with right-table `NULL` values disappear.
6. Rewrite with the filter in `ON` and compare outputs.

Minimum dataset:

`users`

| id | name |
|---|---|
| 1 | Alice |
| 2 | Bob |
| 3 | Carol |

`orders`

| id | user_id | status |
|---|---|---|
| 101 | 1 | paid |
| 102 | 2 | pending |

## 2. NOT IN vs NOT EXISTS

Template:

1. Show the subquery result set first.
2. Include one `NULL` in the subquery result.
3. Expand `NOT IN` into the equivalent chain of comparisons.
4. Show why one `UNKNOWN` contaminates the whole predicate.
5. Compare with `NOT EXISTS` using the same data.

Minimum dataset:

`users`

| id |
|---|
| 1 |
| 2 |
| 3 |
| 4 |

`orders`

| id | user_id |
|---|---|
| 101 | 1 |
| 102 | 2 |
| 103 | NULL |

## 3. COUNT(*) vs COUNT(column)

Template:

1. Show total row count.
2. Mark which rows have `NULL` in the counted column.
3. Show `COUNT(*)` result.
4. Show `COUNT(column)` result.
5. State that `COUNT(column)` ignores `NULL`.

## 4. NULL in WHERE

Template:

1. Show the raw rows.
2. Evaluate the predicate for each row, including the `NULL` row.
3. Mark each result as `TRUE`, `FALSE`, or `UNKNOWN`.
4. Remind that `WHERE` keeps only `TRUE`.

## 5. Type choice

Template:

1. State the business meaning of the field.
2. State whether the field is for arithmetic, identity, display, calendar date, or event time.
3. Show one concrete failure mode of the wrong type.
4. Recommend the type.
