# __PACKAGE_NAME__

Zod runtime schemas, generated TypeScript types and OpenAPI 3.1 contracts. Node.js 20+ and pnpm are required. Source uses ESM syntax and builds to CommonJS in `lib/`.

## Install and check

```sh
pnpm install
pnpm lint
pnpm build
node lib/apis/greeting/example-server.js
```

Run these in another terminal:

```sh
curl -i -X POST http://localhost:3001/greetings -H 'Content-Type: application/json' -d '{"name":"Ada","mood":"formal"}'
curl -i -X POST http://localhost:3001/greetings -H 'Content-Type: application/json' -d '{"name":""}'
```

The first request returns 200 and `{"message":"Good day, Ada."}`. The second fails `name.min(1)` validation and returns 400. Unknown routes return 404. The example server logs processing and status without echoing request content. Set `PORT` to change the listener.

## Add schemas

Add a feature under `apis/<feature>/`, export it from `apis/index.ts`, and give every exported top-level Zod object a unique `.openapi('TypeName')`. `defineApiInfo` describes the HTTP method/path, query/params/body, response, tags, summary, and metadata defaults. It is a contract, not an automatic route implementation. Prefer `z.infer<typeof schema>` for business types; `types/apiTypes.ts` after `// start of generated types` is generated, not hand-maintained.

`pnpm generate:apitypes` and `pnpm generate:openapi` can run separately. `pnpm build` runs both, compiles types and copies OpenAPI JSON into `lib/`. A build failure cannot leave a temporary edit in `types/index.ts`, because no build step mutates it. The ignored root `openApiJsonFile.json` is reproducible.

## Publish

Configured registry: __REGISTRY__. Supply credentials outside the repository. `pnpm publish` invokes `prepack` to rebuild. For a custom or GitHub Packages registry, consumers need matching registry settings and read access. Inspect a package locally with `pnpm pack --pack-destination /tmp`; `files: ["lib"]` excludes source/scripts, while npm still includes package metadata and README. Husky runs lint-staged/ESLint on staged `.ts` files before commit. Do not commit tokens.

The example server is for contract verification; it omits production authentication, rate limiting, and body-size limits. `retry` and `requiresAuth` are metadata only, not behavior implemented by the sample server.
