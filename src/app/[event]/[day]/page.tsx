import { redirect } from "next/navigation";

import { z } from "zod";

import { Timestamp } from "@/components/timestamp";

import { getLeaderboard } from "@/server/leaderboard";
import { day, event, type Leaderboard } from "@/server/schema";

import { path } from "@/utilities/url";

const parametersSchema = z.object({
  day: day(),
  event: event(),
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ day: string; event: string }>;
}) => {
  const { day, event } = await params;

  const parameters = parametersSchema.safeParse({ day, event });

  if (!parameters.success) return {};

  const leaderboard = await getLeaderboard(parameters.data.event);

  if (!leaderboard) return {};

  return { title: `Day ${parameters.data.day}` };
};

const AdventOfCodeLeaderboardDayPage = async ({
  params,
}: {
  params: Promise<{ event: string; day: string }>;
}) => {
  const { day, event } = await params;

  const parameters = parametersSchema.safeParse({ day, event });

  if (!parameters.success) redirect(path.event(event));

  const leaderboard = await getLeaderboard(parameters.data.event);

  if (!leaderboard) return null;

  return (
    <section className="flex flex-col items-start">
      <h2 className="my-[1em]">
        First users to get <span className="text-yellow-200">both stars</span>{" "}
        on Day {parameters.data.day}:
      </h2>
      <AdventOfCodeLeaderboardDayPageList
        day={parameters.data.day}
        leaderboard={leaderboard}
        part={2}
      />
      <h2 className="my-[1em]">
        First users to get the{" "}
        <span className="text-slate-400">first star</span> on Day{" "}
        {parameters.data.day}:
      </h2>
      <AdventOfCodeLeaderboardDayPageList
        day={parameters.data.day}
        leaderboard={leaderboard}
        part={1}
      />
    </section>
  );
};

const AdventOfCodeLeaderboardDayPageList = async ({
  day,
  leaderboard,
  part,
}: {
  day: number;
  leaderboard: Leaderboard;
  part: 1 | 2;
}) => (
  <ol className="grid grid-cols-[repeat(4,auto)] gap-x-ch">
    {Object.values(leaderboard.members)
      .filter(
        (member) =>
          typeof member.completion_day_level[day]?.[part] !== "undefined",
      )
      .sort(
        (a, z) =>
          a.completion_day_level[day][part]!.get_star_ts -
          z.completion_day_level[day][part]!.get_star_ts,
      )
      .map((member, index, members) => (
        <li className="col-span-full grid grid-cols-subgrid" key={member.id}>
          <span className="text-end">
            {member.local_score === members[index - 1]?.local_score
              ? ""
              : `${index + 1})`}
          </span>
          <Timestamp
            className="flex gap-ch-2 pr-ch opacity-50"
            timestamp={
              1000 * member.completion_day_level[day][part]!.get_star_ts
            }
          />
          <span>{member.name}</span>
        </li>
      ))}
  </ol>
);

export default AdventOfCodeLeaderboardDayPage;
