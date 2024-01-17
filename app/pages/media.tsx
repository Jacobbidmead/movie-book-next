"use client";

import React, { useState, useCallback } from "react";
import Search from "../components/search";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useFetchShows } from "../hooks/useFetchShows";
import UserMedia from "../components/userMedia";
import { Movie, Show } from "../types/interfaces";
import Movies from "../components/Movies";
import Shows from "../components/Shows";
// import LoginPage from "./login.page";

// displays movie search

type MediaView = "movies" | "shows";

const MoviePage: React.FC = () => {
  const { movies, isLoading, error, fetchMovies } = useFetchMovies();
  const { shows, fetchShows } = useFetchShows();
  const [savedMedia, setSavedMedia] = useState<(Movie | Show)[]>([]);
  const [showUserMedia, setShowUserMedia] = useState<boolean>(false);
  const [addedMedia, setAddedMedia] = useState({
    movies: {},
    shows: {},
  });
  const [toggleMedia, setToggleMedia] = useState<MediaView>("movies");
  const MemoizedMovies = React.memo(Movies);
  const MemoizedShows = React.memo(Shows);

  const addMedia = useCallback((media: Movie | Show) => {
    console.log("addMedia called for:", media.id);
    setSavedMedia((prevMedia) => {
      const isMediaSaved = prevMedia.some((item) => item.id === media.id);
      if (!isMediaSaved) {
        console.log("Media being added:", media);
        const updatedMedia = { ...media, type: media.type } as
          | Movie
          | (Show & { type: "movie" | "show" });
        return [...prevMedia, updatedMedia];
      }
      return prevMedia;
    });
  }, []);

  // Function to remove a media item (either a movie or a show) from the saved list.

  const removeMedia = (mediaId: string) => {
    // Update the 'savedMedia' state.
    // This state holds an array of all saved media items.
    setSavedMedia((prevMedia) =>
      // Filter out the media item that matches the given 'mediaId'.
      // This effectively removes the item from the list of saved media.
      prevMedia.filter((media) => media.id !== mediaId)
    );
    // Update the 'addedMedia' state.

    // This state is used to track whether each individual media item is saved or not.
    // It has a structure that differentiates between 'movies' and 'shows'.
    setAddedMedia((prevAdded) => ({
      ...prevAdded, // Spread the existing state to maintain other entries.
      // Remove the entry with the given 'mediaId' from both 'movies' and 'shows'.
      movies: { ...prevAdded.movies, [mediaId]: undefined },
      shows: { ...prevAdded.shows, [mediaId]: undefined },
    }));
  };

  // toggles between searched media and saved media
  // each time the onClick is called, the state toggles between true and false
  const showMedia = () => {
    setShowUserMedia((prevState) => !prevState);
  };

  // changes the state of the button ui to let the user know when some media has succesfully been saved to thier list
  const handleAddToList = (mediaId: string, mediaType: "movie" | "show") => {
    setAddedMedia((prevAdded) => ({
      ...prevAdded,
      [mediaType === "movie" ? "movies" : "shows"]: {
        ...prevAdded[mediaType === "movie" ? "movies" : "shows"],
        [mediaId]: true,
      },
    }));
  };

  const handleSearch = (query: string) => {
    fetchMovies(query);
    fetchShows(query);
  };

  return (
    <>
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" className="theme-controller" value="synthwave" />

        {/* sun icon */}
        <svg
          className="swap-on fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        {/* moon icon */}
        <svg
          className="swap-off fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
      <div className="flex justify-around">
        <div>
          <button
            onClick={() =>
              setToggleMedia(toggleMedia === "movies" ? "shows" : "movies")
            }
          >
            {!showUserMedia &&
              (toggleMedia === "movies" ? (
                <span>TV</span>
              ) : (
                <span>Movies</span>
              ))}
          </button>
        </div>
        <div>
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
      </div>

      <div className="flex justify-center">
        {!showUserMedia && <Search onSearch={handleSearch} />}
      </div>

      {showUserMedia ? (
        <UserMedia savedMedia={savedMedia} removeMedia={removeMedia} />
      ) : (
        <>
          {toggleMedia === "movies" ? (
            <MemoizedMovies
              movies={movies}
              addMedia={addMedia}
              handleAddToList={handleAddToList}
              addedMedia={addedMedia}
            />
          ) : (
            <MemoizedShows
              shows={shows}
              addMedia={addMedia}
              addedMedia={addedMedia}
              handleAddToList={handleAddToList}
            />
          )}
        </>
      )}
    </>
  );
};

export default MoviePage;
