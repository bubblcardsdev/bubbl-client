// common/imageCrop.tsx or ./imageCrop.tsx
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../../lib/getCroppedImg"; // Your utility function
import Image from "next/image";

/**
 * ImageCrop component — clickable avatar thumbnail that lets the user pick and crop an image.
 *
 * Displays a circular thumbnail (using `currentImage` or a fallback) which opens a file picker when clicked.
 * When an image is selected it shows a 1:1 crop UI (react-easy-crop); after cropping it calls `onCropComplete`
 * with the provided `index` and the cropped image URL, then closes the cropper.
 *
 * @param onCropComplete - Callback invoked with (index, croppedUrl) when the user confirms a crop.
 * @param index - Numeric identifier passed back to `onCropComplete`; useful when multiple ImageCrop instances exist.
 * @param label - Accessible label / caption displayed above the thumbnail.
 * @param currentImage - URL of the current thumbnail image; falling back to "/logo.png" when falsy.
 * @returns A React element rendering the thumbnail, hidden file input and conditional cropping UI.
 */
export default function ImageCrop({
  onCropComplete,
  index,
  label,
  currentImage,
}: {
  onCropComplete: (index: number, croppedUrl: string) => void;
  index: number;
  label: string;
  currentImage: string;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropAreaComplete = useCallback((_: any, areaPixels: any) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCropImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const { url } = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(index, url);
    setImageSrc(null); // close cropper
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-sm mb-2 text-gray-300">{label}</label>
      <div
        onClick={() => document.getElementById(`file-input-${index}`)?.click()}
        className="relative w-[120px] h-[120px] rounded-full border overflow-hidden cursor-pointer"
      >
        <Image
          src={currentImage || "/logo.png"}
          alt={label}
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
      </div>
      <input
        id={`file-input-${index}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {imageSrc && (
        <div className="mt-4">
          <div className="relative w-[250px] h-[250px] bg-black">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropAreaComplete}
            />
          </div>
          <button
            className="mt-2 bg-purple-600 text-white px-3 py-1 rounded"
            onClick={handleCropImage}
          >
            Crop
          </button>
        </div>
      )}
    </div>
  );
}
