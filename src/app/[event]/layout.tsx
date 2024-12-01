import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { z } from "zod";

import { Link } from "@/components/link/styled";
import { Star } from "@/components/star";

import { getLeaderboard } from "@/server/leaderboard";
import { event, type Event, type Leaderboard } from "@/server/schema";

import { path } from "@/utilities/url";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ event: string }>;
}): Promise<Metadata> => {
  const parameters = parametersSchema.safeParse(await params);

  if (!parameters.success) return {};

  const leaderboard = await getLeaderboard(parameters.data.event);

  if (!leaderboard) return {};

  return {
    title: {
      default: `Advent of Kod ${parameters.data.event}`,
      template: `%s - Advent of Kod ${parameters.data.event}`,
    },
  };
};

const parametersSchema = z.object({
  event: event(),
});

const AdventOfCodeLeaderboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ event: string }>;
}) => {
  const parameters = parametersSchema.safeParse(await params);

  if (!parameters.success) return notFound();

  const leaderboard = await getLeaderboard(parameters.data.event);

  if (!leaderboard) return <main>Service Unavailable</main>;

  return (
    <main>
      <section className="flex">
        <div className="grid grid-cols-[repeat(4,auto)] gap-x-ch">
          <div className="col-span-full grid grid-cols-subgrid">
            <ol className="col-start-3 grid grid-cols-[repeat(25,1ch)] items-end">
              {Array.from({ length: 25 }, (_, index) => (
                <li key={index}>
                  <Link
                    className="inline-block [word-break:break-word]"
                    href={path.day(parameters.data.event, index + 1)}
                  >
                    {index + 1}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <ol className="col-span-full grid grid-cols-subgrid">
            {Object.values(leaderboard.members)
              .sort((a, z) => z.local_score - a.local_score)
              .map((member, index, members) => (
                <li
                  className="col-span-full grid grid-cols-subgrid"
                  key={member.id}
                >
                  <div className="text-end">
                    {member.local_score === members[index - 1]?.local_score
                      ? ""
                      : `${index + 1})`}
                  </div>
                  <div className="text-end">{member.local_score}</div>
                  <ol className="grid grid-cols-[repeat(25,minmax(0,1fr))]">
                    {Array.from({ length: 25 }, (_, index) => (
                      <AdventOfCodeLeaderboardLayoutListItem
                        day={index + 1}
                        event={parameters.data.event}
                        key={index}
                        member={member}
                      />
                    ))}
                  </ol>
                  <div>{member.name}</div>
                </li>
              ))}
          </ol>
        </div>
      </section>
      {children}
    </main>
  );
};

const AdventOfCodeLeaderboardLayoutListItem = ({
  day,
  event,
  member,
}: {
  day: number;
  event: Event;
  member: Leaderboard["members"][keyof Leaderboard["members"]];
}) => {
  const now = new Date();
  const parts = member.completion_day_level[day];
  const first = Boolean(parts?.[1]);
  const second = Boolean(parts?.[2]);

  return (
    <li>
      {now.getTime() >=
        new Date(
          `${event}-12-${day.toString().padStart(2, "0")}T05:00:00.000Z`,
        ).getTime() && (
        <Star
          variant={
            first && second ? "yellow" : first || second ? "slate" : "neutral"
          }
        />
      )}
    </li>
  );
};

export default AdventOfCodeLeaderboardLayout;
