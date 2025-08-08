import React, { useState, useEffect } from "react";
import { Trash2, Plus, Check } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import {
  InstagramBackgroundFill,
  FacebookIconbackgroundFill,
  LinkedinIconbackgroundFill,
  YoutubeIconbackgroundFill,
  TwitterIconbackgroundFill,
  WhatsappIconbackgroundFill,
  Googlepay_icon,
  Phonepay_icon,
  Paytm_icon,
} from "../../common/icons";
import ProfileTemplateModal from "./profileTemplatemodal";
import LivePreview from "./livePreview";
import CropModal from "../../common/CropModal";
import { theme } from "../../../utils/profileThemecolor";
const socialLinks = [
  {
    name: "Instagram",
    icon: <InstagramBackgroundFill />,
    placeholder: "Enter Instagram URL",
  },
  {
    name: "Facebook",
    icon: <FacebookIconbackgroundFill />,
    placeholder: "Enter Facebook URL",
  },
  {
    name: "YouTube",
    icon: <YoutubeIconbackgroundFill />,
    placeholder: "Enter YouTube URL",
  },
  {
    name: "Twitter",
    icon: <TwitterIconbackgroundFill />,
    placeholder: "Enter Twitter URL",
  },
  {
    name: "WhatsApp",
    icon: <WhatsappIconbackgroundFill />,
    placeholder: "Enter WhatsApp number",
  },
  {
    name: "LinkedIn",
    icon: <LinkedinIconbackgroundFill />,
    placeholder: "Enter LinkedIn URL",
  },
];

const Digitalpay = [
  {
    name: "Gpay Link",
    icon: <Googlepay_icon />,
    link: "https://gpay.example.com/username",
  },
  {
    name: "phone pay",
    icon: <Phonepay_icon />,
    link: "https://phonepe.example.com/username",
  },
  {
    name: "pay tm",
    icon: <Paytm_icon />,
    link: "https://paytm.example.com/username",
  },
];

const templates = [
  {
    label: "Ruby",
    value: "ruby",
    image: "/ruby.png",
  },
  {
    label: "Opal",
    value: "opal",
    image: "/opal.png",
  },
  {
    label: "Saphire",
    value: "saphire",
    image: "/saphire.png",
  },
  {
    label: "Neno",
    value: "neno",
    image: "/neno.png",
  },
  {
    label: "Quartz",
    value: "quartz",
    image: "/quartz.png",
  },
];

const EditProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string>("green");

  useEffect(() => {
    const saved = localStorage.getItem("selectedTheme");
    if (saved) setSelected(saved);
  }, []);

  const handleColorSelect = (theme: string) => {
    setSelected(theme);
    localStorage.setItem("selectedTheme", theme);
  };
  const [openCropModal, setOpenCropModal] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState<
    "profile" | "company" | null
  >(null);
  // const [previewProfile, setPreviewProfile] = useState<string>("");
  // const [previewCompany, setPreviewCompany] = useState<string>("");
  const [cropSrc, setCropSrc] = useState<string>("");

  const [formData, setFormData] = useState<any>({
    profileTitle: "",
    layout: "ruby",
    name: "",
    position: "",
    mobileNumbers: [{ type: "home", countryCode: "+91", number: "" }],
    emails: [""],
    websiteLinks: [""],
    address: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    bio: "",
    socialLinks: Array(socialLinks.length).fill([]),
    digitalLinks: Digitalpay.map((item) => item.link),
    profileImageUrl: "", // will store preview URL as string
    companyLogoUrl: "", // will store preview URL as string
  });

  const handleInputChange = (key: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  // const handleArrayChange = (key: any, index: number, value: any) => {
  //   const updatedArray = [...formData[key]];
  //   updatedArray[index] = value;
  //   setFormData((prev: any) => ({ ...prev, [key]: updatedArray }));
  // };

  const handleArrayChange = (
    key: any,
    index: number,
    field: string | boolean | any,
    value: any
  ) => {
    const updatedArray = [...formData[key]];
    if (field) {
      updatedArray[index][field] = value;
    } else {
      updatedArray[index] = value;
    }
    setFormData((prev: any) => ({ ...prev, [key]: updatedArray }));
  };

  // const addToArray = (key: any) => {
  //   setFormData((prev: any) => ({ ...prev, [key]: [...prev[key], ""] }));
  // };

  const addToArray = (key: any) => {
    if (key === "mobileNumbers") {
      setFormData((prev: any) => ({
        ...prev,
        [key]: [...prev[key], { type: "home", countryCode: "+91", number: "" }],
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [key]: [...prev[key], ""] }));
    }
  };

  const removeFromArray = (key: any, index: number) => {
    const updatedArray = [...formData[key]];
    updatedArray.splice(index, 1);
    setFormData((prev: any) => ({ ...prev, [key]: updatedArray }));
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "company"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setCropSrc(previewUrl);
    setSelectedImageType(type);
    setOpenCropModal(true);
  };

  const handleCroppedImage = (croppedBlob: Blob, previewUrl: string) => {
    const imageKey =
      selectedImageType === "profile" ? "profileImageUrl" : "companyLogoUrl";
    setFormData((prev: any) => ({
      ...prev,
      [imageKey]: previewUrl,
    }));

    // if (selectedImageType === "profile") {
    //   setPreviewProfile(previewUrl);
    // } else {
    //   setPreviewCompany(previewUrl);
    // }

    setOpenCropModal(false);
    setSelectedImageType(null);
  };

  const handleSave = () => {
    console.log("Form Data: ", formData);

    // If uploading, you can convert to FormData here:
    const formDataToSend: any = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          formDataToSend.append(`${key}[${i}]`, v);
        });
      } else {
        formDataToSend.append(key, value);
      }
    });
  };
  const handleRemoveImage = (type: "profile" | "company") => {
    if (type === "profile") {
      setFormData((prev: any) => ({ ...prev, profileImageUrl: "" }));
    } else {
      setFormData((prev: any) => ({ ...prev, companyLogoUrl: "" }));
    }
  };

  return (
    <div className="lg:p-4 md:p-4 sm:p-0 xs:p-0">
      {openCropModal && cropSrc && selectedImageType && (
        <CropModal
          imageSrc={cropSrc}
          onClose={() => setOpenCropModal(false)}
          onCropComplete={handleCroppedImage}
        />
      )}

      <div className="text-sm text-gray-400 mb-4">Profile / Edit</div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Form Section */}
        <div className="w-full lg:max-w-[650px] bg-[#1e1e1e] rounded-2xl p-5 space-y-6">
          {/* Profile Title & Layout */}
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block text-gray-300">
                Profile Title
              </label>
              <input
                type="text"
                value={formData.profileTitle}
                onChange={(e) =>
                  handleInputChange("profileTitle", e.target.value)
                }
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm"
              />
            </div>
            <div>
              <label className="text-sm mb-2 block text-gray-300">
                Profile Layout
              </label>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex justify-between items-center bg-[#2a2a2a] p-[10px] text-sm rounded-lg text-white"
              >
                {templates[currentIndex].label}{" "}
                <span className="text-gray-400">›</span>
              </button>
            </div>
            <ProfileTemplateModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              templates={templates}
              currentIndex={currentIndex}
              setCurrentIndex={(index) => {
                setCurrentIndex(index);
                handleInputChange("layout", templates[index].value);
              }}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 px-6 text-white">
            {["Profile Picture", "Company Logo"].map((label, index) => {
              const type = index === 0 ? "profile" : "company";
              const imageUrl =
                type === "profile"
                  ? formData.profileImageUrl
                  : formData.companyLogoUrl;

              return (
                <div key={type} className="flex flex-col items-center ">
                  <span className="text-sm mb-2 text-gray-300">{label}</span>

                  <div className="w-[120px] h-[120px] rounded-full relative bg-black">
                    {/* Image if present */}
                    {imageUrl ? (
                      <>
                        <Image
                          src={imageUrl}
                          alt={type}
                          width={120}
                          height={120}
                          className="object-cover w-full h-full rounded-full"
                        />

                        {/* Close button OUTSIDE label */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(type)}
                          className="absolute top-4 right-0 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-sm z-[10] shadow-md"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      // Upload trigger (when no image)
                      <label className="absolute inset-0 cursor-pointer group">
                        <div className="absolute inset-0 w-[120px] h-[120px] opacity-100 group-hover:bg-black/50 flex  items-center justify-center text-white text-xs transition rounded-full">
                          <Plus size={16} />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageChange(e, type as "profile" | "company")
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
              <label className="text-sm mb-1 block text-gray-300">
                FirstName
              </label>
              <input
                type="text"
                value={formData.firstname}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder=""
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block text-gray-300">
                LastName
              </label>
              <input
                type="text"
                value={formData.LastName}
                onChange={(e) => handleInputChange("lastname", e.target.value)}
                placeholder=""
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1 block text-gray-300">
                CompanyName
              </label>
              <input
                type="text"
                value={formData.companyname}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                placeholder=""
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block text-gray-300">
                Position
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder=""
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            </div>
          </div>
          <div className="flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-4">
            <div className="w-full">
              <label className="text-sm mb-1 block text-gray-300">
                Mobile number
              </label>
              {formData.mobileNumbers.map((mobile: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-0 rounded-lg mt-1"
                >
                  <select
                    value={mobile.type}
                    onChange={(e) =>
                      handleArrayChange(
                        "mobileNumbers",
                        idx,
                        "type",
                        e.target.value
                      )
                    }
                    className="bg-[#2a2a2a] text-white text-sm rounded-lg px-3 py-2 outline-none hover:cursor-pointer"
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>

                  <select
                    value={mobile.countryCode}
                    onChange={(e) =>
                      handleArrayChange(
                        "mobileNumbers",
                        idx,
                        "countryCode",
                        e.target.value
                      )
                    }
                    className="bg-[#2a2a2a] text-white text-sm rounded-lg px-2 py-2 outline-none"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                  </select>
                  <input
                    type="text"
                    value={mobile.number}
                    onChange={(e: any) =>
                      handleArrayChange(
                        "mobileNumbers",
                        idx,
                        "number",
                        e.target.value
                      )
                    }
                    className="w-full bg-[#2a2a2a] p-[10px] text-white rounded-lg outline-none"
                    placeholder=""
                  />

                  <button
                    onClick={() => removeFromArray("mobileNumbers", idx)}
                    className="text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {formData?.mobileNumbers?.length < 2 && (
                <button
                  onClick={() => addToArray("mobileNumbers")}
                  className="mt-2 text-sm flex items-center gap-1 w-full rounded-lg bg-[#2a2a2a] p-3 outline-none text-white"
                >
                  <Plus className="w-4 h-4" /> Add Mobile Number
                </button>
              )}
            </div>

            {/* Emails */}
            <div className="w-full">
              <label className="text-sm mb-1 block text-gray-300">
                Contact mail
              </label>
              {formData.emails.map((email: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-0  w-full rounded-lg mt-1"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      handleArrayChange("emails", idx, false, e.target.value)
                    }
                    className="truncate w-0 flex-1 bg-[#2a2a2a] p-[10px] outline-none text-white"
                  />

                  <button onClick={() => removeFromArray("emails", idx)}>
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
              {formData?.emails?.length < 2 && (
                <button
                  onClick={() => addToArray("emails")}
                  className="mt-2 text-sm flex items-center gap-1 w-full rounded-lg bg-[#2a2a2a] p-3 outline-none text-white"
                >
                  <Plus className="w-4 h-4" /> Add Email
                </button>
              )}
            </div>
          </div>
          {/* Website Links */}
          <div>
            <label className="text-sm mb-1 block text-gray-300">Website</label>
            {formData.websiteLinks.map((link: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#2a2a2a] px-3 w-full rounded-lg mt-1"
              >
                <input
                  type="text"
                  value={link}
                  onChange={(e) =>
                    handleArrayChange(
                      "websiteLinks",
                      idx,
                      false,
                      e.target.value
                    )
                  }
                  className="w-full bg-[#2a2a2a] p-[10px] outline-none text-white"
                />
                <button onClick={() => removeFromArray("websiteLinks", idx)}>
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            {formData?.websiteLinks?.length < 2 && (
              <button
                onClick={() => addToArray("websiteLinks")}
                className="mt-2 text-sm flex items-center gap-1 w-full justify-center rounded-lg bg-[#2a2a2a] p-3 outline-none text-white"
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
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder=""
              className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
            />
          </div>

          {/* Country, State, City, Zipcode */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1 block text-gray-300">
                Country
              </label>
              <input
                type="text"
                placeholder=""
                value={formData["country"]}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block text-gray-300">State</label>
              <input
                type="text"
                placeholder=""
                value={formData["state"]}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block text-gray-300">City</label>
              <input
                type="text"
                placeholder=""
                value={formData["city"]}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block text-gray-300">
                Zipcode
              </label>
              <input
                type="text"
                placeholder=""
                value={formData["zipcode"]}
                onChange={(e) => handleInputChange("zipcode", e.target.value)}
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm mb-1 block text-gray-300">Bio</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Write your bio here..."
              className="w-full bg-[#2a2a2a] text-gray-300 placeholder:text-gray-400 p-3 border-none outline-none resize-none rounded-lg"
            />
          </div>
          {/* theme color */}
          <div className="bg-[#1f1f1f]  rounded-xl w-full mt-10 ">
            <h3 className="text-sm text-gray-300 mb-2"> Profile Theme</h3>
            <div className="grid grid-cols-8 gap-4 items-center bg-[#2c2c2c] p-3 rounded-xl">
              {theme.map((theme: any) => (
                <button
                  key={theme.name}
                  className={clsx(
                    "w-6 h-6 rounded-full flex items-center justify-center transition duration-200",
                    {
                      "ring-2 ring-white": selected === theme.name,
                    }
                  )}
                  style={{ backgroundColor: theme.color }}
                  onClick={() => handleColorSelect(theme.name)}
                >
                  {selected === theme.name && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-sm font-medium">Social Links</h1>
            {socialLinks.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#2a2a2a] w-full rounded-lg px-3"
              >
                <p className="text-gray-400">{item.icon}</p>
                <input
                  type="text"
                  value={formData.socialLinks[idx]}
                  placeholder={item.placeholder}
                  onChange={(e) =>
                    handleArrayChange("socialLinks", idx, false, e.target.value)
                  }
                  className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm"
                />
              </div>
            ))}
          </div>

          {/* Digital Links */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-sm font-medium">Digital Link</h1>
            {Digitalpay.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#2a2a2a] w-full rounded-lg px-3"
              >
                <p className="text-gray-400">{item.icon}</p>
                <input
                  type="text"
                  value={formData.digitalLinks[idx]}
                  onChange={(e) =>
                    handleArrayChange(
                      "digitalLinks",
                      idx,
                      false,
                      e.target.value
                    )
                  }
                  className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm"
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="sticky bottom-0 bg-[#1e1e1e] py-4 flex lg:justify-end md:justify-end sm:justify-between  xs:justify-between gap-3 z-10">
            <button className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg hover:bg-[#3a3a3a] transition">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-[#a855f7] text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Save changes
            </button>
          </div>
        </div>

        {/* Right Preview Section */}
        <div className="w-full lg:w-[400px]">
          <div className=" sticky top-2 max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-none bg-gradient-to-b from-[#1f0128] to-black rounded-2xl pb-5  text-gray-200 text-center">
            {/* Sticky Live Preview Heading */}
            <p className="sticky top-0 py-2 z-[99999] text-lg font-medium pt-4 bg-[#1f0128]">
              Live preview
            </p>

            {/* Preview content */}
            <div className="mt-4 px-6">
              <LivePreview
                currentTemplate={templates?.[currentIndex]}
                formData={formData}
                selectedTheme={selected}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
