import database from "@/app/api/db";

export async function GET() {
    return Response.json(database)
    
}