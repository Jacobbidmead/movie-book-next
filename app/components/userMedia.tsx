"use client";
import { useState } from "react";
import { Movie, Show } from "../types/interfaces";
import SendUserMedia from "../atoms/sendUserMedia";

interface UserMediaProps {
  savedMedia: (Movie | Show)[];
  removeMedia: (mediaId: string) => void;
}

// displays users saved media

const UserMedia: React.FC<UserMediaProps> = ({ savedMedia, removeMedia }) => {
  const mediaArray = savedMedia as (Movie | Show)[];
  const [recommendations, setRecommendations] = useState<string[]>([]);

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
      {/* <div>
        <h2>Recommendations</h2>
        {recommendations.map((recommendation, index) => (
          <p key={index}>{recommendation}</p>
        ))}
        <button onClick={fetchRecommendations}>Get Recommendations</button>

      </div> */}
      <SendUserMedia savedMedia={savedMedia} />
    </>
  );
};

export default UserMedia;
