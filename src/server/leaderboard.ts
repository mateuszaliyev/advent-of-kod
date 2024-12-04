import { unstable_cacheTag as cacheTag } from "next/cache";

import { environment } from "@/environment";

import * as schema from "@/utilities/schema";

export const getLeaderboard = async (event: string) => {
  "use cache";
  cacheTag(`leaderboard:${event}`);

  const parsedEvent = schema.event().safeParse(event);

  if (!environment.ADVENT_OF_CODE_LEADERBOARD_ID) return;
  if (!environment.ADVENT_OF_CODE_SESSION) return;
  if (!parsedEvent.success) return;

  try {
    const response = await fetch(
      `https://adventofcode.com/${parsedEvent.data}/leaderboard/private/view/${environment.ADVENT_OF_CODE_LEADERBOARD_ID}.json`,
      {
        headers: {
          cookie: `session=${environment.ADVENT_OF_CODE_SESSION}`,
        },
      },
    );

    if (!response.ok) return;

    return schema.leaderboard().parse(await response.json());
  } catch (error: unknown) {
    console.error(error);
    return;
  }
};
