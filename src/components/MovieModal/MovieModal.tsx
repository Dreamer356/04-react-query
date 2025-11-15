import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  // Закрытие по Escape
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden"; // блок скролла фона

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [handleEsc]);

  // Закрытие по клику вне контента
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-title"
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
          className={styles.image}
          loading="lazy"
        />

        <div className={styles.content}>
          <h2 id="movie-title">{movie.title}</h2>
          <p>{movie.overview}</p>
          <ul className={styles.details}>
            <li>
              <strong>Release Date:</strong> {movie.release_date}
            </li>
            <li>
              <strong>Rating:</strong> {movie.vote_average} / 10
            </li>
          </ul>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default MovieModal;
