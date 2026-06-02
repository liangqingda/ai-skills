# User Level Memory

Use this file to calibrate future frontend interview questions to the user's observed level.

## Current Calibration

| Area | Estimated level | Recommended next difficulty | Recommended next focus | Confidence | Last updated | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| JavaScript | Mid-level- | Mid-level | `this` 绑定复盘后，出一个作用域或闭包类题目，控制变量数量，重点考察运行时行为和错误传播 | Low | 2026-06-02 | 1 completed JS round: score 5/10 on `this` binding. Correctly identified method call, explicit `call`, and returned arrow closure behavior, but missed strict-mode method-reference loss causing `TypeError`, and confused object-literal arrow `this` with object ownership. |

## Observation Log

| Date | Area | Difficulty | Core knowledge point | Question title | Score | Strengths | Gaps | Calibration update | Recommended next question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-02 | JavaScript | Mid-level | `this` | 方法丢失引用与箭头函数的 this | 5/10 | Understood direct method call, explicit `call` on a normal function, and lexical `this` preserved by an arrow returned from a method. | Missed that assigning a method to a standalone variable loses the receiver; missed strict-mode `undefined` `this` causing `TypeError` and stopping execution; overgeneralized arrow `this` inside object literals. | Estimate JavaScript as `Mid-level-`; keep database difficulty `Mid-level`, but choose narrower runtime-behavior questions with one main trap. | Ask a closure/scope or `var`/`let` loop question, requiring explicit output order and explanation of shared binding vs per-iteration binding. |
