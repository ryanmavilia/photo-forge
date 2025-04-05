import { SwipeableHandlers } from "react-swipeable";
import SwipeablePhoto from "../SwipeablePhoto";
import { PhotoItem } from "@/hooks/usePhotoPicker";

interface PhotoSwipeProps {
  currentPhoto: PhotoItem;
  currentIndex: number;
  totalPhotos: number;
  selectedCount: number;
  targetCount: number;
  swipeHandlers: SwipeableHandlers;
  onLike: () => void;
  onDislike: () => void;
}

export default function PhotoSwipe({
  currentPhoto,
  currentIndex,
  totalPhotos,
  selectedCount,
  targetCount,
  swipeHandlers,
  onLike,
  onDislike,
}: PhotoSwipeProps) {
  const progressPercentage = (currentIndex / totalPhotos) * 100;

  return (
    <div className="w-full" {...swipeHandlers}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">
          Photo {currentIndex + 1} of {totalPhotos}
        </div>
        <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {selectedCount} selected / {targetCount} target
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
        <div
          className="h-1.5 bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <SwipeablePhoto
        photo={currentPhoto}
        onLike={onLike}
        onDislike={onDislike}
      />

      <div className="flex items-center justify-center mt-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Swipe or use the buttons to select your photos</span>
        </div>
      </div>
    </div>
  );
}
