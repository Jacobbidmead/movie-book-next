"use client";

// TODO: fetch movie posters from tmbd
// TODO: add loading spinner for loading state
// TODO: show recommendations only and not saved media once get recommendation button is pushed

import React, { useState } from "react";
import { Movie, Show } from "../types/interfaces";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div>
      <button onClick={handleGetRecommendations} disabled={loading}>
        {loading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        ) : (
          "Get Recommendations"
        )}
      </button>

      {error && <p>Error: {error}</p>}

      {/* <p>{recommendations}</p> */}
      <div className="grid grid-cols-3">
        {Array.isArray(recommendations.recommendations) &&
          recommendations.recommendations.map((recItem, index) => (
            <div className="flex flex-col p-2 text-center" key={index}>
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
