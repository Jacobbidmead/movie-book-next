"use client";

import React, { useState, useCallback } from "react";
import Search from "../atoms/search";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useFetchShows } from "../hooks/useFetchShows";
import UserMedia from "../components/userMedia";
import Button from "../components/Button";
import { Movie, Show } from "../types/interfaces";
import Movies from "../components/Movies";
import Shows from "../components/Shows";
import { motion } from "framer-motion";

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

  const handleToggleMedia = () => {
    setToggleMedia(toggleMedia === "movies" ? "shows" : "movies");
  };

  const showMedia = () => {
    setShowUserMedia((prevState) => !prevState);
  };

  return (
    <>
      <div className=" flex flex-row justify-center place-items-center max-h-full">
        <div className="flex place-items-center justify-center flex-col m-3">
          <Search onSearch={handleSearch} />
        </div>

        <Button
          onClick={showMedia}
          className="cursor-pointer py-2 px-3 border-border border-button rounded-button text-xs text-light hover:bg-darkline bg-dark">
          {" "}
          {showUserMedia ? (
            <div className="cursor-pointer">Search</div>
          ) : (
            <div className="cursor-pointer">My list</div>
          )}
        </Button>

        <Button
          onClick={handleToggleMedia}
          className="cursor-pointer py-2 px-3 border-border border-button rounded-button text-xs text-light hover:bg-darkline bg-dark">
          {toggleMedia === "movies" ? (
            <span>Search for Shows</span>
          ) : (
            <span>Search for Movies</span>
          )}
        </Button>
      </div>

      <div className="flex flex-col place-items-center justify-center gap-3 lg:pb-56 sm:pb-24 overflow-auto ">
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
                removeMedia={removeMedia}
              />
            ) : (
              <MemoizedShows
                shows={shows}
                addMedia={addMedia}
                addedMedia={addedMedia}
                handleAddToList={handleAddToList}
                removeMedia={removeMedia}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MoviePage;
