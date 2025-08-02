# Common.Node

`@onededios/common.node` is a lightweight collection of **Node.js** utilities that simplify server‑side development.  
It ships common building blocks such as a console logger, environment variable loader/validator, file utilities, error handling helpers, and robust string‑to‑type parsers.

## Code Status

### Overall

![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=ncloc)
![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=alert_status)
![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=coverage)

### Quality and Maintenance

![Reliability](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=reliability_rating)
![Security](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=security_rating)
![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=bugs)
![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=vulnerabilities)

### Maintainability

![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=code_smells)
![Debt](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=sqale_index)
![Rating](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=sqale_rating)
![Duplication](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=duplicated_lines_density)

## Table of Contents

- [Layout](#layout)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Layout

```bash
Common.Node/
 ├─ node_modules/               # Dependencies (preinstalled)
 ├─ src/                        # TypeScript source code
 │   ├─ config/                 # Environment variable loader
 │   ├─ factories/              # Utility for runtime enums
 │   ├─ handlers/               # Error and file helpers
 │   ├─ logging/                # Console logger
 │   ├─ utils/                  # Generic helpers (parser, random generator)
 │   ├─ tests/                  # Vitest unit tests
 ├─ index.ts                    # Package entry placeholder
 ├─ package.json                # Scripts and dependency list
 ├─ tsconfig.json               # TypeScript compiler settings
 └─ vitest.config.ts            # Test/coverage configuration
```

## Installation

```bash
npm   install @onededios/common.node   # npm
pnpm  add     @onededios/common.node   # pnpm
yarn  add     @onededios/common.node   # yarn
```

### Requirements

- **Node.js ≥ 18**
- ESM‑compatible runtime (the package ships both **ESM** `.mjs` _and_ **CommonJS** `.cjs` builds)

## Contributing

See full contributing info and steps in [`CONTRIBUTING`](./CONTRIBUTING.md)

## License

Licensed under the **Apache 2.0** License.  
See the full text in [`LICENSE`](./LICENSE).
