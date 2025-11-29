
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(request: Request, { params }: { params: { slug: string } }) { 
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
    }
    catch (error) { 
        return NextResponse.json(
          {
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : "Unknown",
          },
          { status: 500 },
        );
    }
}