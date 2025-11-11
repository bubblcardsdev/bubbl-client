/* eslint-disable */

import React, { useEffect, useState } from "react";

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
import ProfileForm from "./profileForm";
import { EditProfileSchema } from "../../../validators/profile";
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
    id: 4,
    name: "YouTube",
    icon: <YoutubeIconbackgroundFill />,
    placeholder: "Enter YouTube URL",
  },
  {
    id: 3,

    name: "Twitter",
    icon: <TwitterIconbackgroundFill />,
    placeholder: "Enter Twitter URL",
  },
  {
    id: 6,

    name: "WhatsApp",
    icon: <WhatsappIconbackgroundFill />,
    placeholder: "Enter WhatsApp number",
  },
  {
    id: 5,

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
      phoneNumberType: "Work",
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
  profileImageKey:"",
  companyLogoKey:"",
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
    brandingFontColor: data?.brandingFontColor || "",
    brandingBackGroundColor:
      data?.brandingBackGroundColor || "",
    brandingAccentColor: data?.brandingAccentColor || "#60449a",
    brandingFont: data?.brandingFont || "",
    phoneNumberEnable: data?.phoneNumberEnable || false,
    emailEnable: data?.emailEnable || false,
    websiteEnable: data?.websiteEnable || false,
    socialMediaEnable: data?.socialMediaEnable || false,
    digitalMediaEnable: data?.digitalMediaEnable || false,
    phoneNumbers: (data?.profilePhoneNumbers || []).slice(0, 2),
    emailIds: (data?.profileEmails || []).slice(0, 2) || [],
    websites: (data?.profileWebsites || []).slice(0, 2),
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
  const [selected, setSelected] = useState<string>("#00b71a");
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
  const [mode, setMode] = React.useState("dark"); // or "edit" / default value

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
      setCurrentIndex(Number(response?.templateId) - 1);
      setFormData(response);
      setSelected(response?.brandingAccentColor || "#00b71a")
    } catch (err: any) {
      // setError("Failed to fetch profiles");
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchProfiles();
    }
  }, [id]);
  // Generic simple field updater
  const handleInputChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };


  const validateForm = (): boolean => {
    const { error } = EditProfileSchema.validate(formData, {
      abortEarly: false, // capture all errors
    });

    if (!error) {
      setErrors({});
      return true;
    }

    const newErrors: Record<string, string> = {};

    error.details.forEach((detail) => {
      const path = detail.path.join("."); // e.g., phoneNumbers.0.phoneNumber
      newErrors[path] = detail.message;
    });
    console.log(newErrors, "?");

    setErrors(newErrors);
    return false;
  };

  const handleNestedArrayChange = (
    arrayKey: string,
    index: number,
    field: string,
    value: any
  ) => {
    const updatedArray = [...(formData[arrayKey] || [])];
    const existing = updatedArray[index] || {};

    updatedArray[index] = {
      ...existing,
      [field]: value,
      ...(arrayKey === "digitalPaymentLinks" && {
        profileDigitalPaymentsId: Digitalpay[index].id,
        enableStatus: existing.enableStatus ?? true,
        activeStatus: existing.activeStatus ?? true,
      }),
    };

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

  // Set preview for cropping
  const previewUrl = URL.createObjectURL(file);
  setCropSrc(previewUrl);
  setSelectedImageType(type);
  setOpenCropModal(true);
};


const handleCroppedImage = async (croppedBlob: Blob, previewUrl: string) => {
  if (!selectedImageType) return; // safety

  const file = new File([croppedBlob], "croppedImage.jpg", { type: "image/jpeg" });

  try {
    // Choose correct API based on selectedImageType
    const response =
      selectedImageType === "profile"
        ? await UploadProfileImage(file, id)
        : await UploadbrandinglogoImage(file, id);

    const { key: uploadedKey } = response?.data || {};

    if (selectedImageType === "profile") {
      setFormData((prev: any) => ({
        ...prev,
        profileImageUrl: previewUrl,      // frontend preview
        profileImageKey: uploadedKey || "", // backend key (S3)
      }));
      setProfileImg(file);
    } else {
      // company / branding
      setFormData((prev: any) => ({
        ...prev,
        companyLogoUrl: previewUrl,        // frontend preview
        companyLogoKey: uploadedKey || "", // backend key (S3)
        brandingLogoUrl: uploadedKey || "", // if backend expects this field
      }));
      setCompanyLogoImg(file);
    }
  } catch (err) {
    console.error("Cropped image upload failed:", err);
    // Optional: show toast or set an error state
  } finally {
    setOpenCropModal(false);
    setSelectedImageType(null);
  }
};


  const handleRemoveImage = (type: "profile" | "company") => {
    if (type === "profile") {
      setFormData((prev: any) => ({ ...prev, profileImageUrl: "" }));
      setProfileImg(null);
    } else {
      setFormData((prev: any) => ({ ...prev, companyLogoUrl: "" }));
      setCompanyLogoImg(null);
    }
  };
  // Template selection: keep currentIndex for preview & set templateId in state
  const onTemplateSelect = (index: number) => {
    setCurrentIndex(index);
    handleInputChange("templateId", index + 1); // backend expects 1-based id
  };

  // Color select: keep selected theme name and update brandingAccentColor in state
  const handleColorSelect = (themeName: string) => {
    setSelected(themeName);

    handleInputChange("brandingAccentColor", themeName);

  };

  const handleSave = async () => {
    try {
      const isValid = validateForm();
      if (!isValid) {
        toast.error("Please fix the validation errors before saving!");
        return;
      }
      const isCreate = router.pathname === "/createNewProfile";
      console.log(formData, "//formdata");

      // Map social media
      const updatedSocialMediaNames = (formData?.socialMediaNames || []).map(
        (item: any) => {

          return {
            profileSocialMediaLinkId:
              item.profileSocialMediaLinkId || undefined,
            profileSocialMediaId: item.profileSocialMediaId || undefined,
            socialMediaName: item.socialMediaName || "",
            activeStatus: item.socialMediaName?.trim().length > 0,
          };
        }
      );

      // Map digital payments
      const updatedDigitalMediaNames = (
        formData?.digitalPaymentLinks || []
      ).map((item: any) => ({
        profileDigitalPaymentLinkId:
          item.profileDigitalPaymentLinkId || undefined,
        profileDigitalPaymentsId: item.profileDigitalPaymentsId || undefined,
        digitalPaymentLink: item.digitalPaymentLink || "",
        enableStatus: item.enableStatus ?? true,
        activeStatus: item.digitalPaymentLink?.trim().length > 0,
      }));
     const filteredEmailIds = (formData?.emailIds || []).filter((item: any) => {
  // Keep if it has an existing ID
  if (item.emailIdNumber) return true;

  // Otherwise, only keep if emailId is non-empty
  return item.emailId && item.emailId.trim().length > 0;
});

// Filter phone numbers
        const filteredPhoneNumbers = (formData?.phoneNumbers || []).filter((item: any) => {
  // Keep if it has an existing ID
  if (item.phoneNumberId) return true;

  // Otherwise, only keep if phoneNumber is non-empty
  return item.phoneNumber && item.phoneNumber.trim().length > 0;
         });

      // Build base payload
      let payload: any = {
        ...formData,
        socialMediaNames: isCreate
          ? (formData?.socialMediaNames || []).filter((s: any) =>
            s.socialMediaName?.trim()
          )
          : updatedSocialMediaNames,
        digitalPaymentLinks: isCreate
          ? (formData?.digitalPaymentLinks || []).filter((d: any) =>
            d.digitalPaymentLink?.trim()
          )
          : updatedDigitalMediaNames,
        emailIds: filteredEmailIds || [],
        phoneNumbers: filteredPhoneNumbers || [],
        websites: formData?.websites || [],
      };

      // Special rule for create: strip empty strings from top-level keys
      if (isCreate) {
        Object.keys(payload).forEach((key) => {
          if (typeof payload[key] === "string" && payload[key].trim() === "") {
            delete payload[key]; // remove empty string keys
          }
          if (Array.isArray(payload[key]) && payload[key].length === 0) {
            // keep as [] for arrays (important for API consistency)
          }
        });
      }

      // Remove image URLs before sending
      delete payload?.profileImageUrl;
      delete payload?.companyLogoUrl;
      delete payload?.brandingLogoUrl

      console.log("Final Payload:", payload);
      if (id) {
      delete payload?.profileImageUrl;
      delete payload?.profileImageKey;
      delete payload?.companyLogoUrl;
      delete payload?.companyLogoKey;
      delete payload?.brandingLogoUrl
        // ---- Update ----
        const response = await UpdateProfile(id, payload);

        if (!formData?.profileImageUrl) await DeleteProfileImageApi(id);
        if (!formData?.companyLogoUrl) await DeletePbrandinglogoImage(id);
        // if (profileImg) await UploadProfileImage(profileImg, id); // need to call
        // if (companyLogoImg) await UploadbrandinglogoImage(companyLogoImg, id); // need to call seperately

        await fetchProfiles();
        console.log("Update response:", response);
      } else {
        // ---- Create ----
        const response: any = await CreateMyProfileApi(payload);
        if (!response) return;

        // if (profileImg && response?.profile?.id)
        //   await UploadProfileImage(profileImg, response?.profile?.id);
        // if (companyLogoImg && response?.profile?.id)
        //   await UploadbrandinglogoImage(companyLogoImg, response?.profile.id);

        // if (response?.data?.message === "This profile name already exists") {
        //   setErrors((prev: any) => ({
        //     ...prev,
        //     profileName: "This profile name already exists",
        //   }));
        //   toast.error("This profile name already exists");
        //   return;
        // }
        router.push("/myprofile");
        toast.success("Profile created successfully!");
        console.log("Create response:", response);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error("Save error:", err);
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
      <div>
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Section: Profile Edit + Form */}
          <div className="w-full max-w-[600px]">
            <div className="text-sm text-gray-400 mb-4">Profile / Edit</div>
            <ProfileForm
              formData={formData}
              setFormData={setFormData}
              handleInputChange={handleInputChange}
              errors={errors}
              setErrors={setErrors}
              templates={templates}
              currentIndex={currentIndex}
              onTemplateSelect={onTemplateSelect}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              handleColorSelect={handleColorSelect}
              selected={selected}
              handleImageChange={handleImageChange}
              isCustomModalOpen={isCustomModalOpen}
              customName={customName}
              handleSave={handleSave}
              addToArray={addToArray}
              setCustomName={setCustomName}
              setIsCustomModalOpen={setIsCustomModalOpen}
              handleCustomSave={handleCustomSave}
              handleNestedArrayChange={handleNestedArrayChange}
              socialLinks={socialLinks}
              Digitalpay={Digitalpay}
              handleRemoveImage={handleRemoveImage}
              setMode={setMode}
              mode={mode}
            />
          </div>

          {/* Right Section: Live Preview */}
          <div className="w-full max-w-[400px] xl:block lg:hidden md:hidden sm:hidden xs:hidden">
            <div className="sticky top-2 overflow-y-auto scrollbar-none rounded-2xl pb-5 text-gray-200 text-center">
              <p className="text-sm text-gray-400 mb-6">Live Preview</p>
              <div className="flex flex-col items-center justify-center gap-2 mb-4 rounded-2xl max-w-[360px] mx-auto shadow-[0_4px_100px_-30px_#9747FF] text-left">
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
    </div>
  );
};

export default EditProfile;
