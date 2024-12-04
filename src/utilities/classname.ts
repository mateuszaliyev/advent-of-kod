import { defineConfig } from "cva";
import { createTailwindMerge, getDefaultConfig } from "tailwind-merge";

export type { VariantProps } from "cva";

const TSHIRT_UNIT_REGEX = /^(\d+(\.\d+)?)?(lg|md|sm|xl|xs)$/;
const isTshirtSize = (value: string) => TSHIRT_UNIT_REGEX.test(value);

const onComplete = createTailwindMerge(() => {
  const {
    classGroups,
    conflictingClassGroups: {
      "font-size": _fontSize,
      ...conflictingClassGroups
    },
    conflictingClassGroupModifiers: {
      "font-size": __fontSize,
      ...conflictingClassGroupModifiers
    },
    ...configuration
  } = getDefaultConfig();

  return {
    ...configuration,
    classGroups: {
      ...classGroups,
      "text-shadow": [{ "text-shadow": ["", isTshirtSize] }],
    },
    conflictingClassGroups,
    conflictingClassGroupModifiers,
  };
});

export const { compose, cva, cx } = defineConfig({
  hooks: { onComplete },
});
