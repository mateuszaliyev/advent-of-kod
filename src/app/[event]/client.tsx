"use client";

import { parseAsInteger, useQueryState } from "nuqs";

import { link } from "@/components/link/styled";
import { Star } from "@/components/star";

import type { Event, Leaderboard } from "@/utilities/schema";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  timeZone: "Europe/Warsaw",
});

const timeFormatter = new Intl.DateTimeFormat("en", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  second: "2-digit",
  timeZone: "Europe/Warsaw",
});

const isChallengeAvailable = ({ day, event }: { day: number; event: Event }) =>
  Date.now() >=
  new Date(
    `${event}-12-${day.toString().padStart(2, "0")}T05:00:00.000Z`,
  ).getTime();

export const EventLeaderboard = ({
  event,
  leaderboard,
}: {
  event: Event;
  leaderboard: Leaderboard;
}) => {
  const [day, setDay] = useQueryState("day", parseAsInteger);

  return (
    <>
      <section className="flex">
        <div className="grid grid-cols-[repeat(4,auto)] gap-x-ch">
          <div className="col-span-full grid grid-cols-subgrid">
            <ol className="col-start-3 grid grid-cols-[repeat(25,1ch)] items-end">
              {Array.from({ length: 25 }, (_, index) => (
                <li key={index}>
                  <button
                    className={link({
                      className: "inline-block [word-break:break-word]",
                      variant: "button",
                    })}
                    disabled={!isChallengeAvailable({ day: index + 1, event })}
                    onClick={() => {
                      setDay(index + 1);
                      document.title = `Day ${index + 1} - Advent of Kod ${event}`;
                    }}
                  >
                    <span className="sr-only">Day </span>
                    {index + 1}
                  </button>
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
                  <div className="min-w-ch-3 text-end">
                    {member.local_score === members[index - 1]?.local_score
                      ? ""
                      : `${index + 1})`}
                  </div>
                  <div className="text-end">{member.local_score}</div>
                  <ol className="grid grid-cols-[repeat(25,minmax(0,1fr))]">
                    {Array.from({ length: 25 }, (_, index) => (
                      <LeaderboardEntry
                        day={index + 1}
                        event={event}
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
      {typeof day === "number" && isChallengeAvailable({ day, event }) && (
        <section className="flex flex-col items-start">
          <h2 className="my-[1em]">
            First users to get{" "}
            <span className="text-yellow-200">both stars</span> on Day {day}:
          </h2>
          <DayLeaderboard day={day} leaderboard={leaderboard} part={2} />
          <h2 className="my-[1em]">
            First users to get the{" "}
            <span className="text-slate-400">first star</span> on Day {day}:
          </h2>
          <DayLeaderboard day={day} leaderboard={leaderboard} part={1} />
        </section>
      )}
    </>
  );
};

const DayLeaderboard = ({
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
      .map((member, index) => {
        const timestamp =
          1000 * member.completion_day_level[day][part]!.get_star_ts;

        return (
          <li className="col-span-full grid grid-cols-subgrid" key={member.id}>
            <span className="min-w-ch-3 text-end">{index + 1})</span>
            <span className="flex gap-ch-2 pr-ch opacity-50">
              <span>{dateFormatter.format(timestamp)}</span>
              <span>{timeFormatter.format(timestamp)}</span>
            </span>
            <span>{member.name}</span>
          </li>
        );
      })}
  </ol>
);

const LeaderboardEntry = ({
  day,
  event,
  member,
}: {
  day: number;
  event: Event;
  member: Leaderboard["members"][keyof Leaderboard["members"]];
}) => {
  const parts = member.completion_day_level[day];
  const first = Boolean(parts?.[1]);
  const second = Boolean(parts?.[2]);

  return (
    <li>
      {isChallengeAvailable({ day, event }) && (
        <Star
          variant={
            first && second ? "yellow" : first || second ? "slate" : "neutral"
          }
        />
      )}
    </li>
  );
};
