import { Suspense } from "react";

import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import { connection } from "next/server";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Event } from "@/components/event";
import { eventFormatters } from "@/components/event/formatters";
import { Link } from "@/components/link/styled";

import { cx } from "@/utilities/classname";
import { event } from "@/utilities/schema";
import { path } from "@/utilities/url";

import "./style.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const generateMetadata = async (): Promise<Metadata> => ({
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
  title: "Advent of Kod",
});

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html className={cx("[color-scheme:dark]", sourceCodePro.variable)} lang="en">
    <body className="min-h-dvh bg-slate-900 p-2 font-mono text-[length:min(3vw,1.1667rem)] font-light leading-tight text-neutral-300 antialiased">
      <NuqsAdapter>
        <header className="mb-ch-3">
          <nav className="flex items-start gap-x-ch-2">
            <div className="flex flex-col items-end">
              <Link
                className="whitespace-nowrap text-green-500 text-shadow-lg"
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
      </NuqsAdapter>
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
