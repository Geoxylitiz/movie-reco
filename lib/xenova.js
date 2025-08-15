'use-client';

import { pipeline } from "@huggingface/transformers";


export const embedFUNC = async (question) => {
    try{
        const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        const query = await embedder(question, { pooling: 'mean', normalize: true });
        const queryEmbedding = Array.from(query.data);

       const result = fetch('/api/embed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ embeddings: queryEmbedding }),
        })
        return result;
    }catch( error) {
        console.log(error);
        throw new Error('Failed to embed the question');
    }
}

export default embedFUNC;