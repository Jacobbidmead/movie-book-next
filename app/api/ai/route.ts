const { OpenAI } = require("openai");
import { NextRequest, NextResponse } from "next/server";
import { Movie, Show } from "@/app/types/interfaces";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// You already have MediaItem type defined
type MediaItem = Movie | Show;

// app/api/recommendations.ts
export async function POST(req: NextRequest) {
  try {
    const savedMedia: MediaItem[] = await req.json(); // Ensure the type of savedMedia

    const mediaString = savedMedia
      .map((media) => media.title) // Type is already specified in MediaItem[]
      .join("; ");
    const prompt = `Based on these movies and TV shows: ${mediaString}, provide recommendations for similar movies and TV shows.`;

    const openAIResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 200,
    });

    // Check if the response structure is as expected
    if (
      !openAIResponse ||
      !openAIResponse.data ||
      !openAIResponse.data.choices
    ) {
      throw new Error("Invalid response structure from OpenAI API");
    }

    return NextResponse.json({
      recommendations: openAIResponse.data.choices[0].text,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);

    // Return a more informative error response
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
