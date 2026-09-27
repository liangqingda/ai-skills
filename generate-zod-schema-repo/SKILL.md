---
name: generate-zod-schema-repo
description: Scaffold a reusable Zod schema package from an empty folder, including TypeScript types, OpenAPI 3.1 generation, a runnable API example, lint, build, and registry-ready packaging. Use when a user asks to create a new schema/contract repository from scratch, not to add one schema to an existing project.
---

# Generate Zod Schema Repo

Create a complete, runnable schema package from an empty directory. This skill includes a self-contained starter under `assets/starter/` and `scripts/scaffold.mjs`; do not depend on another project being present.

## Required Input

Before writing files, collect these values from the user's request. Ask for any missing value explicitly; do not infer identities from a previous repository or silently use example values.

- Absolute target directory for the new package. Confirm it is absent or empty; never overwrite an existing project's files.
- npm package name, scoped or unscoped, for example `@team/orders-schema`. A GitHub Packages target requires a scope matching its owner.
- Publication registry: `npmjs`, `github`, or a specific HTTPS npm-compatible registry URL. Ask even if it seems obvious; never assume GitHub Packages.
- Repository URL, or an explicit `none` if there is no remote yet. This only fills package metadata; do not create a remote or publish.

Optional: initial version (default `0.1.0`), example domain/API (default POST `/greetings`), package description, Node/pnpm versions, license. Confirm any non-default requirements that materially affect the template. If a user wants custom examples, update the feature directory, exports, documentation, and validation together after scaffolding.

## Execute

1. Inspect the target, existing instructions, Git status, and environment. If the target is nonempty, stop and ask before modifying it. Follow repository-specific policies, including commit instructions. Do not scaffold a second time over an existing project.
2. Run from this skill directory:

   ```sh
   node scripts/scaffold.mjs --target /absolute/empty/path --name @team/orders-schema --registry github --repository git+ssh://git@github.com/team/orders-schema.git
   ```

   For no remote, use `--repository none`; for npmjs use `--registry npmjs`. The script validates arguments and writes the package metadata, `.npmrc` where applicable, README, and complete source tree. It does not install dependencies, initialize Git, set credentials, or publish.
3. In a standalone empty target, run `git init` locally before installation so Husky's `prepare` step can install the pre-commit hook; do not configure a remote or make an initial commit unless requested or required by applicable instructions. If the user explicitly requests no Git, skip initialization and explain that the hook cannot operate until they initialize Git and rerun `pnpm install`.
4. Run `pnpm install`, `pnpm lint`, and `pnpm build` in the target. Verify generated `types/apiTypes.ts` references, `openApiJsonFile.json` (`openapi: 3.1.0`, correct package version and path), declarations and CommonJS entry in `lib/`, plus `lib/openApiJsonFile.json`.
5. Exercise the compiled example server (`node lib/apis/greeting/example-server.js`) on a free port; make a successful POST, an invalid POST, and a missing-route request. Inspect terminal logs and stop the test server. Verify both root and `./apis` package exports load, and check that an unnamed top-level Zod object makes type generation fail without changing tracked files (a temporary in-memory injection is suitable).
6. Build twice and compare relevant generated outputs; ensure no temporary edits or unexpected tracked changes remain. Inspect `pnpm pack --pack-destination <temporary-directory>`: npm includes `package.json` and README alongside `lib/`, even with `files: ["lib"]`. Do not publish automatically.
7. Report the project path, commands to run, supplied settings, verification results, and any deviations or checks that could not be performed. If a task-local commit is required, stage only this task's files and commit once after validation.

## Design Invariants

- Source uses TypeScript ESM syntax; `tsc` emits CommonJS, ES2015, declarations, source maps. Node >=20 and pnpm. `common/`, `apis/`, `types/`, `scripts/` are source; only `lib/` ships.
- `extendZodWithOpenApi(z)` runs before `.openapi(name)` is used. Top-level exported Zod objects require a unique valid name. `zod-to-ts` produces named type aliases after the exact `// start of generated types` marker; preserve handwritten content above it. OpenAPI generator registers `ApiInfo` into `OpenApiGeneratorV31`, reading package version directly from `package.json`.
- `prebuild` generates types and JSON, `build` cleans `lib/` and compiles, `postbuild` copies JSON and removes compiled build-only scripts. Never temporarily mutate `types/index.ts` or package metadata: a failed build must not leave a temporary version change. Generated root JSON and `lib/` are ignored; `types/apiTypes.ts` is tracked.
- Sample API must remain genuinely callable and log meaningful steps/statuses without raw secrets. `retry` and `requiresAuth` metadata defaults do not implement actual retry/auth. Teach that boundary in README.
- Use the starter as a basis, not a hardcoded product identity. Adapt package name, registry, repository, README, and custom API names/paths coherently. Preserve user instructions and avoid unrelated configuration changes.
