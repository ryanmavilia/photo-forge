import { useState } from "react";

interface KeywordEditorProps {
  keywords: string[];
  onUpdate: (keywords: string[]) => void;
}

export default function KeywordEditor({
  keywords,
  onUpdate,
}: KeywordEditorProps) {
  const [newKeyword, setNewKeyword] = useState("");

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      onUpdate([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    onUpdate(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a keyword"
          className="flex-1 input"
        />
        <button
          onClick={handleAddKeyword}
          className="btn btn-primary"
          disabled={!newKeyword.trim()}
        >
          Add
        </button>
      </div>

      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
            >
              <span>{keyword}</span>
              <button
                onClick={() => handleRemoveKeyword(keyword)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
