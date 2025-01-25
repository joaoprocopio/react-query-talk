// @ts-check
import path from "node:path"
import { fileURLToPath } from "node:url"

import { includeIgnoreFile } from "@eslint/compat"
import eslint from "@eslint/js"
import node from "eslint-plugin-n"
import prettier from "eslint-plugin-prettier/recommended"
import sort from "eslint-plugin-simple-import-sort"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")

const config = tseslint.config(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      "simple-import-sort": sort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    ...node.configs["flat/recommended-script"],
    files: ["mock/**/*.js"],
    languageOptions: {
      ...node.configs["flat/recommended-script"].languageOptions,
      ecmaVersion: "latest",
    },
    rules: {
      ...node.configs["flat/recommended-script"].rules,
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  prettier,
)

export default config
