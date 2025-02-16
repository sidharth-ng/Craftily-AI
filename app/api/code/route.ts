import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { ChatCompletionResponseMessage, Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const instructionMessage:ChatCompletionResponseMessage={
  role:"system",
  content:"you are a code generator. You must answer only in markdown code snippets.use code comments for explanation"

}


export async function POST(
    req: Request
  ) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { messages  } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
          }
      
          if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured.", { status: 500 });
          }
      
          if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
          }
          const freeTrial = await checkApiLimit();

          if (!freeTrial ) {
            return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
          }

          const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages:[instructionMessage,...messages]
          });
          await incrementApiLimit();

          return NextResponse.json(response.data.choices[0].message);




    }catch (error) {
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
  }