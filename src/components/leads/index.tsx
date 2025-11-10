/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import Drawer from "../common/Drawer";
import { LeadsTableMenuIcon } from "../common/icons";
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
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
  }),
  emailId: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),
  mobileNumber: Joi.string()
    .pattern(/^[\+]?[0-9\-\(\)\s]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid phone number",
      "string.empty": "Phone number is required",
    }),
  location: Joi.string().max(100).allow("").optional().messages({
    "string.max": "Location cannot exceed 100 characters",
  }),
  where_you_met: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Where you met is required",
    "string.min": "Where you met must be at least 2 characters long",
    "string.max": "Where you met cannot exceed 100 characters",
  }),
  company: Joi.string().max(100).allow("").optional().messages({
    "string.max": "Company name cannot exceed 100 characters",
  }),
}).unknown(true); // Allow unknown fields like 'id' during updates

const INITIAL_LEAD_FORM_DATA: any = {
  name: "",
  emailId: "",
  mobileNumber: "",
  location: "",
  where_you_met: "",
  company: "",
};

const Leads = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [leadsData, setLeadsData] = useState<Lead[]>([]);
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
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [tempDateFilter, setTempDateFilter] = useState("");
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");
  const [tempLeadTypeFilter, setTempLeadTypeFilter] = useState("");
  const [tempSortOrder, setTempSortOrder] = useState("newest");

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
      end.setHours(23, 59, 59, 999);
 
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
  const applyFilters = () => {
    setDateFilter(tempDateFilter);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setLeadTypeFilter(tempLeadTypeFilter);
    setSortOrder(tempSortOrder);
    setIsOpen(false);
    // setCurrentPage(1);
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
    // setCurrentPage(1);
  }, [searchTerm, dateFilter, startDate, endDate, leadTypeFilter, sortOrder]);

  const fetchProfiles = async () => {
    try {
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
      toast.success("Leads data downloaded successfully!");
    } else {
      toast.error("Failed to download leads data");
    }
  };
  const handleLeadDataSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form data before saving
    const { error } = leadValidationSchema.validate(formData, {
      abortEarly: false,
    });
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
          fetchProfiles();
        }
      }
    } catch (err) {
      toast.error("Failed to save lead");
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (isDrawerOpen && currentAction === "save") {
      setFormData(INITIAL_LEAD_FORM_DATA);
      setValidationErrors({});
    }
  }, [isDrawerOpen, currentAction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
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
      month: "short",
      year: "numeric",
    });
  };

  const columns: TableColumn<any>[] = [
    {
      key: "name",
      header: "Name",
      headerClassName: "text-white/40",
      cellClassName: "truncate",
      render: (lead: any) => (
        <div className="text-sm text-white">{lead.name}</div>
      ),
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
              onClick: () => {
                setIsDrawerOpen(true);
                setFormData(lead);
                setCurrentAction("update");
              },
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
        handleDateRangeChange={handleDateRangeChange}
        handleDateFilter={handleDateFilter}
        setTempLeadTypeFilter={setTempLeadTypeFilter}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
        setIsDrawerOpen={setIsDrawerOpen}
        setCurrentAction={setCurrentAction}
        onDownload={handleDownloadLeads}
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="lg:w-96 md:w-96 sm:w-full xs:w-full"
      >
        <div className=" ">
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
      <Table data={getFilteredLeads()} columns={columns} />
      <PopupConfirm
        message="Are you Sure Do you want to delete?"
        visible={object.deleteVisible}
        onCancel={onHide}
        onConfirm={handleDelete}
      />
    </div>
  );
};
export default Leads;
