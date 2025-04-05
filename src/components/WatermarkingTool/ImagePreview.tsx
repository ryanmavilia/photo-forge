"use client";

interface ImagePreviewProps {
  imageUrl: string | null;
}

export default function ImagePreview({ imageUrl }: ImagePreviewProps) {
  if (!imageUrl) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center">
        <p className="text-gray-400 text-sm">No image selected</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded shadow-sm">
      <img
        src={imageUrl}
        alt="Preview"
        className="w-full h-auto object-contain"
      />
    </div>
  );
}
