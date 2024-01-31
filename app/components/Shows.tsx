"use client";

import { Show } from "../types/interfaces";

interface AddedMediaState {
  movies: { [key: string]: boolean };
  shows: { [key: string]: boolean };
}

interface ShowProps {
  shows: Show[];
  addMedia: (mediaToSave: Show) => void;
  handleAddToList: (mediaId: string, mediaType: "movie" | "show") => void;
  addedMedia: AddedMediaState;
}

const Shows: React.FC<ShowProps> = ({
  shows,
  addMedia,
  handleAddToList,
  addedMedia,
}) => {
  console.log("Rendering Shows component");
  return (
    <div className="grid grid-cols-6 text-light">
      {shows.map((show) => (
        <div className="flex flex-col p-2" key={show.id}>
          <div className="tooltip">
            <h2 className="truncate">
              {show.title.length > 20
                ? `${show.title.substring(0, 20)}...`
                : show.title}
            </h2>
            {show.title.length > 20 && (
              <div className="tooltiptext">{show.title}</div>
            )}
          </div>
          <p>Rating: {show.vote_average}</p>
          <img
            src={
              show.poster_path
                ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                : "/image.png"
            }
            alt={show.title}
          />

          {addedMedia.shows[show.id] ? (
            <div>Saved to list</div>
          ) : (
            <button
              onClick={() => {
                addMedia(show);
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
