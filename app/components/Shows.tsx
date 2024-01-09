"use client";

import { Show } from "../types/interfaces";

interface ShowProps {
  shows: Show[];
  addShow: (showToSave: Show) => void;
  handleAddToList: (mediaId: string, mediaType: "movie" | "show") => void;
  addedShows: { [key: string]: boolean };
}

const Shows: React.FC<ShowProps> = ({
  shows,
  addShow,
  handleAddToList,
  addedShows,
}) => {
  return (
    <div className="grid grid-cols-6">
      {shows.map((show, i) => (
        <div className="flex flex-col p-2" key={i}>
          <div className="tooltip">
            <h2 className="truncate">
              {show.original_name.length > 20
                ? `${show.original_name.substring(0, 20)}...`
                : show.original_name}
            </h2>
            {show.original_name.length > 20 && (
              <div className="tooltiptext">{show.original_name}</div>
            )}
          </div>
          <p>Rating: {show.vote_average}</p>
          <img
            src={
              show.poster_path
                ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                : "/image.png"
            }
            alt={show.original_name}
          />

          {addedShows[show.id] ? (
            <div>Saved to list</div>
          ) : (
            <button
              onClick={() => {
                addShow(show);
                handleAddToList(show.id, "show");
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
