import { cx } from "@/utilities/classname";

export const Emphasis = ({
  className,
  ...props
}: React.ComponentPropsWithRef<"em">) => (
  <em
    className={cx("not-italic text-white text-shadow", className)}
    {...props}
  />
);
