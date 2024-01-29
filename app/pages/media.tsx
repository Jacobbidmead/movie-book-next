"use client";

import React, { useState, useCallback } from "react";
import Search from "../atoms/search";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useFetchShows } from "../hooks/useFetchShows";
import UserMedia from "../components/userMedia";
import { Movie, Show } from "../types/interfaces";
import Movies from "../components/Movies";
import Shows from "../components/Shows";
import LandingPage from "./landingPage";
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
      <LandingPage />
      <div>
        <div className="flex justify-end">
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
        </div>

        <div className="flex place-items-center justify-center flex-col">
          {!showUserMedia && <Search onSearch={handleSearch} />}
          <div>
            {showUserMedia ? (
              <div onClick={showMedia} className="cursor-pointer">
                Back to search
              </div>
            ) : (
              <div onClick={showMedia} className="cursor-pointer">
                My list
              </div>
            )}
          </div>
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
      </div>
    </>
  );
};

export default MoviePage;
