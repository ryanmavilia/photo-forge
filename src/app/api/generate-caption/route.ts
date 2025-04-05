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

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this image and provide:
              1. A short, concise description suitable for social media (max 80 characters)
              2. A list of ${maxHashtags} relevant hashtags for social media posting.
              Format your response as valid JSON with the following structure:
              {
                "description": "your description here",
                "hashtags": ["tag1", "tag2", ...]
              }
              Do not include the # symbol in the hashtags.`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${imageFile.type};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    // Extract the response text
    const content = response.choices[0].message.content || "";

    // Parse the JSON response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const jsonStr = jsonMatch[0];
      const result = JSON.parse(jsonStr);

      return NextResponse.json(result);
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return NextResponse.json(
        {
          error: "Failed to parse AI response",
          rawResponse: content,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating caption:", error);
    return NextResponse.json(
      { error: "Failed to generate caption" },
      { status: 500 }
    );
  }
}
