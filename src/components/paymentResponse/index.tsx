import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/router";
import { getOrderDetailsService } from "@/src/services/chechout";

interface Product {
  productId: string;
  productName: string;
  productType: string;
  productColor: string | null;
  productMaterial: string | null;
  productSellingPrice: string;
  quantity: number;
  productImages: { signedUrl: string }[];
}

interface PaymentInfo {
  orderNumber: number;
  paymentStatus: string;
  paidAt: string;
  payMethod: string;
  totalPaidAmount: string;
  totalDiscountAmount: string;
  shippingCost: string;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailId: string;
  address: string;
  city: string;
  state: string;
  zipcode: number;
  country: string;
}

const PaymentResponse = () => {
  const router = useRouter();
  const { order_id } = router.query;

  const [products, setProducts] = useState<Product[]>([]);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const firstVisit = sessionStorage.getItem(`visited_${order_id}`);
    if (firstVisit) {
      router.replace("/shop");
      return;
    }
    sessionStorage.setItem(`visited_${order_id}`, "true");
    if (order_id) {
      getOrderDetails();
    }
    router.beforePopState(()=>{
      router.push("/shop") 
      return false; // Prevent default back navigation
    })


  }, [order_id]);

  const getOrderDetails = async () => {
    try {
      const response = await getOrderDetailsService(Number(order_id));

      if (response?.success) {
        setProducts(response.orderObj || []);
        setPaymentInfo(response.paymentObj || null);
        setShippingInfo(response.shippingData || null);
        setError(null);
      } else {
        setError(response?.message || "Order not found");
      }
    } catch (err: any) {
      console.error("Error fetching order details:", err);
      setError("Order not found");
    }
  };

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-600">
        <p className="text-lg font-medium">{error}</p>
        <button
          onClick={() => router.push("/shop")}
          className="mt-4 bg-black text-white px-5 py-2 rounded-lg text-sm hover:opacity-80 transition-all"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  if (!paymentInfo) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-600">
        <p>Loading your payment details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-[1300px] mx-auto mb-12 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md mt-20 relative z-0">
        {/* Success Icon */}
        <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-white border-4 border-white shadow-lg rounded-full p-3 z-10">
          <CheckCircle className="text-green-500 w-12 h-12" />
        </div>

        <div className="pt-16 pb-8 px-6 text-center">
          {/* Header */}
          <h2 className="text-2xl font-semibold inter text-gray-800">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mt-2 inter text-sm">
            Thank you,{" "}
            <span className="font-medium">{shippingInfo?.firstName}</span>! Your
            payment has been processed successfully.
          </p>

          <hr className="my-5 border-gray-200" />

          {/* Amount */}
          <h3 className="text-3xl font-bold text-gray-900 mb-2 inter">
            ₹{Number(paymentInfo.totalPaidAmount).toFixed(2)}
          </h3>
          <p className="text-sm text-gray-500 mb-6 inter">
            Order No: #{paymentInfo.orderNumber}
          </p>

          {/* Product List */}
          <div className="space-y-3">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 hover:bg-gray-100 transition-all rounded-lg p-3"
              >
                <div className="w-16 h-16 flex justify-center items-center bg-white border rounded-md overflow-hidden">
                  <Image
                    src={
                      product.productImages?.[0]?.signedUrl ||
                      "/placeholder.png"
                    }
                    alt={product.productName}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                  />
                </div>
                <div className="ml-4 flex-1 text-left">
                  <p className="font-semibold text-gray-800 text-sm inter">
                    {product.productName}
                  </p>
                  <p className="text-gray-500 text-xs inter mt-1">
                    Qty: {product.quantity}
                  </p>
                </div>
                <p className="text-gray-800 font-semibold text-sm inter">
                  ₹{Number(product.productSellingPrice).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Payment Info */}
          <div className="space-y-3 text-[13px] mt-8">
            <div className="flex justify-between">
              <span className="text-gray-500 inter">Payment Status</span>
              <span className="font-semibold text-green-600 inter">
                {paymentInfo.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 inter">Payment Method</span>
              <span className="font-semibold text-gray-800 inter">
                {paymentInfo.payMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 inter">Paid At</span>
              <span className="font-semibold text-gray-800 inter">
                {new Date(paymentInfo.paidAt).toLocaleString()}
              </span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <span className="text-gray-500 inter">Discount Amount</span>
              <span className="font-semibold text-gray-900 inter">
                ₹{Number(paymentInfo.totalDiscountAmount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 inter">Total Paid</span>
              <span className="font-semibold text-gray-900 inter">
                ₹{Number(paymentInfo.totalPaidAmount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 inter">Shipping Cost</span>
              <span className="font-semibold text-gray-900 inter">
                ₹{Number(paymentInfo.shippingCost).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Shipping Info */}
          {shippingInfo && (
            <div className="text-left mt-8 bg-gray-50 border border-gray-100 rounded-lg p-4 text-[13px] break-words">
              <p className="font-semibold mb-2 text-gray-800 inter">
                Shipping Address
              </p>
              <div className="space-y-1 text-gray-700 inter break-words">
                <p>
                  {shippingInfo.firstName} {shippingInfo.lastName}
                </p>
                <p className="whitespace-pre-wrap break-words">
                  {shippingInfo.address}
                </p>
                <p>
                  {shippingInfo.city}, {shippingInfo.state} -{" "}
                  {shippingInfo.zipcode}
                </p>
                <p>{shippingInfo.country}</p>
                <p className="mt-1">{shippingInfo.phoneNumber}</p>
                <p className="break-all">{shippingInfo.emailId}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Button */}
        <div className="flex justify-center pb-6">
          <button
            onClick={() => router.push("/shop")}
            className="w-[80%] bg-[#121212] text-white py-3 rounded-lg text-sm font-medium hover:opacity-85 transition-all"
          >
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResponse;
