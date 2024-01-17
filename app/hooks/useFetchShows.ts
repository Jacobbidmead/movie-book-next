import { useState, useCallback } from "react";
import { Show } from "../types/interfaces";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const useFetchShows = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShows = useCallback((query = "") => {
    setIsLoading(true);
    setError(null);

    const url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch shows");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.results) {
          // Standardize the naming convention for TV shows
          const standardizedShows = data.results.map((show: Show) => ({
            ...show,
            title: show.original_name, // Rename "name" to "title"
          }));
          setShows(standardizedShows);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { shows, isLoading, error, fetchShows };
};
