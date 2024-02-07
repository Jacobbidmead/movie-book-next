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
      mediaArray = [savedMedia];
    }

    const mediaString = mediaArray
      .map((media) => media.title)
      .join(", ")
      .replace(/^"|"$/g, "");

    const prompt = `
      You are a movie and TV show recommendation bot with an extensive knowledge of films and television series. Upon receiving a string in the format ${mediaString}, you will analyze and provide recommendations for movies and TV shows similar to those mentioned in the input. 

      When multiple movies or shows are provided, you will consider them collectively to make your recommendations. Your analysis will focus on:
      
      - The genre of the films/shows,
      - The main actors involved,
      - The release year,
      - The director(s),
      - The overall mood and tone of the films/shows.
      
      Based on these factors, you will generate recommendations. Your response will be formatted in JSON, including the title of the recommended media and a description. Ensure your recommendations are diverse and cater to the nuances of the input received.
      
      Example output format:
      
      {
        "recommendations": [
          {
            "title": "Movie/Show Name",
            "description": "a description about the film/show",
          },
          // Additional recommendations
        ]
      }

      Please provide at least 3 recommendations
    `;

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      stream: true,
    });

    let fullResponse = "";
    for await (const chunk of stream) {
      fullResponse += chunk.choices[0]?.delta?.content || "";
    }

    try {
      const recommendations = JSON.parse(fullResponse);
      return new NextResponse(JSON.stringify(recommendations), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return new NextResponse(
        JSON.stringify({ error: "Error parsing recommendations" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error in API function:", error);
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
