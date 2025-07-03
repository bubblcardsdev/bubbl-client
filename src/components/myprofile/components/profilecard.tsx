"use client";
import { MyProfilePreviewIcon, MyProfileEditIcon } from "../../common/icons";
export default function ProfileCard({
  title,
  name,
}: {
  title: string;
  name: string;
}) {
  return (
    <div className="bg-[#1e1e1e] text-white rounded-xl w-full max-w-[320px] p-4 space-y-4 relative hover:shadow-md hover:brightness-110 transition duration-200">
      {/* Top Avatar and Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold text-lg">
          🧑
        </div>
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{name}</p>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-700" />

      {/* Buttons */}
      <div className="flex justify-between items-center pt-1">
        <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-white  transition hover:rounded-lg hover:bg-[#333333] p-2">
          <MyProfilePreviewIcon /> Preview
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition p-2 hover:bg-[#333333] hover:rounded-lg">
          <MyProfileEditIcon /> Edit profile
        </button>
      </div>
    </div>
  );
}
