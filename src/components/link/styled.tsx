import { Link as LinkInternal, type LinkProps } from "@/components/link";

import { cva } from "@/utilities/classname";

export const link = cva({
  base: "text-green-600 outline-none transition",
  defaultVariants: { variant: "link" },
  variants: {
    variant: {
      button: "disabled:text-neutral-700 enabled:hocus-visible:text-green-300",
      link: "hocus-visible:text-green-300",
    },
  },
});

export const Link = ({ className, ...props }: LinkProps) => (
  <LinkInternal className={link({ className })} {...props} />
);
