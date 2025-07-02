import React, { useState } from "react";
import OverviewCards from "./components/overviewCards";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
const users = [
  {
    name: "Natali Craig",
    phone: "+91 91234 56780",
    email: "bubbl@gmail.com",
    device: "Bubbl card 1",
    date: "Just now",
    avatar: "/avatar1.png",
    img: "/profile.png",
  },
  {
    name: "Kate Morrison",
    phone: "+91 91234 56780",
    email: "bubbl@gmail.com",
    device: "Bubbl card 1",
    date: "Feb 2, 2023",
    avatar: "/avatar2.png",
    img: "/profile.png",
  },
  {
    name: "Drew Cano",
    phone: "+91 91234 56780",
    email: "bubbl@gmail.com",
    device: "Bubbl card 1",
    date: "Feb 2, 2023",
    avatar: "/avatar3.png",
    img: "/profile.png",
  },
  {
    name: "Orlando Diggs",
    phone: "+91 91234 56780",
    email: "bubbl@gmail.com",
    device: "Bubbl card 1",
    date: "Feb 2, 2023",
    avatar: "/avatar4.png",
    img: "/profile.png",
  },
  {
    name: "Andi Lane",
    phone: "+91 91234 56780",
    email: "bubbl@gmail.com",
    device: "Card 1",
    date: "Feb 2, 2023",
    avatar: "/avatar5.png",
    img: "/profile.png",
  },
];
const Overview = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="  ">
        <OverviewCards />
      </div>

      <div className="bg-[#282828] text-white rounded-xl p-4 overflow-x-auto mt-[30px] ">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-400 border-b border-[#333]">
              <th className="p-3">Name</th>
              <th className="p-3">Phone Number</th>
              <th className="p-3">Mail ID</th>
              <th className="p-3">Device Used</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`cursor-pointer transition-colors   border-b border-[#333]  ${
                  selectedIndex === index ? "bg-gray-200 text-black" : ""
                }`}
              >
                <td className="p-3 whitespace-nowrap flex items-center gap-3">
                  <Image
                    src={user.img}
                    alt={user.name}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                  {user.name}
                </td>
                <td className="p-3 whitespace-nowrap">{user.phone}</td>
                <td className="p-3 whitespace-nowrap">{user.email}</td>
                <td className="p-3 whitespace-nowrap">{user.device}</td>
                <td className="p-3 whitespace-nowrap flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500 text-xs" />
                  {user.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-5">
          <button className="bg-white text-black text-sm px-4 py-2 rounded-lg hover:shadow transition flex items-center gap-2">
            View more <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
