# TypeScript

Get intellisense for editors and AI agents for `$x`, `$route`, and Manifest's other magic globals without adding a build step.

---

## Overview

The optional `mnfst-types` CLI generates a single `manifest.d.ts` in the project root that declares the framework's globals and adds project-specific types for every data source registered in `manifest.json` — inferred from the actual CSV / JSON / YAML files or integrated Appwrite database configuration. Project files stay `.js` and `.html` — VS Code, Cursor, and AI tooling pick the declarations up automatically.

Run from the project root (next to `manifest.json`):

```bash copy
npx mnfst-types
```

Re-run whenever a data source is added or its shape changes.

---

## CLI Options

| Option                | Description                                               | Default                        |
|-----------------------|-----------------------------------------------------------|--------------------------------|
| `--manifest <path>`   | Path to `manifest.json`                                   | `./manifest.json`              |
| `--out <path>`        | Output `.d.ts` path                                       | `./manifest.d.ts`              |
| `--init`              | Also write a baseline `jsconfig.json` (only if missing)   | —                              |
| `-h`, `--help`        | Show usage                                                | —                              |

`--init` is for projects that want JSDoc errors surfaced as squiggles in `.js` files. Without it, the declarations still power autocomplete and inline type info.

---

## Autocomplete

For autocomplete and validation in `manifest.json` itself, add a `$schema` reference at the top of the file. The starter project includes this line by default:

```json "manifest.json" copy
{
    "$schema": "https://manifestx.dev/manifest.schema.json",
    "name": "My Project",
    "data": { ... }
}
```

VS Code and most JSON-aware editors fetch and apply the schema automatically.

---

## Regeneration

The generated `manifest.d.ts` has a static portion (magic globals, source-state operators, base types — same for every project) and a project augmentation block bracketed by `// AUGMENTATION:start` and `// AUGMENTATION:end`. Re-running the CLI overwrites the augmentation block; the static portion is also refreshed so it stays in sync with the installed framework version.