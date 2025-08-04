"use client";

import React from "react";
import Cropper, { Area } from "react-easy-crop"; // ✅ Removed CropShape

interface CropImageProps {
  croppingImage: string;
  crop: { x: number; y: number };
  zoom: number;
  setCrop: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  handleCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  handleCropAndUpload: () => void;
  aspect: number;
  cropShape?: "rect" | "round"; // ✅ Correctly typed manually
  handleClearImage: () => void;
}

const CropImage: React.FC<CropImageProps> = ({
  croppingImage,
  crop,
  zoom,
  setCrop,
  setZoom,
  handleCropComplete,
  handleCropAndUpload,
  aspect,
  cropShape = "rect",
  handleClearImage,
}) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative w-[400px] h-[450px] z-[60] flex flex-col items-center justify-center">
        <div className="relative w-full h-[350px] bg-gray-100 rounded">
          <Cropper
            image={croppingImage}
            crop={crop}
            zoom={zoom}
            cropShape={cropShape}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        <div className="flex justify-between gap-4 mt-4 w-[90%]">
          <button
            className="text-white bg-[#636363] px-4 py-2 rounded-md"
            onClick={handleClearImage}
          >
            Cancel
          </button>
          <button
            className="text-white bg-[#723EDE] px-4 py-2 rounded-md"
            onClick={handleCropAndUpload}
          >
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropImage;
