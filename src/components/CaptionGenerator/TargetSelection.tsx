export type TargetPlatform =
  | "instagram"
  | "twitter"
  | "linkedin"
  | "facebook"
  | "tiktok";

interface TargetSelectionProps {
  selectedTarget: TargetPlatform;
  onTargetChange: (target: TargetPlatform) => void;
}

export default function TargetSelection({
  selectedTarget,
  onTargetChange,
}: TargetSelectionProps) {
  const platforms: {
    id: TargetPlatform;
    name: string;
    hashtagRecommendation: string;
  }[] = [
    {
      id: "instagram",
      name: "Instagram",
      hashtagRecommendation: "3-5 hashtags",
    },
    { id: "twitter", name: "Twitter/X", hashtagRecommendation: "1-2 hashtags" },
    {
      id: "linkedin",
      name: "LinkedIn",
      hashtagRecommendation: "3-5 relevant hashtags",
    },
    { id: "facebook", name: "Facebook", hashtagRecommendation: "2-3 hashtags" },
    {
      id: "tiktok",
      name: "TikTok",
      hashtagRecommendation: "4-5 trending hashtags",
    },
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Select your target platform:
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onTargetChange(platform.id)}
            className={`p-3 rounded-lg border text-center transition-colors ${
              selectedTarget === platform.id
                ? "bg-blue-100 border-blue-500 text-blue-700"
                : "bg-white border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="font-medium">{platform.name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {platform.hashtagRecommendation}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
