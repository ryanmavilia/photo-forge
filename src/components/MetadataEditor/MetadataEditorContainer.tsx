"use client";

import { useState } from "react";
import PhotoUploader from "../PhotoUploader";
import MetadataViewer from "./MetadataViewer";
import KeywordEditor from "./KeywordEditor";
import ExifEditor from "./ExifEditor";
import { PhotoItem } from "@/types";
import exifr from "exifr";

interface Metadata {
  exif?: {
    camera?: string;
    lens?: string;
    exposure?: string;
    aperture?: string;
    iso?: string;
    focalLength?: string;
    dateTaken?: string;
  };
  keywords?: string[];
  location?: {
    latitude?: number;
    longitude?: number;
  };
}

export default function MetadataEditorContainer() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const handlePhotoUploaded = async (photos: PhotoItem[]) => {
    if (photos.length > 0) {
      setSelectedPhoto(photos[0]);

      try {
        // Extract metadata using exifr
        const exifData = await exifr.parse(photos[0].url);

        // Format the extracted data into our Metadata interface
        const extractedMetadata: Metadata = {
          exif: {
            camera:
              exifData.Make && exifData.Model
                ? `${exifData.Make} ${exifData.Model}`
                : undefined,
            lens: exifData.LensModel,
            exposure: exifData.ExposureTime
              ? `1/${Math.round(1 / exifData.ExposureTime)}`
              : undefined,
            aperture: exifData.FNumber ? `f/${exifData.FNumber}` : undefined,
            iso: exifData.ISO?.toString(),
            focalLength: exifData.FocalLength
              ? `${exifData.FocalLength}mm`
              : undefined,
            dateTaken: exifData.DateTimeOriginal?.toISOString(),
          },
          keywords: [],
          location:
            exifData.GPSLatitude && exifData.GPSLongitude
              ? {
                  latitude: exifData.GPSLatitude,
                  longitude: exifData.GPSLongitude,
                }
              : undefined,
        };

        setMetadata(extractedMetadata);
      } catch (error) {
        console.error("Error extracting metadata:", error);
        // Set default metadata if extraction fails
        setMetadata({
          exif: {},
          keywords: [],
        });
      }
    }
  };

  const handleMetadataUpdate = (updatedMetadata: Metadata) => {
    setMetadata(updatedMetadata);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="card mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Metadata Editor</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          View and edit EXIF data, add keywords, and organize your photo
          library.
        </p>
      </div>

      {!selectedPhoto ? (
        <div className="animate-fade-in animate-slide-up">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Upload a Photo</h2>
            <PhotoUploader onPhotosUploaded={handlePhotoUploaded} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Photo Preview</h2>
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src={selectedPhoto.url}
                alt="Selected photo"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="btn btn-secondary w-full"
            >
              Select Different Photo
            </button>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Metadata</h2>
              <MetadataViewer metadata={metadata} />
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Keywords</h2>
              <KeywordEditor
                keywords={metadata?.keywords || []}
                onUpdate={(keywords) =>
                  handleMetadataUpdate({ ...metadata, keywords })
                }
              />
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">EXIF Data</h2>
              <ExifEditor
                exifData={metadata?.exif || {}}
                onUpdate={(exif) => handleMetadataUpdate({ ...metadata, exif })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
