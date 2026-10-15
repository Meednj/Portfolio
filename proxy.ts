import { NextResponse, type NextRequest } from "next/server";
import { getProjectBySlug } from "@/data/projects";

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && getProjectBySlug(slug)) return NextResponse.next();

  // Reject unknown slugs before the route's streamed rendering begins.
  const notFoundUrl = request.nextUrl.clone();
  notFoundUrl.pathname = "/route-not-found";
  notFoundUrl.search = "";

  return NextResponse.rewrite(notFoundUrl, { status: 404 });
}

export const config = { matcher: "/projects/:slug" };
