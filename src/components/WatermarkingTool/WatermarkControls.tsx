"use client";

import { WatermarkPosition } from "@/hooks/useWatermarkingTool";

interface WatermarkControlsProps {
  position: WatermarkPosition;
  opacity: number;
  size: number;
  color: string;
  isRepeating: boolean;
  onPositionChange: (position: WatermarkPosition) => void;
  onOpacityChange: (opacity: number) => void;
  onSizeChange: (size: number) => void;
  onColorChange: (color: string) => void;
  onRepeatingChange: (isRepeating: boolean) => void;
}

export default function WatermarkControls({
  position,
  opacity,
  size,
  color,
  isRepeating,
  onPositionChange,
  onOpacityChange,
  onSizeChange,
  onColorChange,
  onRepeatingChange,
}: WatermarkControlsProps) {
  const positions: { value: WatermarkPosition; label: string }[] = [
    { value: "top-left", label: "Top Left" },
    { value: "top-center", label: "Top Center" },
    { value: "top-right", label: "Top Right" },
    { value: "center-left", label: "Center Left" },
    { value: "center", label: "Center" },
    { value: "center-right", label: "Center Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "bottom-center", label: "Bottom Center" },
    { value: "bottom-right", label: "Bottom Right" },
  ];

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Watermark Settings</h3>

      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isRepeating}
            onChange={(e) => onRepeatingChange(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">
            Repeating Pattern
          </span>
        </label>
        {isRepeating && (
          <p className="text-xs text-gray-500 mt-1 ml-7">
            Creates a diagonal pattern of watermarks across the entire image
          </p>
        )}
      </div>

      {!isRepeating && (
        <div className="mb-4">
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Position
          </label>
          <select
            id="position"
            value={position}
            onChange={(e) =>
              onPositionChange(e.target.value as WatermarkPosition)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {positions.map((pos) => (
              <option key={pos.value} value={pos.value}>
                {pos.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="opacity"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Opacity: {opacity.toFixed(1)}
        </label>
        <input
          type="range"
          id="opacity"
          min="0.1"
          max="1"
          step="0.1"
          value={opacity}
          onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Text Size: {size}px
        </label>
        <input
          type="range"
          id="size"
          min="12"
          max="1000"
          step="10"
          value={size}
          onChange={(e) => onSizeChange(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>12px</span>
          <span>500px</span>
          <span>1000px</span>
        </div>
      </div>

      <div>
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Text Color
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-10 h-10 p-1 border border-gray-300 rounded"
          />
          <span className="text-sm text-gray-500">{color}</span>
        </div>
      </div>
    </div>
  );
}
