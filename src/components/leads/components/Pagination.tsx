import React from "react";
import { LeadsLeftIcon, FullArrowIcon } from "../../common/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center justify-center gap-3 w-32 py-2 rounded-md text-center ${
          currentPage === 1
            ? "bg-[#444] text-[#828282] cursor-not-allowed"
            : "bg-[#282828] text-white hover:bg-[#323232] transition-colors"
        }`}
      >
        <LeadsLeftIcon />
        Previous
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 rounded-md transition-colors ${
              page === currentPage
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white hover:bg-[#282828]"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-3 w-32 py-2 text-center justify-center rounded-md transition-colors ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100"
        }`}
      >
        Next
        <FullArrowIcon
          color={currentPage === totalPages ? "#999" : "#000"}
        />
      </button>
    </div>
  );
};

export default Pagination;
