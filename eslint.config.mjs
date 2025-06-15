import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: ["formatjs", "react"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off", 
      "@typescript-eslint/no-explicit-any": "off",
      "@next/next/no-img-element": "off",
      // Translation validation rules
      "formatjs/no-offset": "error",
      "formatjs/enforce-default-message": ["error", "literal"],
      "formatjs/enforce-placeholders": "error",
      "formatjs/no-multiple-whitespaces": "error",
      "formatjs/no-complex-selectors": "error",
      // Custom rule to catch hardcoded strings in JSX
      "react/jsx-no-literals": ["warn", {
        "noStrings": true,
        "allowedStrings": ["", " ", "•", "→", "←", "↑", "↓", "+", "-", "*", "/", "=", "%", "$", "#", "@", "&"],
        "ignoreProps": true
      }]
    }
  }
];

export default eslintConfig;
