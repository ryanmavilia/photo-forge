"use client";

interface WatermarkTextInputProps {
  text: string;
  onTextChange: (text: string) => void;
}

export default function WatermarkTextInput({
  text,
  onTextChange,
}: WatermarkTextInputProps) {
  return (
    <div>
      <label
        htmlFor="watermark-text"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Watermark Text
      </label>
      <input
        type="text"
        id="watermark-text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Enter your watermark text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
