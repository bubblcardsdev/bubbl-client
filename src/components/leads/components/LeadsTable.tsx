import React from "react";
import {
  LeadsTableMenuIcon,
  FullArrowIcon,
  LeadsLeftIcon,
  LeadsDeleteIcon,
  LeadsDownloadIcon,
} from "../../common/icons";
const LeadsTable = ({
  toggleCheckbox,
  setLeadToDelete,
  leadToDelete,
  setShowDeleteConfirm,
  setDeleteType,
  paginatedLeads,
  selectedLeads,
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
}: {
  toggleCheckbox: any;
  setLeadToDelete: any;
  leadToDelete: any;
  setShowDeleteConfirm: any;
  setDeleteType: any;
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
}) => {
  return (
    <div className="w-full max-w-full mx-auto mt-4 rounded overflow-hidden lg:block md:block sm:hidden xs:hidden">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#555] scrollbar-track-[#2b2b2b]">
      <table className="w-full text-sm text-left text-white table-fixed">
        <thead className=" text-[#777777] text-[16px] border-b-2 border-[#494949] ">
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
            <th className="p-3 w-[150px] text-[18px] truncate">WhereYouMet</th>
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
          {paginatedLeads.map((lead: any, index: number) => {
            return (
              <tr
                key={index}
                className="group hover:bg-[#282828] transition-colors align-middle"
              >
                <td className="p-3 w-[40px] align-middle">
                  <input
                    type="checkbox"
                    className={`accent-[#9747FF] appearance-none h-[16px] w-[17px] rounded-md border border-[#535353] bg-transparent checked:bg-[#D6D3FB] checked:border-none checked:text-black flex items-center justify-center checked:after:content-['✓'] checked:after:text-[12px] checked:after:font-bold checked:after:flex checked:after:justify-center checked:after:items-center
                      transition-opacity duration-200`}
                    checked={
                      selectedLeads.has(index) || selectedLeads.has(lead?.id)
                    }
                    onChange={() => toggleCheckbox(lead, index, false)}
                  />
                </td>
                <td className="p-3 w-[200px] flex items-center gap-3 align-middle truncate">
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
                <td className="p-3 w-[180px] align-middle truncate">
                  {lead?.mobileNumber}
                </td>
                <td className="p-3 w-[200px] align-middle truncate">
                  {lead?.location}
                </td>
                <td className="p-3 w-[200px] align-middle truncate">
                  {lead?.where_you_met}
                </td>
                <td className="p-3 w-[200px] align-middle truncate">
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
                      <div className="min-w-28 rounded-md py-2 px-5 bg-black absolute top-4 z-10 text-center">
                        <p
                          className="hover:bg-[#282828] rounded-md p-1 "
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
                          className="hover:bg-[#282828] rounded-md p-1"
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
                          className="hover:bg-[#282828] rounded-md p-1"
                          role="button"
                          onClick={() => {
                            setShowDeleteConfirm(true);
                            setDeleteType("single");
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
            );
          })}
        </tbody>
      </table>

</div>
      <div className="flex justify-between items-center  mt-6 text-sm text-gray-400">
        <button
          onClick={() => setCurrentPage((prev:any) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center  justify-center gap-3 w-32 py-2 rounded-md text-center ${
            currentPage === 1
              ? "bg-[#444] text-[#828282] cursor-not-allowed"
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
            setCurrentPage((prev:any) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`flex items-center gap-3 w-32 py-2 text-center justify-center rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-black"
          }`}
        >
          Next
          <FullArrowIcon color={currentPage === totalPages ? "#999" : "#000"} />
        </button>
      </div>
    </div>
  );
};

export default LeadsTable;
