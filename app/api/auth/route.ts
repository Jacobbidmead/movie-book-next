import { connectToDatabase } from "@/app/lib/dbConnect";
import { LoginRequestBody } from "@/app/types/interfaces";
import User from "@/app/models/User";

// TODO: fix the connection

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
