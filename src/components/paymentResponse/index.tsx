import React from 'react'
import Image from "next/image";
import Footer from '../footerPage/index'
import { CheckCircle } from 'lucide-react';
import Card from '../../assets/product/productCardImg/basiccard.png'
const PaymentResponse = () => {
  return (
    <>
      <div className='flex flex-col justify-center items-center  max-w-[1300px] mx-auto'>
        <div className="bg-white p-4  pt-[80px] sm:px-6 xs:px-6  ">
          <div className="shadow-2xl  w-[380px] max-w-md text-center relative  rounded-t-2xl mt-6 ">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg- p-3 rounded-full border border-white shadow-lg">
              <CheckCircle className="text-green-400  w-8 h-8" size={24} />
            </div>
            <div className=' h-[500px] overflow-hidden'>
              <div className=' p-7'>
                <h2 className="text-lg font-semibold mt-8 inter">Payment Success!</h2>
                <p className="text-[#474747] inter">Your payment has been successfully done.</p>
                <hr className="my-4" />
                <p className='text-[16px] text-[#474747] inter'>Payment Success!</p>
                <h3 className="text-xl font-bold inter">INR 699</h3>
                <div className="flex items-center bg-[#F9F9F9] rounded-lg p-4 my-4">
                  <div className='bg-[#F5F5F5] w-20 h-12 flex justify-center items-center rounded-md'>
                    <Image src={Card} alt="Card" width={50} height={30} className="rounded" />
                  </div>
                  <div className="ml-3 text-left w-full text-nowrap">
                    <p className='inter text-gray-400'>card</p>
                    <p className="text-sm font-semibold inter">Bubbl basic card x1</p>
                  </div>
                  <p className="text-black font-[600] inter">₹699/-</p>
                </div>
                {/* Product Details */}
                <div className="space-y-2 text-[12px] ">
                  <div className="flex justify-between">
                    <span className="text-gray-600 inter">Ref Number</span>
                    <span className='inter text-[#121212]  font-[600]'>000085752257</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 inter">Payment Time</span>
                    <span className='inter text-[#121212] font-[600]'>25-02-2023, 13:22:16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 inter">Payment Method</span>
                    <span className='inter text-[#121212]  font-[600]'>Bank Transfer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 inter">Sender Name</span>
                    <span className='inter text-[#121212]  font-[600]'>Antonio Roberto</span>
                  </div>
                  <p className='border b'></p>
                  <div className="flex justify-between ">
                    <span className="text-gray-600 inter">Amount</span>
                    <span className='inter text-[#121212]  font-[600]'>INR 699</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 inter">GST</span>
                    <span className='inter text-[#121212]  font-[600]'>INR xx.00</span>
                  </div>
                </div>
                
              </div>
              <div className="w-full  mt-0 ">
                <div className="flex justify-evenly ">
                  {[...Array(19)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-[#E6E6E6] rounded-full opacity-3" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6 sm:px-4 xs:px-4 text-[14px]">
            <button className="w-1/2 border border-black text-black py-2 rounded-lg mr-2 inter">Login</button>
            <button className="w-1/2 bg-[#292929] text-white py-2 rounded-lg inter">Back to Shop</button>
          </div>
        </div>
      </div>
      <div className='bg-black lg:px-0 md:px-10 sm:px-10 xs:px-4'>
      <Footer />
      </div>
    </>
  )
}

export default PaymentResponse

