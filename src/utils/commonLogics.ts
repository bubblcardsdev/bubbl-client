// export const openInNewTab = (url: string) => {
//     if (!url.startsWith("http")) {
//       url = `https://${url}`;
//     }
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

import toast from "react-hot-toast";

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
      toast.success("Shared successfully!");
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
