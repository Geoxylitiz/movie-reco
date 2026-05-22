'use client';

export default function SearchForm({
  mode,
  setMode,
  query,
  setQuery,
  handleSubmit,
  loading,
  messages
}) {
  const isChat = mode === 'chat';

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-[var(--color-panel)] p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Concierge desk
          </p>
          <h2 className="mt-1 text-2xl font-bold text-[var(--color-ink)]">
            {isChat ? 'Chat with the AI' : 'Search by taste'}
          </h2>
        </div>

        <div className="grid grid-cols-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper)] p-1">
          <button
            type="button"
            onClick={() => setMode('search')}
            aria-pressed={mode === 'search'}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              mode === 'search'
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-ink)]'
                : 'text-[var(--color-ink-2)] hover:text-[var(--color-ink)]'
            }`}
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setMode('chat')}
            aria-pressed={mode === 'chat'}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              mode === 'chat'
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-ink)]'
                : 'text-[var(--color-ink-2)] hover:text-[var(--color-ink)]'
            }`}
          >
            AI chat
          </button>
        </div>
      </div>

      {isChat && (
        <div className="mb-4 max-h-80 space-y-3 overflow-y-auto rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[86%] rounded-[var(--radius-md)] px-4 py-3 text-sm leading-6 ${
                  message.role === 'user'
                    ? 'bg-[var(--color-accent)] text-[var(--color-accent-ink)]'
                    : 'bg-[var(--color-panel-soft)] text-[var(--color-ink-2)]'
                }`}
              >
                <p className="whitespace-pre-line">{message.content}</p>
                {message.movies?.length > 0 && (
                  <div className="mt-3 space-y-1 border-t border-[color-mix(in_oklch,var(--color-rule),transparent_20%)] pt-3 text-xs">
                    {message.movies.map((movie) => (
                      <p key={movie.Title} className="text-[var(--color-ink)]">
                        {movie.Title} <span className="text-[var(--color-muted)]">({movie.releaseYear || 'year unknown'})</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-[var(--radius-md)] bg-[var(--color-panel-soft)] px-4 py-3 text-sm text-[var(--color-ink-2)]">
                Checking the catalogue...
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-3">
        <label htmlFor="movie-prompt" className="text-sm font-medium text-[var(--color-ink-2)]">
          {isChat ? 'Message the concierge' : 'Describe the movie you want'}
        </label>
        <textarea
          id="movie-prompt"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isChat ? 'I want something eerie, smart, and not too violent...' : 'A sci-fi movie with time travel, grief, and a hopeful ending...'}
          className="min-h-28 resize-none rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-focus)] focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[var(--radius-md)] bg-[var(--color-accent)] px-5 py-3 font-bold text-[var(--color-accent-ink)] hover:-translate-y-0.5 hover:bg-[var(--color-focus)] disabled:cursor-not-allowed disabled:opacity-55 sm:w-fit"
        >
          {loading ? 'Thinking...' : isChat ? 'Send message' : 'Find movies'}
        </button>
      </form>
    </div>
  );
}
