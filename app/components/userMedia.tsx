"use client";

import { Movie } from "../types/interfaces";

interface UserMediaProps {
  savedMovies: Movie[];
  removeMovie: (movieId: string) => void;
  handleRemoveFromList: (movieId: string) => void;
  // setSavedMovie: Movie[];
}

// displays users saved media

const UserMedia: React.FC<UserMediaProps> = ({
  savedMovies,
  removeMovie,
  handleRemoveFromList,
}) => {
  return (
    <>
      <div className="grid grid-cols-6">
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
                removeMovie(savedMovie.id);
                handleRemoveFromList(savedMovie.id);
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
