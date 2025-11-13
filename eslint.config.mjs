// eslint.config.mjs
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  // Base Next.js + TypeScript setup
  ...nextVitals,
  ...nextTs,

  // Custom project-specific rules and plugins
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },

    plugins: {
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tsPlugin,
    },

    rules: {
      // ✅ Prettier integration
      'prettier/prettier': [
        'error',
        {
          "semi": true,
          "singleQuote": false,
          "tabWidth": 2,
          "trailingComma": "es5",
          "printWidth": 100,
          "bracketSpacing": true,
          "arrowParens": "avoid",
          "endOfLine": "auto",
        },
      ],

      // 🧠 General improvements
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/react-in-jsx-scope': 'off', // Not needed for Next.js
      'react/prop-types': 'off', // Using TypeScript types
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // 🔕 Ignored files and folders
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    'dist/**',
    'coverage/**',
    '*.config.js',
    '*.config.cjs',
    '*.config.mjs',
    'scripts/**',
  ]),
]);
