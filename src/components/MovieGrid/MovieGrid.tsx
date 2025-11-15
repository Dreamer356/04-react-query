import type { Movie } from '../../types/movie'
import styles from './MovieGrid.module.css'

interface MovieGridProps {
  movies: Movie[]
  onSelect: (movie: Movie) => void
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  if (!movies.length) return null
  return (
    <ul className={styles.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <article className={styles.card} onClick={() => onSelect(m)} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') onSelect(m) }}>
            <img className={styles.image} src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'} alt={m.title} loading="lazy" />
            <h3 className={styles.title}>{m.title}</h3>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default MovieGrid
