"use client";

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
  return (
    <div className="relative">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={photo.url}
          alt="Swipeable photo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center gap-8 mt-4">
        <button
          onClick={onDislike}
          className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full"
          aria-label="Dislike"
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
        <button
          onClick={onLike}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full"
          aria-label="Like"
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
      <div className="text-xs text-center mt-2 text-gray-500">
        Swipe right to keep, left to discard
      </div>
    </div>
  );
}
