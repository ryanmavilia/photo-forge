import { ChangeEvent } from "react";

interface ImageUploaderProps {
  onFileChange: (file: File) => void;
}

export default function ImageUploader({ onFileChange }: ImageUploaderProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        onFileChange(file);
      }
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">Upload a photo:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
}
