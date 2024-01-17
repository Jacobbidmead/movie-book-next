import { useState, useCallback } from "react";
import { Movie } from "../types/interfaces";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add type annotation for isLoading
  const [error, setError] = useState<string | null>(null); // Add type annotation for error

  const fetchMovies = useCallback((query: string = "") => {
    // Add type annotation for query
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
        // Add type annotation for data
        if (data && data.results) {
          // Log movies with missing titles
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
        // Add type annotation for error
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { movies, isLoading, error, fetchMovies };
};
