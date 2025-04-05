"use client";

import { usePhotoPicker } from "@/hooks/usePhotoPicker";
import PhotoUploader from "../PhotoUploader";
import SelectedPhotos from "../SelectedPhotos";
import TargetCountInput from "./TargetCountInput";
import PhotoSwipe from "./PhotoSwipe";
import CompletionStatus from "./CompletionStatus";

export default function PhotoPickerContainer() {
  const {
    photos,
    currentIndex,
    selectedPhotos,
    targetCount,
    currentPhoto,
    isComplete,
    hasEnoughPhotos,
    handlePhotosUploaded,
    handleLike,
    handleDislike,
    swipeHandlers,
    resetSelection,
    continueFiltering,
    handleTargetChange,
  } = usePhotoPicker();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Photo Picker</h1>

      {photos.length === 0 ? (
        <PhotoUploader onPhotosUploaded={handlePhotosUploaded} />
      ) : (
        <div className="flex flex-col items-center">
          <TargetCountInput
            targetCount={targetCount}
            onTargetChange={handleTargetChange}
          />

          {!isComplete ? (
            <PhotoSwipe
              currentPhoto={currentPhoto}
              currentIndex={currentIndex}
              totalPhotos={photos.length}
              selectedCount={selectedPhotos.length}
              targetCount={targetCount}
              swipeHandlers={swipeHandlers}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          ) : (
            <>
              <CompletionStatus
                selectedCount={selectedPhotos.length}
                targetCount={targetCount}
                onReset={resetSelection}
                onContinueFiltering={continueFiltering}
                hasEnoughPhotos={hasEnoughPhotos}
              />

              {selectedPhotos.length > 0 && (
                <SelectedPhotos photos={selectedPhotos} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
