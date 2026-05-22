'use client';

export default function MovieCard({ movie, index = 0 }) {
  const rank = String(index + 1).padStart(2, '0');

  return (
    <article className="group rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-4 hover:-translate-y-0.5 hover:border-[color-mix(in_oklch,var(--color-accent),var(--color-rule)_45%)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-[var(--color-accent)]">{rank}</p>
          <h3 className="mt-1 text-xl font-black leading-tight text-[var(--color-ink)]">{movie.Title}</h3>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--color-rule)] px-2.5 py-1 text-xs text-[var(--color-ink-2)]">
          {movie.releaseYear || 'Unknown'}
        </span>
      </div>

      <dl className="grid gap-2 border-y border-[var(--color-rule)] py-3 text-sm text-[var(--color-ink-2)]">
        <div className="grid grid-cols-[4.5rem_1fr] gap-3">
          <dt className="text-[var(--color-muted)]">Director</dt>
          <dd>{movie.Director || 'Unknown'}</dd>
        </div>
        <div className="grid grid-cols-[4.5rem_1fr] gap-3">
          <dt className="text-[var(--color-muted)]">Genre</dt>
          <dd>{movie.Genre || 'Unknown'}</dd>
        </div>
      </dl>

      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--color-ink-2)]">
        {movie.Plot || 'No plot available'}
      </p>

      {movie.Wiki && (
        <a
          href={movie.Wiki}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Learn more about ${movie.Title}`}
          className="mt-4 inline-flex text-sm font-bold text-[var(--color-accent)] hover:text-[var(--color-focus)]"
        >
          Learn more
        </a>
      )}
    </article>
  );
}
