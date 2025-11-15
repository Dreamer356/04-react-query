import MovieGrid from '../MovieGrid/MovieGrid';
import SearchBar from '../SearchBar/SearchBar';

export default function App() {
  return (
    <div>
      <h1>React Movies</h1>
      <SearchBar />
      <MovieGrid />
    </div>
  );
}
