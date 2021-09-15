# dv-scripts

![npm](https://img.shields.io/npm/v/dv-scripts)

Scripts for Node/TypeScript development.

- `build`
  - Build using Rollup.
- `test`
  - Test using Jest.
- `lint`
  - Sort `package.json` files with `sort-package-json`.
  - Format files with prettier.
  - Lint using ESLint.
- `start`
  - Compile individual files in watch mode using Babel.
  - We do this so that when developing in a monorepo you get proper hot module reloading.
- `release`
  - Release a production release if we are on the `main` branch.
  - Release a canary release if we aren't on the `main` branch.
  - When in a normal repo we use [semantic-release](https://github.com/semantic-release/semantic-release).
  - When in a repo using Yarn workspaces we use [multi-semantic-release](https://github.com/DylanVann/multi-semantic-release).
- `ci`
  - Single command for running common CI commands.
    1. `build`
    2. `lint`
    3. `test`
    4. `release`
  - Instead of setting up a complex YAML file and locking yourself into a CI provider you can use `dv-scripts ci`.
