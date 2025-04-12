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

interface MetadataViewerProps {
  metadata: Metadata | null;
}

export default function MetadataViewer({ metadata }: MetadataViewerProps) {
  if (!metadata) {
    return (
      <div className="text-gray-500 dark:text-gray-400">
        No metadata available for this photo.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {metadata.exif && (
        <div>
          <h3 className="font-semibold mb-2">EXIF Data</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {metadata.exif.camera && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Camera:
                </span>
                <span className="ml-2">{metadata.exif.camera}</span>
              </div>
            )}
            {metadata.exif.lens && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Lens:</span>
                <span className="ml-2">{metadata.exif.lens}</span>
              </div>
            )}
            {metadata.exif.exposure && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Exposure:
                </span>
                <span className="ml-2">{metadata.exif.exposure}</span>
              </div>
            )}
            {metadata.exif.aperture && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Aperture:
                </span>
                <span className="ml-2">{metadata.exif.aperture}</span>
              </div>
            )}
            {metadata.exif.iso && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">ISO:</span>
                <span className="ml-2">{metadata.exif.iso}</span>
              </div>
            )}
            {metadata.exif.focalLength && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Focal Length:
                </span>
                <span className="ml-2">{metadata.exif.focalLength}</span>
              </div>
            )}
            {metadata.exif.dateTaken && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Date Taken:
                </span>
                <span className="ml-2">{metadata.exif.dateTaken}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {metadata.keywords && metadata.keywords.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {metadata.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {metadata.location && (
        <div>
          <h3 className="font-semibold mb-2">Location</h3>
          <div className="text-sm">
            {metadata.location.latitude && metadata.location.longitude && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Coordinates:
                </span>
                <span className="ml-2">
                  {metadata.location.latitude}, {metadata.location.longitude}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
