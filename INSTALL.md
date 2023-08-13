#

## step1

```
npm create vite -- --template react-swc-ts
react-boilerplate

cd react-boilerplate
npm install
npm run dev
```


```
cat << EOF > .editorconfig
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
end_of_line = lf
charset = utf-8

[*.py]
indent_size = 4

[*.html]
indent_size = 2

[*.json]
indent_size = 2
insert_final_newline = ignore

[*.md]
trim_trailing_whitespace = false
EOF
```

```
cat << EOF > react-app.code-workspace
{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "extensions": {
    "recommendations": [
      "editorconfig.editorconfig",
      "dbaeumer.vscode-eslint",
      "esbenp.prettier-vscode",
      "ms-vscode.live-server",
      "shd101wyy.markdown-preview-enhanced"
    ]
  }
}
EOF
```

```
cat << EOF > .prettierrc
{
  "trailingComma": "none",
  "semi": false,
  "singleQuote": true,
  "printWidth": 160
}
EOF
```

```
cat << EOF >> .gitignore

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local
EOF
```

npm install --save-dev prettier eslint-config-prettier

.eslintrc.cjs

prettier を追加する。
parserOptions を丸ごと追加する。
ignorePatterns に 'vite.config.ts', 'tsconfig.json' を追加

```
cat << EOF > .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'tsconfig.json'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  }
}
EOF
```

vite.coinfig.ts

path と resolve追加。npm i -D @types/node も実行

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// also don't forget to `npm i -D @types/node`, so __dirname won't complain
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
  plugins: [react()]
})
```

npm install -D vitest @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom

```
cat << EOF > vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// also don't forget to "npm i -D @types/node", so __dirname won't complain
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
EOF
```

npm install @mui/material @emotion/react @emotion/styled
npm install @mui/joy

npm install @fontsource/roboto
npm install @mui/icons-material
npm install react-hook-form zod @hookform/resolvers/zod
npm install @mui/x-date-pickers date-fns

```
cat << EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "tests"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

```

