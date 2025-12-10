import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface RazorpayButtonProps {
  order: {
    razorpayOrderId: string;
    amount: number;
    currency: string;
    key:string;
  };
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  onSuccess: (response: any) => void;
  onFailure?: (error: any) => void;
}
declare global {
  interface Window {
    Razorpay?: any;
  }
}


export const ProceedToCheckout: React.FC<RazorpayButtonProps> = ({
  order,
  prefill,
  onSuccess,
  onFailure,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
     if (isRazorpayLoaded) {
    handlePayment(); // auto-trigger payment once Razorpay SDK is ready
  }
    const scriptSrc = "https://checkout.razorpay.com/v1/checkout.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;

      script.onload = () => setIsRazorpayLoaded(true);
      script.onerror = () =>
        toast.error("Failed to load Razorpay SDK. Please refresh.");

      document.body.appendChild(script);
    } else {
      setIsRazorpayLoaded(true);
    }

    // return () => {
    //   const loadedScript = document.querySelector(`script[src="${scriptSrc}"]`);
    //   if (loadedScript) loadedScript.remove();
    // };
  }, [isRazorpayLoaded]);

  const handlePayment = () => {
    if (typeof window === "undefined" || !window.Razorpay) {
      toast.error("Razorpay SDK failed to load. Please refresh and try again.");
      return;
    }

    if (!order?.razorpayOrderId || !order?.key) {
      toast.error("Invalid order. Please try again.");
      return;
    }
    if(isLoading) return;

    setIsLoading(true);

    const options = {
      key: order.key,
      amount: order.amount * 100, // Razorpay requires amount in paisa
      currency: order.currency,
      name: "Bubbl Cards",
      description: "Secure payment via Razorpay",
      order_id: order.razorpayOrderId,
      prefill,
      handler: (response: any) => {
        setIsLoading(false);
        onSuccess(response);
      },
      modal: {
        ondismiss: () => {          
          setIsLoading(false);
        
        },
      },
      theme: {
        color: "#9747FF", // Tailwind purple-600
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (response: any) => {
        setIsLoading(false);
        if (onFailure) onFailure(response);

      });
    } catch (err) {
      setIsLoading(false);
      console.error("Razorpay initialization error:", err);
    }
  };

  // ✅ UI
  return (
    <button
      onClick={handlePayment}
      disabled={isLoading || !isRazorpayLoaded}
      className={`w-full flex items-center justify-center bg-purple-600 text-white py-3 px-4 rounded-md font-medium transition-all ${
        isLoading || !isRazorpayLoaded
          ? "opacity-70 cursor-not-allowed"
          : "hover:bg-purple-700"
      }`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
            ></path>
          </svg>
          Processing...
        </>
      ) : !isRazorpayLoaded ? (
        "Loading payment..."
      ) : (
        "Proceed to Payment"
      )}
    </button>
  );
};



export default ProceedToCheckout;
