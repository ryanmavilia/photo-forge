"use client";

import { useWatermarkingTool } from "@/hooks/useWatermarkingTool";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";
import WatermarkControls from "./WatermarkControls";
import WatermarkTextInput from "./WatermarkTextInput";
import DownloadButton from "./DownloadButton";

export default function WatermarkingToolContainer() {
  const {
    selectedFile,
    imagePreview,
    watermarkedImage,
    watermarkText,
    watermarkPosition,
    watermarkOpacity,
    watermarkSize,
    watermarkColor,
    isRepeating,
    rotationAngle,
    isProcessing,
    error,
    handleFileChange,
    handleTextChange,
    handlePositionChange,
    handleOpacityChange,
    handleSizeChange,
    handleColorChange,
    handleRepeatingChange,
    handleRotationChange,
    applyWatermark,
    downloadImage,
  } = useWatermarkingTool();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Watermarking Tool</h1>

      <ImageUploader onFileChange={handleFileChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Original Image</h2>
          <ImagePreview imageUrl={imagePreview} />
        </div>

        {watermarkedImage && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Watermarked Image</h2>
            <ImagePreview imageUrl={watermarkedImage} />
          </div>
        )}
      </div>

      {selectedFile && (
        <>
          <WatermarkTextInput
            text={watermarkText}
            onTextChange={handleTextChange}
          />

          <WatermarkControls
            position={watermarkPosition}
            opacity={watermarkOpacity}
            size={watermarkSize}
            color={watermarkColor}
            isRepeating={isRepeating}
            rotationAngle={rotationAngle}
            onPositionChange={handlePositionChange}
            onOpacityChange={handleOpacityChange}
            onSizeChange={handleSizeChange}
            onColorChange={handleColorChange}
            onRepeatingChange={handleRepeatingChange}
            onRotationChange={handleRotationChange}
          />

          <div className="flex space-x-4 mt-6">
            <button
              onClick={applyWatermark}
              disabled={!selectedFile || !watermarkText || isProcessing}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <span className="inline-block mr-2">Processing...</span>
              ) : (
                "Apply Watermark"
              )}
            </button>

            {watermarkedImage && <DownloadButton onClick={downloadImage} />}
          </div>
        </>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>
      )}
    </div>
  );
}
