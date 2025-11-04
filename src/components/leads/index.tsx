/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Drawer from "../common/Drawer";
import { SearchIcon, FilterIcon, LeadsTableMenuIcon } from "../common/icons";
// import useWindowSize from "@/src/hooks/useWindowSize";
import {
  GetAllLeadsByIdData,
  CreateLeadApi,
  UpdateLead,
  DeleteLead,
} from "../../services/leadsApi";
import { toast } from "react-toastify";
import LeadsForm from "./components/leadsForm";
import LeadsTableHeader from "./components/leadsTableHeader";
import { downloadLeadsAsXLSX } from "../../utils/downloadUtils";
import Joi from "joi";
import { isEmpty } from "lodash";
import Table from "../common/table";
import ThreeDotMenu from "../common/threeDotMenu";

import { TableColumn } from "@/src/lib/interface";
import { useShowHideWithRecord } from "@/src/hooks/useShowHideWithRecord";
import PopupConfirm from "../common/popupConfirm";
// import { ChevronDown } from "lucide-react";
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

// Validation schema for lead form
const leadValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 100 characters'
  }),
  emailId: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email is required'
  }),
  mobileNumber: Joi.string().pattern(/^[\+]?[0-9\-\(\)\s]{10,15}$/).required().messages({
    'string.pattern.base': 'Please enter a valid phone number',
    'string.empty': 'Phone number is required'
  }),
  location: Joi.string().max(100).allow('').optional().messages({
    'string.max': 'Location cannot exceed 100 characters'
  }),
  where_you_met: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Where you met is required',
    'string.min': 'Where you met must be at least 2 characters long',
    'string.max': 'Where you met cannot exceed 100 characters'
  }),
  company: Joi.string().max(100).allow('').optional().messages({
    'string.max': 'Company name cannot exceed 100 characters'
  })
}).unknown(true); // Allow unknown fields like 'id' during updates

const INITIAL_LEAD_FORM_DATA: any = {
  name: "",
  emailId: "",
  mobileNumber: "",
  location: "",
  where_you_met: "",
  company: "",
};

//helper to parse date strings safely
// const parseDate = (dateStr: string): number => {
//   const map: { [key: string]: Date } = {
//     "Just now": new Date(),
//     "A minute ago": new Date(Date.now() - 60 * 1000),
//     "1 hour ago": new Date(Date.now() - 60 * 60 * 1000),
//     Yesterday: new Date(Date.now() - 24 * 60 * 60 * 1000),
//   };
//   if (map[dateStr]) return map[dateStr].getTime();
//   const parsed: Date = new Date(dateStr);
//   return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
// };

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
    console.error("Error formatting date:", error);
    return isoDateString; // Return original if error
  }
};

//sorting function
// const sortData = (
//   data: Lead[],
//   field: keyof Lead,
//   ascending: boolean
// ): Lead[] => {
//   return [...data].sort((a, b) => {
//     const aValue = a[field];
//     const bValue = b[field];
//     if (field === "updatedAt") {
//       const aDate = parseDate(aValue as string);
//       const bDate = parseDate(bValue as string);
//       if (aDate < bDate) return ascending ? -1 : 1;
//       if (aDate > bDate) return ascending ? 1 : -1;
//       return 0;
//     } else {
//       const aStr = String(aValue).toLowerCase();
//       const bStr = String(bValue).toLowerCase();
//       if (aStr < bStr) return ascending ? -1 : 1;
//       if (aStr > bStr) return ascending ? 1 : -1;
//       return 0;
//     }
//   });
// };

const Leads = () => {
  const [selectedLeads, setSelectedLeads] = useState<Set<number>>(new Set());
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenAction, setIsOpenAction] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [leadsData, setLeadsData] = useState<Lead[]>([]);
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>(INITIAL_LEAD_FORM_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leadTypeFilter, setLeadTypeFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentAction, setCurrentAction] = useState("save");

  const [filteredLeadsdata, setFilteredLeadsdata] = useState<any>([]);
  // Validation state
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Temporary filter states (not applied until Apply Filters is clicked)
  // const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempDateFilter, setTempDateFilter] = useState("");
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");
  const [tempLeadTypeFilter, setTempLeadTypeFilter] = useState("");
  const [tempSortOrder, setTempSortOrder] = useState("newest");
  // Delete confirmation states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | any | null>([]);

  const initial = {
    editVisible: false,
    editData: null,
    editTitle: null,
    deleteVisible: false,
    deleteData: null,
    deleteTitle: null,
  };
  const { object, onShow, onHide } = useShowHideWithRecord(initial);

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
    setMobileFilterOpen(false);
  };



  // Apply filters (apply temp states to actual filter states)
  // const applyFilters = () => {
  //   // setSearchTerm(tempSearchTerm);
  //   // setDateFilter(tempDateFilter);
  //   // setStartDate(tempStartDate);
  //   // setEndDate(tempEndDate);
  //   // setLeadTypeFilter(tempLeadTypeFilter);
  //   // setSortOrder(tempSortOrder);
  //   // setIsOpen(false);
  //   // setMobileFilterOpen(false);
  //   // setCurrentPage(1);
  //   console.log("apply filter")
  // };

  const applyFilters = () => {

    // Always filter from the full data, not already filtered data
    let filtered = [...leadsData];

    if (tempStartDate && tempEndDate) {
      const startOnly = tempStartDate;
      const endOnly = tempEndDate;

      filtered = filtered.filter((lead: any) => {
        const createdDateOnly = lead.createdAt.slice(0, 10); // Faster than Date object
        return createdDateOnly >= startOnly && createdDateOnly <= endOnly;
      });

    } else {
      console.log("⚠️ No filters applied — showing all");
    }

    setFilteredLeadsdata(filtered);
    setIsOpen(false);
  };



  // console.log("Lead created:", new Date(lead.createdAt));
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
      // setLoading(true);
      // setError(null);

      const data = await GetAllLeadsByIdData();
      const leads = data?.getLeads || []; // adjust to your API shape
      setLeadsData(leads);
      setFilteredLeadsdata(leads);
    } catch (err: any) {
      // setError("Failed to fetch leads");
      toast.error("Failed to fetch leads");
      console.error(err);
    }
  };

  const handleDownloadLeads = () => {
    if (isEmpty(filteredLeads)) return;
    const success = downloadLeadsAsXLSX(filteredLeads);
    if (success) {
      toast.success('Leads data downloaded successfully!');
    } else {
      toast.error('Failed to download leads data');
    }
  };

  const handleLeadDataSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data before saving
    const { error } = leadValidationSchema.validate(formData, { abortEarly: false });

    if (error) {
      // Create validation errors object
      const errors: { [key: string]: string } = {};
      error.details.forEach((detail) => {
        if (detail.path[0]) {
          errors[detail.path[0] as string] = detail.message;
        }
      });
      setValidationErrors(errors);

      // Show first validation error as toast
      toast.error(error.details[0]?.message || "Please fix validation errors");
      return;
    }

    // Clear validation errors if validation passes
    setValidationErrors({});

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

  // const { width } = useWindowSize();

  // const handleSort = (field: keyof Lead) => {
  //   const isAscending = field === sortField ? !ascending : true;
  //   setSortField(field);
  //   setAscending(isAscending);
  //   setSortedLeads(sortData(sortedLeads, field, isAscending));
  // };

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const mobileFilterPopoverRef = useRef<HTMLDivElement | null>(null);

  const leadsPerPage = 7;
  // const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  // const toggleCheckbox = (data: any, id: number | any, all: boolean) => {
  //   setSelectedLeads((prev: Set<number>) => {
  //     const updated = new Set(prev);

  //     if (all) {
  //       // Select or unselect all leads
  //       if (updated.size === filteredLeads?.length) {
  //         // already all selected → unselect all
  //         updated.clear();
  //         setLeadToDelete([]);
  //       } else {
  //         // select all
  //         filteredLeads?.forEach((lead: any) => updated.add(lead.id));
  //         setLeadToDelete(filteredLeads?.map((lead: any) => lead.id) || []);
  //       }
  //     } else {
  //       // Toggle single checkbox
  //       if (updated.has(id)) {
  //         updated.delete(id);
  //         setLeadToDelete((prev: number[]) =>
  //           prev.filter((leadId) => leadId !== id)
  //         );
  //       } else {
  //         updated.add(id);
  //         if (data) {
  //           setLeadToDelete((prev: number[]) =>
  //             prev.includes(data.id) ? prev : [...prev, data.id]
  //           );
  //         }
  //       }
  //     }

  //     return updated;
  //   });
  // };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileFilterPopoverRef.current &&
        !mobileFilterPopoverRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          setMobileFilterOpen(false);
        }, 500);
      }
    };
    if (mobileFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileFilterOpen]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          setIsOpenAction(null);
        }, 500);
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
  // const deleteMultipleLeads = async (ids: number[]) => {
  //   try {
  //     const promises = ids.map((id) => DeleteLead(id)); // fire all requests
  //     const results = await Promise.all(promises); // wait for all

  //     // check if all deletes were successful
  //     const allSuccess = results.every((res) => res?.success);

  //     if (allSuccess) {
  //       //remove deleted IDs from state
  //       setLeadToDelete((prev: any) =>
  //         prev.filter((id: any) => !ids.includes(id))
  //       );
  //       setSelectedLeads(new Set());

  //       // trigger your custom task (example: refresh leads list)
  //       await fetchProfiles(); // or any function you use to reload data

  //       //optional: show success toast
  //       toast.success("Selected leads deleted successfully!");
  //     } else {
  //       toast.error("Some leads could not be deleted.");
  //     }

  //     return results;
  //   } catch (error) {
  //     console.error("Error deleting multiple leads:", error);
  //     toast.error("Error deleting selected leads.");
  //     throw error;
  //   }
  // };
  const handleDelete = async () => {
    console.log("delete")
    try {
      const response = await DeleteLead(object?.deleteData?.id);
      if (response) {
        onHide();
        await fetchProfiles();
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short", // shows "Sep"
      year: "numeric",
    });
  };
  const columns: TableColumn<any>[] = [
    {
      key: "name",
      header: "Name",
      headerClassName: "text-white/40",
      cellClassName: "truncate",
      render: (lead: any) => <div className="text-sm text-white">{lead.name}</div>,
    },
    {
      key: "phoneNumber",
      header: "Phone Number",
      cellClassName: "truncate",
      render: (lead: any) => (
        <div className="text-sm text-white">{lead.mobileNumber}</div>
      ),
    },
    {
      key: "mailId",
      header: "Mail Id",
      cellClassName: "truncate",
      render: (lead: any) => (
        <div className="text-sm text-white">{lead.emailId}</div>
      ),
    },
    {
      key: "date",
      header: "Date",
      cellClassName: "truncate",
      render: (lead: any) => (
        <div className="text-sm text-white">{formatDate(lead.createdAt)}</div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (lead: any) => (
        <ThreeDotMenu
          options={[
            {
              label: "Edit",
              onClick: () => onShow("editVisible", "editData", lead, ""),
            },
            {
              label: "Delete",
              onClick: () => onShow("deleteVisible", "deleteData", lead, ""),
              className: "text-red-400",
            },
          ]}
          icon={<LeadsTableMenuIcon />}
        />
      ),
    },
  ];


  return (
    <div className="text-white bg-[#282828]  rounded-3xl p-[20px]">
      <LeadsTableHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        tempStartDate={tempStartDate}
        tempEndDate={tempEndDate}
        tempDateFilter={tempDateFilter}
        tempLeadTypeFilter={tempLeadTypeFilter}
        // tempSortOrder={tempSortOrder}
        handleDateRangeChange={handleDateRangeChange}
        handleDateFilter={handleDateFilter}
        setTempLeadTypeFilter={setTempLeadTypeFilter}
        // setTempSortOrder={setTempSortOrder}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
        // handleSort={handleSort}
        setIsDrawerOpen={setIsDrawerOpen}
        setCurrentAction={setCurrentAction}
        onDownload={handleDownloadLeads}
      />
      {/* <LeadsTable
        toggleCheckbox={toggleCheckbox}
        setLeadToDelete={setLeadToDelete}
        leadToDelete={leadToDelete}
        setShowDeleteConfirm={setShowDeleteConfirm}
        paginatedLeads={paginatedLeads}
        selectedLeads={selectedLeads}
        formatDateToDDMMYYYY={formatDateToDDMMYYYY}
        isOpenAction={isOpenAction}
        popoverRef={popoverRef}
        setIsOpenAction={setIsOpenAction}
        setIsDrawerOpen={setIsDrawerOpen}
        setFormData={setFormData}
        setCurrentAction={setCurrentAction}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      /> */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="lg:w-96 md:w-96 sm:w-full xs:w-full"
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
          <LeadsForm
            formData={formData}
            handleChange={handleChange}
            currentAction={currentAction}
            handleLeadDataSave={handleLeadDataSave}
            setIsDrawerOpen={setIsDrawerOpen}
            validationErrors={validationErrors}
          />
        </div>
      </Drawer>
      {/* mobile responsive leads screens */}
      <div className="w-full text-white px-4 py-6 lg:hidden md:hidden sm:block xs:block   ">
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
            onClick={() => setMobileFilterOpen(true)}
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
                    {lead?.name}
                  </p>
                  <p className="text-sm text-gray-400">{lead?.location}</p>
                </div>
              </div>
              {/* Right: Date & Menu */}
              {/* <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>
                  {lead?.updatedAt ? formatDateToDDMMYYYY(lead.updatedAt) : "-"}
                </span>
                <button className="p-1 rounded-full hover:bg-gray-700 transition">
                  <FaEllipsisV  className="text-gray-500" />
                </button>
              </div> */}
              <div className="flex items-center gap-3 text-sm text-gray-400 relative">
                {/* Date */}
                <span>
                  {lead?.updatedAt ? formatDateToDDMMYYYY(lead.updatedAt) : "-"}
                </span>

                {/* Action Menu Trigger */}
                <button
                  className="p-1 rounded-full hover:bg-gray-700 transition"
                  onClick={() =>
                    setIsOpenAction(
                      isOpenAction === index + 1 ? null : index + 1
                    )
                  }
                >
                  <FaEllipsisV className="text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {isOpenAction === index + 1 && (
                  <div className="absolute right-0 top-8 w-32 bg-[#2A2A2A] rounded-md shadow-lg z-10">
                    <button
                      onClick={() => {
                        setIsDrawerOpen(true);
                        setFormData(lead);
                        setCurrentAction("view");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setIsDrawerOpen(true);
                        setFormData(lead);
                        setCurrentAction("update");
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        ref={mobileFilterPopoverRef}
        className={`fixed bottom-0  w-full overflow-auto lg:hidden md:hidden sm:block xs:block  left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out 
          ${mobileFilterOpen ? "translate-y-15" : "translate-y-full"
          }`}
      >
        <div className="bg-[#1f1f1f] text-white rounded-t-2xl p-4 ">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4 sticky top-0 z-50" />
          <div className=" flex flex-col">
            <p className="text-[12px] text-gray-300 mb-4  fixed">Filter by:</p>
            <p className="text-sm font-medium mt-[30px]">Date Range</p>
          </div>
          <div className="space-y-3">
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

            <div className="flex justify-between gap-3">
              {["Today", "This Week", "This Month"].map((label) => (
                <button
                  key={label}
                  onClick={() => handleDateFilter(label.toLowerCase())}
                  className={`w-full bg-[#2A2A2A] text-sm py-2 rounded-md hover:bg-[#3A3A3A] ${tempDateFilter === label.toLowerCase()
                    ? "bg-[#9747FF]"
                    : ""
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
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

      <Table data={filteredLeadsdata} columns={columns} />
      <PopupConfirm
        message="Are you Sure Do you want to delete?"
        visible={object.deleteVisible}
        onCancel={onHide}
        onConfirm={handleDelete}
      />
      {/* {showDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#282828] rounded-md p-6  w-[350px] text-start">
            <p className="text-lg font-bold text-white">Delete Confirmation</p>
            <p className="text-sm text-gray-400 mt-2">
              Are you sure you want to delete?
            </p>
            <div className="flex gap-3 mt-6 justify-center">

              <button
                className="  bg-[#9747FF] text-white hover:bg-[#6d0bed] hover:text-white py-1 px-4 rounded-md transition"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md transition"
                onClick={() => {
                  deleteMultipleLeads(leadToDelete);
                  setShowDeleteConfirm(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
export default Leads;
