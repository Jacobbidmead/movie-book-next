"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useFetchShows } from "../hooks/useFetchShows";
import UserMedia from "../components/userMedia";
import { Movie, Show } from "../types/interfaces";
import Movies from "../components/Movies";
import Shows from "../components/Shows";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Info from "../components/Info";
import Search from "../atoms/search";
import useMediaStore from "../store/useMediaStore";
import Recommendations from "../components/recommendations";

type MediaView = "movies" | "shows";

const MoviePage: React.FC = () => {
  const { screenState, toggleMedia, isMobile, setIsMobile } = useMediaStore();

  const { movies, isLoading, error, fetchMovies } = useFetchMovies();
  const { shows, fetchShows } = useFetchShows();
  const [savedMedia, setSavedMedia] = useState<(Movie | Show)[]>([]);

  const [addedMedia, setAddedMedia] = useState({
    movies: {},
    shows: {},
  });

  const [openInfo, setOpenInfo] = useState(false);

  const MemoizedMovies = React.memo(Movies);
  const MemoizedShows = React.memo(Shows);

  useEffect(() => {
    const checkMobile = () => {
      const currentIsMobile = window.innerWidth < 1000;
      setIsMobile(currentIsMobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [setIsMobile]);

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

  const handleOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  return (
    <>
      {isMobile ? (
        <>
          <Header isMobile={isMobile} handleOpenInfo={handleOpenInfo} />
          <div className="flex justify-center px-8">
            <Search onSearch={handleSearch} />
          </div>
        </>
      ) : (
        <>
          <Header isMobile={isMobile} handleOpenInfo={handleOpenInfo} />
          <Nav handleSearch={handleSearch} />
        </>
      )}

      <Info isOpen={openInfo} onClose={handleCloseInfo}>
        <p>
          Welcome to MediaBook AI, a tool that helps you decide what to watch using AI integration.
        </p>
        <p>Search for movies and tv shows, add them to your list</p>
        <p>Switch between Movies & Tv shows, saved media & recommendations</p>
        <p>
          Press the get recommendations button and the AI will find movies & shows based on your
          taste
        </p>
        <p>Sign up to save you choices, or use as a guest</p>
      </Info>

      <div className="flex flex-col place-items-center justify-center gap-3 bg-night">
        {screenState === "userMedia" ? (
          <UserMedia savedMedia={savedMedia} removeMedia={removeMedia} />
        ) : screenState === "recommendations" ? (
          <Recommendations savedMedia={savedMedia} />
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
