// import React, { useRef, useEffect } from "react";
// import { ChevronDown } from "lucide-react";
// import { LeadsArrowIcon, SearchIcon, FilterIcon, LeadsDownloadIcon } from "../../common/icons";
// interface LeadsTableHeaderProps {
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
//   tempStartDate: string;
//   tempEndDate: string;
//   tempDateFilter: string;
//   tempLeadTypeFilter: string;
//   tempSortOrder: string;
//   handleDateRangeChange: (type: "start" | "end", value: string) => void;
//   handleDateFilter: (filter: string) => void;
//   setTempLeadTypeFilter: (filter: string) => void;
//   setTempSortOrder: (order: string) => void;
//   resetFilters: () => void;
//   applyFilters: () => void;
//   // handleSort: (field: string) => void;
//   setIsDrawerOpen: (open: boolean) => void;
//   setCurrentAction: (action: string) => void;
//   onDownload?: () => void;
// }

// const LeadsTableHeader = ({
//   searchTerm,
//   setSearchTerm,
//   isOpen,
//   setIsOpen,
//   tempStartDate,
//   tempEndDate,
//   tempDateFilter,
//   tempLeadTypeFilter,
//   tempSortOrder,
//   handleDateRangeChange,
//   handleDateFilter,
//   setTempLeadTypeFilter,
//   setTempSortOrder,
//   resetFilters,
//   applyFilters,
//   // handleSort,
//   setIsDrawerOpen,
//   setCurrentAction,
//   onDownload,
// }: LeadsTableHeaderProps) => {
//   const filterRef = useRef<HTMLDivElement | null>(null);

//   // Handle click outside to close filter popup
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         filterRef.current &&
//         !filterRef.current.contains(event.target as Node)
//       ) {
//         setTimeout(() => {
//           setIsOpen(false);
//         }, 500);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <div className=" p-2 bg-[#3D3D3D] rounded-xl items-center justify-between mt-[10px] lg:flex md:flex sm:hidden xs:hidden ">
//       <div className="flex items-center  px-2 py-1.5 rounded-xl w-full max-w-[200px] border-2 border-[#393939] bg-[#232323]">
//         <SearchIcon className="text-gray-400 mr-2" color={"#2B2B2B"} />
//         <input
//           type="text"
//           placeholder="Search"
//           className="bg-transparent outline-none text-sm text-white placeholder-[#4F4F4F] w-full"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="flex items-center space-x-2 ml-4 gap-3">
//         <div className="relative">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-md bg-[#2B2B2B] text-white hover:bg-[#3a3a3a]"
//           >
//             <FilterIcon className="w-6 h-6" />
//           </button>
//           {isOpen && (
//             <div
//               ref={filterRef}
//               className=" overflow-hidden absolute w-[600px]  right-0 z-10 text-white rounded-xl  max-w-sm space-y-6 shadow-lg"
//             >
//               <div className="bg-[#1F1F1F] text-white rounded-xl p-6 w-full max-w-sm space-y-6 shadow-lg">
//                 <h2 className="text-lg font-semibold">Filter by:</h2>

//                 {/* Date Range */}
//                 <div className="space-y-3">
//                   <p className="text-sm text-gray-300">Date Range</p>
//                   <div className="flex items-center gap-4">
//                     <div className="relative w-full">
//                       <input
//                         type="date"
//                         value={tempStartDate}
//                         className="w-full bg-[#2A2A2A] text-sm px-4 py-2 rounded-md pr-10"
//                         onChange={(e) =>
//                           handleDateRangeChange("start", e.target.value)
//                         }
//                       />
//                     </div>
//                     <div className="relative w-full">
//                       <input
//                         type="date"
//                         value={tempEndDate}
//                         className="w-full bg-[#2A2A2A] text-sm px-4 py-2 rounded-md pr-10"
//                         onChange={(e) =>
//                           handleDateRangeChange("end", e.target.value)
//                         }
//                       />
//                     </div>
//                   </div>

//                   {/* Quick Date Buttons */}
//                   <div className="flex justify-between gap-3">
//                     {["Today", "This Week", "This Month"].map((label) => (
//                       <button
//                         key={label}
//                         onClick={() => handleDateFilter(label.toLowerCase())}
//                         className={`w-full bg-[#2A2A2A] text-sm py-2 rounded-md hover:bg-[#3A3A3A] ${tempDateFilter === label.toLowerCase()
//                             ? "bg-[#9747FF]"
//                             : ""
//                           }`}
//                       >
//                         {label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Lead Type Dropdown */}
//                 <div className="space-y-2">
//                   <label className="text-sm text-gray-300">Lead Type</label>
//                   <div className="relative">
//                     <select
//                       className="w-full bg-[#2A2A2A] text-sm py-2 px-4 rounded-md appearance-none pr-10"
//                       value={tempLeadTypeFilter}
//                       onChange={(e) => setTempLeadTypeFilter(e.target.value)}
//                     >
//                       <option>Lead Capture Form</option>
//                       <option>Referral</option>
//                       <option>Manual</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
//                 {/* Buttons */}
//                 <div className="flex justify-between items-center pt-2">
//                   <button
//                     className="text-sm text-[#9E7FFF] hover:underline"
//                     onClick={resetFilters}
//                   >
//                     Reset All
//                   </button>
//                   <button
//                     className="bg-[#9E7FFF] text-sm font-semibold px-4 py-2 rounded-md"
//                     onClick={applyFilters}
//                   >
//                     Apply Filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* <div className="p-2 rounded-md bg-[#2B2B2B] text-white hover:bg-[#3a3a3a] flex">
//           <span role="button" onClick={() => handleSort("name")}>
//             <LeadsArrowIcon />
//           </span>
//         </div> */}
//         <div className="p-2 rounded-md bg-[#2B2B2B] text-white hover:bg-[#3a3a3a] flex">
//           <span role="button" onClick={onDownload}>
//             <LeadsDownloadIcon />
//           </span>
//         </div>
//         <button
//           onClick={() => {
//             setIsDrawerOpen(true);
//             setCurrentAction("save");
//           }}
//           className="px-3 py-1.5 rounded-md bg-[#4F4F4F] text-white text-sm hover:bg-[#505050]"
//         >
//           + Add lead
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LeadsTableHeader;
import React, { useRef, useEffect, useState } from "react";
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
  tempDateFilter,
  tempLeadTypeFilter,
  handleDateRangeChange,
  handleDateFilter,
  setTempLeadTypeFilter,
  resetFilters,
  applyFilters,
  setIsDrawerOpen,
  setCurrentAction,
  onDownload,
  onHide,




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

  const quickDateFilters = ["Today", "This Week", "This Month"];
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
