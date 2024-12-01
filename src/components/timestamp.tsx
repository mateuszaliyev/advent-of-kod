"use client";

import { useLayoutEffect, useState } from "react";

export interface TimestampProps
  extends Omit<React.ComponentPropsWithRef<"span">, "children"> {
  timestamp: number;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
});

const timeFormatter = new Intl.DateTimeFormat("en", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  second: "2-digit",
});

export const Timestamp = ({ timestamp, ...props }: TimestampProps) => {
  const [date, setDate] = useState<Date | undefined>();

  useLayoutEffect(() => {
    setDate(new Date(timestamp));
  }, [timestamp]);

  if (!date) return null;

  return (
    <span {...props}>
      <span>{dateFormatter.format(date)}</span>
      <span>{timeFormatter.format(date)}</span>
    </span>
  );
};
