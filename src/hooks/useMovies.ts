import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from '../services/movieService'

export function useMovies(query: string, page: number) {
  const q = query.trim()
  return useQuery({
    queryKey: ['movies', q || '__empty__', page],
    queryFn: () => fetchMovies(q, page),
    enabled: q.length > 0,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 3,
  })
}
