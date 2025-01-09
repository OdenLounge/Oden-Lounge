import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Ignore the dist directory
  { ignores: ['dist'] },

  // Configuration for frontend files
  {
    files: ['src/**/*.{js,jsx}'], // Adjust to match your frontend folder
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // Configuration for backend files
  {
    files: ['backend/**/*.{js,ts}'], // Adjust to match your backend folder
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node, // Include Node.js globals (e.g., require, process)
        ...globals.commonjs,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script', // CommonJS module format
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'off', // Allow console statements in backend
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused arguments starting with "_"
    },
  },
];
