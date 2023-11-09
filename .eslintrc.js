/* eslint-env node */
/*
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended','plugin:vue/vue3-recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','vue'],
  root: true,
};

*/

module.exports = {
  root: true,
  extends: [
      "plugin:vue/vue3-essential",
      "plugin:vue/vue3-strongly-recommended",
      "plugin:vue/vue3-recommended",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "@vue/eslint-config-typescript",
      "@vue/eslint-config-prettier/skip-formatting",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
      ecmaVersion: "latest",
      project: ["./tsconfig.app.json"],
      tsconfigRootDir: __dirname,
      parser: "@typescript-eslint/parser",
  },
  rules: {
      "@typescript-eslint/no-unused-vars": [
          "warn",
          {
              argsIgnorePattern: "^_+$",
          },
      ],
      "@typescript-eslint/no-floating-promises": [
        "error",
        {
          "ignoreVoid": true
        }
      ],
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off"
  },
  ignorePatterns: ["/*", "!/src"],
};