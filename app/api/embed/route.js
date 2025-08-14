import connectDB from "@/lib/database";
import { pipeline } from "@huggingface/transformers";
import Movie from "@/models/movie.model"
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        const { question } = await request.json();

        const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
        const query = await embedder(question, { pooling: 'mean', normalize: true});
        const queryEmbedding = Array.from(query.data);


        await connectDB();

       const result = await Movie.aggregate([
            {
                $vectorSearch: {
                    index: 'vector_index',
                    path: 'embedding',
                    queryVector: queryEmbedding,
                    numCandidates: 100,
                    limit: 5
                }
            },
            {
                $project: {
                    embedding : 0
                }
            }
        ])





        
        return NextResponse.json({ message: result} , { status: 200 });
    }catch(error) {
        console.log(error);
    }
}