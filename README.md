# Common.Node

<p>

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Onededios_Common.Node)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Onededios_Common.Node)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Onededios_Common.Node&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Onededios_Common.Node)

`@onededios/common.node` is a lightweight collection of **Node.js** utilities that simplify server‑side development.  
It ships common building blocks such as a console logger, environment variable loader/validator, file utilities, error handling helpers, and robust string‑to‑type parsers.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Contributing](#contributing)
- [License](#license)

## Features

- Config
- Handlers
- Logging
- Utils

## Installation

```bash
npm   install @onededios/common.node   # npm
pnpm  add     @onededios/common.node   # pnpm
yarn  add     @onededios/common.node   # yarn
```

### Requirements

- **Node.js ≥ 18**
- ESM‑compatible runtime (the package ships both **ESM** `.mjs` _and_ **CommonJS** `.cjs` builds)

## Quick Start

```ts
import { Logger, EnvironmentBuilder, Parser, FileHandler, ErrorHandler } from '@onededios/common.node';

// 1 – Logging
Logger.INFO('Server starting…');

// 2 – Environment (.env)
const env = new EnvironmentBuilder({
	PORT: Parser.parseAsInt,
	DEBUG: Parser.parseAsBool,
});
console.log('Running on port:', env.variables.PORT);

// 3 – File utilities
const cfgFile = new FileHandler('config/settings.json');
const settings = await cfgFile.readJSONAsync();

// 4 – Error handling
try {
	Parser.parseAsInt('abc'); // throws
} catch (err) {
	ErrorHandler.handle(err);
}
```

## Contributing

1. **Fork** and **clone** the repo.
2. `pnpm install`
3. `pnpm run lint && pnpm run test`
4. Create a feature branch.
5. Open a **Pull Request**.

## License

Licensed under the **Apache 2.0** License.  
See the full text in [`LICENSE`](./LICENSE).
