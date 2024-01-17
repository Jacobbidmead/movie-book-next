"use client";
import { useEffect } from "react";
import { Movie, Show } from "../types/interfaces";

interface UserMediaProps {
  savedMedia: (Movie | Show)[];
  removeMedia: (mediaId: string) => void;
}

// displays users saved media

const UserMedia: React.FC<UserMediaProps> = ({ savedMedia, removeMedia }) => {
  const mediaArray = savedMedia as (Movie | Show)[];

  useEffect(() => {
    console.log("media", savedMedia);
  }, [savedMedia]); // Run this effect when mediaArray changes

  return (
    <>
      <div className="grid grid-cols-6">
        {mediaArray.map((savedMediaItem) => (
          <div className="flex flex-col p-2" key={savedMediaItem.id}>
            <div className="tooltip">
              <h2 className="truncate">
                {savedMediaItem.title.length > 20
                  ? `${savedMediaItem.title.substring(0, 20)}...`
                  : savedMediaItem.title}
              </h2>
              {savedMediaItem.title.length > 20 && (
                <div className="tooltiptext">{savedMediaItem.title}</div>
              )}
            </div>
            <p>Rating: {savedMediaItem.vote_average}</p>
            <img
              src={
                savedMediaItem.poster_path
                  ? `https://image.tmdb.org/t/p/w500${savedMediaItem.poster_path}`
                  : "/image.png"
              }
              alt={savedMediaItem.title}
            />
            <button
              onClick={() => {
                removeMedia(savedMediaItem.id);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserMedia;
