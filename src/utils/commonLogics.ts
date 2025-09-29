// export const openInNewTab = (url: string) => {
//     if (!url.startsWith("http")) {
//       url = `https://${url}`;
//     }
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

import { toast } from "react-toastify";
import { socialLinkRules } from "../lib/constant";


// src/utils/commonLogics.ts
export const openInNewTab = (url?: string) => {
  if (!url || typeof url !== "string") {
    console.warn("openInNewTab: Invalid URL", url);
    return;
  }
  const validUrl = url.startsWith("http") ? url : `https://${url}`;
  window.open(validUrl, "_blank", "noopener,noreferrer");
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
    await navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  }
};

export const copyText = async (links: string) => {
  console.log(links);
  
  try {
    await navigator.clipboard.writeText(links);
    toast.success(`Copied to clipboard: ${links}`);
  } catch (err) {
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