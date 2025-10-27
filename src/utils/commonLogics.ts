import { toast } from "react-toastify";
import { socialLinkRules } from "../lib/constant";

export const openInNewTab = (url: string) => {
  if (!url || typeof url !== "string") {
    console.warn("openInNewTab: Invalid URL", url);
    return;
  }

  const validUrl = url.startsWith("http") ? url : `https://${url}`;
  window.open(validUrl, "_blank", "noopener,noreferrer");
};

export const call = (mobileNumber: string) => {
  const sanitized = mobileNumber?.trim();
  if (!sanitized) {
    console.warn("call(): Invalid or empty mobile number");
    return;
  }
  window.open(`tel:${sanitized}`, "_self");
};

export const isWebsiteLike = (val: string) => {
  // domain.tld[/...], with or without www., and no spaces
  const s = val.trim();
  if (!s || /\s/.test(s)) return false;
  if (/^www\./i.test(s)) return true;
  // instagram.com/user or example.com
  return /^[a-z0-9.-]+\.[a-z]{2,}(?:[/?#].*)?$/i.test(s);
};

export const toHttps = (val: string) => {
  const s = val.trim().replace(/^\/+/, "");
  if (/^https?:\/\//i.test(s)) {
    return s.replace(/^http:\/\//i, "https://");
  }
  return `https://${s}`;
};

export const buildPlatformUrl = (id: number, raw: string) => {
  // remove leading @ and extra slashes
  const clean = raw.trim().replace(/^@/, "").replace(/^\/+/, "");
  switch (id) {
    case 1:
      return `https://www.instagram.com/${clean}`;
    case 2:
      return `https://www.facebook.com/${clean}`;
    case 3:
      return `https://twitter.com/${clean}`;
    case 4:
      return `https://www.youtube.com/${clean}`;
    case 5:
      return `https://www.linkedin.com/in/${clean}`;
    case 6:
      return `https://wa.me/${clean.replace(/[^\d]/g, "")}`;
    default:
      return clean; // fallback (shouldn't happen for 1..6)
  }
};

export const openSocialLinks = (id: number | undefined, value: string) => {
  if (!id) return;
  const url = normalizeSocialLink(id,value)
  console.log(url);
  window.open(url, "_blank", "noopener,noreferrer");
};

export const email = (emailId: string, subject = "", body = "") => {
  const to = emailId?.trim();
  if (!to || !to.includes("@")) {
    console.warn("email(): Invalid email address");
    return;
  }

  const su = encodeURIComponent(subject);
  const bd = encodeURIComponent(body);

  const mailtoUrl = `mailto:${to}?subject=${su}&body=${bd}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bd}`;

  // 1) Try launching default mail handler via a hidden iframe (no navigation)
  let fallbackTimer: number | undefined;
  let visibilityTimer: number | undefined;

  // If the page becomes hidden/blurred right after we try, assume mail app took over
  const cancelFallback = () => {
    if (fallbackTimer) window.clearTimeout(fallbackTimer);
    if (visibilityTimer) window.clearTimeout(visibilityTimer);
    window.removeEventListener("visibilitychange", onVisibilityChange, true);
    window.removeEventListener("pagehide", cancelFallback, true);
    window.removeEventListener("blur", onBlur, true);
  };

  const onVisibilityChange = () => {
    // If the page hides soon after the attempt, a handler likely succeeded
    if (document.visibilityState === "hidden") cancelFallback();
  };

  const onBlur = () => {
    // Many desktop browsers stay visible but lose focus when an external app opens
    cancelFallback();
  };

  try {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.setAttribute("aria-hidden", "true");
    iframe.src = mailtoUrl;
    document.body.appendChild(iframe);

    // 2) Listen for signals that an external handler opened
    window.addEventListener("visibilitychange", onVisibilityChange, true);
    window.addEventListener("pagehide", cancelFallback, true);
    window.addEventListener("blur", onBlur, true);

    // 3) If nothing happened after a short grace period, open Gmail as fallback
    fallbackTimer = window.setTimeout(() => {
      // still here → likely no handler; open Gmail compose
      window.open(gmailUrl, "_blank");
      cancelFallback();
      // cleanup iframe
      try {
        document.body.removeChild(iframe);
      } catch {}
    }, 500);

    // Safety cleanup in case events fire but the timer hasn't executed yet
    visibilityTimer = window.setTimeout(() => {
      try {
        document.body.removeChild(iframe);
      } catch {}
    }, 5000);
  } catch (err) {
    // If iframe approach fails, hard fallback to Gmail
    console.warn("email(): iframe mailto failed, falling back to Gmail.", err);
    window.open(gmailUrl, "_blank");
  }
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
  } catch (err: any) {
    console.error("Clipboard copy failed:", err);
    toast.error("Failed to copy. Please try manually.");
  }
};

export const normalizeSocialLink = (id: number, value: string): string => {
  let url = value;

  // Upgrade http:// to https:// directly
  if (url.startsWith('http')) {
    console.log(url,"1st condition pass")
    return url;
  } else if (isWebsiteLike(url)) {
    // 3) If it seems to be a website link without http/https, prefix https://
    url = toHttps(url);
  } else {
    // 2) Apply socialLinkRules by platform id (username-like input)
    url = buildPlatformUrl(id, encodeURIComponent(url));
  }
  return url;
};
