"use client";

import { Movie, Show } from "../types/interfaces";

interface UserMediaProps {
  savedMovies: Movie[];
  savedShows: Show[];
  removeMedia: (mediaId: string, mediaType: "movie" | "show") => void;
}

// displays users saved media

const UserMedia: React.FC<UserMediaProps> = ({
  savedShows,
  savedMovies,
  removeMedia,
}) => {
  return (
    <>
      <div className="grid grid-cols-6">
        {/* render saved movies */}
        {savedMovies.map((savedMovie) => (
          <div className="flex flex-col p-2" key={savedMovie.id}>
            {" "}
            <div className="tooltip">
              <h2 className="truncate">
                {savedMovie.original_title.length > 20
                  ? `${savedMovie.original_title.substring(0, 20)}...`
                  : savedMovie.original_title}
              </h2>
              {savedMovie.original_title.length > 20 && (
                <div className="tooltiptext">{savedMovie.original_title}</div>
              )}
            </div>
            <p>Rating: {savedMovie.vote_average}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${savedMovie.poster_path}`}
              alt={savedMovie.original_title}
            />
            <button
              onClick={() => {
                removeMedia(savedMovie.id, "movie");
              }}
            >
              remove
            </button>
          </div>
        ))}
        {/* render saved shows */}
        {savedShows.map((savedShow) => (
          <div className="flex flex-col p-2" key={savedShow.id}>
            {" "}
            <div className="tooltip">
              <h2 className="truncate">
                {savedShow.original_name.length > 20
                  ? `${savedShow.original_name.substring(0, 20)}...`
                  : savedShow.original_name}
              </h2>
              {savedShow.original_name.length > 20 && (
                <div className="tooltiptext">{savedShow.original_name}</div>
              )}
            </div>
            <p>Rating: {savedShow.vote_average}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${savedShow.poster_path}`}
              alt={savedShow.original_name}
            />
            <button
              onClick={() => {
                removeMedia(savedShow.id, "show");
              }}
            >
              remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserMedia;
