import { Link as LinkInternal, type LinkProps } from "@/components/link";

import { cx } from "@/utilities/classname";

export const Link = ({ className, ...props }: LinkProps) => (
  <LinkInternal
    className={cx(
      "text-green-600 outline-none transition hocus-visible:text-green-300",
      className,
    )}
    {...props}
  />
);
