import eslint from "@eslint/js"
import stylistic from '@stylistic/eslint-plugin'
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslint.configs.recommended,
  tseslint.configs.base,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
  }),
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@stylistic/brace-style": "off",
      "comma-dangle": ["error", "always-multiline"]
    },
  },
  { ignores: ["lib/", "src/types/"] },
]
