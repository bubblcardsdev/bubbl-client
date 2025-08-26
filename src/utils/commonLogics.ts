export const openInNewTab = (url: string) => {
    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };