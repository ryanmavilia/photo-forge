import { useState, useEffect } from "react";

interface TargetCountInputProps {
  targetCount: number;
  onTargetChange: (count: number) => void;
}

export default function TargetCountInput({
  targetCount,
  onTargetChange,
}: TargetCountInputProps) {
  const [inputValue, setInputValue] = useState(targetCount.toString());
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(targetCount.toString());
  }, [targetCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      onTargetChange(parsedValue);
    } else {
      setInputValue(targetCount.toString());
    }
  };

  const handleIncrement = () => {
    const newValue = targetCount + 1;
    onTargetChange(newValue);
  };

  const handleDecrement = () => {
    if (targetCount > 1) {
      const newValue = targetCount - 1;
      onTargetChange(newValue);
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">Select Your Target</h2>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            How many photos do you want to select?
          </p>
          <div
            className={`relative rounded-md shadow-sm ${
              isFocused ? "ring-2 ring-blue-500/20" : ""
            }`}
          >
            <div className="flex">
              <button
                type="button"
                className="relative inline-flex items-center rounded-l-md border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                onClick={handleDecrement}
              >
                <span className="sr-only">Decrease</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <input
                type="text"
                className="block w-full min-w-0 flex-1 rounded-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none dark:text-white"
                value={inputValue}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                aria-label="Target photo count"
              />
              <button
                type="button"
                className="relative inline-flex items-center rounded-r-md border border-l-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                onClick={handleIncrement}
              >
                <span className="sr-only">Increase</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-xs text-blue-700 dark:text-blue-300 max-w-xs">
          <p>
            <strong>Tip:</strong> Set your target number of photos to help focus
            your selection. You can always adjust this later.
          </p>
        </div>
      </div>
    </div>
  );
}
