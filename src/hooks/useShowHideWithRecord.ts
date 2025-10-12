import { useState } from "react";

export const useShowHideWithRecord = (initial: any) => {
  const [object, setObject] = useState(initial);
  const onShow = (
    visibleKey: string,
    datakey: string,
    data: any,
    title: string
  ) => {
    setObject({ ...object, [visibleKey]: true, [datakey]: data, title: title });
  };

  const onHide = () => {
    setObject(initial);
  };

  const onToggle = (visibleKey: string) => {
    setObject({ ...object, [visibleKey]: false });
  };
  return { object, onShow, onHide, onToggle };
};
