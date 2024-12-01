import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const environment = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: {
    ADVENT_OF_CODE_LEADERBOARD_ID: process.env.ADVENT_OF_CODE_LEADERBOARD_ID,
    ADVENT_OF_CODE_SESSION: process.env.ADVENT_OF_CODE_SESSION,
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  },
  server: {
    ADVENT_OF_CODE_LEADERBOARD_ID: z.coerce
      .number()
      .int()
      .positive()
      .optional(),
    ADVENT_OF_CODE_SESSION: z
      .string()
      .regex(/^[0-9a-f]{128}$/)
      .optional(),
    REVALIDATE_SECRET: z.string().min(1),
  },
});
