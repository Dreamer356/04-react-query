import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import ReactPaginate from 'react-paginate'

import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'

import { useMovies } from '../../hooks/useMovies'
import type { Movie } from '../../types/movie'
import styles from './App.module.css'

const App = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Movie | null>(null)

  const { data, isLoading, isError } = useMovies(query, page)
  const movies = data?.results ?? []
  const totalPages = data?.total_pages ?? 1

  useEffect(() => {
    if (!isLoading && !isError && query && movies.length === 0) {
      toast.error('No movies found for your request.')
    }
  }, [isLoading, isError, query, movies.length])

  const handleSearch = (q: string) => {
    setQuery(q)
    setPage(1)
  }

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      <main>
        {isLoading && <Loader message="Loading movies, please wait..." />}

        {!isLoading && isError && <ErrorMessage message="Unable to load movies. Try again." />}

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
            <MovieGrid movies={movies} onSelect={setSelected} />
          </>
        )}

        {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
      </main>

      <Toaster position="top-center" />
    </div>
  )
}

export default App
