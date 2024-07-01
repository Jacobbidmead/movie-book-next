"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useFetchShows } from "../hooks/useFetchShows";
import UserMedia from "../components/userMedia";
import { Movie, Show } from "../types/interfaces";
import Movies from "../components/Movies";
import Shows from "../components/Shows";
import Nav from "../components/Nav";

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

  const removeMedia = (mediaId: string) => {
    setSavedMedia((prevMedia) => prevMedia.filter((media) => media.id !== mediaId));

    setAddedMedia((prevAdded) => ({
      ...prevAdded,

      movies: { ...prevAdded.movies, [mediaId]: undefined },
      shows: { ...prevAdded.shows, [mediaId]: undefined },
    }));
  };

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
      <Nav
        handleSearch={handleSearch}
        showMedia={showMedia}
        showUserMedia={showUserMedia}
        handleToggleMedia={handleToggleMedia}
        toggleMedia={toggleMedia}
      />

      <div className="flex flex-col place-items-center justify-center gap-3 bg-oxford ">
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
