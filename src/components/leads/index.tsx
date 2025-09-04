"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import Drawer from "../common/Drawer";
import {
  LeadsArrowIcon,
  SearchIcon,
  FilterIcon,
  LeadsTableMenuIcon,
  FullArrowIcon,
  LeadsLeftIcon,
  LeadsDeleteIcon,
  LeadsDownloadIcon,
} from "../common/icons";
import { CalendarDays, ChevronDown, CloudCog } from "lucide-react";
import useWindowSize from "@/src/hooks/useWindowSize";
import {
  GetAllLeadsData,
  CreateLeadApi,
  UpdateLead,
  DeleteLead,
} from "../../services/leadsApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//interface for Lead data
interface Lead {
  id: number; //  added id so we can track selections
  name: string;
  emailId: string;
  mobileNumber: string;
  where_you_met: string;
  location: string;
  company: string;
  updatedAt: string;
}

const INITIAL_LEAD_FORM_DATA: any = {
  name: "",
  emailId: "",
  mobileNumber: "",
  location: "",
  where_you_met: "",
  company: "",
};

//helper to parse date strings safely
const parseDate = (dateStr: string): number => {
  const map: { [key: string]: Date } = {
    "Just now": new Date(),
    "A minute ago": new Date(Date.now() - 60 * 1000),
    "1 hour ago": new Date(Date.now() - 60 * 60 * 1000),
    Yesterday: new Date(Date.now() - 24 * 60 * 60 * 1000),
  };
  if (map[dateStr]) return map[dateStr].getTime();
  const parsed: Date = new Date(dateStr);
  return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
};

//helper to format ISO date to DD-MM-YYYY
const formatDateToDDMMYYYY = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) {
      return isoDateString; // Return original if invalid
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  } catch (error) {
    return isoDateString; // Return original if error
  }
};

//sorting function
const sortData = (
  data: Lead[],
  field: keyof Lead,
  ascending: boolean
): Lead[] => {
  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    if (field === "updatedAt") {
      const aDate = parseDate(aValue as string);
      const bDate = parseDate(bValue as string);
      if (aDate < bDate) return ascending ? -1 : 1;
      if (aDate > bDate) return ascending ? 1 : -1;
      return 0;
    } else {
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      if (aStr < bStr) return ascending ? -1 : 1;
      if (aStr > bStr) return ascending ? 1 : -1;
      return 0;
    }
  });
};

const Leads = () => {
  const [selectedLeads, setSelectedLeads] = useState<Set<number>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenAction, setIsOpenAction] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<keyof Lead>("name");
  const [ascending, setAscending] = useState<boolean>(true);

  const [leadsData, setLeadsData] = useState<Lead[]>([]);
  const [sortedLeads, setSortedLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>(INITIAL_LEAD_FORM_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leadTypeFilter, setLeadTypeFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentAction, setCurrentAction] = useState("save");

  // Temporary filter states (not applied until Apply Filters is clicked)
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempDateFilter, setTempDateFilter] = useState("");
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");
  const [tempLeadTypeFilter, setTempLeadTypeFilter] = useState("");
  const [tempSortOrder, setTempSortOrder] = useState("newest");

  // Delete confirmation states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState<"single" | "bulk">("single");
  const [leadToDelete, setLeadToDelete] = useState<Lead | any | null>([]);

  // Get filtered leads based on all filter criteria (using applied filters, not temp ones)
  const getFilteredLeads = () => {
    let filtered = [...leadsData];

    // Search filter - search across all fields
    if (searchTerm.trim()) {
      filtered = filtered.filter((lead) =>
        [
          lead.name,
          lead.emailId,
          lead.mobileNumber,
          lead.location,
          lead.company,
          lead.where_you_met,
        ].some((field) =>
          field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Date range filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (dateFilter === "today") {
      filtered = filtered.filter((lead) => {
        const leadDate = new Date(lead.updatedAt);
        const leadDay = new Date(
          leadDate.getFullYear(),
          leadDate.getMonth(),
          leadDate.getDate()
        );
        return leadDay.getTime() === today.getTime();
      });
    } else if (dateFilter === "thisweek") {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((lead) => {
        const leadDate = new Date(lead.updatedAt);
        return leadDate >= weekAgo;
      });
    } else if (dateFilter === "thismonth") {
      const monthAgo = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );
      filtered = filtered.filter((lead) => {
        const leadDate = new Date(lead.updatedAt);
        return leadDate >= monthAgo;
      });
    } else if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter((lead) => {
        const leadDate = new Date(lead.updatedAt);
        return leadDate >= start && leadDate <= end;
      });
    }

    // Lead type filter
    if (leadTypeFilter) {
      filtered = filtered.filter(
        (lead) =>
          lead.where_you_met?.toLowerCase() === leadTypeFilter.toLowerCase()
      );
    }

    // Sort order
    filtered.sort((a, b) => {
      const aDate = new Date(a.updatedAt).getTime();
      const bDate = new Date(b.updatedAt).getTime();
      return sortOrder === "newest" ? bDate - aDate : aDate - bDate;
    });

    return filtered;
  };

  const filteredLeads = getFilteredLeads();

  // Reset filters
  const resetFilters = () => {
    // setTempSearchTerm("");
    setSearchTerm("");
    setTempDateFilter("");
    setTempStartDate("");
    setTempEndDate("");
    setTempLeadTypeFilter("");
    setTempSortOrder("newest");
  };

  // Apply filters (apply temp states to actual filter states)
  const applyFilters = () => {
    // setSearchTerm(tempSearchTerm);
    setDateFilter(tempDateFilter);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setLeadTypeFilter(tempLeadTypeFilter);
    setSortOrder(tempSortOrder);
    setIsOpen(false);
    setCurrentPage(1);
  };

  // Handle quick date filter selection (temp state)
  const handleDateFilter = (filter: string) => {
    setTempDateFilter(filter);
    setTempStartDate("");
    setTempEndDate("");
  };

  // Handle custom date range selection (unselect quick date filters)
  const handleDateRangeChange = (type: "start" | "end", value: string) => {
    if (type === "start") {
      setTempStartDate(value);
    } else {
      setTempEndDate(value);
    }
    // Clear quick date filter when custom date range is used
    if (value) {
      setTempDateFilter("");
    }
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter, startDate, endDate, leadTypeFilter, sortOrder]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await GetAllLeadsData();
      const leads = data?.getLeads || []; // adjust to your API shape
      setLeadsData(leads);
      setSortedLeads(sortData(leads, sortField, ascending));
    } catch (err: any) {
      setError("Failed to fetch leads");
      toast.error("Failed to fetch leads");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadDataSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentAction === "save") {
        const response: any = await CreateLeadApi(formData);
        if (response?.data?.success) {
          toast.success("Lead added successfully!");
          setIsDrawerOpen(false);
          setFormData(INITIAL_LEAD_FORM_DATA);
          fetchProfiles(); // refresh
        }
      } else if (currentAction === "update") {
        const response: any = await UpdateLead(formData); // pass id + payload
        console.log("qqq-0009", response);
        if (response?.success) {
          toast.success("Lead updated successfully!");
          setIsDrawerOpen(false);
          setFormData(INITIAL_LEAD_FORM_DATA);
          fetchProfiles(); // refresh
        }
      }
    } catch (error) {
      console.error("Error saving lead:", error);
      toast.error("Failed to save lead");
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const { width } = useWindowSize();

  const handleSort = (field: keyof Lead) => {
    const isAscending = field === sortField ? !ascending : true;
    setSortField(field);
    setAscending(isAscending);
    setSortedLeads(sortData(sortedLeads, field, isAscending));
  };

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const leadsPerPage = 8;
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const toggleCheckbox = (data: any, id: number | any, all: boolean) => {
    setSelectedLeads((prev: Set<number>) => {
      const updated = new Set(prev);

      if (all) {
        // Select or unselect all leads
        if (updated.size === filteredLeads?.length) {
          // already all selected → unselect all
          updated.clear();
          setLeadToDelete([]);
        } else {
          // select all
          filteredLeads?.forEach((lead: any) => updated.add(lead.id));
          setLeadToDelete(filteredLeads?.map((lead: any) => lead.id) || []);
        }
      } else {
        // Toggle single checkbox
        if (updated.has(id)) {
          updated.delete(id);
          setLeadToDelete((prev: number[]) =>
            prev.filter((leadId) => leadId !== id)
          );
        } else {
          updated.add(id);
          if (data) {
            setLeadToDelete((prev: number[]) =>
              prev.includes(data.id) ? prev : [...prev, data.id]
            );
          }
        }
      }

      return updated;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          setIsOpenAction(null);
        }, 300);
      }
    };
    if (isOpenAction !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenAction]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // multi delete
  const deleteMultipleLeads = async (ids: number[]) => {
    try {
      const promises = ids.map((id) => DeleteLead(id)); // fire all requests
      const results = await Promise.all(promises); // wait for all

      // check if all deletes were successful
      const allSuccess = results.every((res) => res?.success);

      if (allSuccess) {
        //remove deleted IDs from state
        setLeadToDelete((prev: any) =>
          prev.filter((id: any) => !ids.includes(id))
        );
        setSelectedLeads(new Set());

        // trigger your custom task (example: refresh leads list)
        await fetchProfiles(); // or any function you use to reload data

        //optional: show success toast
        toast.success("Selected leads deleted successfully!");
      } else {
        toast.error("Some leads could not be deleted.");
      }

      return results;
    } catch (error) {
      console.error("Error deleting multiple leads:", error);
      toast.error("Error deleting selected leads.");
      throw error;
    }
  };

  return (
    <div className="text-white">
      {/* <div className="bg-[#ccc] w-full"> */}
      <div className=" p-2 bg-[#2B2B2B] rounded-md items-center justify-between mt-[10px] lg:flex md:flex sm:hidden xs:hidden ">
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
      <div className="w-full max-w-full mx-auto mt-4 rounded overflow-hidden lg:block md:block sm:hidden xs:hidden">
        <table className="w-full text-sm text-left text-white table-fixed">
          <thead className="bg-[#1C1C1C] text-[#777777] text-[16px] border-b-2 border-[#494949]">
            <tr className="align-middle">
              <th className="p-3 w-[40px]">
                <input
                  type="checkbox"
                  className="accent-[#9747FF] appearance-none h-[16px] w-[17px] rounded-md border border-[#494949] bg-transparent checked:bg-[#D6D3FB] checked:border-none checked:text-black flex items-center  justify-center  checked:after:content-['✓'] checked:after:text-[12px] checked:after:font-bold checked:after:flex checked:after:justify-center checked:after:items-center"
                  onChange={() => toggleCheckbox(false, false, true)}
                />
              </th>
              <th className="p-3 w-[150px] text-[18px] truncate">Name</th>
              {/* <th className="p-3 w-[200px] text-[18px] truncate">Email</th> */}
              <th className="p-3 w-[200px] text-[18px] truncate">Mobile</th>
              <th className="p-3 w-[150px] text-[18px] truncate">Location</th>
              <th className="p-3 w-[150px] text-[18px] truncate">
                WhereYouMet
              </th>
              <th className="p-3 w-[150px] text-[18px] truncate">Company</th>
              <th className="p-3 w-[150px] text-[18px] truncate">Date</th>
              <th className="p-3 ">
                <div className="flex gap-3 items-center justify-center">
                  {leadToDelete?.length > 0 && (
                    <div
                      role="button"
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        setDeleteType("single");
                      }}
                    >
                      <LeadsDeleteIcon />
                    </div>
                  )}
                  <LeadsDownloadIcon />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#323232]">
            {paginatedLeads.map((lead: Lead, index: number) => {
              return (
                <tr
                  key={index}
                  className="group hover:bg-[#282828] transition-colors align-middle"
                >
                  <td className="p-3 w-[40px] align-middle">
                    <input
                      type="checkbox"
                      className={`accent-[#9747FF] appearance-none h-[16px] w-[17px] rounded-md border border-[#535353] bg-transparent checked:bg-[#D6D3FB] checked:border-none checked:text-black flex items-center justify-center checked:after:content-['✓'] checked:after:text-[12px] checked:after:font-bold checked:after:flex checked:after:justify-center checked:after:items-center ${
                        selectedLeads.has(index) || selectedLeads.has(lead?.id)
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      } transition-opacity duration-200`}
                      checked={
                        selectedLeads.has(index) || selectedLeads.has(lead?.id)
                      }
                      onChange={() => toggleCheckbox(lead, index, false)}
                    />
                  </td>
                  <td className="p-3 w-[200px] flex items-center gap-3 align-middle">
                    {/* <Image
                      src={lead?.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                      height={100}
                      width={100}
                    /> */}
                    {lead?.name}
                  </td>
                  {/* <td className="p-3 w-[160px] align-middle">
                    {lead?.emailId}
                  </td> */}
                  <td className="p-3 w-[180px] align-middle">
                    {lead?.mobileNumber}
                  </td>
                  <td className="p-3 w-[200px] align-middle">
                    {lead?.location}
                  </td>
                  <td className="p-3 w-[200px] align-middle">
                    {lead?.where_you_met}
                  </td>
                  <td className="p-3 w-[200px] align-middle">
                    {lead?.company}
                  </td>
                  <td className="p-3 w-[160px] align-middle">
                    <span className="flex gap-2">
                      {formatDateToDDMMYYYY(lead?.updatedAt)}
                    </span>
                  </td>
                  <td
                    className={`p-3 w-[80px] align-middle ${
                      selectedLeads.has(index) || isOpenAction === index + 1
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    } transition-opacity duration-200`}
                  >
                    <div
                      ref={popoverRef}
                      className="relative flex items-center justify-center"
                    >
                      <LeadsTableMenuIcon
                        className="cursor-pointer"
                        onClick={() =>
                          setIsOpenAction(
                            isOpenAction === index + 1 ? null : index + 1
                          )
                        }
                      />
                      {isOpenAction === index + 1 && (
                        <div className="min-w-20 rounded-md py-2 px-5 bg-black absolute top-4 z-10">
                          <p
                            role="button"
                            onClick={() => {
                              setIsDrawerOpen(true);
                              setFormData(lead);
                              setCurrentAction("update");
                            }}
                          >
                            Edit
                          </p>
                          <p
                            role="button"
                            onClick={() => {
                              setIsDrawerOpen(true);
                              setFormData(lead);
                              setCurrentAction("view");
                            }}
                          >
                            View
                          </p>
                          <p
                            role="button"
                            onClick={() => {
                              setShowDeleteConfirm(true);
                              setDeleteType("single");
                              setLeadToDelete((prev: any) => [
                                ...prev,
                                lead?.id,
                              ]);
                            }}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-between items-center  mt-6 text-sm text-gray-400">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center  justify-center gap-3 w-32 py-2 rounded-md text-center ${
              currentPage === 1
                ? "bg-[#444] text-gray-500 cursor-not-allowed"
                : "bg-[#282828] text-white"
            }`}
          >
            <LeadsLeftIcon />
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  page === currentPage
                    ? "bg-white text-black"
                    : "hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`flex items-center gap-3 w-32 py-2 text-center justify-center rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-black"
            }`}
          >
            Next
            <FullArrowIcon
              color={currentPage === totalPages ? "#999" : "#000"}
            />
          </button>
        </div>
      </div>
      {/* </div> */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        // title="Edit  Profile"
        // title="view profile"
        className="lg:w-96 md:w-96 sm:w-full xs:w-full"
        // width={width && width <= 576 ? "100%" : "550px"}
      >
        <div className=" ">
          {/* <div className=" h-[180px] w-full flex justify-center items-center px-4  flex-col  mt-10">
            <Image
              src="/IconSet.png"
              alt=""
              width={500}
              height={500}
              className="w-[200px] h-[200px] rounded-full object-contain mb-4"
            />
            <p className="text-[30px] mb-0">Jordan Miller</p>
            <p className="">Bubbl cards</p>
          </div> */}
          <form className="w-full ">
            <p className="text-3xl px-5">Leads Form</p>
            <div className="flex flex-col mt-[40px] text-sm px-5  text-[12px] gap-6">
              <label className="text-[#828282]">Name</label>
              <input
                name="name"
                value={formData.name}
                readOnly={currentAction === "view"}
                onChange={handleChange}
                className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Email</label>
              <input
                name="emailId"
                value={formData.emailId}
                readOnly={currentAction === "view"}
                onChange={handleChange}
                className="bg-[#262626] text-white p-[10px]  rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Phone Number</label>
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                readOnly={currentAction === "view"}
                onChange={handleChange}
                className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Location</label>
              <input
                name="location"
                readOnly={currentAction === "view"}
                value={formData.location}
                onChange={handleChange}
                className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Where you met</label>
              <input
                name="where_you_met"
                readOnly={currentAction === "view"}
                value={formData.where_you_met}
                onChange={handleChange}
                className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">company</label>
              <input
                name="company"
                readOnly={currentAction === "view"}
                value={formData.company}
                onChange={handleChange}
                className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
                type="text"
              />
            </div>
            {currentAction !== "view" && (
              <div className="flex gap-6 sticky bottom-0 h-[80px] items-center w-full px-4 justify-between bg-[#000]">
                <button
                  type="submit"
                  onClick={() => setIsDrawerOpen(false)}
                  className="bg-[#39393957] hover:bg-[#9747FF] text-white py-2 px-[20px]  rounded-lg w-1/2 text-[14px]"
                >
                  cancel
                </button>
                <button
                  onClick={handleLeadDataSave}
                  type="submit"
                  className="bg-[#9747FF] hover:bg-[#252525] text-white py-2 px-[20px] rounded-lg w-1/2 text-[14px]"
                >
                  {currentAction}
                </button>
              </div>
            )}
          </form>
        </div>
      </Drawer>
      {/* mobile responsive leads screens */}
      <div className="w-full text-white px-4 py-6 lg:hidden md:hidden sm:block xs:block ">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-3xl font-bold">Leads</h1>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-3 py-1.5 rounded-md bg-[#4F4F4F] text-white text-sm hover:bg-[#505050]"
          >
            + Add
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5 justify-between">
          <div className="flex items-center  px-2 py-1.5 rounded-xl w-full   border-[#393939] bg-[#232323]">
            <SearchIcon className="text-gray-400 mr-2" color={"#2B2B2B"} />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm text-white placeholder-[#4F4F4F] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="p-1 hover:bg-[#2E2E2E] rounded-xl  "
          >
            <FilterIcon />
          </button>
        </div>
        <div className="space-y-4">
          {paginatedLeads.map((lead: Lead, index: number) => (
            <div
              key={lead.id || index}
              className="flex items-center justify-between border-b border-gray-800 pb-4"
            >
              {/* Left: Name & Location */}
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-white leading-4">
                    {lead?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {lead?.location || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Right: Date & Menu */}
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>
                  {lead?.updatedAt ? formatDateToDDMMYYYY(lead.updatedAt) : "-"}
                </span>
                <button className="p-1 rounded-full hover:bg-gray-700 transition">
                  <FaEllipsisV  className="text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`fixed bottom-0  w-full overflow-auto lg:hidden md:hidden sm:block xs:block  left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-[#1f1f1f] text-white rounded-t-2xl p-4">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4 sticky top-0" />
          <div className=" flex flex-col">
            <p className="text-[12px] text-gray-300 mb-4  fixed">Filter by:</p>
            <p className="text-sm font-medium mt-[30px]">Date Range</p>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-3">
            <button
              className="bg-[#2a2a2a] px-3 py-[12px] rounded-lg text-sm"
              onClick={() => handleDateFilter("today")}
            >
              Today
            </button>
            <button
              className="bg-[#2a2a2a] px-3 py-[12px] rounded-lg text-sm"
              onClick={() => handleDateFilter("week")}
            >
              This Week
            </button>
            <button
              className="bg-[#2a2a2a] px-3 py-[12px] rounded-lg text-sm"
              onClick={() => handleDateFilter("month")}
            >
              This Month
            </button>
            <button className="bg-[#2a2a2a] px-3 py-[12px] rounded-lg text-sm">
              Custom
            </button>
          </div>

          <div className="mt-4">
            <div className="text-sm font-medium mt-2">Lead Type</div>
            <div className="relative mt-3 w-full">
              <select
                className="bg-[#2a2a2a] text-white p-3 pr-10 rounded-lg w-full text-sm border border-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={tempLeadTypeFilter}
                onChange={(e) => setTempLeadTypeFilter(e.target.value)}
              >
                <option className="bg-[#9747FF] text-white hover:bg-[#9e76d2]">
                  Lead Capture Form
                </option>
                <option>Manual Entry</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-medium mt-3">Amount</div>
            {/* <select className="bg-[#2a2a2a] text-white p-3 rounded w-full text-sm mt-3">
              <option className="">Newest - oldest</option>
              <option>Oldest - newest</option>
            </select> */}
            <div className="relative mt-3 w-full">
              <select
                className="bg-[#2a2a2a] text-white p-3 pr-10 rounded-lg w-full text-sm border border-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={tempSortOrder}
                onChange={(e) => setTempSortOrder(e.target.value)}
              >
                <option className="bg-[#9747FF] text-white hover:bg-[#9e76d2]">
                  Newest - oldest
                </option>
                <option>Oldest - newest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm  ">
            <button className="text-purple-400" onClick={resetFilters}>
              Reset All
            </button>
            <button
              className="bg-[#9747FF] text-white px-2 py-2 rounded-lg "
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#282828] rounded-md p-4">
            <p className="text-lg font-bold">Delete Confirmation</p>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete ?
            </p>
            <div className="flex gap-2 mt-4">
              <button
                className="text-white py-2 px-4 rounded-md"
                onClick={() => {
                  deleteMultipleLeads(leadToDelete);
                  setShowDeleteConfirm(false);
                }}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Leads;
