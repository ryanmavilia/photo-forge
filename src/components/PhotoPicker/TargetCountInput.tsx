import { ChangeEvent } from "react";

interface TargetCountInputProps {
  targetCount: number;
  onTargetChange: (count: number) => void;
}

export default function TargetCountInput({
  targetCount,
  onTargetChange,
}: TargetCountInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onTargetChange(parseInt(e.target.value) || 1);
  };

  return (
    <div className="mb-4 w-full max-w-md">
      <label className="block text-sm font-medium mb-1">
        Target number of photos:
      </label>
      <input
        type="number"
        min="1"
        value={targetCount}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
