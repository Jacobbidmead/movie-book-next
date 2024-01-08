"use client";

import { useState, useCallback } from "react";
import { Movie } from "../types/interfaces";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const useFetchShows = () => {
  const [shows, setShows] = useState<Movie[]>([]);
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
          throw new Error("Failed to fetch movies");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.results) {
          setShows(data.results);
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