import NextLink from "next/link";

export type LinkProps = React.ComponentPropsWithRef<typeof NextLink>;

const NOREFERRER = "noreferrer";

const noReferrerRel = (href: LinkProps["href"], rel: LinkProps["rel"]) => {
  if (typeof href === "string" && href.startsWith("/")) return rel;
  if (rel?.split(" ").includes(NOREFERRER)) return rel;
  return rel ? `${rel} ${NOREFERRER}` : NOREFERRER;
};

export const Link = ({ href, rel, ...props }: LinkProps) => {
  if (typeof href === "string" && href.startsWith("#")) {
    return <a href={href} rel={rel} {...props} />;
  }

  return <NextLink href={href} rel={noReferrerRel(href, rel)} {...props} />;
};
