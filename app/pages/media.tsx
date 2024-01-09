"use client";

import React, { useState } from "react";
import Search from "../components/search";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useFetchShows } from "../hooks/useFetchShows";
import UserMedia from "../components/userMedia";
import { Movie, Show } from "../types/interfaces";
import Movies from "../components/Movies";
import Shows from "../components/Shows";
// import LoginPage from "./login.page";

// TODO: refactor, addMovie & addShow functions can be combined

// displays movie search

type MediaView = "movies" | "shows";

const MoviePage: React.FC = () => {
  const { movies, isLoading, error, fetchMovies } = useFetchMovies();
  const { shows, fetchShows } = useFetchShows();
  const [savedShows, setSavedShows] = useState<Show[]>([]);
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [showUserMedia, setShowUserMedia] = useState<boolean>(false);
  const [addedMovies, setAddedMovies] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [addedShows, setAddedShows] = useState<{ [key: string]: boolean }>({});
  const [toggleMedia, setToggleMedia] = useState<MediaView>("movies");

  // add movies to user list
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

  // add show to user list
  const addShow = (showToSave: Show) => {
    setSavedShows((prevSavedShows) => {
      const isShowSaved = prevSavedShows.some(
        (show) => show.id === showToSave.id
      );
      if (!isShowSaved) {
        return [...prevSavedShows, showToSave];
      }
      return prevSavedShows;
    });
  };

  // remove media from saved movie list
  const removeMedia = (mediaId: string, mediaType: "movie" | "show") => {
    if (mediaType === "movie") {
      setSavedMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== mediaId)
      );
    } else if (mediaType === "show") {
      setSavedShows((prevShows) =>
        prevShows.filter((show) => show.id !== mediaId)
      );
    }
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

  const handleSearch = (query: string) => {
    fetchMovies(query);
    fetchShows(query);
  };

  return (
    <>
      <div className="flex place-content-center">
        <Search onSearch={handleSearch} />
        <button
          onClick={() =>
            setToggleMedia(toggleMedia === "movies" ? "shows" : "movies")
          }
        >
          {toggleMedia === "movies" ? <span>TV</span> : <span>Movies</span>}
        </button>

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
          savedShows={savedShows}
          removeMedia={removeMedia}
        />
      ) : (
        <>
          {toggleMedia === "movies" ? (
            <Movies
              movies={movies}
              addMovie={addMovie}
              handleAddToList={handleAddToList}
              addedMovies={addedMovies}
            />
          ) : (
            <Shows
              shows={shows}
              addShow={addShow}
              addedShows={addedShows}
              handleAddToList={handleAddToList}
            />
          )}
        </>
      )}
    </>
  );
};

export default MoviePage;
