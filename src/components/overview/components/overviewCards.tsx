"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GetOverViewData } from "../../../services/leadsApi";

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await GetOverViewData(); // Call your API
        if (response?.success) {
          setOverviewData(response?.data); // Adjust according to your API response structure
        }
      } catch (error) {
        console.error("Error fetching overview:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  // Replace with API response mapping
  const cards = [
    { title: "No of Profile", value: overviewData?.totalProfiles || "0", img: "/over2.png" },
    { title: "No of Devices", value: overviewData?.totalDevices || "0", img: "/over1.png" },
    { title: "Total Taps(7days)", value: overviewData?.totalTapCountLast7days || "0", img: "/over3.png" },
  ];

  return (
    <div className="text-white px-4 sm:px-6 lg:px-0 py-6 space-y-8">
      {/* Greeting Section */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold">Hi Sai Kishore,</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Customize your profile to reflect your professional identity
        </p>
      </div>

      {/* Overview Cards */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#1f1f1f] to-[#3b2d4d] 
              rounded-2xl px-6 overflow-hidden flex flex-row justify-between 
              min-h-[140px] sm:min-h-[150px] relative group hover:border border-[#B97CFF]/20"
            >
              {/* Text */}
              <div className="pt-6 flex flex-col justify-between">
                <p className="text-[13px] sm:text-[18px] text-white mb-3 truncate">
                  {card.title}
                </p>
                <p className="text-3xl sm:text-4xl font-semibold text-[#B97CFF] mb-6">
                  {card.value}
                </p>
              </div>

              {/* Image */}
              <div className="flex items-end justify-end w-full relative">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={500}
                  height={500}
                  className="w-[120px] sm:w-[150px] md:w-[140px] h-auto 
                  absolute bottom-0 right-0 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
