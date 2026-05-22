import connectDB from "@/lib/database";
import Movie from "@/models/movie.model"
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const buildMovieContext = (movies) => {
    return movies.map((movie, index) => {
        return [
            `Movie ${index + 1}: ${movie.Title || 'Untitled'}`,
            `Year: ${movie.releaseYear || 'Unknown'}`,
            `Director: ${movie.Director || 'Unknown'}`,
            `Genre: ${movie.Genre || 'Unknown'}`,
            `Cast: ${movie.Cast || 'Unknown'}`,
            `Plot: ${movie.Plot || 'No plot available'}`
        ].join('\n');
    }).join('\n\n');
};

const generateRecommendation = async ({ query, movies }) => {
    const apiKey = process.env.GEMINI_API || process.env.GPT_API;
    if (!apiKey) {
        return null;
    }

    if (!movies.length) {
        return "I couldn't find matching movies in your database for that request. Try describing a genre, mood, plot idea, actor, or setting.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const movieContext = buildMovieContext(movies);

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: `You are MovieReco, a concise movie recommendation assistant.

Use only the movies in the retrieved context below. Do not invent titles.
Answer the user's request with a short, helpful recommendation.
Mention 3 to 5 best-fit movies and explain why each one matches.
If a movie only partially matches, say that honestly.

User request:
${query}

Retrieved movie context:
${movieContext}`,
        config: {
            temperature: 0.8,
            maxOutputTokens: 2048
        }
    });
    console.log(response.text)

    return response.text;
};

export async function POST(request) {
    try {
        const { query, embeddings, limit = 10, skipAi = false } = await request.json();

        // console.log(embeddings)

        if (!Array.isArray(embeddings) || embeddings.length === 0) {
            return NextResponse.json(
                { error: 'Embeddings are required' },
                { status: 400 }
            );
        }

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

        let aiRecommendation = null;
        let aiError = null;

        if (!skipAi) {
            try {
                aiRecommendation = await generateRecommendation({
                    query: query || 'Recommend movies from these search results.',
                    movies: result
                });
            } catch (error) {
                console.error('Error generating Gemini recommendation:', error);
                aiError = 'Retrieved movies successfully, but Gemini could not generate a recommendation.';
            }
        }

        return NextResponse.json({
            message: result,
            aiRecommendation,
            aiError
        }, { status: 200 });
    } catch (error) {
        console.error('Error in /api/embed:', error);
        return NextResponse.json(
            { error: 'Failed to process recommendation request' },
            { status: 500 }
        );
    }
}
