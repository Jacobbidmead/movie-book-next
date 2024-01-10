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
      const isMediaSaved = prevMedia.some((item) => item.id === media.id);
      if (!isMediaSaved) {
        const updatedMedia = { ...media, type: media.type } as
          | Movie
          | (Show & { type: "movie" | "show" });
        return [...prevMedia, updatedMedia];
      }
      return prevMedia;
    });
  };

  // remove media from saved movie list
  const removeMedia = (mediaId: string, mediaType: "movie" | "show") => {
    setSavedMedia((prevMedia) =>
      prevMedia.filter(
        (media) => !(media.id === mediaId && media.type === mediaType)
      )
    );

    setAddedMedia((prevAdded) => ({
      ...prevAdded,
      [mediaType === "movie" ? "movies" : "shows"]: {
        ...prevAdded[mediaType === "movie" ? "movies" : "shows"],
        [mediaId]: false,
      },
    }));
  };

  // toggles between searched media and saved media
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
