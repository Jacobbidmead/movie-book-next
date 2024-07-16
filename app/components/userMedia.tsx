"use client";

import React from "react";
import { Movie, Show } from "../types/interfaces";
import { motion } from "framer-motion";

interface UserMediaProps {
  savedMedia: (Movie | Show)[];
  removeMedia: (mediaId: string) => void;
}

const UserMedia: React.FC<UserMediaProps> = ({ savedMedia, removeMedia }) => {
  const mediaArray = savedMedia as (Movie | Show)[];

  return (
    <>
      {mediaArray.length > 0 ? (
        <div className="grid lg:grid-cols-6 sm:grid-cols-2 text-light text-center p-6 pt-24 ">
          {mediaArray.map((savedMediaItem) => (
            <div className="flex flex-col p-2" key={savedMediaItem.id}>
              <div className="tooltip">
                <h2 className="truncate text-sm pb-1">
                  {savedMediaItem.title.length > 20
                    ? `${savedMediaItem.title.substring(0, 20)}...`
                    : savedMediaItem.title}
                </h2>
                {savedMediaItem.title.length > 20 && (
                  <div className="tooltiptext">{savedMediaItem.title}</div>
                )}
              </div>
              <p className="text-center text-sm pb-1">Rating: {savedMediaItem.vote_average}</p>
              <img
                className="w-full h-full object-cover shadow-2xl shadow-obsidian"
                src={
                  savedMediaItem.poster_path
                    ? `https://image.tmdb.org/t/p/w500${savedMediaItem.poster_path}`
                    : "/image.png"
                }
                alt={savedMediaItem.title}
              />

              <div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-2 py-1 rounded-button text-sm border-border border-button w-1/3 mt-2 custom-button"
                  onClick={() => {
                    removeMedia(savedMediaItem.id);
                  }}>
                  Remove
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-light pt-24">Nothing saved yet</div>
      )}
    </>
  );
};

export default UserMedia;
