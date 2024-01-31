"use client";

// TODO: fetch movie posters from tmbd
// TODO: add loading spinner for loading state
// TODO: show recommendations only and not saved media once get recommendation button is pushed

import React, { useState } from "react";
import { Movie, Show } from "../types/interfaces";
import { CircularProgress } from "@mui/material";

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
      setError("An error occurred while fetching recommendations.");
      setRecommendations({ recommendations: [] }); // Reset to initial empty state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" text-light">
      <button onClick={handleGetRecommendations} disabled={loading}>
        {loading ? (
          <CircularProgress />
        ) : (
          <span className="p-3 border-border border-button rounded-button text-xs text-light hover:bg-darkline bg-dark">
            Get Recommendations
          </span>
        )}
      </button>

      {error && <p>Error: {error}</p>}

      {/* <p>{recommendations}</p> */}
      <div className="grid grid-cols-3 text-sm text-light">
        {Array.isArray(recommendations.recommendations) &&
          recommendations.recommendations.map((recItem, index) => (
            <div
              className="flex flex-col p-2 text-center text-light"
              key={index}
            >
              <div>
                <h3>{recItem.title}</h3>
                <p>{recItem.description}</p>
              </div>
              {/* <img src={recItem.poster_path} alt={recItem.title} /> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recommendations;
