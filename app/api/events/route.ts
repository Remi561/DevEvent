import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/createSlug";
import { v2 as cloudinary } from "cloudinary";

export async function POST(request: NextRequest) { 
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const file = formData.get("image") as File;
        const date = formData.get("date") as string;
        const agenda = JSON.parse(formData.get("agenda") as string);
        const overview = formData.get("overview") as string;
        const venue = formData.get("venue") as string;
        const time = formData.get("time") as string;
        const organizer = formData.get("organizer") as string;
        const tags = JSON.parse(formData.get("tags") as string);
        const audience = formData.get("audience") as string;
        const mode = formData.get("mode") as string;

        const location = formData.get("location") as string;
        const description = formData.get("description") as string;

        const prodReadySlug = createSlug(name);

        const foundSlug = await prisma.event.findUnique({
          where: { slug: prodReadySlug },
        });

        if (foundSlug)
          return NextResponse.json(
            { message: "The event already exist" },
            { status: 400 },
          );

        // for making the file a string for prisma

        if (!file)
          return NextResponse.json(
            { message: "Image file is required " },
            { status: 400 },
          );

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { resource_type: "image", folder: "DevEvent" },
              (error, result) => {
                if (error) {
                  return reject(error);
                }
                resolve(result);
              },
            )
            .end(buffer);
        });

        const uploadedImage = (uploadResult as { secure_url: string })
          .secure_url;

        await prisma.event.create({
          data: {
            name,
            image: uploadedImage,
            slug: prodReadySlug,
            description,
            location,
            time,
            date,
            agenda,
            overview,
            venue,
            organizer,
            tags,
            audience,
            mode,
          },
        });

        return NextResponse.json(
          {
            message: "Event created successfully",
            data: {
              name,
              image: uploadedImage,
              slug: prodReadySlug,
              date,
              time,
              location,
              description,
              agenda,
              overview,
              venue,
              audience,
              mode,
              organizer,
              tags,
            },
          },
          { status: 201 },
        );

    }
    catch (error) { 
        console.error("Error in events route:", error);
        return NextResponse.json({message: "Internal Server Error", error: error instanceof Error ? error.message: 'Unknown Error'}, {status: 400});
    }
    finally {
        prisma.$disconnect()
    }

}

export async function GET() {
    try {
        const eventList = await prisma.event.findMany(
            {
                orderBy: {
                    createdAt: "desc"
                }
            }
        )

        return NextResponse.json({message: "Data fetched successfully", data:eventList}, {status:200})
     }
    catch (e) {
        return NextResponse.json({message: " Error fetching data", e: e instanceof Error ? e.message: "unknown" })
    }
}