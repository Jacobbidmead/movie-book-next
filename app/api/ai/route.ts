const { OpenAI } = require("openai");

export async function POST(req: Request) {
  console.log("end point works");
  // const completion = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: "what is 2 + 2",
  // });

  // console.log(completion.data.choices[0].text);
  // return new Response("OK");
}
