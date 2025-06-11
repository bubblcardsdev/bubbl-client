import { FAQItem } from "./interface";

export const themeObject: { [key: string]: string } = {
  "/home": "linear-gradient(to right, #4A4A4A, #000000)",
  "/plans": "black",
  "/contact": "black",
  "/compatibility": "black",
  "/about": "black",
  "/blog/[id]": "black",
};
//"linear-gradient(to right, #4A4A4A, #000000)"

export const imageObj = {
  Black: {
    Blue: "/HomePageIcons/dmBlue.png",
    Pink: "/HomePageIcons/dmPink.png",
    Orange: "/HomePageIcons/dmOrange.png",
    LightBlue: "/HomePageIcons/dmLightBlue.png",
    Green: "/HomePageIcons/dmGreen.png",
    Purple: "/HomePageIcons/dmPurple.png",
    Gray: "/HomePageIcons/dmGray.png",
  },
  White: {
    Blue: "/HomePageIcons/lmBlue.png",
    Pink: "/HomePageIcons/lmPink.png",
    Orange: "/HomePageIcons/lmOrange.png",
    LightBlue: "/HomePageIcons/lmLightBlue.png",
    Green: "/HomePageIcons/lmGreen.png",
    Purple: "/HomePageIcons/lmPurple.png",
    Gray: "/HomePageIcons/lmGray.png",
  },
};

export const STEPS = [
  {
    number: 1,
    icon: "/HomePageIcons/icon1.png",
    title: "Choose bubbl card",
    description:
      "Choose from our Bubbl Basics or design a custom card. It's your choice.",
    img: "/HomePageIcons/step1.png",
    height: 421,
    width: 302,
    css: "10%",
  },
  {
    number: 2,
    icon: "/HomePageIcons/icon2.png",
    title: "Set up your profile",
    description:
      "Tap your device to your phone to activate the link, follow the instructions to create your profile",
    img: "/HomePageIcons/step2.png",
    height: 1866,
    width: 1500,
    css: "-5%",
  },
  {
    number: 3,
    icon: "/HomePageIcons/icon3.png",
    title: "Network like a pro",
    description:
      "You can now tap and share your contact info, social media handles and so much more with your own Bubbl.",
    img: "/HomePageIcons/step3.png",
    height: 386,
    width: 385,
    css: "-5%",
  },
];

export const LOGOS = [
  {
    logo: "/assets/Homeimg/safvolt.png",
    place: "Savfolt",
    width: 220,
    height: 110,
  },
  {
    logo: "/assets/Homeimg/mynerva.png",
    place: "Savfolt",
    width: 220,
    height: 110,
  },
  { logo: "/assets/Homeimg/thejo.png", place: "Thejo", width: 100, height: 50 },
  {
    logo: "/assets/Homeimg/mynerva.png",
    place: "Thejo",
    width: 220,
    height: 110,
  },
  {
    logo: "/assets/Homeimg/safvolt.png",
    place: "Savfolt",
    width: 220,
    height: 110,
  },
  {
    logo: "/assets/Homeimg/mynerva.png",
    place: "Savfolt",
    width: 220,
    height: 110,
  },
  { logo: "/assets/Homeimg/thejo.png", place: "Thejo", width: 100, height: 50 },
  {
    logo: "/assets/Homeimg/mynerva.png",
    place: "Thejo",
    width: 220,
    height: 110,
  },
];

export const FAQ: FAQItem[] = [
  {
    question: "What is Bubbl, and what service does it offer?",
    answer:
      "Bubbl is a digital business card platform that allows professionals to share their contact information and professional profiles seamlessly. Our service offers a modern alternative to traditional paper business cards, enabling users to share their details instantly through smartphones with just a tap. Bubbl combines technology with networking to create meaningful professional connections in today's digital-first world.",
  },
  {
    question: "Do I need to download any app to use this product?",
    answer:
      "No, you don't need to download a separate app to use Bubbl. Our platform works through web browsers, making it accessible on any device with internet connectivity. Recipients of your digital business card can view your profile instantly without installing anything. This approach ensures maximum compatibility and convenience for both you and your contacts.",
  },
  {
    question: "How long it will take to receive my products?",
    answer:
      "Physical Bubbl products (such as NFC-enabled cards or tags) typically ship within 2-3 business days after order confirmation. Delivery time depends on your location, but most customers receive their products within 5-7 business days. Your digital profile is available immediately after registration, allowing you to start sharing your digital business card right away, even before your physical products arrive.",
  },
  {
    question:
      "What features does Bubbl offer for user customization and interaction?",
    answer:
      "Bubbl offers extensive customization options including personalized profiles with custom colors, fonts, and layouts. Users can add social media links, portfolio items, videos, and downloadable files. Our interactive features include direct contact options, appointment scheduling integration, and real-time analytics to track engagement. Premium users can access advanced customization tools such as custom domains and animated elements to make their digital business cards truly unique.",
  },
  {
    question:
      "Which phones are compatiable or Will it work with all the phones?",
    answer:
      "Bubbl is compatible with virtually all modern smartphones, including both Android and iOS devices. For NFC functionality, your phone needs to have NFC reading capability, which most smartphones manufactured after 2018 include. For phones without NFC capabilities, our platform offers alternative sharing methods such as QR codes and direct links, ensuring that everyone can access your digital business card regardless of their device specifications.",
  },
  {
    question: "What are the benefits of using digital business cards?",
    answer:
      "Digital business cards offer numerous advantages over traditional paper cards. They're eco-friendly, eliminating paper waste. They provide real-time updates, so your contacts always have your current information. They offer enhanced tracking and analytics to see who views your profile. Digital cards can include much more information than physical cards, including portfolios, videos, and booking links. They're also cost-effective in the long run, eliminating the need for reprinting when your information changes.",
  },
  {
    question: "Does bubbl require a subscription to use?",
    answer:
      "Bubbl offers both free and premium subscription options. The free tier provides basic digital business card functionality with limited customization. Our premium subscriptions unlock additional features such as advanced analytics, unlimited customization options, removal of Bubbl branding, and priority customer support. We offer monthly and annual subscription plans with discounts for annual commitments. For enterprise solutions, we provide custom pricing based on team size and specific requirements.",
  },
];
