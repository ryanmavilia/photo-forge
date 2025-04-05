interface ImagePreviewProps {
  imageUrl: string | null;
}

export default function ImagePreview({ imageUrl }: ImagePreviewProps) {
  if (!imageUrl) return null;

  return (
    <div className="mb-6">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
