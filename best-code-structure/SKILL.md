---
name: best-code-structure
description: 代码库架构与代码结构改进工具包（源自 Matt Pocock 的 mattpocock/skills）。用于代码库架构审查与重构、模块/接口设计、领域建模、代码评审、TDD 等场景。当你需要审查或改进已有代码库的结构、设计模块边界与接口、建模领域概念、做代码评审时使用。核心入口为 improve-codebase-architecture（扫描代码库找出架构摩擦点并输出可视化报告）与 codebase-design（架构设计词汇与原则）。
---

# Best Code Structure

代码库架构与结构改进工具包，来自 [mattpocock/skills](https://github.com/mattpocock/skills)。

核心理念：把**浅模块（shallow modules）**改造成**深模块（deep modules）**——接口远比实现简单、一次调用就完成大部分工作的模块，从而提升可测试性与 AI 可导航性（AI-navigability）。配套原则包括删除测试（deletion test）、"接口即测试面"、seam、adapter、leverage、locality 等架构词汇。

## 内部子 skill

本目录是一个多 skill 聚合包，各子 skill 的 SKILL.md 位于 `skills/` 下。按需读取对应子 skill 并按其流程执行：

| 子 skill | 路径 | 用途 |
|---|---|---|
| **improve-codebase-architecture** | `skills/engineering/improve-codebase-architecture/SKILL.md` | 扫描代码库找出架构摩擦点，输出 HTML 可视化报告，并与用户逐一 grill 深化方案。**架构审查总入口。** |
| **codebase-design** | `skills/engineering/codebase-design/SKILL.md` | 架构设计词汇与原则（module、interface、depth、seam、adapter、leverage、locality），设计接口/模块边界。 |
| **domain-modeling** | `skills/engineering/domain-modeling/SKILL.md` | 领域建模，维护 `GLOSSARY.md` 领域术语。 |
| **grill-with-docs** | `skills/engineering/grill-with-docs/SKILL.md` | 结合文档的逐项追问/决策树。 |
| **code-review** | `skills/engineering/code-review/SKILL.md` | 代码评审。 |
| **tdd** | `skills/engineering/tdd/SKILL.md` | 测试驱动开发。 |
| 其他 | `skills/engineering/` | 还包含 implement、to-spec、to-tickets、triage、research、retro 等，按需查看。 |

## 使用方式

1. **审查/改进已有代码库结构**：读取 `skills/engineering/improve-codebase-architecture/SKILL.md`，按其流程探索代码库（默认先看近期热区/提交历史）、生成 HTML 报告、与用户选择候选并 grill。
2. **设计模块/接口**：读取 `skills/engineering/codebase-design/SKILL.md`，使用其架构词汇与设计原则。
3. 执行中涉及领域术语时，配合 `domain-modeling` 维护 `GLOSSARY.md`（仓库根目录）。

> 注意：improve-codebase-architecture 为 `disable-model-invocation`，需用户显式要求审查代码库架构时才触发。
