import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { z } from "zod";

import { Emphasis } from "@/components/typography";

import { getLeaderboard } from "@/server/leaderboard";

import { day, event } from "@/utilities/schema";

import { EventLeaderboard } from "./client";

const searchParametersSchema = z
  .object({
    day: day(),
  })
  .partial();

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: Promise<{ event: string }>;
  searchParams: Promise<Record<string, string | string[]>>;
}): Promise<Metadata> => {
  const parameters = parametersSchema.safeParse(await params);
  const searchParameters = searchParametersSchema.safeParse(await searchParams);

  if (!parameters.success || !searchParameters.success) notFound();

  const day = searchParameters.data.day;

  return {
    title: `${day ? `Day ${day} - ` : ""}Advent of Kod ${parameters.data.event}`,
  };
};

const parametersSchema = z.object({
  event: event(),
});

const EventPage = async ({
  params,
}: {
  params: Promise<{ event: string }>;
}) => {
  const parameters = parametersSchema.safeParse(await params);

  if (!parameters.success) return notFound();

  const leaderboard = await getLeaderboard(parameters.data.event);

  if (!leaderboard) return <main>Service Unavailable</main>;

  const owner = leaderboard.members[leaderboard.owner_id];

  return (
    <main>
      {owner && (
        <section className="max-w-3xl">
          <p className="my-[1em]">
            This is the private leaderboard of {owner.name} for{" "}
            <Emphasis>Advent of Code {parameters.data.event}</Emphasis>.
          </p>
          <p className="my-[1em]">
            <span className="text-yellow-200">Gold</span> indicates the user got
            both stars for that day,{" "}
            <span className="text-slate-400">silver</span> means just the first
            star, and <span className="text-neutral-700">gray</span> means none.
          </p>
        </section>
      )}
      <EventLeaderboard
        event={parameters.data.event}
        leaderboard={leaderboard}
      />
    </main>
  );
};

export default EventPage;
