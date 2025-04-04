"use client";

interface Photo {
  id: string;
  url: string;
}

interface SelectedPhotosProps {
  photos: Photo[];
}

export default function SelectedPhotos({ photos }: SelectedPhotosProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Selected Photos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square bg-gray-100 rounded overflow-hidden"
          >
            <img
              src={photo.url}
              alt="Selected"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
