interface CaptionResultProps {
  description: string;
  hashtags: string[];
}

export default function CaptionResult({
  description,
  hashtags,
}: CaptionResultProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="mt-6 bg-white border rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold text-lg mb-2">Generated Caption</h2>

      <div className="mb-4">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm text-gray-700 mb-1">
            Description
          </h3>
          <button
            onClick={() => copyToClipboard(description)}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Copy
          </button>
        </div>
        <p className="text-gray-800 p-3 bg-gray-50 rounded">{description}</p>
      </div>

      <div>
        <div className="flex justify-between">
          <h3 className="font-medium text-sm text-gray-700 mb-1">Hashtags</h3>
          <button
            onClick={() =>
              copyToClipboard(hashtags.map((tag) => `#${tag}`).join(" "))
            }
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Copy All
          </button>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
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
              `${description}\n\n${hashtags.map((tag) => `#${tag}`).join(" ")}`
            )
          }
          className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium"
        >
          Copy Complete Caption
        </button>
      </div>
    </div>
  );
}
