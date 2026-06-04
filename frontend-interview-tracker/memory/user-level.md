# User Level Memory

Use this file to calibrate future frontend interview questions to the user's observed level.

## Current Calibration

| Area | Estimated level | Recommended next difficulty | Recommended next focus | Confidence | Last updated | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| JavaScript | Mid-level- | Mid-level | 继续练习对象引用、参数绑定、浅拷贝与嵌套对象修改；要求不只给输出，还要逐步说明变量绑定和对象状态变化 | Low | 2026-06-03 | 2 completed JS rounds: score 5/10 on `this` binding and 7/10 on object reference/parameter passing. Correctly predicted mutation-through-parameter output, but latest answer omitted step-by-step reasoning. |

## Observation Log

| Date | Area | Difficulty | Core knowledge point | Question title | Score | Strengths | Gaps | Calibration update | Recommended next question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-02 | JavaScript | Mid-level | `this` | 方法丢失引用与箭头函数的 this | 5/10 | Understood direct method call, explicit `call` on a normal function, and lexical `this` preserved by an arrow returned from a method. | Missed that assigning a method to a standalone variable loses the receiver; missed strict-mode `undefined` `this` causing `TypeError` and stopping execution; overgeneralized arrow `this` inside object literals. | Estimate JavaScript as `Mid-level-`; keep database difficulty `Mid-level`, but choose narrower runtime-behavior questions with one main trap. | Ask a closure/scope or `var`/`let` loop question, requiring explicit output order and explanation of shared binding vs per-iteration binding. |
| 2026-06-03 | JavaScript | Mid-level | 对象引用与参数传递 | 函数参数重新赋值与对象属性修改 | 7/10 | Correctly predicted that mutating properties through the parameter affects the original object, while reassigning the parameter to a new object does not affect the outer `user` binding. | Did not provide the requested step-by-step explanation; should explicitly distinguish parameter binding reassignment from object property mutation. | Keep JavaScript at `Mid-level-`; continue Mid-level questions with narrow runtime behavior and require explicit reasoning. | Ask a shallow-copy/destructuring/spread question with a nested object, focusing on which references are shared and which bindings are independent. |
