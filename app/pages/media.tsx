"use client";

import React, { useState } from "react";
import Search from "../components/search";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useFetchShows } from "../hooks/useFetchShows";
import UserMedia from "../components/userMedia";
import { Movie } from "../types/interfaces";
import Movies from "../components/Movies";
// import LoginPage from "./login.page";

// displays movie search

const MoviePage: React.FC = () => {
  const { movies, isLoading, error, fetchMovies } = useFetchMovies();
  const { shows, fetchShows } = useFetchShows();
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [showUserMedia, setShowUserMedia] = useState<boolean>(false);
  const [addedMovies, setAddedMovies] = useState<{ [key: string]: boolean }>(
    {}
  );

  const addMovie = (movieToSave: Movie) => {
    setSavedMovies((prevSavedMovies) => {
      // Check if the movie already exists in the saved list
      const isMovieSaved = prevSavedMovies.some(
        (movie) => movie.id === movieToSave.id
      );
      if (!isMovieSaved) {
        return [...prevSavedMovies, movieToSave]; // Add new movie
      }
      return prevSavedMovies; // Return existing list if movie is already saved
    });
  };

  const removeMovie = (movieToRemoveId: string) => {
    setSavedMovies((prevSavedMovies) => {
      return prevSavedMovies.filter((movie) => movie.id != movieToRemoveId);
    });
  };

  const showMedia = () => {
    setShowUserMedia((prevState) => !prevState);
  };

  const handleAddToList = (movieId: string) => {
    setAddedMovies((prevAdded) => ({
      ...prevAdded,
      [movieId]: true,
    }));
  };

  const handleRemoveFromList = (movieId: string) => {
    setAddedMovies((prevAdded) => ({
      ...prevAdded,
      [movieId]: false,
    }));
  };

  const handleSearch = (query: string) => {
    fetchMovies(query);
    fetchShows(query);
  };

  return (
    <>
      <div className="flex place-content-center">
        <Search onSearch={handleSearch} />

        {showUserMedia ? (
          <div onClick={showMedia} className="cursor-pointer">
            Search movies
          </div>
        ) : (
          <div onClick={showMedia} className="cursor-pointer">
            My list
          </div>
        )}
      </div>

      {showUserMedia ? (
        <UserMedia
          savedMovies={savedMovies}
          removeMovie={removeMovie}
          handleRemoveFromList={handleRemoveFromList}
        />
      ) : (
        <Movies
          movies={movies}
          addMovie={addMovie}
          handleAddToList={handleAddToList}
          addedMovies={addedMovies}
        />
      )}
    </>
  );
};

export default MoviePage;
