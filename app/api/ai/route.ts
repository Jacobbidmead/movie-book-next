const { OpenAI } = require("openai");
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface MediaItem {
  title: string;
  // rating: string;
  // genre: string;
} // pages/api/recommendations.js

// app/api/recommendations.ts

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON body from the request
    const mediaList: MediaItem[] = body.mediaList; // Annotate mediaList with the type
    const mediaString = mediaList
      .map((media) => `Title: ${media.title}`)
      .join("; ");
    const prompt = `Based on these movies and TV shows: ${mediaString}, provide recommendations for similar movies and TV shows.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 200,
    });

    return NextResponse.json({
      recommendations: response.data.choices[0].text,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.error();
  }
}
