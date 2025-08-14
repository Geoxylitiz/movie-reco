import connectDB from "@/lib/database";
import Movie from "@/models/movie.model";
import { pipeline } from '@huggingface/transformers';
import fs from 'fs';

export async function GET(request) {
    try{

        return new Response("GET THE FCK OUT OF HERE", { status: 403 });
        // const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        // const movies = await JSON.parse(fs.readFileSync('moviejson/movie-plots.json', 'utf-8'))

        // let docs = [];
        // for(const movie of movies){
        //     const text = `${movie["Release Year"]} ${movie.Title} ${movie.Director} ${movie.Cast} ${movie.Genre} ${movie["Wiki Page"]} ${movie.Plot}`
        //     const output = await embedder(text, { pooling: 'mean', normalize: true });
            
        //     const embedding = Array.from(output.data);

        //     docs.push({
        //         releaseYear: movie["Release Year"],
        //         Title: movie.Title,
        //         Director: movie.Director,
        //         Cast: movie.Cast,
        //         Genre: movie.Genre,
        //         Wiki: movie["Wiki Page"],
        //         Plot: movie.Plot,
        //         embedding: embedding
        //     })
        
        // }

        // await connectDB();

        // await Movie.insertMany(docs);

        // return new Response("EMBEDDED SUCCESS", { status: 200 });
    }catch(error) {
        console.log(error);
    }
}