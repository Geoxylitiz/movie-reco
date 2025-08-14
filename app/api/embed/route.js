import connectDB from "@/lib/database";
import { pipeline } from "@huggingface/transformers";
import Movie from "@/models/movie.model"
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { question, limit = 10 } = await request.json();
        
        if (!question || typeof question !== 'string') {
            return NextResponse.json(
                { error: 'Invalid question format. Please provide a text query.' },
                { status: 400 }
            );
        }

        const resultLimit = parseInt(limit);
        const validLimit = [5, 10].includes(resultLimit) ? resultLimit : 5;
        
        const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        const query = await embedder(question, { pooling: 'mean', normalize: true });
        const queryEmbedding = Array.from(query.data);

        await connectDB();

        const result = await Movie.aggregate([
            {
                $vectorSearch: {
                    index: 'vector_index',
                    path: 'embedding',
                    queryVector: queryEmbedding,
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