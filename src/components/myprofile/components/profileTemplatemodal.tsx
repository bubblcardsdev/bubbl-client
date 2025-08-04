"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

type Template = {
  label: string;
  value: string;
  image: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};
export default function ProfileTemplateModal({
  isOpen,
  onClose,
  templates,
  currentIndex,
  setCurrentIndex,
}: Props) {
  const nextSlide = () => {
    const next = (currentIndex + 1) % templates.length;
    setCurrentIndex(next);
  };
  const prevSlide = () => {
    const prev = (currentIndex - 1 + templates.length) % templates.length;
    setCurrentIndex(prev);
  };

  // Get 3 template indices based on currentIndex
  const getVisibleTemplates = () => {
    return [0, 1, 2].map((offset) => (currentIndex + offset) % templates.length);
  };
  const visibleIndices = getVisibleTemplates();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1f1f1f] text-white rounded-2xl max-w-3xl w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400"
        >
          <X size={24} />
        </button>
        {/* Header */}
        <h2 className="text-xl font-semibold mb-6">
          Profile templates ({templates.length})
        </h2>
        {/* Template Preview Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-[-32px] z-10 p-2 text-white hover:text-gray-300"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Template Cards */}
          <div className="flex gap-6">
            {visibleIndices.map((templateIndex) => {
              const template = templates[templateIndex];
              return (
                <div
                  key={template.value}
                  className={`rounded-xl bg-black w-[160px] h-[300px] overflow-hidden shadow-md border-2 ${
                    templateIndex === currentIndex
                      ? "border-white"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={template.image}
                    alt={template.label}
                    width={160}
                    height={300}
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-[-32px] z-10 p-2 text-white hover:text-gray-300"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Radio Selectors for Visible Templates */}
        <div className="flex justify-center mt-6 gap-[150px]">
          {visibleIndices.map((templateIndex) => {
            const template = templates[templateIndex];
            return (
              <label
                key={template.value}
                className="flex flex-col items-center text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name="template"
                  value={template.value}
                  checked={templateIndex === currentIndex}
                  onChange={() => setCurrentIndex(templateIndex)}
                  className="w-4 h-4 mb-1 accent-white"
                />
                <span
                  className={
                    templateIndex === currentIndex
                      ? "text-white"
                      : "text-gray-400"
                  }
                >
                  {template.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
