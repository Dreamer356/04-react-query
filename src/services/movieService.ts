import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  try {
    const { data } = await axios.get<MoviesResponse>(BASE_URL, {
      params: {
        query: query.trim(),
        page,
        include_adult: false,
        language: "en-US",
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error; 
  }
};
