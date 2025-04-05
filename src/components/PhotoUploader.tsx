"use client";

import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface PhotoItem {
  id: string;
  file: File;
  url: string;
}

interface PhotoUploaderProps {
  onPhotosUploaded: (photos: PhotoItem[]) => void;
}

export default function PhotoUploader({
  onPhotosUploaded,
}: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (files: FileList) => {
    if (files.length === 0) return;

    setIsProcessing(true);
    const photoArray: PhotoItem[] = [];
    const totalFiles = files.length;
    let processedFiles = 0;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        // Simulate processing time for larger files
        const delay = Math.min((file.size / 1000000) * 100, 300); // Max 300ms delay

        setTimeout(() => {
          photoArray.push({
            id: uuidv4(),
            file,
            url: URL.createObjectURL(file),
          });

          processedFiles++;
          setUploadProgress(Math.round((processedFiles / totalFiles) * 100));

          if (processedFiles === totalFiles) {
            setTimeout(() => {
              onPhotosUploaded(photoArray);
              setIsProcessing(false);
              setUploadProgress(0);
            }, 500); // Short delay to show 100% complete
          }
        }, delay);
      } else {
        processedFiles++;
      }
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 scale-102"
          : isProcessing
          ? "border-blue-300 bg-blue-50/50 dark:bg-blue-950/10"
          : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={isProcessing ? undefined : handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        accept="image/*"
        className="hidden"
        disabled={isProcessing}
      />

      {!isProcessing ? (
        <>
          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-500"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">
            {isDragging ? "Drop your photos here" : "Upload your photos"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Drag and drop your images here, or click to browse
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Supports: JPEG, PNG, GIF, WebP — Max size: 10MB per file
          </div>
        </>
      ) : (
        <div className="py-4">
          <div className="flex justify-center mb-4">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-3">Processing photos...</h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {uploadProgress}% complete
          </p>
        </div>
      )}
    </div>
  );
}
