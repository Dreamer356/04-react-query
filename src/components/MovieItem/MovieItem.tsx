import React from 'react';
import { Movie } from '../../types/movie';
import css from './MovieItem.module.css';

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : undefined;
  return (
    <article className={css.card}>
      {poster ? <img src={poster} alt={movie.title} className={css.poster} /> : <div className={css.noPoster}>No image</div>}
      <h3 className={css.title}>{movie.title}</h3>
      <p className={css.date}>{movie.release_date}</p>
    </article>
  );
};

export default MovieItem;
