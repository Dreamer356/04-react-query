import toast from 'react-hot-toast'
import style from './SearchBar.module.css'

interface SearchBarProps {
  onSubmit: (query: string) => void
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const raw = (fd.get('query') as string) || ''
    const q = raw.trim()
    if (!q) {
      toast.error('Please enter your search query.')
      return
    }
    onSubmit(q)
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <a className={style.link} href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          Powered by TMDB
        </a>

        <form className={style.form} onSubmit={handleForm}>
          <input className={style.input} name="query" type="text" placeholder="Search movies..." aria-label="Search movies" autoComplete="off" autoFocus />
          <button className={style.button} type="submit">Search</button>
        </form>
      </div>
    </header>
  )
}

export default SearchBar
