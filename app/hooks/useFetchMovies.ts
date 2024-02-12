import { useState, useCallback } from "react";
import { Movie } from "../types/interfaces";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchMovies = useCallback((query: string = "") => {
    setIsLoading(true);
    setError(null);

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        return res.json();
      })
      .then((data: { results: Movie[] }) => {
        if (data && data.results) {
          const moviesWithMissingTitles = data.results.filter(
            (movie: Movie) => !movie.title
          );
          if (moviesWithMissingTitles.length > 0) {
            console.log("Movies with missing titles:", moviesWithMissingTitles);
          }

          setMovies(data.results);
        }
      })
      .catch((error: Error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { movies, isLoading, error, fetchMovies };
};
