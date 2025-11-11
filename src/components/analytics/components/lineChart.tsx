"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import { GetTapsData } from "../../../services/analyticsApi";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip
);

const Analytics = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [totalTaps, setTotalTaps] = useState(0);
  const [range, setRange] = useState("Yearly"); // default filter

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        ticks: { color: "#aaa", font: { size: 10 } },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        beginAtZero: true, // ✅ start from 0
        ticks: {
          color: "#aaa",
          font: { size: 10 },
          stepSize: 1, // ✅ force whole numbers
          callback: (value: any) => Math.floor(Number(value)), // ensure integers
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await GetTapsData(range);
  //       if (response?.success) {
  //         let dataArray: any[] = []

  //         if (range === "Weekly") dataArray = response.week || [];
  //         else if (range === "Monthly") dataArray = response.month || [];
  //         else if (range === "Yearly") dataArray = response.year || [];

  //         if (dataArray.length > 0) {
  //           const labels = dataArray.map(
  //             (item) => item?.day || item?.date || item?.month
  //           );
  //           const values = dataArray.map((item) => item?.totalTaps ?? null);

  //           setChartData({
  //             labels,
  //             datasets: [
  //               {
  //                 label: "No of taps",
  //                 data: values,
  //                 borderColor: "#8B5CF6",
  //                 backgroundColor: "#8B5CF6",
  //                 tension: 0.4,
  //                 pointBorderColor: "#fff",
  //                 pointBackgroundColor: "#8B5CF6",
  //                 pointHoverBackgroundColor: "#fff",
  //                 pointHoverBorderColor: "#8B5CF6",
  //                 pointRadius: 4,
  //                 pointHoverRadius: 6,
  //                 spanGaps:false,
  //                 options: {
  //                   scales: {
  //                     y: {
  //                       beginAtZero: true,
  //                     },
  //                   },
  //                 },
  //               },
  //             ],
  //           });
  //         } else {
  //           setChartData(null);
  //         }

  //         setTotalTaps(response.totalTaps || 0);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching tap data:", error);
  //       setChartData(null);
  //       setTotalTaps(0);
  //     }
  //   };

  //   fetchData();
  // }, [range]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetTapsData(range);

        if (response?.success) {
          let dataArray: any[] = [];

          if (range === "Weekly") dataArray = response.week || [];
          else if (range === "Monthly") dataArray = response.month || [];
          else if (range === "Yearly") dataArray = response.year || [];

          // ✅ Filter out invalid entries
          const validData = dataArray.filter((d) => d && d.totalTaps !== null);

          if (validData.length > 0) {
            const labels = validData.map(
              (item) => item.day || item.date || item.month
            );
            const values = validData.map((item) => item.totalTaps ?? 0);

            setChartData({
              labels,
              datasets: [
                {
                  label: "No of Taps",
                  data: values,
                  borderColor: "#8B5CF6",
                  backgroundColor: "rgba(139,92,246,0.2)",
                  tension: 0.4,
                  pointBorderColor: "#fff",
                  pointBackgroundColor: "#8B5CF6",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "#8B5CF6",
                  pointRadius: 4,
                  pointHoverRadius: 6,
                  spanGaps: true, // ✅ allow chart to skip nulls
                },
              ],
            });
          } else {
            setChartData(null);
          }

          setTotalTaps(response.totalTaps || 0);
        } else {
          setChartData(null);
          setTotalTaps(0);
        }
      } catch (error) {
        console.error("Error fetching tap data:", error);
        setChartData(null);
        setTotalTaps(0);
      }
    };

    fetchData();
  }, [range]);
  return (
    <div className="w-full flex justify-center px-2 sm:px-4 lg:px-0">
      <div className="w-full rounded-2xl p-3 sm:p-4 md:p-6 text-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Analytics Free
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 leading-relaxed">
              Real time insights across all bubbl devices. Track your networking
              efforts with easy to use, Click-Level Analytics.
              <br className="hidden sm:block" />
              Never miss a thing with activity history.
            </p>
          </div>
        </div>

        <div className="bg-[#282828] rounded-2xl p-3 sm:p-5">
          <div className="flex flex-row sm:flex-row sm:justify-between xs:justify-between sm:items-center mb-6 gap-4">
            <div className="text-center sm:text-left lg:m-[10px_0_10px_0]">
              <p className="text-gray-400 text-sm mb-2">No of taps</p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                {totalTaps}
              </h3>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2 lg:text-[13px] md:text-[12px] sm:text-[12px] xs:text-[12px]">
              {["Weekly", "Monthly", "Yearly"].map((item) => (
                <button
                  key={item}
                  onClick={() => setRange(item)}
                  className={`px-2 lg:h-[30px] md:h-[30px] sm:h-[24px] xs:h-[24px] rounded-lg transition-colors ${
                    item === range
                      ? "bg-purple-600 text-white"
                      : "bg-[#4F4F4F] text-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="w-full h-[200px] sm:h-[260px] md:h-[300px] lg:h-[360px]">
            {chartData ? (
              <Line data={chartData} options={options} />
            ) : (
              <div className="flex justify-center items-center h-full text-white text-xl">
                No Data!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
