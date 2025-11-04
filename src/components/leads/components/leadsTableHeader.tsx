import React, { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  SearchIcon,
  FilterIcon,
  LeadsDownloadIcon,
} from "../../common/icons";
import Modal from "../../common/modal";

interface LeadsTableHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  tempStartDate: string;
  tempEndDate: string;
  tempDateFilter: string;
  tempLeadTypeFilter: string;
  handleDateRangeChange: (type: "start" | "end", value: string) => void;
  handleDateFilter: (filter: string) => void;
  setTempLeadTypeFilter: (filter: string) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  setIsDrawerOpen: (open: boolean) => void;
  setCurrentAction: (action: string) => void;
  onDownload?: () => void;
  onHide?: boolean;
  visible?: boolean
}

const LeadsTableHeader: React.FC<LeadsTableHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  isOpen,
  setIsOpen,
  tempStartDate,
  tempEndDate,
  tempLeadTypeFilter,
  handleDateRangeChange,
  setTempLeadTypeFilter,
  resetFilters,
  applyFilters,
  setIsDrawerOpen,
  setCurrentAction,
  onDownload,
}) => {
  const filterRef = useRef<HTMLDivElement | null>(null);

  // Close filter popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setTimeout(() => setIsOpen(false), 300);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  return (
    <div className="mt-[10px] flex items-center justify-between rounded-xl bg-[#3D3D3D] p-2 lg:flex md:flex sm:hidden xs:hidden">
      {/* Search */}
      <div className="flex w-full max-w-[200px] items-center rounded-xl border-2 border-[#393939] bg-[#232323] px-2 py-1.5">
        <SearchIcon className="mr-2 text-gray-400" color="#2B2B2B" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent text-sm text-white placeholder-[#4F4F4F] outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="ml-4 flex items-center gap-3">
        {/* Filter */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md bg-[#2B2B2B] p-2 text-white hover:bg-[#3a3a3a]"
          >
            <FilterIcon className="h-6 w-6" />
          </button>

          {isOpen && (
            <Modal
              visible={isOpen}
              onClose={() => setIsOpen(false)}
              title="Filter Leads"
              showHeader
              showFooter
              stickyHeader
              stickyFooter
              closeOnBackdrop={false}
              headerClassName="border-b-0"
              bodyClassName="pt-0 pb-6"
              className="lg:max-w-[600px] xl:max-w-[600px] px-3 py-2"
              footerContent={
                <div className="flex items-center justify-between w-full">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-[#9E7FFF] hover:underline"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={applyFilters}
                    className="rounded-md bg-[#9E7FFF] px-4 py-2 text-sm font-semibold"
                  >
                    Apply Filters
                  </button>
                </div>
              }
            >
              {/* Body */}
              <div className="w-full space-y-6 text-white">
                {/* Date Range */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-300">Date Range</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="date"
                      value={tempStartDate}
                      className="w-full rounded-md bg-[#2A2A2A] px-4 py-2 text-sm "
                      onChange={(e) => handleDateRangeChange("start", e.target.value)}
                      onFocus={(e) => e.target.showPicker?.()}
                    />
                    <input
                      type="date"
                      value={tempEndDate}
                      className="w-full rounded-md bg-[#2A2A2A] px-4 py-2 text-sm"
                      onChange={(e) => handleDateRangeChange("end", e.target.value)}
                      min={tempStartDate || undefined}
                      onFocus={(e) => e.target.showPicker?.()}
                    />
                  </div>

                  {/* Quick Filters */}
                  {/* <div className="flex gap-3">
                    {quickDateFilters.map((label: string) => {
                      const key = label.toLowerCase();
                      return (
                        <button
                          key={label}
                          onClick={() => handleDateFilter(key)}
                          className={`w-full rounded-md py-2 text-sm hover:bg-[#3A3A3A] ${tempDateFilter === key ? "bg-[#9747FF]" : "bg-[#2A2A2A]"
                            }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div> */}
                </div>

                {/* Lead Type */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Lead Type</label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none rounded-md bg-[#2A2A2A] px-4 py-2 text-sm pr-10"
                      value={tempLeadTypeFilter}
                      onChange={(e) => setTempLeadTypeFilter(e.target.value)}
                    >
                      <option>Lead Capture Form</option>
                      <option>Referral</option>
                      <option>Manual</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </Modal>
          )}

        </div>

        {/* Download */}
        <button
          onClick={onDownload}
          className="flex rounded-md bg-[#2B2B2B] p-2 text-white hover:bg-[#3a3a3a]"
        >
          <LeadsDownloadIcon />
        </button>

        {/* Add Lead */}
        <button
          onClick={() => {
            setIsDrawerOpen(true);
            setCurrentAction("save");
          }}
          className="rounded-md bg-[#4F4F4F] px-3 py-1.5 text-sm text-white hover:bg-[#505050]"
        >
          + Add lead
        </button>
      </div>
    </div>
  );
};

export default LeadsTableHeader;
