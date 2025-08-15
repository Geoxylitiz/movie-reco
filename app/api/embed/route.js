import connectDB from "@/lib/database";
import Movie from "@/models/movie.model"
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { embeddings, limit = 10 } = await request.json();
        
       // console.log(embeddings)

        const resultLimit = parseInt(limit);
        const validLimit = [5, 10].includes(resultLimit) ? resultLimit : 5;
        
        

        await connectDB();

        const result = await Movie.aggregate([
            {
                $vectorSearch: {
                    index: 'vector_index',
                    path: 'embedding',
                    queryVector: embeddings,
                    numCandidates: 100,
                    limit: validLimit
                }
            },
            {
                $project: {
                    embedding: 0
                }
            }
        ]);
        
        return NextResponse.json({ message: result }, { status: 200 });
    } catch (error) {
        console.error('Error in /api/embed:', error);
        return NextResponse.json(
            { error: 'Failed to process recommendation request' },
            { status: 500 }
        );
    }
}