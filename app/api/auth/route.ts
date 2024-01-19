// import OpenAI from "openai";

// Test
export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  return new Response("OK");
}

// ChatGPT connection
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ApiResponse>
// ) {
//   if (req.method === "POST") {
//     try {
//       const mediaItems: MediaItem[] = req.body;

//       // Initialize OpenAI with the API key
//       const openai = new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY,
//       });

//       const prompt = mediaItems
//         .map(
//           (item) =>
//             `Title: ${item.title}\nOverview: ${
//               item.overview
//             }\nGenres: ${item.genre_ids.join(", ")}`
//         )
//         .join("\n\n");

//       // Send the request to OpenAI's Completion endpoint
//       const response = await openai.completions.create({
//         model: "text-davinci-003",
//         prompt: `This is a list of movies, tv shows or both. Based on this data, suggest similar media the user might like:\n\n${prompt}`,
//         max_tokens: 150,
//       });

//       const recommendations = response.choices[0].text.trim().split("\n");
//       res.status(200).json({ recommendations });
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
