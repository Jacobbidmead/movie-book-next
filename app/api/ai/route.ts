// import { Movie, Show } from "@/app/types/interfaces";

// interface UserMediaProps {
//   savedMedia: (Movie | Show)[];
// }

// const getRecommendations = async (props: UserMediaProps) => {
//   // Extract titles from savedMedia
//   let titles = props.savedMedia.map((media) => `"${media.title}"`).join(", ");

//   // Formulate the query for OpenAI
//   const prompt = `I have enjoyed the following movies and TV shows: ${titles}. Can you recommend similar titles?`;

//   const systemMessage = {
//     role: "system",
//     content: prompt,
//   };

//   const conversation = [systemMessage];

//   // Send request to OpenAI
//   try {
//     const response = await makeRequest(conversation);
//     // Parse the response to extract recommendations
//     const recommendations = response.choices[0].text;
//     return recommendations;
//   } catch (error) {
//     console.error("Error in getting recommendations from OpenAI:", error);
//     return null;
//   }
// };

// export default getRecommendations;
