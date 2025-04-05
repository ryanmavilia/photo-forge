import { useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";

export interface PhotoItem {
  id: string;
  file: File;
  url: string;
}

export function usePhotoPicker() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhotos, setSelectedPhotos] = useState<PhotoItem[]>([]);
  const [rejectedPhotos, setRejectedPhotos] = useState<PhotoItem[]>([]);
  const [targetCount, setTargetCount] = useState(1);

  const handlePhotosUploaded = (newPhotos: PhotoItem[]) => {
    setPhotos(newPhotos);
    setCurrentIndex(0);
    setSelectedPhotos([]);
    setRejectedPhotos([]);
  };

  const handleLike = useCallback(() => {
    if (currentIndex < photos.length) {
      setSelectedPhotos((prev) => [...prev, photos[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, photos]);

  const handleDislike = useCallback(() => {
    if (currentIndex < photos.length) {
      setRejectedPhotos((prev) => [...prev, photos[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, photos]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleDislike,
    onSwipedRight: handleLike,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const resetSelection = () => {
    setSelectedPhotos([]);
    setRejectedPhotos([]);
    setCurrentIndex(0);
  };

  const handleTargetChange = (value: number) => {
    setTargetCount(value || 1);
  };

  const currentPhoto = photos[currentIndex];
  const isComplete = currentIndex >= photos.length;
  const hasEnoughPhotos = selectedPhotos.length >= targetCount;

  return {
    photos,
    currentIndex,
    selectedPhotos,
    rejectedPhotos,
    targetCount,
    currentPhoto,
    isComplete,
    hasEnoughPhotos,
    handlePhotosUploaded,
    handleLike,
    handleDislike,
    swipeHandlers,
    resetSelection,
    handleTargetChange,
  };
}
