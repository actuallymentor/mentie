# Opinionated ESLint and VSCode style guide

A shared set of standards and preferences, enforced through eslint and vscode. Priorities: minimalism, readability, documentation.

## Quickstart

```shell
# Install dependencies
npm install -D airier @babel/eslint-parser @babel/preset-react eslint eslint-plugin-react eslint-plugin-unused-imports husky
mkdir .vscode .husky || echo "Directories already exist"

# Create scripts
npm pkg set scripts.lint="eslint --fix src"

# Init husky
npx husky init

# Download files
curl https://raw.githubusercontent.com/actuallymentor/airier/main/.eslintrc.cjs --output .eslintrc.cjs
curl https://raw.githubusercontent.com/actuallymentor/airier/main/.vscode/settings.json --output .vscode/settings.json
curl https://raw.githubusercontent.com/actuallymentor/airier/main/.husky/pre-commit --output .husky/pre-commit
curl https://raw.githubusercontent.com/actuallymentor/airier/main/.babelrc --output .babelrc

# Add files to git
git add -f .eslintrc.cjs .babelrc .vscode/* .husky/*

# Make husky executable
chmod ug+x .husky/*
git add .husky/pre-commit
```

## Making changes

The relevant source files are in `modules/`. If you make a change, you can update the package by:

1. Making the changes
1. Updating the version number in `package.json`
1. Pushing to the main branch of the repo or opening a pull request. Changes are deployed and published through github actions. Publishing requires a version bump in `package.json`.

### Using this repo as a template

If you are cloning this repo and want to reuse it to create an npm package. These are the one-time setup instructions:

1. You need to do the one-time first publishing manually by running `npm publish --access public` in the root of the project. This will create the package on npmjs and allow you to create a granular token. This requires you to rename `.npmrc` to `.npmrc.bak` temporatily.
1. You need to obtain a NPM_ACCESS_TOKEN on npmjs (https://www.npmjs.com/settings/YOURUSERNAME/tokens/granular-access-tokens/new). Note that granular tokens expire!
# airier
