import { useState } from "react";
import { TargetPlatform } from "@/components/CaptionGenerator/TargetSelection";

export interface CaptionResult {
  description: string;
  hashtags: string[];
}

// Helper function to resize image using canvas
async function resizeImage(
  file: File,
  maxWidth: number = 768,
  maxHeight: number = 768
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create blob from canvas"));
          }
        },
        "image/jpeg",
        0.8
      );
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}

export function useCaptionGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<CaptionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [maxHashtags, setMaxHashtags] = useState(20);
  const [targetPlatform, setTargetPlatform] =
    useState<TargetPlatform>("instagram");

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setCaption(null);
    setError(null);
  };

  const handleTargetChange = (target: TargetPlatform) => {
    setTargetPlatform(target);

    // Set appropriate max hashtags for each platform
    switch (target) {
      case "instagram":
        setMaxHashtags(5);
        break;
      case "twitter":
        setMaxHashtags(2);
        break;
      case "linkedin":
        setMaxHashtags(5);
        break;
      case "facebook":
        setMaxHashtags(3);
        break;
      case "tiktok":
        setMaxHashtags(5);
        break;
      default:
        setMaxHashtags(5);
    }
  };

  const generateCaption = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      // Resize the image before sending
      const resizedImage = await resizeImage(selectedFile);

      const formData = new FormData();
      formData.append("image", resizedImage, "image.jpg");
      formData.append("maxHashtags", maxHashtags.toString());
      formData.append("targetPlatform", targetPlatform);

      const response = await fetch("/api/generate-caption", {
        method: "POST",
        body: formData,
      });

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log("Raw API response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse API response:", parseError);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate caption");
      }

      // Validate the response structure
      if (!data.description || !Array.isArray(data.hashtags)) {
        console.error("Invalid response structure:", data);
        throw new Error("Invalid response format from server");
      }

      setCaption(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to generate caption. Please try again.";
      setError(errorMessage);
      console.error("Caption generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedFile,
    imagePreview,
    caption,
    loading,
    error,
    maxHashtags,
    targetPlatform,
    handleFileChange,
    generateCaption,
    setMaxHashtags,
    handleTargetChange,
  };
}
