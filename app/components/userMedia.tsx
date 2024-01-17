"use client";
import { useEffect } from "react";
import { Movie, Show } from "../types/interfaces";

interface UserMediaProps {
  savedMedia: (Movie | Show)[];
  removeMedia: (mediaId: string, mediaType: "movie" | "show") => void;
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
        {mediaArray.map((savedMediaItem) => {
          console.log("Media Item:", savedMediaItem); // Log the media item
          const titleOrName =
            savedMediaItem.type === "movie"
              ? savedMediaItem.original_title
              : savedMediaItem.original_name;
          console.log("Title/Name:", titleOrName); // Log the title/name
          return (
            <div className="flex flex-col p-2" key={savedMediaItem.id}>
              <div className="tooltip">
                <h2 className="truncate">
                  Title:{" "}
                  {savedMediaItem.type === "movie"
                    ? savedMediaItem.original_title?.length > 20
                      ? `${savedMediaItem.original_title.substring(0, 20)}...`
                      : savedMediaItem.original_title
                    : savedMediaItem.original_name?.length > 20
                    ? `${savedMediaItem.original_name.substring(0, 20)}...`
                    : savedMediaItem.original_name}
                </h2>
                {savedMediaItem.type === "movie"
                  ? savedMediaItem.original_title?.length > 20 && (
                      <div className="tooltiptext">
                        {savedMediaItem.original_title}
                      </div>
                    )
                  : savedMediaItem.original_name?.length > 20 && (
                      <div className="tooltiptext">
                        {savedMediaItem.original_name}
                      </div>
                    )}
              </div>
              <p>Rating: {savedMediaItem.vote_average}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${savedMediaItem.poster_path}`}
                alt={
                  savedMediaItem.type === "movie"
                    ? savedMediaItem.original_title
                    : savedMediaItem.original_name
                }
              />
              <button
                onClick={() => {
                  removeMedia(savedMediaItem.id, savedMediaItem.type);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserMedia;
