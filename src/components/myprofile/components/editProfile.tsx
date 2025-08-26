import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import {
  CreateMyProfileApi,
  GetOneEditProfile,
  UpdateProfile,
  UploadProfileImage,
  DeleteProfileImageApi,
  UploadbrandinglogoImage,
  DeletePbrandinglogoImage,
} from "../../../services/profileApi";
import { toast } from "react-toastify";
import { countryCodesData } from "../../../lib/constant";
// import { EditProfileSchema } from "../../../validators/profile";
const socialLinks = [
  {
    id: 1,
    name: "Instagram",
    icon: <InstagramBackgroundFill />,
    placeholder: "Enter Instagram URL",
  },
  {
    id: 2,

    name: "Facebook",
    icon: <FacebookIconbackgroundFill />,
    placeholder: "Enter Facebook URL",
  },
  {
    id: 3,

    name: "YouTube",
    icon: <YoutubeIconbackgroundFill />,
    placeholder: "Enter YouTube URL",
  },
  {
    id: 4,

    name: "Twitter",
    icon: <TwitterIconbackgroundFill />,
    placeholder: "Enter Twitter URL",
  },
  {
    id: 5,

    name: "WhatsApp",
    icon: <WhatsappIconbackgroundFill />,
    placeholder: "Enter WhatsApp number",
  },
  {
    id: 6,

    name: "LinkedIn",
    icon: <LinkedinIconbackgroundFill />,
    placeholder: "Enter LinkedIn URL",
  },
];

const Digitalpay = [
  {
    id: 1,
    name: "Gpay Link",
    icon: <Googlepay_icon />,
    link: "https://gpay.example.com/username",
  },
  {
    id: 2,
    name: "phone pay",
    icon: <Phonepay_icon />,
    link: "https://phonepe.example.com/username",
  },
  {
    id: 3,
    name: "pay tm",
    icon: <Paytm_icon />,
    link: "https://paytm.example.com/username",
  },
];

const templates = [
  { label: "Opal", value: "opal", image: "/opal.png" },
  { label: "Ruby", value: "ruby", image: "/ruby.png" },
  { label: "Saphire", value: "saphire", image: "/saphire.png" },
  { label: "Quartz", value: "quartz", image: "/quartz.png" },
  { label: "Neno", value: "neno", image: "/neno.png" },
];

// initial (API-shaped) form data used to merge loaded data and to keep defaults
const INITIAL_FORM_DATA: any = {
  profileName: "",
  templateId: 1,
  darkMode: true,
  firstName: "",
  lastName: "",
  designation: "",
  companyName: "",
  companyAddress: "",
  shortDescription: "",
  address: "",
  city: "",
  zipCode: "",
  state: "",
  country: "",
  brandingFontColor: "#000000",
  brandingBackGroundColor: "#ffffff",
  brandingAccentColor: "#007bff",
  brandingFont: "Roboto",
  phoneNumberEnable: true,
  emailEnable: true,
  websiteEnable: true,
  socialMediaEnable: true,
  digitalMediaEnable: true,
  phoneNumbers: [
    {
      // phoneNumberId: null,
      countryCode: "+91",
      phoneNumber: "",
      phoneNumberType: "work",
      checkBoxStatus: true,
      activeStatus: true,
    },
  ],
  emailIds: [
    {
      // emailIdNumber: null,
      emailId: "",
      emailType: "personal",
      checkBoxStatus: true,
      activeStatus: true,
    },
  ],
  websites: [
    {
      // websiteId: null,
      website: "",
      websiteType: "portfolio",
      checkBoxStatus: true,
      activeStatus: true,
    },
  ],
  socialMediaNames: socialLinks.map((item) => ({
    // profileSocialMediaLinkId: null,
    profileSocialMediaId: item?.id,
    socialMediaName: "",
    enableStatus: true,
    activeStatus: true,
  })),
  digitalPaymentLinks: Digitalpay.map((item) => ({
    // profileDigitalPaymentLinkId: null,
    profileDigitalPaymentsId: item?.id,
    digitalPaymentLink: "",
    enableStatus: true,
    activeStatus: true,
  })),
  profileImageUrl: "",
  companyLogoUrl: "",
};
const formDataBuilder = (data: any) => {
  const obj = {
    profileId: data?.id,
    profileUid: data?.profileUid,
    userId: data?.userId,
    profileName: data?.profileName || "",
    templateId: data?.templateId,
    darkMode: false,
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    designation: data?.designation || "",
    companyName: data?.companyName || "",
    companyAddress: data?.companyAddress || "",
    shortDescription: data?.shortDescription || "",
    address: data?.address || "",
    city: data?.city || "",
    zipCode: data?.zipCode || "",
    state: data?.state || "",
    country: data?.country || "",
    brandingFontColor: data?.deviceBranding?.[0]?.brandingFontColor || "",
    brandingBackGroundColor:
      data?.deviceBranding?.[0]?.brandingBackGroundColor || "",
    brandingAccentColor: data?.deviceBranding?.[0]?.brandingAccentColor || "",
    brandingFont: data?.brandingFont || "",
    phoneNumberEnable: data?.phoneNumberEnable || "",
    emailEnable: data?.emailEnable || "",
    websiteEnable: data?.websiteEnable || "",
    socialMediaEnable: data?.socialMediaEnable || "",
    digitalMediaEnable: data?.digitalMediaEnable || "",
    phoneNumbers: (data?.profilePhoneNumbers || []).slice(0, 2),
    emailIds: data?.profileEmails || [],
    websites: data?.profileWebsites || [],
    socialMediaNames: [
      ...(data?.profileSocialMediaLinks || []),
      ...(INITIAL_FORM_DATA?.socialMediaNames?.filter(
        (item: any) =>
          !(data?.profileSocialMediaLinks || []).some(
            (x: any) => x.profileSocialMediaId === item.profileSocialMediaId
          )
      ) || []),
    ],

    digitalPaymentLinks: data?.profileDigitalPaymentLinks || [],
    profileImageUrl: data?.profileImg || "",
    companyLogoUrl: data?.companyLogoUrl || "",
  };
  return obj;
};

const EditProfile: React.FC = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selected, setSelected] = useState<string>("green");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Crop modal
  const [openCropModal, setOpenCropModal] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState<
    "profile" | "company" | null
  >(null);
  const [cropSrc, setCropSrc] = useState<string>("");
  const [profileImg, setProfileImg] = useState<File | null | string>(null);
  const [companyLogoImg, setCompanyLogoImg] = useState<File | null | string>(
    null
  );
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // formData (API shaped)
  const [formData, setFormData] = useState<any>(INITIAL_FORM_DATA);

  // restore selected theme from localStorage and apply accent color if present
  const fetchProfiles = async () => {
    try {
      const data = await GetOneEditProfile(id);
      //  const getProfileImage=await GetProfileImageApi(id)
      console.log(data, "get");
      const obj = {
        ...data?.data?.profile,
        deviceBranding: data?.data?.deviceBranding,
        profileImg: data?.data?.profileImgs?.[0]?.image,
        companyLogoUrl: data?.data?.profile?.brandingLogoUrl,
      };
      const response = formDataBuilder(obj);
      console.log(response, "resbi");
      setCurrentIndex(Number(response?.templateId) - 1);
      setFormData(response);
    } catch (err: any) {
      // setError("Failed to fetch profiles");
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    if (!id) {
      const saved =
        typeof window !== "undefined" && localStorage.getItem("selectedTheme");
      if (saved) {
        setSelected(saved);
        const found = theme.find((t: any) => t.name === saved);
        if (found) {
          setFormData((prev: any) => ({
            ...prev,
            brandingAccentColor: found.color,
          }));
        }
      }
    } else {
      fetchProfiles();
    }
  }, [id]);
  // Generic simple field updater
  const handleInputChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleNestedArrayChange = (
    arrayKey: string,
    index: number,
    field: string,
    value: any
  ) => {
    const updatedArray = [...(formData[arrayKey] || [])];

    updatedArray[index] = { ...(updatedArray[index] || {}), [field]: value };

    setFormData((prev: any) => ({ ...prev, [arrayKey]: updatedArray }));
  };

  const addToArray = (key: string) => {
    if (key === "phoneNumbers") {
      setFormData((prev: any) => ({
        ...prev,
        phoneNumbers: [
          ...prev.phoneNumbers,
          {
            // phoneNumberId: null,
            countryCode: "+91",
            phoneNumber: "",
            phoneNumberType: "mobile",
            checkBoxStatus: true,
            activeStatus: true,
          },
        ],
      }));
    } else if (key === "emailIds") {
      setFormData((prev: any) => ({
        ...prev,
        emailIds: [
          ...prev.emailIds,
          {
            // emailIdNumber: null,
            emailId: "",
            emailType: "personal",
            checkBoxStatus: true,
            activeStatus: true,
          },
        ],
      }));
    } else if (key === "websites") {
      setFormData((prev: any) => ({
        ...prev,
        websites: [
          ...prev.websites,
          {
            // websiteId: null,
            website: "",
            websiteType: "portfolio",
            checkBoxStatus: true,
            activeStatus: true,
          },
        ],
      }));
    } else if (key === "socialMediaNames") {
      setFormData((prev: any) => ({
        ...prev,
        socialMediaNames: [
          ...prev.socialMediaNames,
          {
            // profileSocialMediaLinkId: null,
            profileSocialMediaId: prev?.id,
            socialMediaName: "",
            enableStatus: true,
            activeStatus: true,
          },
        ],
      }));
    } else if (key === "digitalPaymentLinks") {
      setFormData((prev: any) => ({
        ...prev,
        digitalPaymentLinks: [
          ...prev.digitalPaymentLinks,
          {
            // profileDigitalPaymentLinkId: null,
            profileDigitalPaymentsId: prev?.id,
            digitalPaymentLink: "",
            enableStatus: true,
            activeStatus: true,
          },
        ],
      }));
    }
  };
  const handleCustomSave = () => {
    if (activeIndex !== null) {
      handleNestedArrayChange(
        "phoneNumbers",
        activeIndex,
        "phoneNumberType",
        customName
      );
      setCustomName("");
      setActiveIndex(null);
      setIsCustomModalOpen(false);
    }
  };
  // Remove item from nested array
  const removeFromArray = (key: string, index: number) => {
    const updatedArray = [...(formData[key] || [])];
    // updatedArray.splice(index, 1);
    const changeState = { ...updatedArray?.[index], activeStatus: false };
    updatedArray[index] = changeState;
    setFormData((prev: any) => ({ ...prev, [key]: updatedArray }));
  };

  // Image change and crop flow (same as your original behavior)
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "company"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (type == "profile") {
      setProfileImg(file);
    } else if (type == "company") {
      setCompanyLogoImg(file);
    }
    const previewUrl = URL.createObjectURL(file);
    setCropSrc(previewUrl);
    setSelectedImageType(type);
    setOpenCropModal(true);
  };

  const handleCroppedImage = (croppedBlob: Blob, previewUrl: string) => {
    const imageKey =
      selectedImageType === "profile" ? "profileImageUrl" : "companyLogoUrl";
    setFormData((prev: any) => ({ ...prev, [imageKey]: previewUrl }));
    setOpenCropModal(false);
    setSelectedImageType(null);
  };

  const handleRemoveImage = (type: "profile" | "company") => {
    if (type === "profile") {
      setFormData((prev: any) => ({ ...prev, profileImageUrl: "" }));
      setProfileImg(null);
      setCompanyLogoImg(null);
    } else setFormData((prev: any) => ({ ...prev, companyLogoUrl: "" }));
  };

  // Template selection: keep currentIndex for preview & set templateId in state
  const onTemplateSelect = (index: number) => {
    setCurrentIndex(index);
    handleInputChange("templateId", index + 1); // backend expects 1-based id
  };

  // Color select: keep selected theme name and update brandingAccentColor in state
  const handleColorSelect = (themeName: string) => {
    setSelected(themeName);
    localStorage.setItem("selectedTheme", themeName);
    const found = theme.find((t: any) => t.name === themeName);
    if (found) {
      handleInputChange("brandingAccentColor", found.color);
    }
  };

  const handleSave = async () => {
    try {
      // Create new profile
      const payload = {
        ...formData,
        socialMediaNames: formData?.socialMediaNames?.filter(
          (value: any) => value?.socialMediaName?.length > 0
        ),
        digitalPaymentLinks: formData?.digitalPaymentLinks?.filter(
          (value: any) => value?.digitalPaymentLink?.length > 0
        ),
        emailIds: formData?.emailIds?.filter(
          (value: any) => value?.emailId?.length > 0
        ),
        phoneNumbers: formData?.phoneNumbers?.filter(
          (value: any) => value?.phoneNumber?.toString()?.length > 0
        ),
        websites: formData?.websites?.filter(
          (value: any) => value?.website?.length > 0
        ),
      };

      // Remove image URLs before sending to API
      delete payload?.profileImageUrl;
      delete payload?.companyLogoUrl;
      console.log("Form Data (payload):", formData);

      if (id) {
        // Update existing profile
        try {
          const response = await UpdateProfile(id, payload);

          if (formData?.profileImageUrl?.length <= 0) {
            await DeleteProfileImageApi(id);
          }
          if (formData?.companyLogoUrl?.length <= 0) {
            await DeletePbrandinglogoImage(id);
          }
          if (profileImg) {
            await UploadProfileImage(profileImg, id);
          }
          if (companyLogoImg) {
            await UploadbrandinglogoImage(companyLogoImg, id);
          }
          fetchProfiles();
          toast.success("Profile updated successfully!");
          console.log("Update response:", response);
        } catch (error) {
          toast.error("Failed to update profile");
          console.error("Update error:", error);
        }
      } else {
        try {
          const response: any = await CreateMyProfileApi(payload);
          if (profileImg && response?.data?.profile?.id) {
            await UploadProfileImage(profileImg, response.data.profile.id);
          }
          if (companyLogoImg && response?.data?.profile?.id) {
            await UploadbrandinglogoImage(
              companyLogoImg,
              response?.data?.profile?.id
            );
          }
          // const { error } = EditProfileSchema.validate(formData, {
          //   abortEarly: false,
          // });
          // if (error) {
          //   const newErrors: Record<string, string> = {};
          //   error.details.forEach((err: any) => {
          //     // toast.error(err.message); // keep toast
          //     if (err.path?.[0]) {
          //       newErrors[err.path[0]] = err.message; // save error for that field
          //     }
          //   });
          //   setErrors(newErrors);
          //   return;
          // }
          // setErrors({});
          // ✅ Add condition for duplicate profile name
          if (response?.data?.message === "This profile name already exists") {
            setErrors((prev: any) => ({
              ...prev,
              profileName: "This profile name already exists",
            }));
            toast.error("This profile name already exists");
            return; // stop here so success toast doesn’t run
          }

          // Upload image after profile creation

          if (response || response?.data?.success) {
            toast.success("Profile created successfully!");
          }
          console.log("Create response:", response);
        } catch (error) {
          // toast.error("Failed to create profile");
          console.error("Create error:", error);
        }
      }
    } catch (err: any) {
      // console.error("Save failed:", err);
      const backendMessage = err.response?.data?.message;
      if (backendMessage === "This profile name already exists") {
        setErrors((prev: any) => ({
          ...prev,
          profileName: "This profile name already exists",
        }));
        toast.error("This profile name already exists");
      } else {
        toast.error(backendMessage || "Save failed!");
      }
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.profileName}
                </p>
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
                {templates[currentIndex]?.label}{" "}
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
              const type = index === 0 ? "profile" : "company";
              const imageUrl =
                type === "profile"
                  ? formData.profileImageUrl
                  : formData.companyLogoUrl;

              return (
                <div key={type} className="flex flex-col items-center ">
                  <span className="text-sm mb-2 text-gray-300">{label}</span>

                  <div className="w-[120px] h-[120px] rounded-full relative bg-black">
                    {imageUrl ? (
                      <>
                        <Image
                          src={imageUrl}
                          alt={type}
                          width={120}
                          height={120}
                          className="object-cover w-full h-full rounded-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(type)}
                          className="absolute top-4 right-0 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-sm z-[10] shadow-md"
                        >
                          ✕
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
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white "
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="text-sm mb-1 block text-gray-300">
                LastName
              </label>
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
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
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
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white "
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm mb-1 block text-gray-300">
                Position
              </label>
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
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white "
              />
              {errors.designation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.designation}
                </p>
              )}
            </div>
          </div>

          <div className="flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-4">
            <div className="w-full">
              <label className="text-sm mb-1 block text-gray-300">
                Mobile number
              </label>
              {formData.phoneNumbers.map((mobile: any, idx: number) => {
                if (mobile?.activeStatus) {
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-0 rounded-lg mt-1"
                    >
                      {/* Dropdown */}
                      <select
                        value={mobile.phoneNumberType || ""}
                        onChange={(e) => {
                          if (e.target.value === "custom") {
                            setActiveIndex(idx);
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
                        className="bg-[#2a2a2a] text-white text-sm rounded-lg px-3 py-2 outline-none hover:cursor-pointer"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                        <option value="custom">Custom</option>
                        {/* If user already saved custom, show it */}
                        {mobile.phoneNumberType &&
                          !["home", "work", "other", "custom"].includes(
                            mobile.phoneNumberType
                          ) && (
                            <option value={mobile.phoneNumberType}>
                              {mobile.phoneNumberType}
                            </option>
                          )}
                      </select>

                      {/* Country code dropdown */}
                      <select
                        value={mobile.countryCode}
                        onChange={(e) =>
                          handleNestedArrayChange(
                            "phoneNumbers",
                            idx,
                            "countryCode",
                            e.target.value
                          )
                        }
                        className="bg-[#2a2a2a] text-white text-sm rounded-lg px-2 py-2 outline-none"
                      >
                        {countryCodesData
                          .sort(
                            (a: any, b: any) =>
                              a.code.replace("+", "") - b.code.replace("+", "")
                          )
                          ?.map((value: any, index: number) => (
                            <option key={index} value={value?.code}>
                              {value?.code}
                            </option>
                          ))}
                      </select>

                      {/* Phone number input */}
                      <input
                        type="text"
                        value={mobile.phoneNumber}
                        onChange={(e: any) =>
                          handleNestedArrayChange(
                            "phoneNumbers",
                            idx,
                            "phoneNumber",
                            e.target.value
                          )
                        }
                        className="w-full bg-[#2a2a2a] p-[10px] text-white rounded-lg outline-none"
                      />
                      {/* Delete */}
                      <button
                        onClick={() => removeFromArray("phoneNumbers", idx)}
                        className="text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                }
              })}

              {/* Validation error */}
              {errors.phoneNumbers && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumbers}
                </p>
              )}

              {/* Add New Mobile Button */}
              {formData?.phoneNumbers?.filter(
                (value: any) => value?.activeStatus
              )?.length < 2 && (
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
                      className="w-full mt-2 mb-4 bg-[#2a2a2a] p-2 rounded-lg text-white outline-none"
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
              {formData.emailIds.map((email: any, idx: number) => {
                if (email?.activeStatus) {
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-0 w-full rounded-lg mt-1"
                    >
                      <input
                        type="email"
                        value={email.emailId}
                        onChange={(e) =>
                          handleNestedArrayChange(
                            "emailIds",
                            idx,
                            "emailId",
                            e.target.value
                          )
                        }
                        className="truncate w-0 flex-1 bg-[#2a2a2a] p-[10px] outline-none text-white"
                      />
                      <button onClick={() => removeFromArray("emailIds", idx)}>
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  );
                }
              })}
              {errors.emailIds && (
                <p className="text-red-500 text-xs mt-1">{errors.emailIds}</p>
              )}
              {formData?.emailIds?.length < 2 && (
                <button
                  onClick={() => addToArray("emailIds")}
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
            {formData.websites.map((link: any, idx: number) => {
              if (link?.activeStatus) {
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-[#2a2a2a] px-3 w-full rounded-lg mt-1"
                  >
                    <input
                      type="text"
                      value={link.website}
                      onChange={(e) =>
                        handleNestedArrayChange(
                          "websites",
                          idx,
                          "website",
                          e.target.value
                        )
                      }
                      className="w-full bg-[#2a2a2a] p-[10px] outline-none text-white"
                    />
                    <button onClick={() => removeFromArray("websites", idx)}>
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                    {errors.websites && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.websites}
                      </p>
                    )}
                  </div>
                );
              }
            })}

            {formData?.websites?.length < 2 && (
              <button
                onClick={() => addToArray("websites")}
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
              className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* Country, State, City, Zipcode */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1 block text-gray-300">
                Country
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>

            <div>
              <label className="text-sm mb-1 block text-gray-300">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>

            <div>
              <label className="text-sm mb-1 block text-gray-300">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="text-sm mb-1 block text-gray-300">
                Zipcode
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm mb-1 block text-gray-300">Bio</label>
            <textarea
              rows={4}
              value={formData.shortDescription}
              onChange={(e) =>
                handleInputChange("shortDescription", e.target.value)
              }
              placeholder="Write your bio here..."
              className="w-full bg-[#2a2a2a] text-gray-300 placeholder:text-gray-400 p-3 border-none outline-none resize-none rounded-lg"
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-xs mt-1">
                {errors.shortDescription}
              </p>
            )}
          </div>

          {/* theme color */}
          <div className="bg-[#1f1f1f]  rounded-xl w-full mt-10 ">
            <h3 className="text-sm text-gray-300 mb-2"> Profile Theme</h3>
            <div className="grid grid-cols-8 gap-4 items-center bg-[#2c2c2c] p-3 rounded-xl">
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
          </div>

          {/* Social Links */}
          {/* <div className="flex flex-col gap-4">
            <h1 className="text-white text-sm font-medium">Social Links</h1>
            {socialLinks.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#2a2a2a] w-full rounded-lg px-3"
              >
                <p className="text-gray-400">{item.icon}</p>
                <input
                  type="text"
                  value={formData.socialMediaNames[idx]?.socialMediaName || ""}
                  placeholder={item.placeholder}
                  onChange={(e) =>
                    handleNestedArrayChange(
                      "socialMediaNames",
                      idx,
                      "socialMediaName",
                      e.target.value
                    )
                  }
                  className="w-full bg-[#2a2a2a] p-[10px] rounded-lg outline-none text-white text-sm"
                />
              </div>
            ))}
          </div> */}
          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-sm font-medium">Social Links</h1>
            {socialLinks.map((item, idx) => {
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
                    }}
                    className="w-full bg-[#2a2a2a] p-[10px] outline-none text-white"
                  />
                </div>
              );
            })}
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
                  value={
                    formData.digitalPaymentLinks[idx]?.digitalPaymentLink || ""
                  }
                  onChange={(e) =>
                    handleNestedArrayChange(
                      "digitalPaymentLinks",
                      idx,
                      "digitalPaymentLink",
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
