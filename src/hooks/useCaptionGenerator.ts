import { useState } from "react";
import { TargetPlatform } from "@/components/CaptionGenerator/TargetSelection";

export interface CaptionResult {
  description: string;
  hashtags: string[];
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
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("maxHashtags", maxHashtags.toString());
      formData.append("targetPlatform", targetPlatform);

      const response = await fetch("/api/generate-caption", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate caption");
      }

      const data = await response.json();
      setCaption(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate caption. Please try again."
      );
      console.error(err);
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
