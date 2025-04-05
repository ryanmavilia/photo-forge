import { ChangeEvent } from "react";

interface HashtagSettingsProps {
  maxHashtags: number;
  onMaxHashtagsChange: (maxHashtags: number) => void;
}

export default function HashtagSettings({
  maxHashtags,
  onMaxHashtagsChange,
}: HashtagSettingsProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onMaxHashtagsChange(parseInt(e.target.value) || 1);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">
        Maximum number of hashtags:
      </label>
      <input
        type="number"
        min="1"
        max="30"
        value={maxHashtags}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <p className="text-xs text-gray-500 mt-1">
        Instagram recommends using 3-5 hashtags for optimal engagement, with a
        maximum of 30.
      </p>
    </div>
  );
}
