'use client';

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{movie.Title}</h3>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
            {movie.releaseYear}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Director:</span> {movie.Director}
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Genre:</span> {movie.Genre}
        </p>
        {movie.Cast && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Cast:</span> {movie.Cast}
          </p>
        )}
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {movie.Plot || "No plot available"}
          </p>
        </div>
        {movie.Wiki && (
          <div className="mt-4">
            <a
              href={movie.Wiki}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              Learn more →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
