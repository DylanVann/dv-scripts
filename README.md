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
  - Release a canary release if we aren't on the `master` branch.
  - Release a release based on conventional commits.
  - Works in monorepo's.
  - When in a monorepo we use https://github.com/qiwi/multi-semantic-release.
- `ci`
  - Single command for running common CI commands.
    1. `build`
    2. `lint`
    3. `test`
    4. `release`
  - Instead of setting up a complex YAML file and locking yourself into a CI provider you can use `dv-scripts ci`.
