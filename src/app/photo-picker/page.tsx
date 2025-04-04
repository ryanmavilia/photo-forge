"use client";

import { useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import PhotoUploader from "@/components/PhotoUploader";
import SwipeablePhoto from "@/components/SwipeablePhoto";
import SelectedPhotos from "@/components/SelectedPhotos";

interface PhotoItem {
  id: string;
  file: File;
  url: string;
}

export default function PhotoPicker() {
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
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const resetSelection = () => {
    setSelectedPhotos([]);
    setRejectedPhotos([]);
    setCurrentIndex(0);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetCount(parseInt(e.target.value) || 1);
  };

  const currentPhoto = photos[currentIndex];
  const isComplete = currentIndex >= photos.length;
  const hasEnoughPhotos = selectedPhotos.length >= targetCount;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Photo Picker</h1>

      {photos.length === 0 ? (
        <PhotoUploader onPhotosUploaded={handlePhotosUploaded} />
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-4 w-full max-w-md">
            <label className="block text-sm font-medium mb-1">
              Target number of photos:
            </label>
            <input
              type="number"
              min="1"
              value={targetCount}
              onChange={handleTargetChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {!isComplete ? (
            <div className="w-full max-w-md" {...swipeHandlers}>
              <p className="text-center mb-4">
                Photo {currentIndex + 1} of {photos.length}(
                {selectedPhotos.length} selected, {targetCount} target)
              </p>
              <SwipeablePhoto
                photo={currentPhoto}
                onLike={handleLike}
                onDislike={handleDislike}
              />
            </div>
          ) : (
            <div className="w-full max-w-md">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Selection Complete!
                </h2>
                <p>
                  You've selected {selectedPhotos.length} photo
                  {selectedPhotos.length !== 1 ? "s" : ""}.
                </p>
                {!hasEnoughPhotos && (
                  <p className="text-red-500 mt-2">
                    You need {targetCount - selectedPhotos.length} more photo
                    {targetCount - selectedPhotos.length !== 1 ? "s" : ""} to
                    reach your target.
                  </p>
                )}
              </div>

              {selectedPhotos.length > 0 && (
                <SelectedPhotos photos={selectedPhotos} />
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={resetSelection}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Start Over
                </button>

                {hasEnoughPhotos && (
                  <a
                    href="/caption-generator"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Generate Captions
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
