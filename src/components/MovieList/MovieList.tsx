import React from 'react';
import { Movie } from '../../types/movie';
import MovieItem from '../MovieItem/MovieItem';
import css from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id}>
          <MovieItem movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
