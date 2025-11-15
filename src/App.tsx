import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { fetchMovies } from './api/movies';
import { MoviesResponse } from './types/movie';
import MovieList from './components/MovieList/MovieList';
import css from './App.module.css';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce user input for searchTerm updates
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(query.trim()), 500);
    return () => clearTimeout(id);
  }, [query]);

  const { data, isLoading, isError, error } = useQuery<MoviesResponse, Error>(
    ['movies', searchTerm, page],
    () => fetchMovies(searchTerm, page),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 2,
      enabled: true,
    }
  );

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1>Movie search</h1>
        <div className={css.search}>
          <input
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search movies..."
            className={css.input}
          />
        </div>
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p role="alert">Error: {error?.message}</p>}
        {data && data.results.length === 0 && <p>No results.</p>}
        {data && data.results.length > 0 && <MovieList movies={data.results} />}

        {totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
      </main>
    </div>
  );
};

export default App;
