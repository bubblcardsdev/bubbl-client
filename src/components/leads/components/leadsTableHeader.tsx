import React from "react";
import { ChevronDown } from "lucide-react";
import { LeadsArrowIcon, SearchIcon, FilterIcon } from "../../common/icons";
interface Lead {
  id: number; 
  name: string;
  emailId: string;
  mobileNumber: string;
  where_you_met: string;
  location: string;
  company: string;
  updatedAt: string;
}
interface LeadsTableHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  tempStartDate: string;
  tempEndDate: string;
  tempDateFilter: string;
  tempLeadTypeFilter: string;
  tempSortOrder: string;
  handleDateRangeChange: (type: "start" | "end", value: string) => void;
  handleDateFilter: (filter: string) => void;
  setTempLeadTypeFilter: (value: string) => void;
  setTempSortOrder: (value: string) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  handleSort: (field: keyof Lead) => void;
  setIsDrawerOpen: (value: boolean) => void;
  setCurrentAction: (value: string) => void;
}

const LeadsTableHeader = ({
  searchTerm,
  setSearchTerm,
  isOpen,
  setIsOpen,
  tempStartDate,
  tempEndDate,
  tempDateFilter,
  tempLeadTypeFilter,
  tempSortOrder,
  handleDateRangeChange,
  handleDateFilter,
  setTempLeadTypeFilter,
  setTempSortOrder,
  resetFilters,
  applyFilters,
  handleSort,
  setIsDrawerOpen,
  setCurrentAction,
}: LeadsTableHeaderProps) => {
  return (
    <div className=" p-2 bg-[#3D3D3D] rounded-xl items-center justify-between mt-[10px] lg:flex md:flex sm:hidden xs:hidden ">
      <div className="flex items-center  px-2 py-1.5 rounded-xl w-full max-w-[200px] border-2 border-[#393939] bg-[#232323]">
        <SearchIcon className="text-gray-400 mr-2" color={"#2B2B2B"} />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-sm text-white placeholder-[#4F4F4F] w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2 ml-4 gap-3">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md bg-[#2B2B2B] text-white hover:bg-[#3a3a3a]"
          >
            <FilterIcon className="w-6 h-6" />
          </button>
          {isOpen && (
            <div className=" overflow-hidden absolute w-[600px]  right-0 z-10 text-white rounded-xl  max-w-sm space-y-6 shadow-lg">
              <div className="bg-[#1F1F1F] text-white rounded-xl p-6 w-full max-w-sm space-y-6 shadow-lg">
                <h2 className="text-lg font-semibold">Filter by:</h2>

                {/* Date Range */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-300">Date Range</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-full">
                      <input
                        type="date"
                        value={tempStartDate}
                        className="w-full bg-[#2A2A2A] text-sm px-4 py-2 rounded-md pr-10"
                        onChange={(e) =>
                          handleDateRangeChange("start", e.target.value)
                        }
                      />
                    </div>
                    <div className="relative w-full">
                      <input
                        type="date"
                        value={tempEndDate}
                        className="w-full bg-[#2A2A2A] text-sm px-4 py-2 rounded-md pr-10"
                        onChange={(e) =>
                          handleDateRangeChange("end", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Quick Date Buttons */}
                  <div className="flex justify-between gap-3">
                    {["Today", "This Week", "This Month"].map((label) => (
                      <button
                        key={label}
                        onClick={() => handleDateFilter(label.toLowerCase())}
                        className={`w-full bg-[#2A2A2A] text-sm py-2 rounded-md hover:bg-[#3A3A3A] ${
                          tempDateFilter === label.toLowerCase()
                            ? "bg-[#9747FF]"
                            : ""
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lead Type Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Lead Type</label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#2A2A2A] text-sm py-2 px-4 rounded-md appearance-none pr-10"
                      value={tempLeadTypeFilter}
                      onChange={(e) => setTempLeadTypeFilter(e.target.value)}
                    >
                      <option></option>
                      <option>Lead Capture Form</option>
                      <option>Referral</option>
                      <option>Manual</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Amount Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Amount</label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#2A2A2A] text-sm py-2 px-4 rounded-md appearance-none pr-10"
                      value={tempSortOrder}
                      onChange={(e) => setTempSortOrder(e.target.value)}
                    >
                      <option>Newest - oldest</option>
                      <option>Oldest - newest</option>
                      <option>High - low</option>
                      <option>Low - high</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    className="text-sm text-[#9E7FFF] hover:underline"
                    onClick={resetFilters}
                  >
                    Reset All
                  </button>
                  <button
                    className="bg-[#9E7FFF] text-sm font-semibold px-4 py-2 rounded-md"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-2 rounded-md bg-[#2B2B2B] text-white hover:bg-[#3a3a3a] flex">
          <span role="button" onClick={() => handleSort("name")}>
            <LeadsArrowIcon />
          </span>
        </div>
        <button
          onClick={() => {
            setIsDrawerOpen(true);
            setCurrentAction("save");
          }}
          className="px-3 py-1.5 rounded-md bg-[#4F4F4F] text-white text-sm hover:bg-[#505050]"
        >
          + Add lead
        </button>
      </div>
    </div>
  );
};

export default LeadsTableHeader;
