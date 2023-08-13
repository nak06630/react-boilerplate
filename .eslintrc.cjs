module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: {
      version: 'detect'
    }
  },
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
