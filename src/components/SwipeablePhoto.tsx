"use client";

import { useState } from "react";

interface SwipeablePhotoProps {
  photo: {
    url: string;
    id: string;
  };
  onLike: () => void;
  onDislike: () => void;
}

export default function SwipeablePhoto({
  photo,
  onLike,
  onDislike,
}: SwipeablePhotoProps) {
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleLike = () => {
    setSwipeDirection("right");
    setTimeout(() => {
      onLike();
      setSwipeDirection(null);
    }, 300);
  };

  const handleDislike = () => {
    setSwipeDirection("left");
    setTimeout(() => {
      onDislike();
      setSwipeDirection(null);
    }, 300);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div className="relative">
        <div
          className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
            swipeDirection === "right"
              ? "translate-x-full rotate-12 opacity-0"
              : swipeDirection === "left"
              ? "-translate-x-full -rotate-12 opacity-0"
              : "translate-x-0 rotate-0 opacity-100"
          } cursor-pointer hover:shadow-xl`}
          onClick={toggleFullscreen}
        >
          <img
            src={photo.url}
            alt="Photo"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 pointer-events-none">
            {swipeDirection === "right" && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold opacity-90 shadow-lg transform rotate-12">
                KEEP
              </div>
            )}
            {swipeDirection === "left" && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold opacity-90 shadow-lg transform -rotate-12">
                SKIP
              </div>
            )}
          </div>
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
            Click to enlarge
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-6">
          <button
            onClick={handleDislike}
            className="bg-white dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 p-4 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:scale-105 active:scale-95"
            aria-label="Dislike"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            onClick={handleLike}
            className="bg-white dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-500 p-4 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:scale-105 active:scale-95"
            aria-label="Like"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
        <div className="text-sm text-center mt-4 text-gray-500 dark:text-gray-400">
          Swipe right or press right arrow to keep, left to discard
        </div>
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fade-in p-4"
          onClick={toggleFullscreen}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
            onClick={toggleFullscreen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={photo.url}
            alt="Photo fullscreen view"
            className="max-h-screen max-w-full object-contain animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
