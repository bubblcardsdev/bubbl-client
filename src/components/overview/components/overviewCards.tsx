"use client";
import Image from "next/image";

const Dashboard = () => {
  return (
    <div className="text-white px-0 py-0 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Hi Sai Kishore,</h1>
        <p className="text-gray-400 text-sm">
          Customize your profile to reflect your professional identity
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-[#1f1f1f] to-[#3b2d4d] rounded-2xl px-6 overflow-hidden flex flex-row justify-between h-[150px] hover:border gap-10">
          <div className="pt-6">
            <p className="text-[14px] text-white mb-4 text-nowrap">
              No of Profile
            </p>
            <p className="text-4xl font-semibold text-[#B97CFF]">05</p>
          </div>
          <div className="flex items-end h-full w-full relative">
              <Image
              src="/profileMock.png"
              alt="Devices"
              width={500}
              height={500}
              className="w-[160px] h-[120px] absolute bottom-[-5px]"
            />
            </div>
        </div>
         <div className="bg-gradient-to-r from-[#1f1f1f] to-[#3b2d4d] rounded-2xl px-6 overflow-hidden flex flex-row justify-between h-[150px] hover:border gap-10">
          <div className="pt-6">
            <p className="text-[14px] text-white mb-4 text-nowrap">
              No of Profile
            </p>
            <p className="text-4xl font-semibold text-[#B97CFF]">05</p>
          </div>
          <div className="flex items-end h-full w-full relative">
              <Image
              src="/mydevices.png"
              alt="Devices"
              width={500}
              height={500}
              className="w-[160px] h-[120px] absolute bottom-[-5px]"
            />
            </div>
        </div> <div className="bg-gradient-to-r from-[#1f1f1f] to-[#3b2d4d] rounded-2xl px-6 overflow-hidden flex flex-row justify-between h-[150px] hover:border gap-10">
          <div className="pt-6">
            <p className="text-[14px] text-white mb-4 text-nowrap">
              No of Profile
            </p>
            <p className="text-4xl font-semibold text-[#B97CFF]">05</p>
          </div>
          <div className="flex items-end w-[100%]  relative">
              <Image
              src="/overview3.png"
              alt="Devices"
              width={407}
              height={540}
              
              className="w-[150px] h-[150px] absolute bottom-[-5px] "
            />
            </div>
        </div>
        {/* <div className="bg-gradient-to-r from-[#1f1f1f] to-[#3b2d4d] rounded-2xl overflow-hidden px-6 flex flex-row justify-between h-[150px] hover:border right-0 gap-10 ">
          <div className="pt-6">
            <p className="text-[14px] text-white mb-4 text-nowrap">
              My devices
            </p>
            <p className="text-4xl font-semibold text-white">03</p>
          </div>
            <div className="flex items-end h-full w-full relative">
              <Image
              src="/mydevices.png"
              alt="Devices"
              width={500}
              height={500}
              className="w-[160px] h-[120px] absolute bottom-[-5px]"
            />
            </div>
        </div>
        <div className="bg-gradient-to-r from-[#1f1f1f] to-[#3b2d4d] rounded-2xl overflow-hidden px-6 flex flex-row justify-between h-[150px] hover:border right-0 gap-10 ">
          <div className="pt-6">
            <p className="text-[14px] text-white mb-4 text-nowrap">
              Total Taps
            </p>
            <p className="text-4xl font-semibold text-white">03</p>
          </div>
            <div className="flex items-end h-full w-full relative">
              <Image
              src="/totalTaps.png"
              alt="Devices"
              width={500}
              height={500}
              className="w-[160px] h-[120px] absolute bottom-[-5px]"
            />
            </div>
          
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
