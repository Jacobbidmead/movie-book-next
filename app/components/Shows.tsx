const Shows: React.FC = () => {
  return (
    <div className="grid grid-cols-6">
      {shows.map((show, i) => (
        <div className="flex flex-col p-2" key={i}>
          <div className="tooltip">
            <h2 className="truncate">
              {show.original_title.length > 20
                ? `${show.original_title.substring(0, 20)}...`
                : show.original_title}
            </h2>
            {show.original_title.length > 20 && (
              <div className="tooltiptext">{show.original_title}</div>
            )}
          </div>
          <p>Rating: {show.vote_average}</p>
          <img
            src={
              show.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/image.png"
            }
            alt={movie.original_title}
          />

          {addedShows[show.id] ? (
            <div>Saved to list</div>
          ) : (
            <button
              onClick={() => {
                addShow(show);
                handleAddToList(show.id);
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

export default Shows;
