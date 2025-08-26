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
  const [currentPage, setCurrentPage] = React.useState(0);
  const [templatesPerPage, setTemplatesPerPage] = React.useState(3);

  // Adjust templates per page based on screen size
  React.useEffect(() => {
    const updateTemplatesPerPage = () => {
      if (window.innerWidth < 640) {
        setTemplatesPerPage(1); // mobile
      } else if (window.innerWidth < 1024) {
        setTemplatesPerPage(2); // tablet
      } else {
        setTemplatesPerPage(3); // desktop
      }
    };
    updateTemplatesPerPage();
    window.addEventListener("resize", updateTemplatesPerPage);
    return () => window.removeEventListener("resize", updateTemplatesPerPage);
  }, []);

  const totalPages = Math.ceil(templates.length / templatesPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : 0));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getPaginatedTemplates = () => {
    const start = currentPage * templatesPerPage;
    const end = start + templatesPerPage;
    return templates.slice(start, end);
  };

  const visibleTemplates = getPaginatedTemplates();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1f1f1f] text-white rounded-2xl max-w-2xl w-full p-6 relative">
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

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrevPage}
            className="absolute left-0 z-10 p-2 text-white hover:text-gray-300"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Template Cards */}
          <div className="flex gap-6">
            {visibleTemplates.map((template) => {
              const index = templates.findIndex(
                (t) => t.value === template.value
              );
              const isSelected = index === currentIndex;

              return (
                <div
                  key={template.value}
                  className={`flex flex-col items-center  w-[160px]`}
                >
                  {/* Image */}
                  <div
                    className={`w-full h-[300px] overflow-hidden shadow-md rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-white bg-[#2a2a2a]"
                        : "border-[#333] bg-[#1a1a1a]"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <Image
                      src={template.image}
                      alt={template.label}
                      width={160}
                      height={300}
                      className="object-contain rounded-md"
                    />
                  </div>

                  {/* Label & Radio */}
                  <div className="py-3 flex flex-col items-center">
                    <input
                      type="radio"
                      name="template"
                      value={template.value}
                      checked={isSelected}
                      onChange={() => setCurrentIndex(index)}
                      className="w-4 h-4 mb-1 accent-white cursor-pointer"
                    />
                    <span
                      className={`text-sm ${
                        isSelected ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {template.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNextPage}
            className="absolute right-0 z-10 p-2 text-white hover:text-gray-300"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
