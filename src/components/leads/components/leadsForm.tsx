import React from "react";

const LeadsForm = ({
  formData,
  handleChange,
  currentAction,
  handleLeadDataSave,
  setIsDrawerOpen,
}: {
  formData: any;
  handleChange: any;
  currentAction: any;
  handleLeadDataSave: any;
  setIsDrawerOpen: any;
}) => {
  return (
    <form className="w-full ">
      <p className="text-3xl px-5">Leads Form</p>
      <div className="flex flex-col mt-[40px] text-sm px-5  text-[12px] gap-6">
        <label className="text-[#828282]">Name</label>
        <input
          name="name"
          value={formData?.name}
          readOnly={currentAction === "view"}
          onChange={handleChange}
          className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
          type="text"
        />
        <label className="text-[#828282]">Email</label>
        <input
          name="emailId"
          value={formData?.emailId}
          readOnly={currentAction === "view"}
          onChange={handleChange}
          className="bg-[#262626] text-white p-[10px]  rounded-md outline-none"
          type="text"
        />
        <label className="text-[#828282]">Phone Number</label>
        <input
          name="mobileNumber"
          value={formData?.mobileNumber}
          readOnly={currentAction === "view"}
          onChange={handleChange}
          className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
          type="text"
        />
        <label className="text-[#828282]">Location</label>
        <input
          name="location"
          readOnly={currentAction === "view"}
          value={formData?.location}
          onChange={handleChange}
          className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
          type="text"
        />
        <label className="text-[#828282]">Where you met</label>
        <input
          name="where_you_met"
          readOnly={currentAction === "view"}
          value={formData?.where_you_met}
          onChange={handleChange}
          className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
          type="text"
        />
        <label className="text-[#828282]">company</label>
        <input
          name="company"
          readOnly={currentAction === "view"}
          value={formData?.company}
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
  );
};

export default LeadsForm;
