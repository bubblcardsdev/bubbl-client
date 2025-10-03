import React from "react";

const LeadsForm = ({
  formData,
  handleChange,
  currentAction,
  handleLeadDataSave,
  setIsDrawerOpen,
  validationErrors,
}: {
  formData: any;
  handleChange: any;
  currentAction: any;
  handleLeadDataSave: any;
  setIsDrawerOpen: any;
  validationErrors: {[key: string]: string};
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
          className={`bg-[#262626]  text-white p-[10px] rounded-md outline-none ${
            validationErrors.name ? 'border border-red-500' : ''
          }`}
          type="text"
        />
        {validationErrors.name && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
        )}
        <label className="text-[#828282]">Email</label>
        <input
          name="emailId"
          value={formData?.emailId}
          readOnly={currentAction === "view"}
          onChange={handleChange}
          className={`bg-[#262626] text-white p-[10px]  rounded-md outline-none ${
            validationErrors.emailId ? 'border border-red-500' : ''
          }`}
          type="text"
        />
        {validationErrors.emailId && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.emailId}</p>
        )}
        <label className="text-[#828282]">Phone Number</label>
        <input
          name="mobileNumber"
          value={formData?.mobileNumber}
          readOnly={currentAction === "view"}
          onChange={handleChange}
          className={`bg-[#262626]  text-white p-[10px]  rounded-md outline-none ${
            validationErrors.mobileNumber ? 'border border-red-500' : ''
          }`}
          type="text"
        />
        {validationErrors.mobileNumber && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.mobileNumber}</p>
        )}
        <label className="text-[#828282]">Location</label>
        <input
          name="location"
          readOnly={currentAction === "view"}
          value={formData?.location}
          onChange={handleChange}
          className={`bg-[#262626]  text-white p-[10px]  rounded-md outline-none ${
            validationErrors.location ? 'border border-red-500' : ''
          }`}
          type="text"
        />
        {validationErrors.location && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.location}</p>
        )}
        <label className="text-[#828282]">Where you met</label>
        <input
          name="where_you_met"
          readOnly={currentAction === "view"}
          value={formData?.where_you_met}
          onChange={handleChange}
          className={`bg-[#262626]  text-white p-[10px]  rounded-md outline-none ${
            validationErrors.where_you_met ? 'border border-red-500' : ''
          }`}
          type="text"
        />
        {validationErrors.where_you_met && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.where_you_met}</p>
        )}
        <label className="text-[#828282]">company</label>
        <input
          name="company"
          readOnly={currentAction === "view"}
          value={formData?.company}
          onChange={handleChange}
          className={`bg-[#262626]  text-white p-[10px]  rounded-md outline-none ${
            validationErrors.company ? 'border border-red-500' : ''
          }`}
          type="text"
        />
        {validationErrors.company && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.company}</p>
        )}
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
