import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";

// Initialize Replicate with the API token
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();  // Get the authenticated user
    const body = await req.json();  // Parse the request body
    const { prompt } = body;

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Ensure prompt is provided
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // Check the API usage limit
    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    // Log the inputs for debugging
    console.log('Prompt:', prompt);

    // Call Replicate API
    const response = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      {
        input: {
          prompt: prompt,
          top_k: 250,
          top_p: 0,
          duration: 8,
          temperature: 1,
          continuation: false,
          model_version: "stereo-large",
          output_format: "mp3",
          continuation_start: 0,
          multi_band_diffusion: false,
          normalization_strategy: "peak",
          classifier_free_guidance: 3
        }
      }
    );

    // Log the response from Replicate
    console.log("Replicate response:", response);

    // Increment API usage limit
    await incrementApiLimit();

    // Return the response from Replicate
    return NextResponse.json(response);
  } catch (error) {
    console.error('[MUSIC_ERROR]', error);

    // Additional error logging for debugging
    if (error instanceof Error) {
      console.error('Error details:', error.stack);
    }

    return new NextResponse("Internal Error", { status: 500 });
  }
}
