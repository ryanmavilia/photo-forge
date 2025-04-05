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
    error,
    handleFileChange,
    handleTextChange,
    handlePositionChange,
    handleOpacityChange,
    handleSizeChange,
    handleColorChange,
    handleRepeatingChange,
    handleRotationChange,
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
          <div className="mt-6">
            <label
              htmlFor="watermark-text"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Watermark Text
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                id="watermark-text"
                value={watermarkText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Enter your watermark text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {(watermarkText || watermarkedImage) && (
                <DownloadButton onClick={downloadImage} />
              )}
            </div>
          </div>

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
        </>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>
      )}
    </div>
  );
}
