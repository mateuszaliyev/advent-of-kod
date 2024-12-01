import { z } from "zod";

import { record } from "@/utilities/schema";

export type Event = z.output<ReturnType<typeof event>>;
export type Leaderboard = z.output<ReturnType<typeof leaderboard>>;

export const day = () => z.coerce.number().int().max(25).min(1);

export const event = () =>
  z.enum([
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ]);

const id = () => z.number().int().positive();

export const leaderboard = () =>
  z.object({
    event: event(),
    members: z.record(
      z.coerce.number().pipe(id()),
      z.object({
        completion_day_level: z.record(
          z.coerce.number().pipe(day()),
          record(
            part(),
            z.object({
              get_star_ts: timestamp(),
              star_index: z.number().int().min(0),
            }),
          ).partial(),
        ),
        global_score: z.number().int().min(0),
        id: id(),
        last_star_ts: timestamp(),
        local_score: z.number().int().min(0),
        name: z.string().min(1),
        stars: z.number().int().max(50).min(0),
      }),
    ),
    owner_id: id(),
  });

const part = () => z.enum(["1", "2"]);

const timestamp = () => z.number().int().min(0);
