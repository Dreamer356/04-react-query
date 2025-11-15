import styles from './Loader.module.css'

interface LoaderProps { message?: string }

const Loader = ({ message = 'Loading movies, please wait...' }: LoaderProps) => {
  return <p className={styles.text}>{message}</p>
}

export default Loader
