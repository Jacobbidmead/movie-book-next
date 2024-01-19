import OpenAI from "openai";

// Replace with your actual MediaItem structure
interface MediaItem {
  title: string;
  overview: string;
}

export default async function handler(req: Request) {
  if (req.method === "POST") {
    try {
      // Parse the request body and assume it's an array of MediaItem
      const mediaItems: MediaItem[] = await req.json();

      // Initialize OpenAI with the API key
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Create a prompt for the OpenAI API based on the media items
      const prompt = mediaItems
        .map((item) => `Title: ${item.title}\nOverview: ${item.overview}`)
        .join("\n\n");

      // Send the request to OpenAI's Completion endpoint
      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Based on this list of movies and shows, suggest similar media the user might like:\n\n${prompt}`,
        max_tokens: 150,
      });

      // Extract and send the recommendations in the response
      const recommendations = response.choices[0].text.trim().split("\n");
      return new Response(JSON.stringify({ recommendations }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      console.error("Error in ChatGPT API handler:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  } else {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
    });
  }
}
