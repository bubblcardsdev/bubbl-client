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
  export  type Mode = 'Black' | 'White';
export type Color =
  | 'Blue'
  | 'Pink'
  | 'Orange'
  | 'LightBlue'
  | 'Green'
  | 'Purple'
  | 'Gray';

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export interface FAQItem {
  question: string;
  answer: string;
}