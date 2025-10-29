import React, { useState, useEffect } from "react";
import OverviewCards from "./components/overviewCards";
// import { LeadsTableMenuIcon } from "../common/icons";
import {
  // DeleteLead,
  GetAllLeadsByIdData,
  GetOverViewData,
} from "../../services/leadsApi";
import MonoColorLoader from "../common/monoColorLoader";
// import ThreeDotMenu from "../common/threeDotMenu";
import { TableColumn } from "@/src/lib/interface";
import Table from "../common/table";
// import PopupConfirm from "../common/popupConfirm";
// import { useShowHideWithRecord } from "@/src/hooks/useShowHideWithRecord";

// ✅ Utility for formatting date
const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short", // shows "Sep"
    year: "numeric",
  });
};

const Overview = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [overviewData, setOverviewData] = useState<any>(null);
  // const initial = {
  //   editVisible: false,
  //   editData: null,
  //   editTitle: null,
  //   deleteVisible: false,
  //   deleteData: null,
  //   deleteTitle: null,
  // };
  // const { object, onShow, onHide } = useShowHideWithRecord(initial);

  const fetchOverview = async () => {
    try {
      const response = await GetOverViewData(); // Call your API
      if (response?.success) {
        setOverviewData(response?.data || null); // Adjust according to your API response structure
      }
    } catch (error) {
      console.error("Error fetching overview:", error);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await GetAllLeadsByIdData();

      if (response?.success && Array.isArray(response?.getLeads)) {
        setLeads(response?.getLeads);
      }
    } catch (err: any) {
      console.error("Error fetching leads:", err);
      setLeads([]);
    }
  };

  const getData = async () => {
    try {
      await fetchOverview();
      await fetchLeads();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns: TableColumn<any>[] = [
    {
      key: "name",
      header: "Name",
      headerClassName: "text-white/40",
      cellClassName: "truncate",
      render: (lead) => <div className="text-sm text-white">{lead.name}</div>,
    },
    {
      key: "company",
      header: "Company",
      cellClassName: "truncate",
      render: (lead) => (
        <div className="text-sm text-white">{lead.company}</div>
      ),
    },
    {
      key: "email",
      header: "Email",
      cellClassName: "truncate",
      render: (lead) => (
        <div className="text-sm text-white">{lead.emailId}</div>
      ),
    },
    {
      key: "date",
      header: "Date",
      cellClassName: "truncate",
      render: (lead) => (
        <div className="text-sm text-white">{formatDate(lead.createdAt)}</div>
      ),
    },
    // {
    //   key: "actions",
    //   header: "Actions",
    //   render: (lead) => (
    //     <ThreeDotMenu
    //       options={[
    //         {
    //           label: "Edit",
    //           onClick: () => onShow("editVisible", "editData", lead, ""),
    //         },
    //         {
    //           label: "Delete",
    //           onClick: () => onShow("deleteVisible", "deleteData", lead, ""),
    //           className: "text-red-400",
    //         },
    //       ]}
    //       icon={<LeadsTableMenuIcon />}
    //     />
    //   ),
    // },
  ];

  // const handleDelete = async () => {
  //   try {
  //     const response = await DeleteLead(object?.deleteData?.id);

  //     if (response) {
  //       onHide();
  //       await fetchLeads();
  //     }
  //   } catch (error) {
  //     console.error("Error deleting lead:", error);
  //   }
  // };

  return (
    <div className="w-full flex flex-col gap-4">
      {loading && (
        <MonoColorLoader message="Loading ..." size={100} color="#b97cff" />
      )}
      <OverviewCards overviewData={overviewData} />
      <h2 className="text-2xl font-semibold text-white">Recent Leads</h2>

      <Table data={leads} columns={columns} />
      {/* <PopupConfirm
        message="Are you Sure Do you want to delete?"
        visible={object.deleteVisible}
        onCancel={onHide}
        onConfirm={handleDelete}
      /> */}

    </div>
  );
};

export default Overview;
