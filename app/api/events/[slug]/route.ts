import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
/**
 * Handle GET requests for an event identified by slug.
 *
 * Fetches an event using the provided slug (case-insensitive, trimmed) and returns a JSON HTTP response:
 * - 200 with `{ message: "Event fetched successfully", data: event }` when the event is found.
 * - 404 with `"Event Not Found"` when no matching event exists.
 * - 500 with `{ message: "Internal Server Error", error: <message> }` on unexpected errors.
 *
 * @param params - A Promise that resolves to an object containing the `slug` path parameter.
 * @returns The JSON HTTP response described above.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const refineSlug = slug.toLowerCase().trim();

    const event = await prisma.event.findUnique({
      where: { slug: refineSlug },
    });

    if (!event) {
      return NextResponse.json("Event Not Found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Event fetched successfully", data: event },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 },
    );
  }
}