import React, { useState } from "react";

// Assuming you have a way to import or call the getRecommendations function from the backend
// import { getRecommendations } from 'path-to-your-backend-function';

interface Media {
  title: string;
  // rating: string;
  // genre: string;
}

const RecommendationsComponent: React.FC = () => {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [title, setTitle] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddMedia = () => {
    setMediaList([...mediaList, { title }]);
    setTitle("");
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mediaList),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations("An error occurred while fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Movie/TV Show</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <button onClick={handleAddMedia}>Add to List</button>

      <h2>Media List</h2>
      <ul>
        {mediaList.map((media, index) => (
          <li key={index}>{media.title}</li>
        ))}
      </ul>

      <button onClick={handleGetRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      <h2>Recommendations</h2>
      <p>{recommendations}</p>
    </div>
  );
};

export default RecommendationsComponent;
