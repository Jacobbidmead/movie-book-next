// import OpenAI from "openai";
import { connectToDatabase } from "@/app/lib/dbConnect";
import { LoginRequestBody } from "@/app/types/interfaces";
import User from "@/app/models/User";

// Define the expected structure of the request body

export async function POST(
  { body }: { body: LoginRequestBody },
  res: Response
) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Destructure username and password from the request body
    const { username, password } = body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // For testing, we are not verifying the password
    // TODO: Implement password verification

    // Login successful
    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response("Internal server error", { status: 500 });
  }
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
