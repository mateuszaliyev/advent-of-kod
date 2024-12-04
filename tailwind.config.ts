import type { Config } from "tailwindcss";
import { transparent, white } from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";

const hocus = plugin((api) => {
  api.addVariant("hocus", ["&:focus", "&:hover"]);
  api.addVariant("hocus-visible", ["&:focus-visible", "&:hover"]);
  api.addVariant("hocus-within", ["&:focus-within", "&:hover"]);

  api.matchVariant(
    "group",
    (selectors, { modifier }) =>
      (typeof selectors === "string" ? [selectors] : selectors).map(
        (selector) =>
          modifier
            ? `:merge(.group\\/${modifier})${selector} &`
            : `:merge(.group)${selector} &`,
      ),
    {
      values: {
        hocus: [":focus", ":hover"],
        "hocus-visible": [":focus-visible", ":hover"],
        "hocus-within": [":focus-within", ":hover"],
      },
    },
  );

  api.matchVariant(
    "peer",
    (selectors, { modifier }) =>
      (typeof selectors === "string" ? [selectors] : selectors).map(
        (selector) =>
          modifier
            ? `:merge(.peer\\/${modifier})${selector} ~ &`
            : `:merge(.peer)${selector} ~ &`,
      ),
    {
      values: {
        hocus: [":focus", ":hover"],
        "hocus-visible": [":focus-visible", ":hover"],
        "hocus-within": [":focus-within", ":hover"],
      },
    },
  );
});

const textShadow = plugin((api) => {
  api.addUtilities({
    ".text-shadow": {
      "--tw-text-shadow-color": "currentColor",
      textShadow: "0 0 5px var(--tw-text-shadow-color)",
    },
    ".text-shadow-lg": {
      "--tw-text-shadow-color": "currentColor",
      textShadow:
        "0 0 2px var(--tw-text-shadow-color), 0 0 5px var(--tw-text-shadow-color)",
    },
  });
});

export default {
  content: ["./src/**/*.{js,jsx,mdx,ts,tsx}"],
  plugins: [hocus, textShadow],
  theme: {
    colors: {
      green: {
        300: "#9f9",
        500: "#0c0",
        600: "#090",
      },
      neutral: {
        300: "#ccc",
        700: "#333",
      },
      slate: {
        400: "#99c",
        900: "#0f0f23",
      },
      transparent,
      white,
      yellow: {
        200: "#ff6",
      },
    },
    fontFamily: {
      mono: ["var(--font-source-code-pro)", "monospace"],
    },
    extend: {
      spacing: {
        ch: "1ch",
        "ch-2": "2ch",
        "ch-3": "3ch",
        "ch-4": "4ch",
      },
    },
  },
} satisfies Config;
