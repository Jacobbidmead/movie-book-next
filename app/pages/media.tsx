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

type MediaView = "movies" | "shows";

const MoviePage: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const { movies, isLoading, error, fetchMovies } = useFetchMovies();
  const { shows, fetchShows } = useFetchShows();
  const [savedMedia, setSavedMedia] = useState<(Movie | Show)[]>([]);
  const [showUserMedia, setShowUserMedia] = useState<boolean>(false);
  const [addedMedia, setAddedMedia] = useState({
    movies: {},
    shows: {},
  });
  const [toggleMedia, setToggleMedia] = useState<MediaView>("movies");
  const [openInfo, setOpenInfo] = useState(false);
  const MemoizedMovies = React.memo(Movies);
  const MemoizedShows = React.memo(Shows);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 501);
    };

    checkMobile(); // Check mobile status on mount
    window.addEventListener("resize", checkMobile);

    // Cleanup the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

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

  const handleOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  return (
    <>
      {isMobile ? (
        <Header handleOpenInfo={handleOpenInfo} isMobile={isMobile} />
      ) : (
        <>
          <Header handleOpenInfo={handleOpenInfo} isMobile={isMobile} />

          <Nav
            handleSearch={handleSearch}
            showMedia={showMedia}
            showUserMedia={showUserMedia}
            handleToggleMedia={handleToggleMedia}
            toggleMedia={toggleMedia}
          />
        </>
      )}

      {isMobile ? (
        <div className="flex justify-center px-8">
          <Search onSearch={handleSearch} />{" "}
        </div>
      ) : null}

      <Info isOpen={openInfo} onClose={handleCloseInfo}>
        <h2 className="p-2"> MediaBook AI</h2>
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

      <div className="flex flex-col place-items-center justify-center gap-3 bg-night ">
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
