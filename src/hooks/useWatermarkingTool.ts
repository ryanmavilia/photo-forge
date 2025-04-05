import { useState, useCallback, useEffect, useRef } from "react";

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export function useWatermarkingTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>("");
  const [watermarkPosition, setWatermarkPosition] =
    useState<WatermarkPosition>("bottom-right");
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.5);
  const [watermarkSize, setWatermarkSize] = useState<number>(72);
  const [watermarkColor, setWatermarkColor] = useState<string>("#ffffff");
  const [isRepeating, setIsRepeating] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(-10);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Add refs to track previous values
  const prevValues = useRef({
    watermarkText,
    watermarkPosition,
    watermarkOpacity,
    watermarkSize,
    watermarkColor,
    isRepeating,
    rotationAngle,
  });

  // Add debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Add state for immediate slider values
  const [immediateOpacity, setImmediateOpacity] = useState<number>(0.5);
  const [immediateSize, setImmediateSize] = useState<number>(72);
  const [immediateRotation, setImmediateRotation] = useState<number>(-10);
  const [immediateColor, setImmediateColor] = useState<string>("#ffffff");

  const handleFileChange = useCallback((file: File) => {
    setSelectedFile(file);
    setWatermarkedImage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleTextChange = useCallback((text: string) => {
    setWatermarkText(text);
  }, []);

  const handlePositionChange = useCallback((position: WatermarkPosition) => {
    setWatermarkPosition(position);
  }, []);

  const handleOpacityChange = useCallback((opacity: number) => {
    setImmediateOpacity(opacity);
    setWatermarkOpacity(opacity);
  }, []);

  const handleSizeChange = useCallback((size: number) => {
    setImmediateSize(size);
    setWatermarkSize(size);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setImmediateColor(color);
    setWatermarkColor(color);
  }, []);

  const handleRepeatingChange = useCallback((repeat: boolean) => {
    setIsRepeating(repeat);
  }, []);

  const handleRotationChange = useCallback((angle: number) => {
    setImmediateRotation(angle);
    setRotationAngle(angle);
  }, []);

  const applyWatermark = useCallback(async () => {
    if (!selectedFile || !watermarkText) {
      setError("Please select an image and enter watermark text");
      return;
    }

    // Check if any values have actually changed
    const currentValues = {
      watermarkText,
      watermarkPosition,
      watermarkOpacity,
      watermarkSize,
      watermarkColor,
      isRepeating,
      rotationAngle,
    };

    const hasChanged = Object.entries(currentValues).some(
      ([key, value]) =>
        prevValues.current[key as keyof typeof currentValues] !== value
    );

    if (!hasChanged) {
      return;
    }

    // Update previous values
    prevValues.current = currentValues;

    setIsProcessing(true);
    setError(null);

    try {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setError("Could not create canvas context");
          setIsProcessing(false);
          return;
        }

        // Calculate preview size while maintaining aspect ratio
        const maxPreviewSize = 1000; // Maximum dimension for preview
        let width = image.width;
        let height = image.height;

        if (width > height && width > maxPreviewSize) {
          height = (height * maxPreviewSize) / width;
          width = maxPreviewSize;
        } else if (height > maxPreviewSize) {
          width = (width * maxPreviewSize) / height;
          height = maxPreviewSize;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw the original image on the canvas
        ctx.drawImage(image, 0, 0, width, height);

        // Apply the watermark
        ctx.globalAlpha = watermarkOpacity;
        ctx.fillStyle = watermarkColor;
        ctx.font = `${watermarkSize}px Arial`;

        if (isRepeating) {
          // Calculate repeating pattern
          const textWidth = ctx.measureText(watermarkText).width;
          const padding = Math.max(watermarkSize, 40);
          const spacingX = textWidth + padding;
          const spacingY = watermarkSize * 1.5;

          // Create rotation for the repeating pattern
          ctx.save();

          // Convert degrees to radians for rotation
          const angleInRadians = (rotationAngle * Math.PI) / 180;
          ctx.rotate(angleInRadians);

          // Calculate diagonal offset based on rotation
          const diagonalOffset = Math.abs(
            Math.sin(angleInRadians) * canvas.height
          );

          // Fill the canvas with repeating text
          for (
            let y = -spacingY - diagonalOffset;
            y < canvas.height + spacingY * 2 + diagonalOffset;
            y += spacingY
          ) {
            for (
              let x = -spacingX - diagonalOffset;
              x < canvas.width + spacingX * 2 + diagonalOffset;
              x += spacingX
            ) {
              ctx.fillText(watermarkText, x, y);
            }
          }

          ctx.restore();
        } else {
          // Calculate position for single watermark
          const textWidth = ctx.measureText(watermarkText).width;
          const padding = 20;
          let x = 0;
          let y = 0;

          switch (watermarkPosition) {
            case "top-left":
              x = padding;
              y = watermarkSize + padding;
              break;
            case "top-center":
              x = (canvas.width - textWidth) / 2;
              y = watermarkSize + padding;
              break;
            case "top-right":
              x = canvas.width - textWidth - padding;
              y = watermarkSize + padding;
              break;
            case "center-left":
              x = padding;
              y = canvas.height / 2;
              break;
            case "center":
              x = (canvas.width - textWidth) / 2;
              y = canvas.height / 2;
              break;
            case "center-right":
              x = canvas.width - textWidth - padding;
              y = canvas.height / 2;
              break;
            case "bottom-left":
              x = padding;
              y = canvas.height - padding;
              break;
            case "bottom-center":
              x = (canvas.width - textWidth) / 2;
              y = canvas.height - padding;
              break;
            case "bottom-right":
              x = canvas.width - textWidth - padding;
              y = canvas.height - padding;
              break;
          }

          // Draw the watermark
          ctx.fillText(watermarkText, x, y);
        }

        // Convert canvas to data URL
        const watermarkedImageUrl = canvas.toDataURL("image/jpeg", 0.8); // Reduced quality for preview
        setWatermarkedImage(watermarkedImageUrl);
        setIsProcessing(false);
      };

      image.onerror = () => {
        setError("Failed to load image");
        setIsProcessing(false);
      };

      image.src = imagePreview as string;
    } catch (err) {
      setError("An error occurred while applying the watermark");
      setIsProcessing(false);
      console.error(err);
    }
  }, [
    selectedFile,
    watermarkText,
    watermarkPosition,
    watermarkOpacity,
    watermarkSize,
    watermarkColor,
    isRepeating,
    rotationAngle,
    imagePreview,
  ]);

  const downloadImage = useCallback(() => {
    if (!watermarkedImage) return;

    const link = document.createElement("a");
    link.href = watermarkedImage;
    link.download = `watermarked-${selectedFile?.name || "image.jpg"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [watermarkedImage, selectedFile]);

  // Update useEffect with debounce
  useEffect(() => {
    if (selectedFile && imagePreview) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        applyWatermark();
      }, 300); // 100ms debounce
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [
    selectedFile,
    imagePreview,
    watermarkText,
    watermarkPosition,
    watermarkOpacity,
    watermarkSize,
    watermarkColor,
    isRepeating,
    rotationAngle,
  ]);

  return {
    selectedFile,
    imagePreview,
    watermarkedImage,
    watermarkText,
    watermarkPosition,
    watermarkOpacity: immediateOpacity,
    watermarkSize: immediateSize,
    watermarkColor: immediateColor,
    isRepeating,
    rotationAngle: immediateRotation,
    isProcessing,
    error,
    handleFileChange,
    handleTextChange,
    handlePositionChange,
    handleOpacityChange,
    handleSizeChange,
    handleColorChange,
    handleRepeatingChange,
    handleRotationChange,
    downloadImage,
  };
}
