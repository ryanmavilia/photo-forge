interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export default function GenerateButton({
  onClick,
  disabled,
  loading,
}: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-2 px-4 rounded font-medium ${
        disabled || loading
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {loading ? "Generating..." : "Generate Caption"}
    </button>
  );
}
