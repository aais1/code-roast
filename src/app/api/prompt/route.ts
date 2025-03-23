import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const session = await auth();
  console.log(session);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { prompt } = await req.json();
  try {
    const client = new OpenAI();
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt,
        },
        {
          role: "system",
          content:
            "You are an AI assistant specifically designed to roast the given code. Your task is to identify mistakes, flaws, and areas where the code can be improved. Only accept valid code as input. If the user asks for code creation or requests help without providing actual code, tell them to provide proper code for roasting. Do not perform any actions outside of this. Focus on pointing out issues with the provided code such as logical mistakes, poor practices, bad styling, or anything that can be improved. You must not provide any other information such as explanations or additional guidance unless the user explicitly asks for it. Simply roast the code in a humorous and sarcastic manner, pointing out mistakes or things that could be done better, and nothing else. \n\nFormat the roast using HTML (don’t add anything else such as opening stuff or ```html or anything) for readability. Also, the response should be a maximum of 110-120 words. For each mistake, use a <p> tag for paragraphs. Use <strong> for emphasizing certain points or mistakes. For additional emphasis, use <i> for sarcasm or humorous remarks. Make sure the response is structured, clean, and easy to read, with proper HTML formatting. Ensure that the roast is clear, funny, and visually well-organized.",
        },
      ],
    });

    return NextResponse.json({
      response: completion.choices[0].message.content,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
