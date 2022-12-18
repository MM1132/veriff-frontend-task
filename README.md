# Veriff's Frontend Task
*A task for Veriff's job application process*

## Setting up for developers

- yarn `1.22.19`
- node `18.12.1`

1. Run: `npm install --global yarn@1.22.19`
2. If you already have yarn, Run: `yarn set version 1.22.19`
3. Run: `yarn`
4. Install ESLint plugin and add this to VSCode settings file:

```json
"editor.tabSize": 2,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
  },
"eslint.validate": ["typescript"]
```
5. Run project: `yarn dev`
