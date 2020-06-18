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
- `publish`
  - Publish a canary release if we aren't on the `master` branch.
  - Publish a release based on conventional commits.
  - Works in monorepo's.
