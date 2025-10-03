"use client";
import React, { useState } from "react";
import { X, QrCode } from "lucide-react"; //  QR code + close icon
import QrCodeImage from "../../common/QrCode";

interface Props {
  color: string;
  deviceIdQR: string;
  qrBubbl: string;
  qrImageUrl: string;
}

const QrGenerator = (props: Props) => {
  // const { color,deviceIdQR, qrBubbl, qrImageUrl } = props;
  const { color, deviceIdQR } = props;


  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open popup */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 xs:p-2 sm:p-3 rounded-md flex-shrink-0"
        style={{ backgroundColor: color }}
      >
        <QrCode color={"#ffffff"} />
      </button>
      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black text-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between w-full border-b p-4">
              <h2 className="text-lg text-[#ab39d2] font-semibold">QR Code</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-700 w-fit h-fit"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center py-[40px]">
              <QrCodeImage qrImageUrl="" qrBubbl="" deviceIdQR={deviceIdQR} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QrGenerator;
