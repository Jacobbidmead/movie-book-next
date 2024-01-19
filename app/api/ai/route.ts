import OpenAI from "openai";

interface MediaItem {
  title: string;
  overview: string;
}

export async function POST({ body }: { body: MediaItem[] }) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = body
      .map((item) => `Title: ${item.title}\nOverview: ${item.overview}`)
      .join("\n\n");

    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Based on this list of movies and shows, suggest similar media the user might like:\n\n${prompt}`,
      max_tokens: 150,
    });

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
}
