"use client";

import { Movie, Show } from "../types/interfaces";

interface SavedUserMediaProps {
  savedMedia: (Movie | Show)[];
}

const SendUserMedia: React.FC<SavedUserMediaProps> = ({ savedMedia }) => {
  const makeApiCall = async () => {
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedMedia),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle the response if necessary
    } catch (error) {
      console.error("Failed to send user media:", error);
    }
  };

  return (
    <div>
      <button onClick={makeApiCall}>Send User Media</button>
    </div>
  );
};

export default SendUserMedia;
