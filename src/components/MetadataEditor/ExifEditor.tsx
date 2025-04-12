interface ExifData {
  camera?: string;
  lens?: string;
  exposure?: string;
  aperture?: string;
  iso?: string;
  focalLength?: string;
  dateTaken?: string;
}

interface ExifEditorProps {
  exifData: ExifData;
  onUpdate: (exif: ExifData) => void;
}

export default function ExifEditor({ exifData, onUpdate }: ExifEditorProps) {
  const handleChange = (field: keyof ExifData, value: string) => {
    onUpdate({
      ...exifData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Camera
          </label>
          <input
            type="text"
            value={exifData.camera || ""}
            onChange={(e) => handleChange("camera", e.target.value)}
            className="input w-full"
            placeholder="e.g., Canon EOS R5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Lens
          </label>
          <input
            type="text"
            value={exifData.lens || ""}
            onChange={(e) => handleChange("lens", e.target.value)}
            className="input w-full"
            placeholder="e.g., RF 24-70mm f/2.8L"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Exposure
          </label>
          <input
            type="text"
            value={exifData.exposure || ""}
            onChange={(e) => handleChange("exposure", e.target.value)}
            className="input w-full"
            placeholder="e.g., 1/250"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Aperture
          </label>
          <input
            type="text"
            value={exifData.aperture || ""}
            onChange={(e) => handleChange("aperture", e.target.value)}
            className="input w-full"
            placeholder="e.g., f/2.8"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ISO
          </label>
          <input
            type="text"
            value={exifData.iso || ""}
            onChange={(e) => handleChange("iso", e.target.value)}
            className="input w-full"
            placeholder="e.g., 100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Focal Length
          </label>
          <input
            type="text"
            value={exifData.focalLength || ""}
            onChange={(e) => handleChange("focalLength", e.target.value)}
            className="input w-full"
            placeholder="e.g., 50mm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date Taken
          </label>
          <input
            type="datetime-local"
            value={exifData.dateTaken || ""}
            onChange={(e) => handleChange("dateTaken", e.target.value)}
            className="input w-full"
          />
        </div>
      </div>
    </div>
  );
}
