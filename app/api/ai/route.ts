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
    
    Based on these factors, you will generate recommendations. Your response will be formatted in JSON, including the title of the recommended media, a description, and a link to the movie poster from TMDB (The Movie Database). Ensure your recommendations are diverse and cater to the nuances of the input received.
    
    Example output format:
    {
      "recommendations": [
        {
          "title": "Movie/Show Name",
          "description": "a description about the film/show",
          "poster_path": "TMDB Poster URL"
        },
        
      ]
    }

    Please provide at least 3 recommendations
    
    `;

    const openAIResponse = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    console.log(openAIResponse);

    if (
      openAIResponse &&
      openAIResponse.choices &&
      openAIResponse.choices.length > 0
    ) {
      const recommendations = openAIResponse.choices[0].message.content;
      return NextResponse.json({
        recommendations: recommendations,
      });
    } else {
      throw new Error("Invalid response structure from OpenAI API");
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
