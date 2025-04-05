"use client";

import { useCallback } from "react";

interface ImageUploaderProps {
  onFileChange: (file: File) => void;
}

export default function ImageUploader({ onFileChange }: ImageUploaderProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        onFileChange(file);
      }
    },
    [onFileChange]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        onFileChange(file);
      }
    },
    [onFileChange]
  );

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <p className="text-sm text-gray-600 mb-1">
            Drag and drop an image here, or click to select
          </p>
          <p className="text-xs text-gray-500">Supports: JPG, PNG, GIF</p>
        </div>
      </label>
    </div>
  );
}
