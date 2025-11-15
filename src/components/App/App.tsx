import { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { useMovies } from "../../services/useMovies";
import type { Movie } from "../../types/movie";

import styles from "./App.module.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useMovies(query, page);
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, []);

  const handleMovieSelect = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  useEffect(() => {
    if (!isLoading && !isError && query && movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isLoading, isError, query, movies.length]);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      <main>
        {isLoading && <Loader />}

        {!isLoading && isError && <ErrorMessage />}

        {!isLoading && !isError && movies.length > 0 && (
          <>
            {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}
            <MovieGrid movies={movies} onSelect={handleMovieSelect} />
          </>
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={closeModal} />
        )}
      </main>

      <Toaster position="top-center" />
    </div>
  );
};

export default App;
