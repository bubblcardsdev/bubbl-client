import React, { useState, useEffect } from "react";
import OverviewCards from "./components/overviewCards";
import { LeadsTableMenuIcon } from "../common/icons";
import { GetAllLeadsByIdData, GetOverViewData } from "../../services/leadsApi";
import MonoColorLoader from "../common/monoColorLoader";
import ThreeDotMenu from "../common/threeDotMenu";
import { TableColumn, ThreeDotMenuOption } from "@/src/lib/interface";
import Table from "../common/table";

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

  const menuOptions: ThreeDotMenuOption[] = [
    { label: "Edit", onClick: () => console.log("edit") },
    {
      label: "Delete",
      onClick: () => console.log("delete"),
      className: "text-red-400",
    },
  ];

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
      render: (lead) => (
        <div className="text-sm text-white">{formatDate(lead.createdAt)}</div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <ThreeDotMenu options={menuOptions} icon={<LeadsTableMenuIcon />} />
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top overview cards */}
      {/* {loading && <NFCScannerLoader />} */}
      {loading && (
        <MonoColorLoader message="Loading ..." size={100} color="#b97cff" />
      )}
      <OverviewCards overviewData={overviewData} />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Recent Leads</h2>
        {/* <div className="flex items-center">
          <span className="mr-2 text-gray-400">Sort by:</span>
          <select className="border border-gray-300 rounded-md p-2">
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="company">Company</option>
          </select>
        </div> */}
      </div>
      {/* {isEmpty(leads) && (
        <div className="flex flex-col justify-center items-center p-6 gap-4 w-full h-[400px] bg-[#282828] text-white text-opacity-40 rounded-2xl">
          <NoDataIcon />
          <p className="text-center">
            Share your contact info to ensure smooth, effortless connectivity.
          </p>
        </div>
      )} */}
      {/* {!isEmpty(leads) && (
        <div className="overflow-x-auto rounded-2xl">
          <div className="h-[400px] overflow-y-auto bg-[#282828]">
            <table className="min-w-full bg-[#282828] divide-y divide-[#ffffff] divide-opacity-10 rounded-2xl">
              <thead className="sticky top-0 z-10 bg-[#282828] border-b border-[#ffffff] border-opacity-10 rounded-2xl">
                <tr>
                  <th className="px-6 py-3 text-left text-base font-medium text-white text-opacity-40">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-base font-medium text-white text-opacity-40">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-base font-medium text-white text-opacity-40">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-base font-medium text-white text-opacity-40">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-base font-medium text-white text-opacity-40">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ffffff] divide-opacity-10 bg-[#282828]">
                {leads.map((lead: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 truncate">
                      <div className="text-sm text-white">{lead?.name}</div>
                    </td>
                    <td className="px-6 py-4 truncate">
                      <div className="text-sm text-white">{lead?.company}</div>
                    </td>
                    <td className="px-6 py-4 truncate">
                      <div className="text-sm text-white">{lead?.email}</div>
                    </td>
                    <td className="px-6 py-4 truncate">
                      <div className="text-sm text-white">
                        {formatDate(lead?.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ThreeDotMenu
                        options={menuOptions}
                        icon={<LeadsTableMenuIcon />}
                        triggerClassName="inline-flex items-center justify-center"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
      <Table data={leads} columns={columns} />
    </div>
  );
};

export default Overview;
