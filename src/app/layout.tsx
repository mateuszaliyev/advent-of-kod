import { Suspense } from "react";

import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import { connection } from "next/server";

import { Event } from "@/components/event";
import { eventFormatters } from "@/components/event/formatters";
import { Link } from "@/components/link/styled";

import { event } from "@/server/schema";

import { cx } from "@/utilities/classname";
import { path } from "@/utilities/url";

import "./style.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const generateMetadata = async (): Promise<Metadata> => {
  "use cache";

  return {
    robots: {
      follow: false,
      googleBot: {
        follow: false,
        index: false,
        indexifembedded: false,
        "max-image-preview": "none",
        noarchive: true,
        nocache: true,
        noimageindex: true,
        nositelinkssearchbox: true,
        nosnippet: true,
        notranslate: true,
      },
      index: false,
      indexifembedded: false,
      "max-image-preview": "none",
      noarchive: true,
      nocache: true,
      noimageindex: true,
      nositelinkssearchbox: true,
      nosnippet: true,
      notranslate: true,
    },
    title: `Advent of Kod ${new Date().getFullYear()}`,
  };
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html className={cx("[color-scheme:dark]", sourceCodePro.variable)} lang="en">
    <body className="min-h-dvh bg-slate-900 p-2 font-mono text-[length:min(3vw,1.1667rem)] font-light text-neutral-300 antialiased">
      <header className="mb-ch-3">
        <nav className="flex items-start gap-x-ch-2">
          <div className="flex flex-col items-end">
            <Link
              className="whitespace-nowrap text-green-500 [text-shadow:0_0_2px_#00cc00,_0_0_5px_#00cc00]"
              href={path.home()}
            >
              Advent of Kod
            </Link>
            <Suspense>
              <DynamicEvent />
            </Suspense>
          </div>
          <ul className="grid grid-cols-5 gap-x-ch-2">
            {event()
              .options.reverse()
              .map((event) => (
                <li key={event}>
                  <Link href={path.event(event)}>[{event}]</Link>
                </li>
              ))}
          </ul>
        </nav>
      </header>
      {children}
    </body>
  </html>
);

const DynamicEvent = async () => {
  await connection();

  return (
    <Event formatter={Math.floor(Math.random() * eventFormatters.length)} />
  );
};

export default RootLayout;
