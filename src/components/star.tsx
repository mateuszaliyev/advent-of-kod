import { cva, type VariantProps } from "@/utilities/classname";

export interface StarProps
  extends Omit<React.ComponentPropsWithRef<"span">, "children">,
    VariantProps<typeof star> {}

const star = cva({
  variants: {
    variant: {
      neutral: "text-neutral-700",
      slate: "text-slate-400",
      transparent: "text-transparent",
      yellow: "text-yellow-200",
    },
  },
});

export const Star = ({ className, variant, ...props }: StarProps) => (
  <span className={star({ className, variant })} {...props}>
    *
  </span>
);
