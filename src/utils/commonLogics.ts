// export const openInNewTab = (url: string) => {
//     if (!url.startsWith("http")) {
//       url = `https://${url}`;
//     }
//     window.open(url, "_blank", "noopener,noreferrer");
//   };
// src/utils/commonLogics.ts
export const openInNewTab = (url?: string) => {
  if (!url || typeof url !== "string") {
    console.warn("openInNewTab: Invalid URL", url);
    return;
  }
  const validUrl = url.startsWith("http") ? url : `https://${url}`;
  window.open(validUrl, "_blank", "noopener,noreferrer");
};
