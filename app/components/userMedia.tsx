"use client";

import { Movie } from "../types/interfaces";

interface UserMediaProps {
  savedMovies: Movie[];
  removeMovie: (movieId: string) => void;
  // setSavedMovie: Movie[];
}

// displays users saved movies

const UserMedia: React.FC<UserMediaProps> = ({ savedMovies, removeMovie }) => {
  return (
    <>
      <div className="grid grid-cols-6">
        {savedMovies.map((savedMovie) => (
          <div className="flex flex-col p-2" key={savedMovie.id}>
            {" "}
            <h2>{savedMovie.original_title}</h2>
            <p>Release Date: {savedMovie.release_date}</p>
            <p>Rating: {savedMovie.vote_average}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${savedMovie.poster_path}`}
              alt={savedMovie.original_title}
            />
            <button onClick={() => removeMovie(savedMovie.id)}>remove</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserMedia;
