import React from "react";
import ProfileTemplateModal from "./profileTemplatemodal";
import Image from "next/image";
import { countryCodesData } from "@/src/lib/constant";
import { theme } from "@/src/utils/profileThemecolor";
import { Plus, Trash2, Check } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/router";

const ProfileForm = ({
  formData,
  setFormData,
  handleInputChange,
  errors,
  setErrors,
  templates,
  currentIndex,
  onTemplateSelect,
  isModalOpen,
  setIsModalOpen,
  handleColorSelect,
  selected,
  handleImageChange,
  isCustomModalOpen,
  customName,
  handleSave,
  addToArray,
  setCustomName,
  setIsCustomModalOpen,
  handleCustomSave,
  handleNestedArrayChange,
  socialLinks,
  Digitalpay,
  handleRemoveImage,
}: {
  formData: any;
  setFormData: any;
  handleInputChange: any;
  errors: any;
  setErrors: any;
  templates: any;
  currentIndex: any;
  onTemplateSelect: any;
  isModalOpen: any;
  setIsModalOpen: any;
  handleColorSelect: any;
  selected: any;
  handleImageChange: any;
  isCustomModalOpen: any;
  customName: any;
  handleSave: any;
  addToArray: any;
  setCustomName: any;
  setIsCustomModalOpen: any;
  handleCustomSave: any;
  handleNestedArrayChange: any;
  socialLinks: any;
  Digitalpay: any;
  mode: any;
  setMode: any;
  handleRemoveImage: any;
}) => {
  const router = useRouter();

  return (
    <div className="w-full lg:max-w-[650px] bg-[#1e1e1e] rounded-2xl p-5 space-y-6">
      {/* Profile Title & Layout */}
      <div className="space-y-4">
        <div>
          <label className="text-sm mb-2 block text-gray-300">
            Profile Title
          </label>
          <input
            type="text"
            value={formData.profileName}
            onChange={(e) => {
              handleInputChange("profileName", e.target.value);

              if (errors.profileName) {
                setErrors((prev: any) => ({
                  ...prev,
                  profileName: "",
                }));
              }
            }}
            className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm "
          />
          {errors.profileName && (
            <p className="text-red-500 text-xs mt-1">{errors.profileName}</p>
          )}
        </div>

        <div>
          <label className="text-sm mb-2 block text-gray-300">
            Profile Layout
          </label>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex justify-between items-center bg-[#2a2a2a] p-[10px] text-sm rounded-lg text-white"
          >
            {templates[currentIndex]?.label}
            <span className="text-gray-400">›</span>
          </button>
        </div>

        <ProfileTemplateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          templates={templates}
          currentIndex={currentIndex}
          setCurrentIndex={(index: number) => onTemplateSelect(index)}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 px-6 text-white">
        {["Profile Picture", "Company Logo"].map((label, index) => {
          const imageType = index === 0 ? "profile" : "company";
          const imageUrl =
            imageType === "profile"
              ? formData.profileImageUrl
              : formData.companyLogoUrl;

          return (
            <div key={imageType} className="flex flex-col items-center ">
              <span className="text-sm mb-2 text-gray-300">{label}</span>

              <div className="w-[120px] h-[120px] rounded-full relative bg-black">
                {imageUrl ? (
                  <>
                    <Image
                      src={imageUrl}
                      alt={label}
                      width={120}
                      height={120}
                      className="object-cover w-full h-full rounded-full"
                    />
                    <button
                      type="button"
                      aria-label={`Remove ${label.toLowerCase()}`}
                      title={`Remove ${label.toLowerCase()}`}
                      onClick={() => handleRemoveImage(imageType)}
                      className="absolute top-4 right-0 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-sm z-1 shadow-md"
                    >
                      ✕{" "}
                    </button>
                  </>
                ) : (
                  <label className="absolute inset-0 cursor-pointer group">
                    <div className="absolute inset-0 w-[120px] h-[120px] opacity-100 group-hover:bg-black/50 flex  items-center justify-center text-white text-xs transition rounded-full">
                      <Plus size={16} />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e, imageType as "profile" | "company")
                      }
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <span className="text-xs text-gray-500 mt-1">
                (120px * 120px)
              </span>
            </div>
          );
        })}
      </div>
      {/* Name and Position */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm mb-1 block text-gray-300">FirstName</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => {
              handleInputChange("firstName", e.target.value);
              if (errors.fisrtName) {
                setErrors((prev: any) => ({
                  ...prev,
                  firstName: "",
                }));
              }
            }}
            className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm placeholder:text-sm"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="text-sm mb-1 block text-gray-300">LastName</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => {
              handleInputChange("lastName", e.target.value);
              if (errors.lastName) {
                setErrors((prev: any) => ({
                  ...prev,
                  lastName: "",
                }));
              }
            }}
            className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm placeholder:text-sm"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm mb-1 block text-gray-300">
            CompanyName
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => {
              handleInputChange("companyName", e.target.value);
              if (errors.companyName) {
                setErrors((prev: any) => ({
                  ...prev,
                  companyName: "",
                }));
              }
            }}
            className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm placeholder:text-sm "
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
          )}
        </div>
        <div>
          <label className="text-sm mb-1 block text-gray-300">Position</label>
          <input
            type="text"
            value={formData.designation}
            onChange={(e) => {
              handleInputChange("designation", e.target.value);
              if (errors.designation) {
                setErrors((prev: any) => ({
                  ...prev,
                  designation: "",
                }));
              }
            }}
            className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm placeholder:text-sm "
          />
          {errors.designation && (
            <p className="text-red-500 text-xs mt-1">{errors.designation}</p>
          )}
        </div>
      </div>

      <div className="flex lg:flex-col md:flex-col sm:flex-col xs:flex-col gap-4">
        <div className="w-full">
          <label className="text-sm mb-1 block text-gray-300">
            Mobile number
          </label>
          {formData?.phoneNumbers?.map((mobile: any, idx: number) => {
            if (mobile?.activeStatus) {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-5 bg-[#2a2a2a] px-0 py-0 rounded-lg mt-1"
                >
                  {/* Dropdown */}
                  <select
                    value={mobile?.phoneNumberType || ""}
                    onChange={(e) => {
                      if (e.target.value === "custom") {
                        setIsCustomModalOpen(true);
                      } else {
                        handleNestedArrayChange(
                          "phoneNumbers",
                          idx,
                          "phoneNumberType",
                          e.target.value
                        );
                      }
                    }}
                    className="bg-[#2a2a2a] text-white  rounded-lg px-1 outline-none hover:cursor-pointer w-[100px] text-sm placeholder:text-sm "
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Mobile">Mobile</option>
                     <option value="Mobile">Office</option>
                   
                    {mobile.phoneNumberType &&
                      !["Home", "Work", "Personal", "Mobile","Office"].includes(
                        mobile?.phoneNumberType
                      ) && (
                        <option value={mobile?.phoneNumberType}>
                          {mobile?.phoneNumberType}
                        </option>
                      )}
                  </select>

                  {/* Country code dropdown */}
                  <select
                    value={mobile?.countryCode}
                    onChange={(e) =>
                      handleNestedArrayChange(
                        "phoneNumbers",
                        idx,
                        "countryCode",
                        e.target.value
                      )
                    }
                    className="bg-[#2a2a2a] text-white  rounded-lg px-0 py-0 outline-none  w-[65px] text-sm placeholder:text-sm "
                  >
                    {countryCodesData
                      .sort(
                        (a: any, b: any) =>
                          a.code.replace("+", "") - b.code.replace("+", "")
                      )
                      ?.map((value: any, index: number) => (
                        <option key={index} value={value?.code}>
                          {value.flag} {value?.code}
                        </option>
                      ))}
                  </select>

                  {/* Phone number input */}
                  <input
                    type="text"
                    value={mobile?.phoneNumber}
                    onChange={(e: any) =>
                      handleNestedArrayChange(
                        "phoneNumbers",
                        idx,
                        "phoneNumber",
                        e.target.value
                      )
                    }
                    className="w-full bg-[#2a2a2a] p-[10px] text-white rounded-lg outline-none text-sm placeholder:text-sm"
                  />
                  {/* Delete */}
                  <button
                    type="button"
                    aria-label="Remove phone number"
                    title="Remove phone number"
                    onClick={() =>
                      handleNestedArrayChange(
                        "phoneNumbers",
                        idx,
                        "activeStatus",
                        false
                      )
                    }
                    className="text-white px-2"
                  >
                    {" "}
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            }
          })}

          {/* Validation error */}
          {errors.phoneNumbers && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumbers}</p>
          )}

          {/* Add New Mobile Button */}
          {formData?.phoneNumbers?.filter((value: any) => value?.activeStatus)
            ?.length < 2 && (
            <button
              onClick={() => addToArray("phoneNumbers")}
              className="mt-2 text-sm flex items-center gap-1 w-full rounded-lg bg-[#2a2a2a] p-3 outline-none text-white"
            >
              <Plus className="w-4 h-4" /> Add Mobile Number
            </button>
          )}

          {/* Custom Modal */}
          {isCustomModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
              <div className="bg-[#1e1e1e] p-6 rounded-xl w-[90%] max-w-sm shadow-lg">
                <label className="text-sm text-gray-300">Custom Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full mt-2 mb-4 bg-[#2a2a2a] p-2 rounded-lg text-white outline-none text-sm placeholder:text-sm"
                  placeholder="Enter custom name"
                />
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => {
                      setIsCustomModalOpen(false);
                      setCustomName("");
                    }}
                    className="flex-1 bg-[#333] text-white py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCustomSave}
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Emails */}
        <div className="w-full">
          <label className="text-sm mb-1 block text-gray-300">
            Contact mail
          </label>
          {formData?.emailIds?.map((email: any, idx: number) => {
            if (email?.activeStatus) {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-0 w-full rounded-lg mt-1"
                >
                  <input
                    type="email"
                    value={email?.emailId}
                    onChange={(e) =>
                      handleNestedArrayChange(
                        "emailIds",
                        idx,
                        "emailId",
                        e.target.value ? e.target.value.toLowerCase() : ""
                      )
                    }
                    className="truncate w-0 flex-1 bg-[#2a2a2a] p-[10px] outline-none text-white text-sm placeholder:text-sm"
                  />
                  <button
                    type="button"
                    aria-label="Remove email"
                    title="Remove email"
                    onClick={() =>
                      handleNestedArrayChange(
                        "emailIds",
                        idx,
                        "activeStatus",
                        false
                      )
                    }
                  >
                    {" "}
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              );
            }
          })}
          {errors?.emailIds && (
            <p className="text-red-500 text-xs mt-1">{errors?.emailIds}</p>
          )}
          {formData?.emailIds?.length < 2 && (
            <button
              onClick={() => addToArray("emailIds")}
              className="mt-2 text-sm flex items-center gap-1 w-full rounded-lg bg-[#2a2a2a] p-3 outline-none text-white  placeholder:text-sm"
            >
              <Plus className="w-4 h-4" /> Add Email
            </button>
          )}
        </div>
      </div>

      {/* Website Links */}
      <div>
        <label className="text-sm mb-1 block text-gray-300">Website</label>
        {formData?.websites?.map((link: any, idx: number) => {
          if (link?.activeStatus) {
            return (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#2a2a2a] px-3 w-full rounded-lg mt-1"
              >
                <input
                  type="text"
                  value={link?.website}
                  onChange={(e) =>
                    handleNestedArrayChange(
                      "websites",
                      idx,
                      "website",
                      e.target.value
                    )
                  }
                  className="w-full bg-[#2a2a2a] p-[10px] outline-none text-white text-sm placeholder:text-sm"
                />
                <button
                  type="button"
                  aria-label="Remove website"
                  title="Remove website"
                  onClick={() =>
                    handleNestedArrayChange(
                      "websites",
                      idx,
                      "activeStatus",
                      false
                    )
                  }
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
                {errors?.websites && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.websites}
                  </p>
                )}
              </div>
            );
          }
        })}

        {formData?.websites?.filter((value: any) => value?.activeStatus)
          ?.length < 1 && (
          <button
            onClick={() => addToArray("websites")}
            className="mt-2  flex items-center gap-1 w-full justify-center rounded-lg bg-[#2a2a2a] p-3 outline-none text-white text-sm placeholder:text-sm"
          >
            <Plus className="w-4 h-4" /> Add website Link
          </button>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="text-sm mb-1 block text-gray-300">Address</label>
        <input
          type="text"
          value={formData?.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm placeholder:text-sm"
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors?.address}</p>
        )}
      </div>

      {/* Country, State, City, Zipcode */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm mb-1 block text-gray-300">Country</label>
          <input
            type="text"
            value={formData?.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm placeholder:text-sm"
          />
          {errors?.country && (
            <p className="text-red-500 text-xs mt-1">{errors?.country}</p>
          )}
        </div>

        <div>
          <label className="text-sm mb-1 block text-gray-300">State</label>
          <input
            type="text"
            value={formData?.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm placeholder:text-sm"
          />
          {errors?.state && (
            <p className="text-red-500 text-xs mt-1">{errors?.state}</p>
          )}
        </div>

        <div>
          <label className="text-sm mb-1 block text-gray-300">City</label>
          <input
            type="text"
            value={formData?.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm placeholder:text-sm"
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors?.city}</p>
          )}
        </div>

        <div>
          <label className="text-sm mb-1 block text-gray-300">Zipcode</label>
          <input
            type="text"
            value={formData?.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm placeholder:text-sm"
          />
          {errors?.zipCode && (
            <p className="text-red-500 text-xs mt-1">{errors?.zipCode}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="text-sm mb-1 block text-gray-300">Bio</label>
        <textarea
          rows={4}
          value={formData?.shortDescription}
          onChange={(e) =>
            handleInputChange("shortDescription", e.target.value)
          }
          placeholder="Write your bio here..."
          className="w-full bg-[#2a2a2a] text-gray-300 placeholder:text-gray-400 p-3 border-none outline-none resize-none rounded-lg text-sm placeholder:text-sm"
        />
        {errors?.shortDescription && (
          <p className="text-red-500 text-xs mt-1">
            {errors?.shortDescription}
          </p>
        )}
      </div>
      {/* theme color */}
      {/* <div className="bg-[#1f1f1f]  rounded-xl w-full mt-10 ">
        <h3 className="text-sm text-gray-300 mb-2"> Profile Theme</h3>
        <div className="grid grid-cols-8 gap-1 items-center bg-[#2c2c2c] p-3 rounded-xl">
          {theme.map((t: any) => (
            <button
              key={t.name}
              className={clsx(
                "w-6 h-6 rounded-full flex items-center justify-center transition duration-200",
                { "ring-2 ring-white": selected === t.name }
              )}
              style={{ backgroundColor: t.color }}
              onClick={() => handleColorSelect(t.name)}
            >
              {selected === t.name && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>
      </div> */}
      <div className=" rounded-xl w-full mt-10 ">
        <h3 className="text-sm text-gray-300 mb-2">Profile Theme</h3>

        <div className="flex items-center justify-between  rounded-xl  w-full ">
          {/* Color Options */}
          <div className="flex gap-5  p-3 rounded-lg bg-[#2c2c2c]">
            {theme.map((t: any) => (
              <button
                key={t.name}
                className={clsx(
                  "w-6 h-6 rounded-full flex items-center justify-center transition duration-200",
                  { "ring-2 ring-white": selected === t.name }
                )}
                style={{ backgroundColor: t.color }}
                onClick={() => handleColorSelect(t.name)}
              >
                {selected === t.name && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            ))}
          </div>
          {/* Mode Toggle */}
          {/* <div className="flex gap-4 bg-[#2c2c2c] p-[10px] rounded-lg">
            <button
              onClick={() => setMode("light")}
              className={clsx(
                "px-4 py-1 rounded-md text-sm",
                mode === "light"
                  ? "bg-white text-black font-medium"
                  : "bg-[#1f1f1f] text-gray-300"
              )}
            >
              Light
            </button>
            <button
              onClick={() => setMode("dark")}
              className={clsx(
                "px-4 py-1 rounded-md text-sm",
                mode === "dark"
                  ? "bg-white text-black font-medium"
                  : "bg-[#1f1f1f] text-gray-300"
              )}
            >
              Dark
            </button>
          </div> */}
        </div>
      </div>
      {/* Social Links */}
      <div className="flex flex-col gap-4">
        <h1 className="text-white text-sm font-medium">Social Links</h1>
        {socialLinks.map((item: any) => {
          // find matching object by id
          const socialItem = formData.socialMediaNames.find(
            (s: any) => s.profileSocialMediaId === item.id
          );
          return (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-[#2a2a2a] w-full rounded-lg px-3"
            >
              <p className="text-gray-400">{item.icon}</p>
              <input
                type="text"
                value={socialItem?.socialMediaName || ""}
                placeholder={item.placeholder}
                onChange={(e) => {
                  const updated = formData.socialMediaNames.map((s: any) =>
                    s.profileSocialMediaId === item.id
                      ? { ...s, socialMediaName: e.target.value }
                      : s
                  );
                  setFormData((prev: any) => ({
                    ...prev,
                    socialMediaNames: updated,
                  }));
                  console.log(updated, "social/");
                }}
                className="w-full bg-[#2a2a2a] p-[10px] outline-none text-white text-sm placeholder:text-sm"
              />
            </div>
          );
        })}
      </div>

      {/* Digital Links */}
      <div className="flex flex-col gap-4">
        <h1 className="text-white text-sm font-medium">Digital Link</h1>
        {Digitalpay.map((item: any, idx: number) => {
          const link =
            formData.digitalPaymentLinks[idx]?.digitalPaymentLink || "";
          const isValid = link === "" || /^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(link);

          return (
            <div key={idx} className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2 bg-[#2a2a2a] w-full rounded-lg px-3">
                <p className="text-gray-400">{item.icon}</p>
                <input
                  type="text"
                  value={link}
                  onChange={(e) =>
                    handleNestedArrayChange(
                      "digitalPaymentLinks",
                      idx,
                      "digitalPaymentLink",
                      e.target.value
                    )
                  }
                  className={`w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm placeholder:text-sm ${
                    !isValid ? "border border-red-500" : ""
                  }`}
                  placeholder="Enter UPI ID"
                />
              </div>
              {!isValid && (
                <p className="text-red-500 text-xs ml-3">Invalid UPI ID</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="sticky bottom-0 bg-[#1e1e1e] py-4 flex lg:justify-end md:justify-end sm:justify-between  xs:justify-between gap-3 z-10">
        <button
          className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg hover:bg-[#3a3a3a] transition"
          onClick={() => router.push("/myprofile")}
        >
          Cancel
        </button>
        <button
          disabled={
            !formData.digitalPaymentLinks?.every(
              (link: any) =>
                !link.digitalPaymentLink ||
                /^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(link.digitalPaymentLink)
            )
          }
          onClick={handleSave}
          className="bg-[#a855f7] text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition 
             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#a855f7]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
