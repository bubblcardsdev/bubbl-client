import { CART } from "@/src/context/action";
import { UserContext } from "@/src/context/userContext";
import { verifyPayment } from "@/src/services/chechout";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { dispatch }: any = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = router.query;

  const handleSuccessResponse = async (data: {
    razorpay_payment_id?: string | string[];
    razorpay_order_id?: string | string[];
    razorpay_signature?: string | string[];
  }) => {
    if (!data.razorpay_payment_id || !data.razorpay_order_id || !data.razorpay_signature)
      return;

    try {
      const verified = await verifyPayment(
        data.razorpay_payment_id.toString(),
        data.razorpay_order_id.toString(),
        data.razorpay_signature.toString()
      );

      if (verified && verified?.success && verified?.order_id) {
        localStorage.removeItem("cartItems");
        dispatch({ type: CART, payload: [] });
        router.push(`/paymentResponse?order_id=${verified?.order_id}`);
      } else {
        console.error("Payment verification failed");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error in verifying payment:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
      handleSuccessResponse({ razorpay_payment_id, razorpay_order_id, razorpay_signature });
    }
  }, [razorpay_payment_id, razorpay_order_id, razorpay_signature]);

  return (
    <div className="h-[calc(100vh-60px)] flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl px-10 py-8 text-center w-[340px]">
        <h1 className="text-xl font-semibold text-gray-800 mb-3">
          You&apos;re Almost Done!
        </h1>
        {loading ? (
          <>
            <p className="text-gray-600">We&apos;re processing your order details.</p>
            <p className="text-gray-600 mb-5">
              Redirecting to payment confirmation shortly...
            </p>
            <div className="flex justify-center">
              <Loader2 className="text-purple-600 animate-spin w-6 h-6" />
            </div>
          </>
        ) : (
          <p className="text-red-500">Payment verification failed. Please try again.</p>
        )}
      </div>
    </div>
  );
}
