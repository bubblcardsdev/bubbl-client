import { initiatePayment } from "@/src/services/chechout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProcessPayment = () => {
  const router = useRouter();
  const orderId = router?.query?.orderId;
  const orderType = router?.query?.orderType;
  const token = router?.query?.token as string;

  const [htmlString, setHtmlString] = useState<string>("");
  const fetchPaymentData = async () => {
    try {
    //   if (!orderId || !orderType || !token) return;
      const response = await initiatePayment({
        orderId: Number(orderId),
        orderType: Number(orderType),
        token: token,
      });
      setHtmlString(response?.formbody || "");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
   if (orderId && orderType && token) fetchPaymentData();
  }, [orderId, orderType, token]);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlString }}
    ></div>
  );
};

export default ProcessPayment;
