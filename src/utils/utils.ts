import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong") {
  if (axios.isAxiosError(error)) {
    const res = error.response as any;
    // Try the common shapes first, then fall back
    return (
      res?.data?.data?.message ||
      res?.data?.message ||
      res?.data?.error?.message ||
      error.message ||
      fallback
    );
  }
  // Non-axios errors
  if (error && typeof error === "object" && "message" in (error as any)) {
    return (error as any).message || fallback;
  }
  return fallback;
}