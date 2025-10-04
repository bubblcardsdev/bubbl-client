"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
import {
  GetSocialTaps,
  GetContactTaps,
  GetPaymentTaps,
  GetDeviceType,
  GetModeUsageType,
} from "../../../services/analyticsApi";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface DonutChartProps {
  title: string;
  data: any;
  name: string;
  filter: Record<string, any>;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
}

const CHART_COLORS = ["#c084fc", "#a855f7", "#6d28d9", "#4c1d95", "#d8b4fe"];

const CHART_OPTIONS = {
  cutout: "55%",
  plugins: {
    legend: {
      labels: { color: "#aaa", boxWidth: 12 },
      position: "bottom" as const,
    },
  },
};

function DonutChart({ title, data, name, filter, setFilter }: DonutChartProps) {
  const isNoData =
    !data ||
    data?.datasets?.[0]?.data?.reduce((a: number, b: number) => a + b, 0) == 0;
  return (
    <div className="text-white p-4 rounded-xl shadow-md flex-1 bg-[#282829]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <select
          value={filter?.[name]?.range}
          onChange={(e) =>
            setFilter((prev: any) => ({
              ...prev,
              [name]: {
                ...prev[name],
                range: e.target.value,
              },
            }))
          }
          className="px-2 py-1 text-[12px] bg-[#4F4F4F] rounded-md"
        >
          <option value="Weekly">Weekly </option>
          <option value="Monthly">Monthly </option>
          <option value="Yearly">Yearly </option>
        </select>
      </div>
      {/* {isNoData && (
        <div className="h-52 w-full flex items-center justify-center ">
          <p className="text-center">No Data !</p>
        </div>
      )} */}
      {/* {!isNoData && ( */}
        <div className="w-full h-52 flex items-center justify-center">
          
          <Doughnut data={data} options={CHART_OPTIONS} />
        </div>
      {/* )} */}
    </div>
  );
}

export default function AnalyticsPro() {
  const INITIAL_DATA = {
    deviceType: {
      labels: ["Android", "IOS", "Other"],
      datasets: [
        {
          data: [40, 30, 20],
          backgroundColor: CHART_COLORS,
          spacing: 5,
          borderWidth: 0,
          borderRadius: 3,
        },
      ],
    },
    modeUsage: {
      labels: ["Contact Card", "Direct URL", "Bubbl Profile", "Lead Form"],
      datasets: [
        {
          data: [25, 20, 15, 10],
          backgroundColor: CHART_COLORS,
          spacing: 5,
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    },
    socialMedia: {
      labels: ["Instagram", "Twitter", "Youtube", "LinkedIn", "Facebook"],
      datasets: [
        {
          data: [20, 10, 15, 18, 12],
          backgroundColor: CHART_COLORS,
          spacing: 5,
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    },
    paymentTap: {
      labels: ["Gpay", "PhonePe", "Paytm"],
      datasets: [
        {
          data: [40, 25, 20],
          backgroundColor: CHART_COLORS,
          spacing: 5,
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    },
    contactTap: {
      labels: ["Contact", "Email", "Phone", "Website"],
      datasets: [
        {
          data: [30, 15, 25, 20],
          backgroundColor: CHART_COLORS,
          spacing: 8,
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    },
  };

  const [chartData, setChartData] = useState<any>(INITIAL_DATA);

  const [filter, setFilter] = useState({
    deviceType: { deviceId: "All", range: "Weekly" },
    modeUsage: { deviceId: "All", range: "Weekly" },
    socialMedia: { deviceId: "All", range: "Weekly" },
    paymentTap: { deviceId: "All", range: "Weekly" },
    contactTap: { deviceId: "All", range: "Weekly" },
  });

  // 🔹 Social Media
  useEffect(() => {
    const fetchSocialTaps = async () => {
      try {
        const response = await GetSocialTaps(filter?.socialMedia);

        if (response?.success && response?.finalData) {
          const names = response.finalData.map((item: any) => item.name);
          const values = response.finalData.map((item: any) => item.count);

          setChartData((prev: any) => ({
            ...prev,
            socialMedia: {
              labels: names,
              datasets: [
                {
                  data: values,
                  backgroundColor: CHART_COLORS,
                  spacing: 5,
                  borderWidth: 0,
                  borderRadius: 4,
                },
              ],
            },
          }));
        } else {
          setChartData((prev: any) => {
            const updated = { ...prev };
            delete updated.socialMedia;
            return updated;
          });
        }
      } catch (error) {
        console.error("Error fetching social taps:", error);
        setChartData((prev: any) => {
          const updated = { ...prev };
          delete updated.socialMedia;
          return updated;
        });
      }
    };

    fetchSocialTaps();
  }, [filter?.socialMedia]);

  // 🔹 Contact Taps
  useEffect(() => {
    const fetchContactTaps = async () => {
      try {
        const response = await GetContactTaps(filter?.contactTap);

        if (response?.success && response?.finalData) {
          const names = response.finalData.map((item: any) => item.name);
          const values = response.finalData.map((item: any) => item.count);

          setChartData((prev: any) => ({
            ...prev,
            contactTap: {
              labels: names,
              datasets: [
                {
                  data: values,
                  backgroundColor: CHART_COLORS,
                  spacing: 5,
                  borderWidth: 0,
                  borderRadius: 4,
                },
              ],
            },
          }));
        } else {
          setChartData((prev: any) => {
            const updated = { ...prev };
            delete updated.contactTap;
            return updated;
          });
        }
      } catch (error) {
        console.error("Error fetching contact taps:", error);
        setChartData((prev: any) => {
          const updated = { ...prev };
          delete updated.contactTap;
          return updated;
        });
      }
    };

    fetchContactTaps();
  }, [filter?.contactTap]);

  // 🔹 Payment Taps
  useEffect(() => {
    const fetchPaymentTaps = async () => {
      try {
        const response = await GetPaymentTaps(filter?.paymentTap);

        if (response?.success && response?.finalData) {
          const names = response.finalData.map((item: any) => item.name);
          const values = response.finalData.map((item: any) => item.count);

          setChartData((prev: any) => ({
            ...prev,
            paymentTap: {
              labels: names,
              datasets: [
                {
                  data: values,
                  backgroundColor: CHART_COLORS,
                  spacing: 5,
                  borderWidth: 0,
                  borderRadius: 4,
                },
              ],
            },
          }));
        } else {
          setChartData((prev: any) => {
            const updated = { ...prev };
            delete updated.paymentTap;
            return updated;
          });
        }
      } catch (error) {
        console.error("Error fetching payment taps:", error);
        setChartData((prev: any) => {
          const updated = { ...prev };
          delete updated.paymentTap;
          return updated;
        });
      }
    };

    fetchPaymentTaps();
  }, [filter?.paymentTap]);

  // 🔹 Device Type
  useEffect(() => {
    const fetchDeviceType = async () => {
      try {
        const response = await GetDeviceType(filter?.deviceType);

        if (response?.success && response?.finalData) {
          const names = response.finalData.map((item: any) => item.name);
          const values = response.finalData.map((item: any) => item.count);

          setChartData((prev: any) => ({
            ...prev,
            deviceType: {
              labels: names,
              datasets: [
                {
                  data: values,
                  backgroundColor: CHART_COLORS,
                  spacing: 5,
                  borderWidth: 0,
                  borderRadius: 4,
                },
              ],
            },
          }));
        } else {
          setChartData((prev: any) => {
            const updated = { ...prev };
            delete updated.deviceType;
            return updated;
          });
        }
      } catch (error) {
        console.error("Error fetching device type:", error);
        setChartData((prev: any) => {
          const updated = { ...prev };
          delete updated.deviceType;
          return updated;
        });
      }
    };

    fetchDeviceType();
  }, [filter?.deviceType]);

  // 🔹 Mode Usage
  useEffect(() => {
    const fetchModeUsageType = async () => {
      try {
        const response = await GetModeUsageType(filter?.modeUsage);

        if (response?.success && response?.finalData) {
          const names = response.finalData.map((item: any) => item.name);
          const values = response.finalData.map((item: any) => item.count);

          setChartData((prev: any) => ({
            ...prev,
            modeUsage: {
              labels: names,
              datasets: [
                {
                  data: values,
                  backgroundColor: CHART_COLORS,
                  spacing: 5,
                  borderWidth: 0,
                  borderRadius: 4,
                },
              ],
            },
          }));
        } else {
          setChartData((prev: any) => {
            const updated = { ...prev };
            delete updated.modeUsage;
            return updated;
          });
        }
      } catch (error) {
        console.error("Error fetching mode usage:", error);
        setChartData((prev: any) => {
          const updated = { ...prev };
          delete updated.modeUsage;
          return updated;
        });
      }
    };

    fetchModeUsageType();
  }, [filter?.modeUsage]);

  const CHARTS = [
    { title: "Device Type", name: "deviceType" },
    { title: "Mode Usage", name: "modeUsage" },
    { title: "Social Media", name: "socialMedia" },
    { title: "Payment Taps", name: "paymentTap" },
    { title: "Contact Taps", name: "contactTap" },
  ];

  return (
    <div className="p-6 text-white">
      <h2 className="text-lg font-bold">Analytics Pro</h2>
      <p className="text-sm text-gray-400 mb-6">
        Your pro data summary and activity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CHARTS.map(({ title, name }) => (
          <DonutChart
            key={name}
            title={title}
            name={name}
            data={chartData[name]}
            filter={filter}
            setFilter={setFilter}
          />
        ))}
      </div>
    </div>
  );
}
