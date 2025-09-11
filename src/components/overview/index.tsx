import React, { useState, useEffect } from "react";
import OverviewCards from "./components/overviewCards";
import { LeadsTableMenuIcon } from "../common/icons";
import { GetAllLeadsByIdData } from "../../services/leadsApi";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await GetAllLeadsByIdData();

        if (response?.success && Array.isArray(response?.getLeads)) {
          setLeads(response.getLeads);
        } else {
          setLeads([]);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="w-full">
      {/* Top overview cards */}
      <div>
        <OverviewCards />
      </div>

      {/* Table & List Section */}
      <div className="w-full max-w-full mx-auto mt-8 rounded-2xl overflow-hidden bg-[#282828] py-2">
        {loading ? (
          <p className="text-center text-gray-400 p-4">Loading leads...</p>
        ) : error ? (
          <p className="text-center text-red-400 p-4">{error}</p>
        ) : leads.length === 0 ? (
          <p className="text-center text-gray-400 p-4">No leads found.</p>
        ) : (
          <>
            {/* Desktop / Tablet - Table view */}
            <div className="hidden md:block">
              <table className="w-full text-sm text-left text-white table-fixed">
                <thead className="text-[#777777] text-[16px] border-b border-gray-500">
                  <tr className="align-middle">
                    <th className="p-3 w-[40px]"></th>
                    <th className="p-3 w-[120px] text-[18px] truncate">Name</th>
                    <th className="p-3 w-[200px] text-[18px] truncate">Email</th>
                    <th className="p-3 w-[200px] text-[18px] truncate">Mobile</th>
                    <th className="p-3 w-[150px] text-[18px] truncate">Location</th>
                    <th className="p-3 w-[150px] text-[18px] truncate">
                      WhereYouMet
                    </th>
                    <th className="p-3 w-[150px] text-[18px] truncate">Company</th>
                    <th className="p-3 w-[150px] text-[18px] truncate">Date</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#323232]">
                  {leads.map((lead: any) => (
                    <tr key={lead.id} className="align-middle">
                      <td className="p-3 w-[40px]"></td>
                      <td className="p-3 truncate">{lead.name}</td>
                      <td className="p-3 truncate">{lead.emailId}</td>
                      <td className="p-3 truncate">{lead.mobileNumber}</td>
                      <td className="p-3 truncate">{lead.location}</td>
                      <td className="p-3 truncate">{lead.where_you_met}</td>
                      <td className="p-3 truncate">{lead.company}</td>
                      {/* ✅ formatted date */}
                      <td className="p-3">{formatDate(lead.updatedAt)}</td>
                      <td className="p-3 w-[50px]">
                        <LeadsTableMenuIcon />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile - List view */}
            <div className="block md:hidden divide-y divide-[#323232]">
              {leads.map((lead: any) => (
                <div
                  key={lead.id}
                  className="flex justify-between items-center p-4 hover:bg-[#333] transition"
                >
                  <div className="flex flex-col">
                    <p className="font-semibold text-white truncate">
                      {lead.name}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {lead.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* ✅ formatted date */}
                    <p className="text-sm text-gray-300">
                      {formatDate(lead.updatedAt)}
                    </p>
                    <button className="p-2 text-gray-400 hover:text-white">
                      <LeadsTableMenuIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
