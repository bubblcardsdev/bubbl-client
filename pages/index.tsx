import type { Metadata } from "next";
// import localFont from "next/font/local";
import ProductPage from "@/pages/shop/index";
import SiteLayout from "@/src/components/layout/siteLayout";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title:
    "Bubbl Cards - Premium Digital Business Cards | NFC Cutom Business Cards Online.",
  description:
    "Premium Digital Business Cards | NFC Cutom Business Cards Online.",
};

export default function RootLayout() {
  return (
    <SiteLayout>
      <ProductPage />
    </SiteLayout>
  );
}
