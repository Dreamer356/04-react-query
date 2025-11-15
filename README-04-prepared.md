# 04-react-query (prepared)

This project is refactored to use TanStack Query and React Paginate for pagination.

Important steps to run locally:

1. Install dependencies:
   npm install

2. Add TMDB API key into .env file at project root:
   VITE_TMDB_API_KEY=your_api_key_here

3. Run dev server:
   npm run dev

Notes:
- I prepared QueryClientProvider in src/main.tsx.
- API helpers located at src/api/movies.ts
- Types in src/types/movie.ts
- Components split into folders under src/components
- CSS modules are used for component styles.

