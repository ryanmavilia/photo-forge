interface CompletionStatusProps {
  selectedCount: number;
  targetCount: number;
  onReset: () => void;
  onContinueFiltering: () => void;
  hasEnoughPhotos: boolean;
}

export default function CompletionStatus({
  selectedCount,
  targetCount,
  onReset,
  onContinueFiltering,
  hasEnoughPhotos,
}: CompletionStatusProps) {
  return (
    <div className="w-full max-w-md">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Selection Complete!</h2>
        <p>
          You&apos;ve selected {selectedCount} photo
          {selectedCount !== 1 ? "s" : ""}.
        </p>
        {!hasEnoughPhotos && (
          <p className="text-red-500 mt-2">
            You need {targetCount - selectedCount} more photo
            {targetCount - selectedCount !== 1 ? "s" : ""} to reach your target.
          </p>
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={onReset}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Start Over
        </button>

        {selectedCount > 1 && (
          <button
            onClick={onContinueFiltering}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            Continue Filtering
          </button>
        )}

        {hasEnoughPhotos && (
          <>
            <a
              href="/caption-generator"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Generate Captions
            </a>
            <a
              href="/watermarking-tool"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Watermarks
            </a>
          </>
        )}
      </div>
    </div>
  );
}
