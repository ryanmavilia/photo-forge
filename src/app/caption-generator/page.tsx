"use client";

import { useState } from "react";

interface CaptionResult {
  description: string;
  hashtags: string[];
}

export default function CaptionGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<CaptionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [maxHashtags, setMaxHashtags] = useState(20);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
        setCaption(null);
        setError(null);
      }
    }
  };

  const generateCaption = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      // In a real app, you would upload the image to your backend
      // and call the OpenAI API to generate captions.
      // This is a mock implementation:

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock result
      setCaption({
        description:
          "A beautiful sunset over the mountains with vibrant orange and purple hues reflecting off the calm waters below.",
        hashtags: [
          "sunset",
          "mountainview",
          "naturephotography",
          "landscapephotography",
          "goldenhour",
          "skyscape",
          "reflection",
          "outdoorphotography",
          "travel",
          "naturelovers",
          "scenery",
          "peaceful",
          "explore",
          "wanderlust",
          "beautifulnature",
          "photooftheday",
          "eveningvibes",
          "tranquility",
          "earthfocus",
          "naturecapture",
        ].slice(0, maxHashtags),
      });
    } catch (err) {
      setError("Failed to generate caption. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMaxHashtagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxHashtags(parseInt(e.target.value) || 1);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Caption Generator</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Upload a photo:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {imagePreview && (
        <div className="mb-6">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Maximum number of hashtags:
        </label>
        <input
          type="number"
          min="1"
          max="30"
          value={maxHashtags}
          onChange={handleMaxHashtagsChange}
          className="w-full p-2 border rounded"
        />
        <p className="text-xs text-gray-500 mt-1">
          Instagram recommends using 3-5 hashtags for optimal engagement, with a
          maximum of 30.
        </p>
      </div>

      <button
        onClick={generateCaption}
        disabled={!selectedFile || loading}
        className={`w-full py-2 px-4 rounded font-medium ${
          !selectedFile || loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {loading ? "Generating..." : "Generate Caption"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>
      )}

      {caption && (
        <div className="mt-6 bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Generated Caption</h2>

          <div className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-sm text-gray-700 mb-1">
                Description
              </h3>
              <button
                onClick={() => copyToClipboard(caption.description)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Copy
              </button>
            </div>
            <p className="text-gray-800 p-3 bg-gray-50 rounded">
              {caption.description}
            </p>
          </div>

          <div>
            <div className="flex justify-between">
              <h3 className="font-medium text-sm text-gray-700 mb-1">
                Hashtags
              </h3>
              <button
                onClick={() =>
                  copyToClipboard(
                    caption.hashtags.map((tag) => `#${tag}`).join(" ")
                  )
                }
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Copy All
              </button>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="flex flex-wrap gap-2">
                {caption.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <button
              onClick={() =>
                copyToClipboard(
                  `${caption.description}\n\n${caption.hashtags
                    .map((tag) => `#${tag}`)
                    .join(" ")}`
                )
              }
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium"
            >
              Copy Complete Caption
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
