"use client";

import { Movie } from "../types/interfaces";

interface AddedMediaState {
  movies: { [key: string]: boolean };
  shows: { [key: string]: boolean };
}

interface MovieProps {
  movies: Movie[];
  addMedia: (mediaToSave: Movie) => void;
  handleAddToList: (mediaId: string, mediaType: "movie" | "show") => void;
  addedMedia: AddedMediaState;
  removeMedia: (mediaId: string) => void;
}

const Movies: React.FC<MovieProps> = ({
  movies,
  addMedia,
  addedMedia,
  handleAddToList,
  removeMedia,
}) => {
  console.log("Rendering Movies component");
  return (
    <div className="grid lg:grid-cols-6 sm:grid-cols-2 text-light text-center p-6 pt-24 ">
      {movies.map((movie) => (
        <div className="flex flex-col p-4 " key={movie.id}>
          <div className="tooltip">
            <h2 className="truncate text-sm pb-1">
              {movie.title.length > 20 ? `${movie.title.substring(0, 20)}...` : movie.title}
            </h2>
            {movie.title.length > 20 && <div className="tooltiptext">{movie.title}</div>}
          </div>
          <p className="text-sm pb-2">Rating: {movie.vote_average}</p>
          <img
            className="w-full h-full object-cover shadow-2xl shadow-obsidian"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/image.png"
            }
            alt={movie.title}
          />
          <div className="flex justify-center">
            {addedMedia.movies[movie.id] ? (
              <div className="px-2 py-1.5 rounded-button text-xs border-border border-button lg:w-2/4 sm:w-9/12 mt-2 cursor-pointer custom-button">
                Saved to list
              </div>
            ) : (
              <>
                <button
                  className="px-2 py-1 rounded-button text-sm border-border border-button lg:w-1/4 sm:w-1/2 mt-2 custom-button"
                  onClick={() => {
                    addMedia(movie);
                    handleAddToList(movie.id, "movie");
                  }}>
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
