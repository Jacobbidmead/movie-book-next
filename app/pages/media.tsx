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

  const addMedia = (media: Movie | Show) => {
    setSavedMedia((prevMedia) => {
      // if the element id (item) is matched an id of the media, save as variable isMediaSaved
      const isMediaSaved = prevMedia.some((item) => item.id === media.id);
      // if the element id (item) is not === media.id, then we call it updatedMedia
      // we can return the previous elements (items) and the new item
      if (!isMediaSaved) {
        const updatedMedia = { ...media, type: media.type } as
          | Movie
          | (Show & { type: "movie" | "show" });
        return [...prevMedia, updatedMedia];
      }
      // if it is === media.id, then we return the previous elements
      return prevMedia;
    });
  };

  // Function to remove a media item (either a movie or a show) from the saved list.

  const removeMedia = (mediaId: string, mediaType: "movie" | "show") => {
    // Update the 'savedMedia' state.
    // This state holds an array of all saved media items.
    setSavedMedia((prevMedia) =>
      // Filter out the media item that matches the given 'mediaId' and 'mediaType'.
      // This effectively removes the item from the list of saved media.
      prevMedia.filter(
        (media) => !(media.id === mediaId && media.type === mediaType)
      )
    );
    // Update the 'addedMedia' state.

    // This state is used to track whether each individual media item is saved or not.
    // It has a structure that differentiates between 'movies' and 'shows'.
    setAddedMedia((prevAdded) => ({
      ...prevAdded, // Spread the existing state to maintain other entries.
      // Based on the 'mediaType', update either the 'movies' or 'shows' part of the state.
      [mediaType === "movie" ? "movies" : "shows"]: {
        ...prevAdded[mediaType === "movie" ? "movies" : "shows"], // Spread the existing 'movies' or 'shows' state.
        [mediaId]: false, // Set the specific media item's saved status to false, indicating it is no longer saved.
      },
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
            <Movies
              movies={movies}
              addMedia={addMedia}
              handleAddToList={handleAddToList}
              addedMedia={addedMedia}
            />
          ) : (
            <Shows
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
