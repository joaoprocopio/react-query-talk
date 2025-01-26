/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: false,
  bracketSameLine: true,
  trailingComma: "all",
  printWidth: 100,
  quoteProps: "consistent",
  plugins: ["prettier-plugin-tailwindcss"],
}

export default config
