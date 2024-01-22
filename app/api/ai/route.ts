const { OpenAI } = require("openai");
import { NextRequest, NextResponse } from "next/server";
import { Movie, Show } from "@/app/types/interfaces";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type MediaItem = Movie | Show;

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
    const mediaString = mediaArray
      .map((media) => media.title)
      .join(", ")
      .replace(/^"|"$/g, "");
    const prompt = `Based on these movies and TV shows: ${mediaString}, provide recommendations for similar movies and TV shows.`;

    const openAIResponse = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 200,
    });

    // Check if the response structure is as expected
    // if (
    //   !openAIResponse ||
    //   !openAIResponse.data ||
    //   !openAIResponse.data.choices
    // ) {
    //   throw new Error("Invalid response structure from OpenAI API");
    // }
    console.log(openAIResponse);
    if (openAIResponse && openAIResponse.choices && openAIResponse.choices.length > 0) {
      const recommendations = openAIResponse.choices[0].message.content; // Accessing the message content
      return NextResponse.json({
        recommendations: recommendations,
      });
    } else {
      throw new Error("Invalid response structure from OpenAI API");
    }

    // Return a more informative error response
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
