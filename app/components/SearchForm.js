'use client';

export default function SearchForm({ query, setQuery, handleSearch, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe what kind of movie you're looking for..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Find Movies'}
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>Try: "A sci-fi movie with time travel" or "Comedy movies about weddings"</p>
      </div>
    </div>
  );
}
