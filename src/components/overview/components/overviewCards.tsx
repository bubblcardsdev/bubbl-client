
'use client';
import Image from 'next/image';

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
        <div className="bg-gradient-to-r from-[#1f1f1f] to-[#3b2d4d] rounded-2xl p-6 flex flex-row justify-between h-[150px] hover:border">
          <div>
            <p className="text-[14px] text-white mb-4 text-nowrap">No of Profile</p>
            <p className="text-4xl font-semibold text-[#B97CFF]">05</p>
          </div>
          <Image
            src="/numogprofile.png"
            alt="Profiles"
            width={300}
            height={150}
            className="object-contain mt-4"
          />
        </div>
        <div className="bg-gradient-to-r from-[#1f1f1f] to-[#3b2d4d] rounded-2xl p-6 flex flex-row justify-between h-[150px] hover:border right-0">
          <div>
            <p className="text-[14px] text-white mb-4 text-nowrap">My devices</p>
            <p className="text-4xl font-semibold text-white">03</p>
          </div>
          <Image
            src="/numogprofile.png" 
            alt="Devices"
            width={300}
            height={150}
            className="object-contain mt-4"
          />
        </div>
        <div className="bg-gradient-to-r from-[#1f1f1f] to-[#3b2d4d] rounded-2xl p-6 flex flex-row justify-between h-[150px] hover:border">
          <div>
            <p className="text-[14px] text-white mb-4 text-nowrap">Total taps</p>
            <p className="text-4xl font-semibold text-white">25</p>
          </div>
          <Image
            src="/numogprofile.png" 
            alt="Taps"
            width={1000}
            height={1000}
            className="object-contain mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
