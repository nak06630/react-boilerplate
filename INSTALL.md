# react-boilerplate

## step1

```
npm create vite -- --template react-swc-ts
react-boilerplate

cd react-boilerplate
npm install
npm run dev
```

## step2 devtools

- npm install --save-dev prettier eslint-config-prettier
- npm install --save-dev eslint eslint-plugin-react
- npm install --save-dev @tanstack/eslint-plugin-query
- npm install --save-dev vitest
- npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom

## step3 setup

### .editorconfig

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

### vscode (\*\*\*.code-workspace)

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

### prettier (.prettierrc)

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

### eslint (.eslintrc.cjs)

- prettier を追加する。
- parserOptions, plugins, extends を READMEのとおりに追加
- ignorePatterns に 'vite.config.ts', 'tsconfig.json' を追加
- rules をいくつか更新

```
cat << EOF > .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'tsconfig.json'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['react', 'react-refresh', '@tanstack/query'],
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  }
}
EOF
```

### vite (vite.coinfig.ts)

- @/ のパスエイリアスが効くように設定 → path と resolve を追加
- test で、vitest の基本設定を追加

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

### tsconfig.json

- include に tests ディレクトリを追加

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

### gitignore (.gitignore)

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

## step4

- npm install @mui/material @emotion/react @emotion/styled
- npm install @mui/icons-material
- npm install @mui/x-date-pickers date-fns
- npm install react-hook-form yup @hookform/resolvers
