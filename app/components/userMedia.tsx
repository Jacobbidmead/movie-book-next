"use client";

import { Movie, Show } from "../types/interfaces";

interface UserMediaProps {
  savedMedia: Movie[] | Show[];
  removeMedia: (mediaId: string, mediaType: "movie" | "show") => void;
}

// displays users saved media

const UserMedia: React.FC<UserMediaProps> = ({ savedMedia, removeMedia }) => {
  const mediaArray = savedMedia as (Movie | Show)[];
  return (
    <>
      <div className="grid grid-cols-6">
        {/* render saved media */}
        {mediaArray.map((savedMedia) => (
          <div className="flex flex-col p-2" key={savedMedia.id}>
            <div className="tooltip">
              <h2 className="truncate">
                {savedMedia.type === "movie"
                  ? savedMedia.original_title?.length > 20
                    ? `${savedMedia.original_title.substring(0, 20)}...`
                    : savedMedia.original_title
                  : savedMedia.original_name?.length > 20
                  ? `${savedMedia.original_name.substring(0, 20)}...`
                  : savedMedia.original_name}
              </h2>
              {savedMedia.type === "movie"
                ? savedMedia.original_title?.length > 20 && (
                    <div className="tooltiptext">
                      {savedMedia.original_title}
                    </div>
                  )
                : savedMedia.original_name?.length > 20 && (
                    <div className="tooltiptext">
                      {savedMedia.original_name}
                    </div>
                  )}
            </div>
            <p>Rating: {savedMedia.vote_average}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${savedMedia.poster_path}`}
              alt={
                savedMedia.type === "movie"
                  ? savedMedia.original_title
                  : savedMedia.original_name
              }
            />
            <button
              onClick={() => {
                removeMedia(savedMedia.id, savedMedia.type);
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
