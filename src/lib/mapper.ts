import { get } from "lodash";

export const ProductDetailMapper = (data: any) => {
  const productId = get(data, "productId", null);
  const name = get(data, "name", null);
  const shortDescription = get(data, "shortDescription", null);
  const originalPrice = get(data, "originalPrice", 0);
  const sellingPrice = get(data, "sellingPrice", 0);
  const deviceDescription = get(data, "deviceDescription", null);
  const productDetails = get(data, "productDetails", null);
  const primaryImage = get(data, "DeviceImageInventories[0].imageUrl", null);
  const secondaryImage = get(data, "DeviceImageInventories[1].imageUrl", null);
  const patternId = get(data, "patternId", null);
  const materialTypeId = get(data, "materialTypeId", null);
  const colorId = get(data, "colorId", null);
  const deviceType = get(data, "deviceType", null);
  const color = get(data, "color", "");
  const material = get(data, "material", "");
  const pattern = get(data, "pattern", "");
  const discountPercentage = get(data, "discountPercentage", 0);
  const deviceTypeId = get(data,"deviceTypeId", null);
  const availability = get(data, "availability", true);
  return {
    productId,
    name,
    shortDescription,
    originalPrice,
    sellingPrice,
    deviceDescription,
    productDetails,
    primaryImage,
    patternId,
    materialTypeId,
    colorId,
    deviceType,
    discountPercentage,
    color,
    material,
    pattern,
    secondaryImage,
    deviceTypeId,
    availability,
  };
};
