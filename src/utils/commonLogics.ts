
import { toast } from "react-toastify";
import { socialLinkRules } from "../lib/constant";


// src/utils/commonLogics.ts
export const openInNewTab = (url: string,socialMediaId?: number) => {
  console.log(url,socialMediaId);
  if (!url || typeof url !== "string") {
    console.warn("openInNewTab: Invalid URL", url);
    return;
  }
  if(url.startsWith("@") && socialMediaId !== undefined){
    url = socialLinkRules[socialMediaId]?.(url);
    window.open(url.slice(1), "_blank", "noopener,noreferrer");
    return;
  }
  
  const validUrl = url.startsWith("http") ? url : `https://${url}`;
  window.open(validUrl, "_blank", "noopener,noreferrer");
};

 export const call = (mobileNumber: string) => {
    window.open(`tel:${mobileNumber}`,"_self");
  };
 export const email = (emailId: string) => {
    window.open(`mailto:${emailId}`,"_self");
  };

export const navigatorShare = async (url: string) => {
  try {
    if (navigator.share && navigator.canShare && navigator.canShare({ url })) {
      await navigator.share({ url });
      // toast.success("Shared successfully!");
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard!");
    }
  } catch (err) {
    // If share fails for any reason, copy to clipboard
    console.log(err);
    
    await navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  }
};

export const copyText = async (links: string) => {
  console.log(links);
  
  try {
    await navigator.clipboard.writeText(links);
    toast.success(`Copied to clipboard: ${links}`);
  } catch (err:any) {
    console.error("Clipboard copy failed:", err);
    toast.error("Failed to copy. Please try manually.");
  }
};

export const normalizeSocialLink = (id: number, value: string): string => {
  if (!value?.trim()) return ""; // empty -> skip
  try {
    // If already a valid URL, return as-is
    new URL(value);
    return value;
  } catch {
    // Otherwise, generate proper URL based on id
    return socialLinkRules[id]?.(value.trim()) || value.trim();
  }
};