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
  return (
    <div className="w-full max-w-md" {...swipeHandlers}>
      <p className="text-center mb-4">
        Photo {currentIndex + 1} of {totalPhotos} ({selectedCount} selected,{" "}
        {targetCount} target)
      </p>
      <SwipeablePhoto
        photo={currentPhoto}
        onLike={onLike}
        onDislike={onDislike}
      />
    </div>
  );
}
