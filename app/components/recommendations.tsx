"use client";

import React, { useState } from "react";
import { Movie, Show } from "../types/interfaces";

interface Recommendation {
  title: string;
  description: string;
  poster_path: string;
}

interface RecommendationsState {
  recommendations: Recommendation[];
}

interface SavedUserMediaProps {
  savedMedia: (Movie | Show)[];
}

const Recommendations: React.FC<SavedUserMediaProps> = ({ savedMedia }) => {
  const [title, setTitle] = useState<string>("");
  const [recommendations, setRecommendations] = useState<RecommendationsState>({
    recommendations: [],
  });
  const [error, setError] = useState<string>("");

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
      console.log("Fetched data:", data);
      setRecommendations(data);
      console.log("Updated state:", recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("An error occurred while fetching recommendations.");
      setRecommendations({ recommendations: [] }); // Reset to initial empty state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGetRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {error && <p>Error: {error}</p>}

      {/* <p>{recommendations}</p> */}
      <div>
        {Array.isArray(recommendations.recommendations) &&
          recommendations.recommendations.map((recItem, index) => (
            <div key={index}>
              <h3>{recItem.title}</h3>
              <p>{recItem.description}</p>
              <img src={recItem.poster_path} alt={recItem.title} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recommendations;
