'use client';

import { useState } from 'react';
import SearchForm from './components/SearchForm';
import MovieCard from './components/MovieCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/embed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: query }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      
      const data = await response.json();
      setMovies(data.message || []);
    } catch (err) {
      console.error('Error fetching movie recommendations:', err);
      setError('Failed to fetch movie recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Movie<span className="text-blue-600">Reco</span>
          </h1>
          <p className="mt-3 text-xl text-gray-500 dark:text-gray-300">
            Find your next favorite movie with AI-powered recommendations
          </p>
        </div>
        
        <SearchForm 
          query={query} 
          setQuery={setQuery} 
          handleSearch={handleSearch} 
          loading={loading} 
        />
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-8 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {!loading && movies.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended Movies</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
            </div>
          </div>
        )}
        
        
        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Browse Over 34,000+ Movies</p>
        </footer>
      </div>
    </div>
  );
}
