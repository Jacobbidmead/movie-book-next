"use client";

import React from "react";
import { Movie, Show } from "../types/interfaces";
import Recommendations from "./recommendations";

interface UserMediaProps {
  savedMedia: (Movie | Show)[];
  removeMedia: (mediaId: string) => void;
}

const UserMedia: React.FC<UserMediaProps> = ({ savedMedia, removeMedia }) => {
  const mediaArray = savedMedia as (Movie | Show)[];

  return (
    <>
      {mediaArray.length > 0 ? (
        <div className="grid grid-cols-6 text-light">
          {mediaArray.map((savedMediaItem) => (
            <div className="flex flex-col p-2" key={savedMediaItem.id}>
              <div className="tooltip">
                <h2 className="truncate text-center pb-2">
                  {savedMediaItem.title.length > 20
                    ? `${savedMediaItem.title.substring(0, 20)}...`
                    : savedMediaItem.title}
                </h2>
                {savedMediaItem.title.length > 20 && (
                  <div className="tooltiptext">{savedMediaItem.title}</div>
                )}
              </div>
              <p className="text-center pb-2">
                Rating: {savedMediaItem.vote_average}
              </p>
              <img
                src={
                  savedMediaItem.poster_path
                    ? `https://image.tmdb.org/t/p/w500${savedMediaItem.poster_path}`
                    : "/image.png"
                }
                alt={savedMediaItem.title}
              />
              <button
                className="pt-2"
                onClick={() => {
                  removeMedia(savedMediaItem.id);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-light">Nothing saved yet</div>
      )}

      <Recommendations savedMedia={savedMedia} />
    </>
  );
};

export default UserMedia;
