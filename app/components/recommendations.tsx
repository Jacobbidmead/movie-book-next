import React, { useState } from "react";
import { OpenAI } from "openai";

interface mediaList {
  title: string;
  // rating: string;
  // genre: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const RecommendationsComponent: React.FC = () => {
  const [mediaList, setMediaList] = useState<mediaList[]>([]);
  const [title, setTitle] = useState("");
  //   const [genre, setGenre] = useState("");
  //   const [rating, setRating] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMedia = () => {
    setMediaList([...mediaList, { title }]);
    setTitle("");
    // setGenre("");
    // setRating("");
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    const formattedMediaList = mediaList
      .map((media) => `Title: ${media.title}`)
      .join("; ");
    const prompt = `Based on these movies and TV shows: ${formattedMediaList}, provide recommendations for similar movies and TV shows.`;

    try {
      const response = await openai.chat.completions.create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 200,
      });

      setRecommendations(response.data.choices[0].text);
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
      {/* <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
      />
      <input
        type="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
      /> */}
      <button onClick={handleAddMedia}>Add to List</button>

      <h2>Media List</h2>
      <ul>
        {mediaList.map((media, index) => (
          <li key={index}>{`${media.title}`}</li>
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
