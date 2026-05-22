'use client';

import { useState } from 'react';
import SearchForm from './components/SearchForm';
import MovieCard from './components/MovieCard';
import embedFUNC from '@/lib/xenova';

const starterMessages = [
  {
    role: 'assistant',
    content: 'Tell me the mood, era, actor, setting, or the kind of night you want. I will pull matching films from your collection and explain the picks.'
  }
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [aiError, setAiError] = useState(null);
  const [mode, setMode] = useState('search');
  const [messages, setMessages] = useState(starterMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendations = async (prompt, options = {}) => {
    const response = await embedFUNC(prompt, options);

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    return response.json();
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setAiError(null);
    setAiRecommendation('');

    try {
      const data = await getRecommendations(query, { skipAi: true });
      setMovies(data.message || []);
      setAiRecommendation(data.aiRecommendation || '');
      setAiError(data.aiError || null);
    } catch (err) {
      console.error('Error fetching movie recommendations:', err);
      setError('Failed to fetch movie recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();

    const prompt = query.trim();
    if (!prompt) return;

    const userMessage = { role: 'user', content: prompt };
    setMessages((current) => [...current, userMessage]);
    setQuery('');
    setLoading(true);
    setError(null);
    setAiError(null);

    try {
      const data = await getRecommendations(prompt);
      const nextMovies = data.message || [];
      const assistantContent = data.aiRecommendation ||
        (nextMovies.length
          ? 'I found a few films that fit. Start with the titles below.'
          : 'I could not find a strong match in the movie database. Try a different mood, genre, actor, or plot detail.');

      setMovies(nextMovies);
      setAiRecommendation(assistantContent);
      setAiError(data.aiError || null);
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: assistantContent,
          movies: nextMovies.slice(0, 3)
        }
      ]);
    } catch (err) {
      console.error('Error fetching movie recommendations:', err);
      setError('The concierge could not reach the recommendation engine. Please try again.');
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: 'I hit a snag while checking the catalogue. Try again in a moment.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const hasResults = movies.length > 0;
  const activeSubmit = mode === 'chat' ? handleChat : handleSearch;

  return (
    <main className="min-h-screen bg-[var(--color-paper)] px-4 py-5 text-[var(--color-ink)] sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-[linear-gradient(145deg,var(--color-panel),var(--color-paper))] p-5 sm:p-7">
          <div>
            <div className="mb-10 flex items-center justify-between gap-3">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                34,000+ titles
              </div>
              <div className="rounded-full border border-[var(--color-rule)] px-3 py-1 text-xs text-[var(--color-ink-2)]">
                vector search + Gemini
              </div>
            </div>

            <div className="max-w-xl">
              <h1 className="text-5xl font-black leading-[0.95] text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
                AI Movie Concierge
              </h1>
              <p className="mt-5 text-lg leading-8 text-[var(--color-ink-2)]">
                Search the catalogue directly, or switch into a chat room and ask for a movie night in plain language.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-3 text-sm text-[var(--color-ink-2)] sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="border-t border-[var(--color-rule)] pt-3">
              <span className="block text-[var(--color-ink)]">Mood-led</span>
              Ask for pace, tone, era, or setting.
            </div>
            <div className="border-t border-[var(--color-rule)] pt-3">
              <span className="block text-[var(--color-ink)]">Grounded</span>
              Answers use retrieved movie records.
            </div>
            <div className="border-t border-[var(--color-rule)] pt-3">
              <span className="block text-[var(--color-ink)]">Explainable</span>
              Each pick says why it fits.
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          <SearchForm
            mode={mode}
            setMode={setMode}
            query={query}
            setQuery={setQuery}
            handleSubmit={activeSubmit}
            loading={loading}
            messages={messages}
          />

          {error && (
            <div className="rounded-[var(--radius-md)] border border-[color-mix(in_oklch,var(--color-danger),transparent_45%)] bg-[color-mix(in_oklch,var(--color-danger),transparent_88%)] p-4 text-sm text-[var(--color-ink)]">
              {error}
            </div>
          )}

          {aiError && (
            <div className="rounded-[var(--radius-md)] border border-[color-mix(in_oklch,var(--color-accent),transparent_45%)] bg-[color-mix(in_oklch,var(--color-accent),transparent_88%)] p-4 text-sm text-[var(--color-ink)]">
              {aiError}
            </div>
          )}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-[var(--color-panel)] p-4 sm:p-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  {loading ? 'Scanning catalogue' : hasResults ? 'Recommended queue' : 'Waiting for a brief'}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[var(--color-ink)]">
                  {hasResults ? 'Movies to consider' : 'Your picks will appear here'}
                </h2>
              </div>
              {hasResults && (
                <span className="text-sm text-[var(--color-ink-2)]">
                  {movies.length} matches
                </span>
              )}
            </div>

            {loading && (
              <div className="grid gap-4 md:grid-cols-2">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="h-44 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-panel-soft)]" />
                ))}
              </div>
            )}

            {!loading && hasResults && (
              <div className="grid gap-4 md:grid-cols-2">
                {movies.map((movie, index) => (
                  <MovieCard key={`${movie.Title}-${index}`} movie={movie} index={index} />
                ))}
              </div>
            )}

            {!loading && !hasResults && (
              <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-rule)] p-6 text-sm leading-7 text-[var(--color-ink-2)]">
                Try &quot;slow-burn sci-fi about identity&quot;, &quot;warm comedy for a family night&quot;, or &quot;crime thrillers with unreliable leads&quot;.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
