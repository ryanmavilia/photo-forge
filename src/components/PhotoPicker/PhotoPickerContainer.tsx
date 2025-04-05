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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="card mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Photo Picker</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Select your best photos with our easy-to-use swiping interface.
        </p>
      </div>

      {photos.length === 0 ? (
        <div className="animate-fade-in animate-slide-up">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Get Started</h2>
            <PhotoUploader onPhotosUploaded={handlePhotosUploaded} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center animate-fade-in">
          <div className="w-full mb-6">
            <TargetCountInput
              targetCount={targetCount}
              onTargetChange={handleTargetChange}
            />
          </div>

          {!isComplete ? (
            <div className="w-full max-w-lg mx-auto">
              <div className="card p-6 mb-6">
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
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-700 dark:text-blue-300">
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tip: You can also use keyboard arrows (←/→) to navigate
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full animate-fade-in">
              <CompletionStatus
                selectedCount={selectedPhotos.length}
                targetCount={targetCount}
                onReset={resetSelection}
                onContinueFiltering={continueFiltering}
                hasEnoughPhotos={hasEnoughPhotos}
              />

              {selectedPhotos.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Your Selected Photos
                  </h2>
                  <SelectedPhotos photos={selectedPhotos} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
