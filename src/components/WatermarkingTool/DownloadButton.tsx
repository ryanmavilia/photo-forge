"use client";

interface DownloadButtonProps {
  onClick: () => void;
}

export default function DownloadButton({ onClick }: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        ></path>
      </svg>
      Download Image
    </button>
  );
}
