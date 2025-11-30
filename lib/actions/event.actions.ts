'use server'
import { prisma } from "@/lib/prisma";

const getSimilarEventsAction = async (slug: string) => {

    try { 
        const event = await prisma.event.findUnique({
            where: { slug }
        });

        if (!event) return [];

        const events = await prisma.event.findMany({
            where: {
                tags: {
                    hasSome: event.tags,
                },
                NOT: {
                    id: event.id,
                },
            },
        });

        return events;
    }
    catch (error) { 
        console.error("Error fetching similar events:", error);
        return []
    }
};
export { getSimilarEventsAction };