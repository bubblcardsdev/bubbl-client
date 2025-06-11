"use client";
import React from "react";
import Image from "next/image";
import Profile from "../../../public/profile.png";
import Input from "../common/Input";
import Button from "../common/Button";
const Settings = () => {
  const fields: any = {
    input: Input,
  };
  const form: any = {
    fields: [
      {
        label: "User Name",
        field: "input",
        type: "text",
      },
      {
        label: "Phone Number",
        field: "input",
        type: "number",
      },
      {
        label: "Email",
        field: "input",
        type: "email",
      },
      {
        label: "DOB",
        field: "input",
        type: "date",
      },
      {
        label: "Gender",
        field: "input",
        type: "gender",
      },
      {
        label: "Country",
        field: "input",
        type: "country",
      },
    ],
  };
  return (
    <React.Fragment>
      <div className=" mt-[5px] ">
        <p className="text-md text-white mb-2">Personal Info</p>
        <p className="text-[#828282] mb-4">
          Update your photo and personal details here.
        </p>
      </div>
      <hr className="py-[5px] border-[#494949] "></hr>
      <div className="bg-[#282828] rounded-lg px-6">
        <div className=" flex justify-between py-3 lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-3">
          <div className="w-[400px]">
            <p className="text-[#828282] pb-3">profile picture</p>
            <p className="text-[#4F4F4F]">
              This will be displayed on your profile.
            </p>
          </div>
          <div className="flex justify-around gap-10 lg:w-[550px] md:w-[450px] sm:w-ful xs:w-full py-2 flex-col">
            <div className="flex justify-between items-center">
              <Image
                src="/profile.png"
                alt=""
                width={60}
                height={60}
                className="rounded-full "
              />
              <p className="text-[#4F4F4F] text-center py-0">
                (upload max 2mb)
              </p>
              <button className="text-black text-sm  bg-[#EFEFEF] p-[8px_16px] rounded-lg">
                update
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between mt-3 flex-col gap-8 text-white ">
          {form?.fields?.map((fieldItem: any, index: number) => {
            const { field, label, ...rest } = fieldItem;
            const FieldComponent = fields?.[field];
            if (!FieldComponent) return null;
            return (
              <div
                key={index}
                className="flex justify-between  w-full flex-col sm:flex-col md:flex-row lg:flex-row gap-3 lg:gap-11 items-start md:items-center lg:items-center"
              >
                <p className="text-[#828282] whitespace-nowrap w-36 ">
                  {label}
                </p>
                <FieldComponent
                  className="text-white lg:w-[550px] md:w-[450px] sm:w-full xs:w-full px-5"
                  {...rest}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-end py-7 gap-6 text-white">
          <Button variant="secondary" size="md">
            Cancel
          </Button>
          <Button variant="primary" size="md">
            Save Changes
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Settings;
