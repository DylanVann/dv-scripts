# eslint-config-dv-scripts

![npm](https://img.shields.io/npm/v/eslint-config-dv-scripts)

ESLint config for use with `dv-scripts`.

**Why is this a separate package?**

We want consumers of our ESLint config to be able to use in `package.json`:

```
  "eslintConfig": {
    "extends": "dv-scripts"
  },
```

Having this in their `package.json` file will make IDE's use the correct config.

Because of how ESLint resolves config files (some magic involving the name) this means we must create this package named `eslint-config-dv-scripts`.

If instead ESLint used normal Node resolution we could use:

```
  "eslintConfig": {
    "extends": "dv-scripts/eslint-config"
  },
```
