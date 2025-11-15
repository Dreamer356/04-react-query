import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import type { Movie } from '../../types/movie'
import styles from './MovieModal.module.css'

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

const modalRoot = document.getElementById('modal-root') as HTMLElement

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const onEsc = useCallback((ev: KeyboardEvent) => {
    if (ev.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', onEsc)
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = original
    }
  }, [onEsc])

  const backdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={backdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} aria-label="Close" onClick={onClose}>&times;</button>
        <img className={styles.image} src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : `https://via.placeholder.com/800x450?text=${encodeURIComponent(movie.title)}`} alt={movie.title} loading="lazy" />
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <ul className={styles.details}>
            <li><strong>Release:</strong> {movie.release_date ?? 'N/A'}</li>
            <li><strong>Rating:</strong> {movie.vote_average ?? 'N/A'}/10</li>
          </ul>
        </div>
      </div>
    </div>,
    modalRoot
  )
}

export default MovieModal
