import { defineConfig } from "eslint/config";
import type_plugin from "@typescript-eslint/eslint-plugin";
import type_parser from "@typescript-eslint/eslint-parser";
import react_plugin from "eslint-plugin-react";
import react_hooks_plugin from "eslint-plugin-react-hooks";
import js_plugin from "@eslint/js";

export default defineConfig([
  { files: ["**/*.js"], plugins: { js_plugin }, extends: ["js/recommended"] },
  // eslint가 추천하는 규칙 모음들을 설정한다.
  {
    rules: {
      "no-unused-vars": "warn", // 어기면 warn 로그 출력.
      "no-undef": "warn",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    parser: type_parser,

    plugins: { "@typescript-eslint": type_plugin },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    rules: {
      // 필요에 따라 개별 규칙 조정 가능
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: react_plugin,
      "react-hooks": react_hooks_plugin,
    },
    extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
