import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/movieService";

export function useMovies(query: string, page: number) {
  return useQuery({
    queryKey: ["movies", query.trim(), page],
    queryFn: () => fetchMovies(query, page),
    enabled: Boolean(query.trim()), 
    staleTime: 1000 * 60 * 5, 
    keepPreviousData: true, 
  });
}
