const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface mediaList {
  title: string;
  rating: string;
  genre: string;
}

async function getRecommendations(mediaList: mediaList[]) {
  try {
    // Convert the list of movies and TV shows into a formatted string
    const mediaString = mediaList
      .map(
        (media) =>
          `Title: ${media.title}, Genre: ${media.genre}, Rating: ${media.rating}`
      )
      .join("; ");

    // Prepare the prompt for OpenAI
    const prompt = `Based on these movies and TV shows: ${mediaString}, provide recommendations for similar movies and TV shows.`;

    // Make the API call
    const response = await openai.chat.completions.create({
      model: "text-davinci-003", // or another suitable model
      prompt: prompt,
      max_tokens: 200, // Adjust token limit as needed
    });

    // Extract and return the recommendations
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return "An error occurred while fetching recommendations.";
  }
}

// Example usage:
const mediaList = [
  { title: "Inception", genre: "Sci-Fi", rating: "8.8" },
  { title: "Breaking Bad", genre: "Crime Drama", rating: "9.5" },
];

getRecommendations(mediaList).then((recommendations) =>
  console.log(recommendations)
);
