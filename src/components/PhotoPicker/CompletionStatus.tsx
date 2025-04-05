interface CompletionStatusProps {
  selectedCount: number;
  targetCount: number;
  hasEnoughPhotos: boolean;
  onReset: () => void;
  onContinueFiltering: () => void;
}

export default function CompletionStatus({
  selectedCount,
  targetCount,
  hasEnoughPhotos,
  onReset,
  onContinueFiltering,
}: CompletionStatusProps) {
  // Calculate percentage of target reached
  const percentComplete = Math.min(
    Math.round((selectedCount / targetCount) * 100),
    100
  );

  return (
    <div className="card w-full mb-8 animate-fade-in">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="8"
              className="dark:stroke-gray-800"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={hasEnoughPhotos ? "#10b981" : "#f97316"}
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * percentComplete) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{selectedCount}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              of {targetCount}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Selection Complete</h2>

        {hasEnoughPhotos ? (
          <div className="mb-6">
            <div className="inline-flex items-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full text-sm mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Target Reached
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md mx-auto">
              You&apos;ve successfully selected {selectedCount} photos! You can
              now proceed with these photos or continue refining your selection.
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <div className="inline-flex items-center text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full text-sm mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Target Not Reached
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              You&apos;ve selected {selectedCount} of {targetCount} target
              photos. You can still proceed with these or try selecting more
              photos.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onContinueFiltering}
            className="btn btn-primary px-6"
          >
            Continue Selecting
          </button>
          <button
            onClick={onReset}
            className="btn px-6 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-700"
          >
            Reset Selection
          </button>
        </div>
      </div>
    </div>
  );
}
