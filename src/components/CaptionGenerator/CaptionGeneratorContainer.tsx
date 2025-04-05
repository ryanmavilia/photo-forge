"use client";

import { useCaptionGenerator } from "@/hooks/useCaptionGenerator";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";
import HashtagSettings from "./HashtagSettings";
import GenerateButton from "./GenerateButton";
import CaptionResult from "./CaptionResult";
import TargetSelection from "./TargetSelection";

export default function CaptionGeneratorContainer() {
  const {
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
  } = useCaptionGenerator();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Caption Generator</h1>

      <TargetSelection
        selectedTarget={targetPlatform}
        onTargetChange={handleTargetChange}
      />

      <ImageUploader onFileChange={handleFileChange} />
      <ImagePreview imageUrl={imagePreview} />

      <HashtagSettings
        maxHashtags={maxHashtags}
        onMaxHashtagsChange={setMaxHashtags}
      />

      <GenerateButton
        onClick={generateCaption}
        disabled={!selectedFile}
        loading={loading}
      />

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>
      )}

      {caption && (
        <CaptionResult
          description={caption.description}
          hashtags={caption.hashtags}
        />
      )}
    </div>
  );
}
