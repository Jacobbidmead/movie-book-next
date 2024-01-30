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
}

const Movies: React.FC<MovieProps> = ({
  movies,
  addMedia,
  addedMedia,
  handleAddToList,
}) => {
  console.log("Rendering Movies component");
  return (
    <div className="grid grid-cols-6 text-light">
      {movies.map((movie) => (
        <div className="flex flex-col p-2" key={movie.id}>
          <div className="tooltip">
            <h2 className="truncate">
              {movie.title.length > 20
                ? `${movie.title.substring(0, 20)}...`
                : movie.title}
            </h2>
            {movie.title.length > 20 && (
              <div className="tooltiptext">{movie.title}</div>
            )}
          </div>
          <p>Rating: {movie.vote_average}</p>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/image.png"
            }
            alt={movie.title}
          />

          {addedMedia.movies[movie.id] ? (
            <div>Saved to list</div>
          ) : (
            <button
              onClick={() => {
                addMedia(movie);
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
