import { StaticImageData } from "next/image";

export interface BreadCrumbsProps {
  value: string;
}

export interface ColorItem<T extends string = string> {
  name: T;
  color: string;
}

export interface ColorSelectorProps<T extends string = string> {
  title: string;
  items: ColorItem<T>[];
  selected: T;
  setSelected: (name: T) => void;
}
export type Mode = "Black" | "White";
export type Color =
  | "Blue"
  | "Pink"
  | "Orange"
  | "LightBlue"
  | "Green"
  | "Purple"
  | "Gray";

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type TitleInfo = {
  title: string;
  description: string;
};
export type TitleMap = Record<string, TitleInfo>;

export type Card = {
  id: number;
  name: string;
  title: string;
  price: string;
  image: string;
  discount: string;
  secondaryImage: StaticImageData;
  colors: string[];
};

export type WhyChooseUsTypes = {
  title: string;
  description: string;
  id: number;
};

export type CartItem = {
  cartId?: number;
  quantity: number;
  productId: string;
  customName: string | null;
  fontId: number | null;
  imageUrl: string;
  sellingPrice: number;
  originalPrice: number;
  discountPercentage: number | string;
  name: string;
  deviceTypeId: number;
  deviceType: string;
};
