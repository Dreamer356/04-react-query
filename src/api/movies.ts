import axios from 'axios';
import { MoviesResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // set in .env
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export async function fetchMovies(query: string, page = 1): Promise<MoviesResponse> {
  if (!query) {
    // popular movies as fallback
    const { data } = await axiosInstance.get('/movie/popular', { params: { page } });
    return data as MoviesResponse;
  }
  const { data } = await axiosInstance.get('/search/movie', {
    params: { query, page, include_adult: false },
  });
  return data as MoviesResponse;
}
