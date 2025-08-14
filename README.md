# MovieReco - AI-Powered Movie Recommendation App

MovieReco is an AI-powered movie recommendation application built with Next.js that uses vector embeddings to provide semantic search capabilities for finding movies based on natural language queries.

## Features

- Natural language search for movie recommendations
- Semantic understanding of movie descriptions
- Vector-based similarity search using MongoDB
- Responsive UI for desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js, React
- **Backend**: Next.js API Routes
- **Database**: MongoDB with vector search
- **AI**: Hugging Face Transformers (all-MiniLM-L6-v2)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
```

Note: Your MongoDB instance must have a vector index set up on the `embedding` field of the `movies` collection.

## How to Use

1. Enter a natural language query describing the type of movie you're looking for
2. The system will analyze your query and convert it to a vector embedding
3. MongoDB's vector search will find the most semantically similar movies
4. Results are displayed in order of relevance

Example queries:
- "A sci-fi movie with time travel"
- "Comedy movies about weddings"
- "Action movies with strong female leads"

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Make sure to set up the required environment variables in your deployment platform.
