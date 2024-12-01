"use client";

import { usePathname } from "next/navigation";

import { eventFormatters } from "@/components/event/formatters";
import { Link } from "@/components/link/styled";

import { event as eventSchema } from "@/server/schema";

import { path } from "@/utilities/url";

export const Event = ({ formatter }: { formatter: number }) => {
  const pathname = usePathname();
  const event = eventSchema().safeParse(pathname.split("/").filter(Boolean)[0]);
  const year = new Date().getFullYear();

  return (
    <span className="text-green-500 text-opacity-30">
      {eventFormatters[formatter](
        <Link
          className="text-green-500 [text-shadow:0_0_2px_#00cc00,_0_0_5px_#00cc00]"
          href={path.event(event.data ?? `${year}`)}
        >
          {event.data ?? year}
        </Link>,
      )}
    </span>
  );
};
