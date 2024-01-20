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
  let mediaArray;
  try {
    const savedMedia: MediaItem[] = await req.json();

    console.log("Received savedMedia:", savedMedia);

    if (Array.isArray(savedMedia)) {
      mediaArray = savedMedia;
    } else {
      mediaArray = [savedMedia]; // Make it an array with a single element
    }
    const mediaString = mediaArray.map((media) => media.title).join(", ");
    const prompt = `Based on these movies and TV shows: ${mediaString}, provide recommendations for similar movies and TV shows.`;

    const openAIResponse = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
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
