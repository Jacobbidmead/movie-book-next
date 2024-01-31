"use client";

// TODO: fetch movie posters from tmbd
// TODO: style spinner
// TODO: show recommendations in large pop up?
// TODO: add clear recommendations logic

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
    <>
      <div className="flex justify-center pb-12 mt-12">
        <button onClick={handleGetRecommendations} disabled={loading}>
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <span className="p-3 border-border border-button rounded-button text-xs text-light hover:bg-darkline bg-dark">
              Get Recommendations
            </span>
          )}
        </button>
      </div>

      {error && <p>Error: {error}</p>}

      {/* <p>{recommendations}</p> */}
      <div className="grid grid-cols-3 gap-4 place-items-centertext-sm text-light w-4/5 ">
        {Array.isArray(recommendations.recommendations) &&
          recommendations.recommendations.map((recItem, index) => (
            <div
              className="flex mt-8 text-center text-light border-button rounded-card border-border"
              key={index}
            >
              <div>
                <h3 className="text-4xl p-3 border-b-card border-border">
                  {recItem.title}
                </h3>
                <p className="text-md p-6">{recItem.description}</p>
              </div>
              {/* <img src={recItem.poster_path} alt={recItem.title} /> */}
            </div>
          ))}
      </div>
    </>
  );
};

export default Recommendations;
