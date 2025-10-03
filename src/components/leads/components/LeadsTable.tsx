// import React, { useEffect } from "react";
// import {
//   LeadsTableMenuIcon,
//   FullArrowIcon,
//   LeadsLeftIcon,
//   LeadsDeleteIcon,
//   LeadsDownloadIcon,
// } from "../../common/icons";
// import Pagination from "./Pagination";

// const LeadsTable = ({
//   toggleCheckbox,
//   setLeadToDelete,
//   leadToDelete,
//   setShowDeleteConfirm,
//   setDeleteType,
//   paginatedLeads,
//   selectedLeads,
//   formatDateToDDMMYYYY,
//   isOpenAction,
//   popoverRef,
//   setIsOpenAction,
//   setIsDrawerOpen,
//   setFormData,
//   setCurrentAction,
//   setCurrentPage,
//   currentPage,
//   totalPages,
// }: {
//   toggleCheckbox: any;
//   setLeadToDelete: any;
//   leadToDelete: any;
//   setShowDeleteConfirm: any;
//   setDeleteType: any;
//   paginatedLeads: any;
//   selectedLeads: any;
//   formatDateToDDMMYYYY: any;
//   isOpenAction: any;
//   popoverRef: any;
//   setIsOpenAction: any;
//   setIsDrawerOpen: any;
//   setFormData: any;
//   setCurrentAction: any;
//   setCurrentPage: any;
//   currentPage: any;
//   totalPages: any;
// }) => {

//   // Handle outside click to close popover
//   // useEffect(() => {
//   //   const handleClickOutside = (event: MouseEvent) => {
//   //     if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
//   //       setIsOpenAction(null);
//   //     }
//   //   };

//   //   if (isOpenAction) {
//   //     document.addEventListener("mousedown", handleClickOutside);
//   //   }

//   //   return () => {
//   //     document.removeEventListener("mousedown", handleClickOutside);
//   //   };
//   // }, [isOpenAction]);

//   return (
//     <div className="w-full max-w-full mx-auto mt-4 rounded overflow-hidden lg:block md:block sm:hidden xs:hidden">
//       <div className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-[#555] scrollbar-track-[#2b2b2b] h-96">
//         <table className="w-full text-sm text-left text-white table-fixed">
//           <thead className="text-[#777777] text-[16px] border-b-2 border-[#494949]">
//             <tr className="align-middle">
//               <th className="p-3 w-[20%] text-[18px] font-medium text-left">Name</th>
//               <th className="p-3 w-[25%] text-[18px] font-medium text-left">Email</th>
//               <th className="p-3 w-[20%] text-[18px] font-medium text-left">Mobile</th>
//               <th className="p-3 w-[20%] text-[18px] font-medium text-left">Company</th>
//               <th className="p-3 w-[15%] text-[18px] font-medium text-left">Date</th>
//               <th className="p-3 w-[10%] text-[18px] font-medium text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#323232]">
//             {paginatedLeads.map((lead: any, index: number) => {
//               return (
//                 <tr
//                   key={index}
//                   className="group hover:bg-[#282828] transition-colors align-middle"
//                 >
//                   <td className="p-3 text-left align-middle truncate max-w-0">
//                     <span className="block truncate" title={lead?.name}>
//                       {lead?.name}
//                     </span>
//                   </td>
//                   <td className="p-3 text-left align-middle truncate max-w-0">
//                     <span className="block truncate" title={lead?.emailId}>
//                       {lead?.emailId}
//                     </span>
//                   </td>
//                   <td className="p-3 text-left align-middle truncate max-w-0">
//                     <span className="block truncate" title={lead?.mobileNumber}>
//                       {lead?.mobileNumber}
//                     </span>
//                   </td>
//                   <td className="p-3 text-left align-middle truncate max-w-0">
//                     <span className="block truncate" title={lead?.company}>
//                       {lead?.company}
//                     </span>
//                   </td>
//                   <td className="p-3 text-left align-middle">
//                     <span className="text-sm">
//                       {formatDateToDDMMYYYY(lead?.updatedAt)}
//                     </span>
//                   </td>
//                   <td className="p-3 text-left align-middle">
//                     <div className="flex items-center justify-center relative">
//                       <LeadsTableMenuIcon
//                         className="cursor-pointer hover:text-[#9747FF] transition-colors"
//                         onClick={() =>
//                           setIsOpenAction(isOpenAction === index + 1 ? null : index + 1)
//                         }
//                       />
//                       {isOpenAction === index + 1 && (
//                         <div
//                           ref={popoverRef}
//                           className={`absolute min-w-28 max-h-48 overflow-y-auto rounded-md py-2 px-5 bg-black z-50 text-center shadow-lg border border-gray-700
//         ${index < 2 ? "top-full right-0 mt-1" : "bottom-full right-0 mb-1"}`}
//                         >
//                           <p
//                             className="hover:bg-[#282828] rounded-md p-1 whitespace-nowrap cursor-pointer"
//                             onClick={() => {
//                               setIsDrawerOpen(true);
//                               setFormData(lead);
//                               setCurrentAction("update");
//                             }}
//                           >
//                             Edit
//                           </p>
//                           <p
//                             className="hover:bg-[#282828] rounded-md p-1 whitespace-nowrap cursor-pointer"
//                             onClick={() => {
//                               setIsDrawerOpen(true);
//                               setFormData(lead);
//                               setCurrentAction("view");
//                             }}
//                           >
//                             View
//                           </p>
//                           <p
//                             className="hover:bg-[#282828] rounded-md p-1 whitespace-nowrap cursor-pointer text-red-400"
//                             onClick={() => {
//                               setShowDeleteConfirm(true);
//                               setDeleteType("single");
//                               setLeadToDelete((prev: any) => [...prev, lead?.id]);
//                             }}
//                           >
//                             Delete
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// };

// export default LeadsTable;
import React from "react";
import {
  LeadsTableMenuIcon,
} from "../../common/icons";
import Pagination from "./Pagination";

interface LeadsTableProps {
  toggleCheckbox: any;
  setLeadToDelete: any;
  leadToDelete: any;
  setShowDeleteConfirm: any;
  paginatedLeads: any;
  selectedLeads: any;
  formatDateToDDMMYYYY: any;
  isOpenAction: any;
  popoverRef: any;
  setIsOpenAction: any;
  setIsDrawerOpen: any;
  setFormData: any;
  setCurrentAction: any;
  setCurrentPage: any;
  currentPage: any;
  totalPages: any;
}

const LeadsTable: React.FC<LeadsTableProps> = ({
  setLeadToDelete,
  setShowDeleteConfirm,
  paginatedLeads,
  formatDateToDDMMYYYY,
  isOpenAction,
  popoverRef,
  setIsOpenAction,
  setIsDrawerOpen,
  setFormData,
  setCurrentAction,
  setCurrentPage,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="w-full max-w-full mx-auto mt-4 rounded overflow-hidden lg:block md:block sm:hidden xs:hidden">
      {/* Table Wrapper */}
      <div className="overflow-x-auto overflow-y-auto h-96 scrollbar-thin scrollbar-thumb-[#555] scrollbar-track-[#2b2b2b]">
        <table className="w-full table-fixed text-sm text-left text-white">
          {/* Table Header */}
          <thead className="text-[#777] text-[16px] border-b-2 border-[#494949]">
            <tr className="align-middle">
              <th className="p-3 w-[20%] text-[18px] font-medium">Name</th>
              <th className="p-3 w-[25%] text-[18px] font-medium">Email</th>
              <th className="p-3 w-[20%] text-[18px] font-medium">Mobile</th>
              <th className="p-3 w-[20%] text-[18px] font-medium">Company</th>
              <th className="p-3 w-[15%] text-[18px] font-medium">Date</th>
              <th className="p-3 w-[10%] text-[18px] font-medium">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#323232]">
            {paginatedLeads.map((lead: any, index: number) => (
              <tr
                key={index}
                className="group hover:bg-[#282828] transition-colors align-middle"
              >
                {/* Name */}
                <td className="p-3 truncate max-w-0">
                  <span className="block truncate" title={lead?.name}>
                    {lead?.name}
                  </span>
                </td>

                {/* Email */}
                <td className="p-3 truncate max-w-0">
                  <span className="block truncate" title={lead?.emailId}>
                    {lead?.emailId}
                  </span>
                </td>

                {/* Mobile */}
                <td className="p-3 truncate max-w-0">
                  <span className="block truncate" title={lead?.mobileNumber}>
                    {lead?.mobileNumber}
                  </span>
                </td>

                {/* Company */}
                <td className="p-3 truncate max-w-0">
                  <span className="block truncate" title={lead?.company}>
                    {lead?.company}
                  </span>
                </td>

                {/* Date */}
                <td className="p-3">
                  <span className="text-sm">
                    {formatDateToDDMMYYYY(lead?.updatedAt)}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3">
                  <div className="relative flex items-center justify-center">
                    <LeadsTableMenuIcon
                      className="cursor-pointer hover:text-[#9747FF] transition-colors"
                      onClick={() =>
                        setIsOpenAction(isOpenAction === index + 1 ? null : index + 1)
                      }
                    />

                    {isOpenAction === index + 1 && (
                      <div
                        ref={popoverRef}
                        className={`absolute min-w-28 max-h-48 overflow-y-auto rounded-md py-2 px-5 bg-black z-50 text-center shadow-lg border border-gray-700
                          ${index < 2 ? "top-full right-0 mt-1" : "bottom-full right-0 mb-1"}`}
                      >
                        {/* Edit */}
                        <p
                          className="p-1 rounded-md cursor-pointer hover:bg-[#282828]"
                          onClick={() => {
                            setIsDrawerOpen(true);
                            setFormData(lead);
                            setCurrentAction("update");
                          }}
                        >
                          Edit
                        </p>

                        {/* View */}
                        <p
                          className="p-1 rounded-md cursor-pointer hover:bg-[#282828]"
                          onClick={() => {
                            setIsDrawerOpen(true);
                            setFormData(lead);
                            setCurrentAction("view");
                          }}
                        >
                          View
                        </p>

                        {/* Delete */}
                        <p
                          className="p-1 rounded-md cursor-pointer hover:bg-[#282828] text-red-400"
                          onClick={() => {
                            setShowDeleteConfirm(true);
                            setLeadToDelete((prev: any) => [...prev, lead?.id]);
                          }}
                        >
                          Delete
                        </p>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default LeadsTable;
