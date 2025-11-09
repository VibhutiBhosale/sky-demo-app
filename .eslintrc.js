module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier", "react", "react-hooks", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {}, // So it can resolve TS paths
    },
  },
  rules: {
    // ✅ General
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-expressions": "warn",
    "no-var": "error",
    "arrow-body-style": ["off", "as-needed"],
    "linebreak-style": 0,
    "complexity": ["error", 15],

    // ✅ TypeScript
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // ✅ React / Hooks
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],

    // ✅ Import order
    "import/no-duplicates": "error",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "unknown",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
      },
    ],

    // ✅ Prettier integration
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "dist/",
    "build/",
    "coverage/",
  ],
};
