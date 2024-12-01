import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { environment } from "@/environment";

import { event } from "@/server/schema";

export const GET = (request: NextRequest) => {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) return new Response("Unauthorized", { status: 401 });

  if (environment.REVALIDATE_SECRET !== key) {
    return new Response("Forbidden", { status: 403 });
  }

  if (!event().safeParse(request.nextUrl.searchParams.get("event")).success) {
    return new Response("Bad Request", { status: 400 });
  }

  revalidateTag(`leaderboard:${event}`);
  return new Response("OK", { status: 200 });
};
