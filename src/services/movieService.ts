import axios from 'axios'
import type { MoviesResponse } from '../types/movie'

const TOKEN = import.meta.env.VITE_TMDB_TOKEN
const BASE = 'https://api.themoviedb.org/3'

export async function fetchMovies(query: string, page = 1): Promise<MoviesResponse> {
  const trimmed = query.trim()
  const url = `${BASE}/search/movie`
  const res = await axios.get<MoviesResponse>(url, {
    params: { query: trimmed, page, include_adult: false, language: 'en-US' },
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  return res.data
}
