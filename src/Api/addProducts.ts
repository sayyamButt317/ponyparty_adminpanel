import dbConnect from "@/db/dbConnect";

export async function POST(request:Request) {
    await dbConnect();

    

}