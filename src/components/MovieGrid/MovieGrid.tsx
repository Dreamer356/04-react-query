import { memo } from 'react';
import type { Movie } from '../../types/movie';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  if (!movies.length) return null;

  return (
    <ul className={styles.grid}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id}>
          <button
            className={styles.card}
            onClick={() => onSelect({ id, title, poster_path } as Movie)}
          >
            <img
              className={styles.image}
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              loading="lazy"
            />
            <h2 className={styles.title}>{title}</h2>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default memo(MovieGrid);
