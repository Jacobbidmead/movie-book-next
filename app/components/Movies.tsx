import { Movie } from "../types/interfaces";

interface MovieProps {
  movies: Movie[];
  addMovie: (movieToSave: Movie) => void;
  handleAddToList: (mediaId: string, mediaType: "movie" | "show") => void;
  addedMovies: { [key: string]: boolean };
}

const Movies: React.FC<MovieProps> = ({
  movies,
  addMovie,
  addedMovies,
  handleAddToList,
}) => {
  return (
    <div className="grid grid-cols-6">
      {movies.map((movie, i) => (
        <div className="flex flex-col p-2" key={i}>
          <div className="tooltip">
            <h2 className="truncate">
              {movie.original_title.length > 20
                ? `${movie.original_title.substring(0, 20)}...`
                : movie.original_title}
            </h2>
            {movie.original_title.length > 20 && (
              <div className="tooltiptext">{movie.original_title}</div>
            )}
          </div>
          <p>Rating: {movie.vote_average}</p>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/image.png"
            }
            alt={movie.original_title}
          />

          {addedMovies[movie.id] ? (
            <div>Saved to list</div>
          ) : (
            <button
              onClick={() => {
                addMovie(movie);
                handleAddToList(movie.id, "movie");
              }}
            >
              Save
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Movies;
