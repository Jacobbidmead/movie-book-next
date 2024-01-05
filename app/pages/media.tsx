"use client";

import React, { use, useState } from "react";
import Search from "../components/search";
import { useFetchMovies } from "../hooks/useFetchMovies";
import UserMedia from "../components/userMedia";
import { Movie } from "../types/interfaces";

// import LoginPage from "./login.page";

// displays movie search

const MoviePage: React.FC = () => {
  const { movies, isLoading, error, fetchMovies } = useFetchMovies();
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [showUserMedia, setShowUserMedia] = useState<boolean>(false);

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

  return (
    <>
      <div className="flex place-content-center">
        <Search onSearch={fetchMovies} />
        <div onClick={showMedia}>My list</div>
      </div>

      {showUserMedia ? (
        <UserMedia savedMovies={savedMovies} removeMovie={removeMovie} />
      ) : (
        <div className="grid grid-cols-6">
          {movies.map((movie, i) => (
            <div className="flex flex-col p-2" key={i}>
              <h2>{movie.original_title}</h2>
              <p>Release Date: {movie.release_date}</p>
              <p>Rating: {movie.vote_average}</p>

              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/image.png"
                }
                alt={movie.original_title}
              />

              <button onClick={() => addMovie(movie)}>Save</button>
            </div>
          ))}
          {/* Other components or JSX */}
        </div>
      )}
    </>
  );
};

export default MoviePage;
