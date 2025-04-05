import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    // Verify API key exists
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Get the form data from the request
    const formData = await request.formData();
    const imageFile = formData.get("image") as File;
    const maxHashtags = parseInt(formData.get("maxHashtags") as string) || 20;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Convert the file to a base64 string
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");
    const mimeType = imageFile.type;

    if (!mimeType) {
      return NextResponse.json(
        { error: "Could not determine image type" },
        { status: 400 }
      );
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this image and provide a response in the following JSON format:
              {
                "description": "A short, concise description suitable for social media (max 80 characters)",
                "hashtags": ["tag1", "tag2", "..."] (provide exactly ${maxHashtags} relevant hashtags)
              }
              Important: Ensure the response is ONLY the JSON object, with no additional text or formatting.`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    // Extract the response text
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in response");
    }

    // Debug log
    console.log("Raw OpenAI response content:", content);

    try {
      // Parse the JSON response
      const result = JSON.parse(content);

      // Debug log
      console.log("Parsed result:", result);

      // Validate the response structure
      if (!result.description || !Array.isArray(result.hashtags)) {
        throw new Error("Invalid response format from API");
      }

      // Ensure we're sending a properly formatted JSON response
      return new NextResponse(JSON.stringify(result), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return new NextResponse(
        JSON.stringify({
          error: "Failed to parse AI response",
          rawResponse: content,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error generating caption:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to generate caption",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
