import {
  Googlepay_icon,
  Phonepay_icon,
  Paytm_icon,
  Instagram_icon,
  Facebook_icon_thin,
  OpalYoutubeIcon,
  Twitter_icon_thin,
  OpalWhatsappIcon,
  Linkedin_icon_thin,
} from "../components/common/icons";
import { FAQItem, StepConfig, WhyChooseUsTypes } from "./interface";

export const themeObject: { [key: string]: string } = {
  "/home": "linear-gradient(to right, #4A4A4A, #000000)",
  "/": "linear-gradient(to right, #4A4A4A, #000000)",
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
    title: "Pick your card",
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
    title: "Customize your profile",
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
    title: "Tap to share",
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

export const testimonial = [
  {
    id: 1,
    src: "/HomePageIcons/Rasoee.png",
    alt: "Rasone",
    description:
      "We wanted something that felt personal yet professional—and bubbl.cards delivered exactly that. Our digital menus and chef intros now feel alive!",
    profile: "/HomePageIcons/treeImg.png",
    username: "Co-founder of Rasoee",
    name: "Rohan Mehta",
  },
  {
    id: 2,
    src: "/HomePageIcons/boom.png",
    alt: "Boom Card",
    description:
      "As a car dealership, first impressions matter. Bubbl.cards helped us create sleek, dynamic profiles for our sales team that truly stand out.",
    profile: "/HomePageIcons/treeImg.png",
    username: "Ankit Verma",
    name: "Sales Director at Boom Cars",
  },
  {
    id: 3,
    src: "/HomePageIcons/prateek.png",
    alt: "Rasone",
    description:
      "We’ve always believed in innovation, and bubbl.cards fits right into that vision. It’s not just a card—it’s a conversation starter",
    profile: "/HomePageIcons/treeImg.png",
    username: "Brand Strategist at Prateek",
    name: "Priya Nair",
  },
  {
    id: 4,
    src: "/HomePageIcons/shradha.png",
    alt: "Boom Cards",
    description:
      "Running an artisanal ice cream store means every detail matters—from flavor to presentation. Bubbl.cards gave our brand a delightful digital twist. Now, our team shares their scoops and smiles with cards that are as sweet and colorful as our creations!",
    profile: "/HomePageIcons/treeImg.png",
    username: "Founder of Lulla’s Creamery",
    name: "Sharadha Lulla",
  },
  {
    id: 5,
    src: "/HomePageIcons/Lanson.png",
    alt: "Lanson",
    description:
      "Bubbl.cards helped us digitize our customer touchpoints with flair. From service advisors to showroom staff, everyone now has a card that speaks volumes.",
    profile: "/HomePageIcons/treeImg.png",
    username: "Customer Experience Manager at Lanson Toyota",
    name: "Vikram Iyer",
  },
  {
    id: 6,
    src: "/HomePageIcons/Aroma.png",
    alt: "Boom Cards",
    description:
      "Bubbl.cards transformed the way we connect with our customers. The interactive digital cards added a fresh, modern touch to our brand. Our clients love the experience!",
    profile: "/HomePageIcons/treeImg.png",
    username: "Marketing Head at Aroma",
    name: "Neha Kapoor",
  },
];

export const PRODUCTS = [
  {
    id: 4,
    name: "Basic Card",
    title: "Bubbl Basic Card",
    price: "Rs.999",
    image: "/productCardImg/basiccard.png",
    discount: "18.77%",
    secondaryImage: "/productCardImg/basiccard.png",
    colors: ["black", "blue", "green", "yellow", "red", "white", "purple"],
  },
  {
    id: 5,
    name: "Socket",
    title: "Bubbl Socket",
    price: "Rs.799",
    image: "/productCardImg/socket.png",
    discount: "18.77%",
    secondaryImage: "/productCardImg/socket.png",
    colors: ["black", "blue", "green", "yellow", "red", "white", "purple"],
  },
  {
    id: 6,
    name: "Tile",
    title: "Bubbl Tile",
    price: "Rs.1999",
    image: "/productCardImg/tile.png",
    discount: "18.77%",
    secondaryImage: "/productCardImg/tile.png",
    colors: ["black", "blue", "green", "yellow", "red", "white", "purple"],
  },
];

export const LOGIN_IMAGES = [
  "/images/blackMetal.jpg",
  "/images/green.jpg",
  "/images/blueMetal.jpg",
  "/images/metalicBlue.jpg",
  "/images/mintBlue.jpg",
  "/images/orangeMetal.jpg",
  "/images/purpleMetal.jpg",
  "/images/redMetal.jpg",
];

export const BACKEND_URI: string | undefined =
  process.env.NEXT_PUBLIC_BACKEND_URI;

export const WHY_CHOOSE_US: WhyChooseUsTypes[] = [
  {
    id: 1,
    title: "Cutting-Edge NFC Technology",
    description:
      "Share your contact details with just a tap—no apps or setup needed. Seamlessly connect with any smartphone, making networking faster and smarter than ever.",
  },
  {
    id: 2,
    title: "Fully Customizable Designs",
    description:
      "Share your contact details with just a tap—no apps or setup needed. Seamlessly connect with any smartphone, making networking faster and smarter than ever.",
  },
  {
    id: 3,
    title: "Seamless and Eco-Friendly",
    description:
      "Share your contact details with just a tap—no apps or setup needed. Seamlessly connect with any smartphone, making networking faster and smarter than ever.",
  },
  {
    id: 4,
    title: "Dedicated Customer Support",
    description:
      "Share your contact details with just a tap—no apps or setup needed. Seamlessly connect with any smartphone, making networking faster and smarter than ever.",
  },
];

export const countryCodesData = [
  { code: "+1", name: "United States", iso: "US", flag: "🇺🇸" },
  { code: "+91", name: "India", iso: "IN", flag: "🇮🇳" },
  { code: "+44", name: "United Kingdom", iso: "GB", flag: "🇬🇧" },
  { code: "+61", name: "Australia", iso: "AU", flag: "🇦🇺" },
  { code: "+81", name: "Japan", iso: "JP", flag: "🇯🇵" },
  { code: "+49", name: "Germany", iso: "DE", flag: "🇩🇪" },
  { code: "+33", name: "France", iso: "FR", flag: "🇫🇷" },
  { code: "+39", name: "Italy", iso: "IT", flag: "🇮🇹" },
  { code: "+86", name: "China", iso: "CN", flag: "🇨🇳" },
  { code: "+7", name: "Russia", iso: "RU", flag: "🇷🇺" },
  { code: "+34", name: "Spain", iso: "ES", flag: "🇪🇸" },
  { code: "+971", name: "United Arab Emirates", iso: "AE", flag: "🇦🇪" },
  { code: "+974", name: "Qatar", iso: "QA", flag: "🇶🇦" },
  { code: "+966", name: "Saudi Arabia", iso: "SA", flag: "🇸🇦" },
  { code: "+65", name: "Singapore", iso: "SG", flag: "🇸🇬" },
  { code: "+60", name: "Malaysia", iso: "MY", flag: "🇲🇾" },
  { code: "+92", name: "Pakistan", iso: "PK", flag: "🇵🇰" },
  { code: "+880", name: "Bangladesh", iso: "BD", flag: "🇧🇩" },
  { code: "+93", name: "Afghanistan", iso: "AF", flag: "🇦🇫" },
  { code: "+213", name: "Algeria", iso: "DZ", flag: "🇩🇿" },
  { code: "+54", name: "Argentina", iso: "AR", flag: "🇦🇷" },
  { code: "+43", name: "Austria", iso: "AT", flag: "🇦🇹" },
  { code: "+973", name: "Bahrain", iso: "BH", flag: "🇧🇭" },
  { code: "+32", name: "Belgium", iso: "BE", flag: "🇧🇪" },
  { code: "+591", name: "Bolivia", iso: "BO", flag: "🇧🇴" },
  { code: "+55", name: "Brazil", iso: "BR", flag: "🇧🇷" },
  { code: "+359", name: "Bulgaria", iso: "BG", flag: "🇧🇬" },
  { code: "+855", name: "Cambodia", iso: "KH", flag: "🇰🇭" },
  { code: "+1", name: "Canada", iso: "CA", flag: "🇨🇦" },
  { code: "+56", name: "Chile", iso: "CL", flag: "🇨🇱" },
  { code: "+57", name: "Colombia", iso: "CO", flag: "🇨🇴" },
  { code: "+420", name: "Czech Republic", iso: "CZ", flag: "🇨🇿" },
  { code: "+45", name: "Denmark", iso: "DK", flag: "🇩🇰" },
  { code: "+20", name: "Egypt", iso: "EG", flag: "🇪🇬" },
  { code: "+372", name: "Estonia", iso: "EE", flag: "🇪🇪" },
  { code: "+358", name: "Finland", iso: "FI", flag: "🇫🇮" },
  { code: "+995", name: "Georgia", iso: "GE", flag: "🇬🇪" },
  { code: "+30", name: "Greece", iso: "GR", flag: "🇬🇷" },
  { code: "+852", name: "Hong Kong", iso: "HK", flag: "🇭🇰" },
  { code: "+36", name: "Hungary", iso: "HU", flag: "🇭🇺" },
  { code: "+354", name: "Iceland", iso: "IS", flag: "🇮🇸" },
  { code: "+62", name: "Indonesia", iso: "ID", flag: "🇮🇩" },
  { code: "+98", name: "Iran", iso: "IR", flag: "🇮🇷" },
  { code: "+964", name: "Iraq", iso: "IQ", flag: "🇮🇶" },
  { code: "+353", name: "Ireland", iso: "IE", flag: "🇮🇪" },
  { code: "+972", name: "Israel", iso: "IL", flag: "🇮🇱" },
  { code: "+254", name: "Kenya", iso: "KE", flag: "🇰🇪" },
  { code: "+965", name: "Kuwait", iso: "KW", flag: "🇰🇼" },
  { code: "+371", name: "Latvia", iso: "LV", flag: "🇱🇻" },
  { code: "+370", name: "Lithuania", iso: "LT", flag: "🇱🇹" },
  { code: "+352", name: "Luxembourg", iso: "LU", flag: "🇱🇺" },
  { code: "+960", name: "Maldives", iso: "MV", flag: "🇲🇻" },
  { code: "+52", name: "Mexico", iso: "MX", flag: "🇲🇽" },
  { code: "+212", name: "Morocco", iso: "MA", flag: "🇲🇦" },
  { code: "+31", name: "Netherlands", iso: "NL", flag: "🇳🇱" },
  { code: "+64", name: "New Zealand", iso: "NZ", flag: "🇳🇿" },
  { code: "+47", name: "Norway", iso: "NO", flag: "🇳🇴" },
  { code: "+968", name: "Oman", iso: "OM", flag: "🇴🇲" },
  { code: "+51", name: "Peru", iso: "PE", flag: "🇵🇪" },
  { code: "+63", name: "Philippines", iso: "PH", flag: "🇵🇭" },
  { code: "+48", name: "Poland", iso: "PL", flag: "🇵🇱" },
  { code: "+351", name: "Portugal", iso: "PT", flag: "🇵🇹" },
  { code: "+40", name: "Romania", iso: "RO", flag: "🇷🇴" },
  { code: "+27", name: "South Africa", iso: "ZA", flag: "🇿🇦" },
  { code: "+82", name: "South Korea", iso: "KR", flag: "🇰🇷" },
  { code: "+94", name: "Sri Lanka", iso: "LK", flag: "🇱🇰" },
  { code: "+46", name: "Sweden", iso: "SE", flag: "🇸🇪" },
  { code: "+41", name: "Switzerland", iso: "CH", flag: "🇨🇭" },
  { code: "+886", name: "Taiwan", iso: "TW", flag: "🇹🇼" },
  { code: "+66", name: "Thailand", iso: "TH", flag: "🇹🇭" },
  { code: "+90", name: "Turkey", iso: "TR", flag: "🇹🇷" },
  { code: "+998", name: "Uzbekistan", iso: "UZ", flag: "🇺🇿" },
  { code: "+84", name: "Vietnam", iso: "VN", flag: "🇻🇳" },
  { code: "+967", name: "Yemen", iso: "YE", flag: "🇾🇪" },
];

export const SIGNUP_STEPS: StepConfig[] = [
  {
    title: "Welcome Aboard!",
    subtitle: "Let's set up your account for a seamless experience",
  },
  {
    title: "Your Work, Your Way",
    subtitle: "Describe your work to customize tools and resources",
  },
  {
    title: "Let's Make Connection Simple",
    subtitle:
      "Share your contact info to ensure smooth effortless connectivity",
  },
  {
    title: "You're All Set",
    subtitle: "Now, save your card by signing up below.",
  },
];

export const DigitalIconsObj: any = {
  "1": Googlepay_icon,
  "2": Phonepay_icon,
  "3": Paytm_icon,
};

export const SocialIconsObj: any = {
  "1": Instagram_icon, // Instagram
  "2": Facebook_icon_thin, // Facebook
  "3": OpalYoutubeIcon, // Youtube
  "4": Twitter_icon_thin, // Twitter
  "5": OpalWhatsappIcon, // WhatsApp
  "6": Linkedin_icon_thin, // LinkedIn
};

//   const colorTemplateMap = {
//   1: [
//     "#9000FF",
//     "#1F87FA",
//     "#FF00A3",
//     "#4BC100",
//     "#00BCB6",
//     "#FF6700",
//     "#2E2E2E",
//   ],
//   2: [
//     "#F53232",
//     "#0082E1",
//     "#635DD4",
//     "#4F4F4F",
//     "#FB794A",
//     "#1BA64C",
//     "#FBC529",
//   ],
//   3: [
//     "#1F87FA",
//     "#FF00A3",
//     "#4BC100",
//     "#9000FF",
//     "#00BCB6",
//     "#FF6700",
//     "#2E2E2E",
//   ],
//   4: [
//     "#8D00D2",
//     "#D94A3F",
//     "#8D7310",
//     "#00B053",
//     "#7A6F56",
//     "#00787F",
//     "#4F4F4F",
//   ],
//   5: [
//     "#aa22ec",
//     "#1494a1",
//     "#5b99cc",
//     "#177efa",
//     "#f78e38",
//     "#fd8491",
//     "#b5e872",
//   ],
// };

export const SOCIAL_MEDIA_IDS: Record<number, string> = {
  1: "instagram",
  2: "facebook",
  3: "twitter",
  4: "youtube",
  5: "linkedin",
  6: "whatsApp",
};
export const actions = {
  tap: 1,
  leads: 2,
  contact: 3,
  phone: 4,
  email: 5,
  website: 6,
  location: 7,
  instagram: 8,
  linkedin: 9,
  twitter: 10,
  facebook: 11,
  youtube: 12,
  gpay: 13,
  phonepe: 14,
  paytm: 15,
  qr: 16,
};

export const CONTACT_LINKS_ID: Record<number, string> = {
  3: "contact",
  4: "phone",
  5: "email",
  6: "website",
  7: "location",
};

export const DIGITAL_MEDIA_IDS: Record<number, string> = {
  1: "gpay",
  2: "phonepe",
  3: "paytm",
};

export type ActionKeys = keyof typeof actions;

export const socialLinkRules: Record<number, (input: string) => string> = {
  1: (val) => `https://www.instagram.com/${val}`, // Instagram
  2: (val) => `https://www.facebook.com/${val}`, // Facebook
  3: (val) => `https://www.youtube.com/${val}`, // YouTube
  4: (val) => `https://twitter.com/${val}`, // Twitter
  5: (val) => `https://wa.me/${val}`, // WhatsApp
  6: (val) => `https://www.linkedin.com/in/${val}`, // LinkedIn
};

export const MODES = [
  {
    value: 2,
    label: "Bubbl profile",
  },
  {
    value: 3,
    label: "Direct URL",
  },
];


