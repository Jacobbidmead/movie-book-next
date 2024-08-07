"use client";

// TODO: fetch movie posters from tmbd
// TODO: style spinner
// TODO: show recommendations in large pop up?
// TODO: add clear recommendations logic

import React, { useState } from "react";
import { Movie, Show } from "../types/interfaces";
import { CircularProgress } from "@mui/material";
import Button from "../components/Button";
// import UserRecs from "./UserRecs";

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
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setRecommendations(data);
    } catch (error) {
      setError("An error occurred while fetching recommendations.");
      setRecommendations({ recommendations: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex justify-center pb-12 mt-12 pt-24'>
        <Button
          onClick={handleGetRecommendations}
          className='p-3 border-border rounded-button text-xs text-light custom-button'>
          {loading ? <CircularProgress color='inherit' /> : <span>Get Recommendations</span>}
        </Button>
      </div>

      {error && <p>Error: {error}</p>}

      {/* <p>{recommendations}</p> */}
      <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-4 place-items-centertext-sm text-light w-4/5 '>
        {Array.isArray(recommendations.recommendations) &&
          recommendations.recommendations.map((recItem, index) => (
            <div
              className='flex mt-8 text-center text-light border-button rounded-card border-border'
              key={index}>
              <div>
                <h3 className='lg:text-4xl sm:text-lg p-3 border-b-card border-border'>
                  {recItem.title}
                </h3>
                <p className='lg:text-md sm:text-xs p-6'>{recItem.description}</p>
              </div>
              {/* <img src={recItem.poster_path} alt={recItem.title} /> */}
            </div>
          ))}
      </div>
    </>
  );
};

export default Recommendations;
