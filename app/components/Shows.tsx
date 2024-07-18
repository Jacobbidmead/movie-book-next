"use client";

import { Show } from "../types/interfaces";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface AddedMediaState {
  movies: { [key: string]: boolean };
  shows: { [key: string]: boolean };
}

interface ShowProps {
  shows: Show[];
  addMedia: (mediaToSave: Show) => void;
  handleAddToList: (mediaId: string, mediaType: "movie" | "show") => void;
  addedMedia: AddedMediaState;
  removeMedia: (mediaId: string) => void;
}

const Shows: React.FC<ShowProps> = ({
  shows,
  addMedia,
  handleAddToList,
  addedMedia,
  removeMedia,
}) => {
  console.log("Rendering Shows component");
  return (
    <div className="grid lg:grid-cols-6 sm:grid-cols-2 text-light text-center p-6 pt-24">
      {shows.map((show) => (
        <div className="flex flex-col p-2" key={show.id}>
          <div className="tooltip">
            <h2 className="truncate text-sm pb-1">
              {show.title.length > 20 ? `${show.title.substring(0, 20)}...` : show.title}
            </h2>
            {show.title.length > 20 && <div className="tooltiptext">{show.title}</div>}
          </div>
          <p className="text-sm pb-1">Rating: {show.vote_average}</p>
          <img
            className="w-full h-full object-cover shadow-2xl shadow-obsidian"
            src={
              show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : "/image.png"
            }
            alt={show.title}
          />
          <div className="flex justify-center">
            {addedMedia.shows[show.id] ? (
              <div className="px-2 py-1 rounded-button text-sm border-bordern lg:w-1/4 sm:w-1/2 mt-2 custom-button">
                <AddCircleIcon />
              </div>
            ) : (
              <button
                className="px-2 py-1 rounded-button text-sm border-bordern lg:w-1/4 sm:w-1/2 mt-2 custom-button"
                onClick={() => {
                  addMedia(show);
                  handleAddToList(show.id, "show");
                }}>
                <AddCircleOutlineIcon />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shows;
