import { FlatCompat } from "@eslint/eslintrc"
import perfectionist from "eslint-plugin-perfectionist"
import prettierPlugin from "eslint-plugin-prettier"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const perfectionistConfig = perfectionist.configs["recommended-alphabetical"]

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ...perfectionistConfig,
    rules: Object.keys(perfectionistConfig.rules).reduce((rules, rule) => ({ ...rules, [rule]: "warn" }), {}),
  },
  {
    plugins: { prettier: prettierPlugin },
    rules: { "prettier/prettier": "warn" },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off",
      "react/display-name": "off",
    },
  },
]

export default eslintConfig
