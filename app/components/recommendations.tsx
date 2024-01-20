import React, { useState } from "react";
import { Movie, Show } from "../types/interfaces";

interface Media {
  title: string;
  // rating: string;
  // genre: string;
}

interface SavedUserMediaProps {
  savedMedia: (Movie | Show)[];
}

const Recommendations: React.FC<SavedUserMediaProps> = ({ savedMedia }) => {
  const [title, setTitle] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedMedia),
      });

      console.log("Status Code:", response.status);

      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        );
      }

      const data = await response.json();
      setRecommendations(data.recommendations); // Update the state with the recommendations
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations("An error occurred while fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGetRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      <h2>Recommendations</h2>
      <p>{recommendations}</p>
    </div>
  );
};

export default Recommendations;
