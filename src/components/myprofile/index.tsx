"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetAllProfile } from "../../../src/services/profileApi";
import Image from "next/image";
import { EyeIcon } from "lucide-react";

import { EditFilled, ProfileIcon } from "../common/icons";
import { isEmpty } from "lodash";

import ProfileMenu from "./components/profileMenu";
import MonoColorLoader from "../common/monoColorLoader";

export default function MyprofilePage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  // ✅ fetch all profiles
  const fetchProfiles = async () => {
    try {
      const data = await GetAllProfile();

      setProfiles(data?.data?.profiles || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="text-white mt-4">
      {loading && (
        <MonoColorLoader message="Loading ..." size={100} color="#b97cff" />
      )}
      <div className="flex gap-3 justify-between mb-2 sm:pr-8">
        <h2 className="text-xl font-medium">Profiles</h2>
        <button
          className="bg-[#9747FF] px-2 py-1 rounded-md text-xs"
          onClick={() => handleClick("/createNewProfile")}
        >
          <span className="text-sm">+</span>&nbsp;New Profile
        </button>
      </div>
      <p className="text-sm text-[#828282] mb-6">
        Customize your profile to reflect your professional identity
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {/* Profile Cards */}
        {profiles?.map((profile, i) => (
          <div
            key={i}
            className=" bg-[#282828] rounded-xl p-6 flex flex-col gap-6 w-full"
          >
            <div className="flex items-start justify-between w-full">
              <div className="flex items-center gap-6 min-w-0">
                <div className="shrink-0">
                  {profile?.profileImages?.[0]?.image ? (
                    <Image
                      src={profile?.profileImages?.[0]?.image || "/profile.png"}
                      alt={profile.profileName || profile.firstName || "User"}
                      width={100}
                      height={100}
                      className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                  ) : (
                    <ProfileIcon className="w-[60px] h-[60px] rounded-full" />
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0 overflow-hidden">
                  <h3 className="text-base font-semibold truncate max-w-full">
                    {profile.profileName || "Client"}
                  </h3>
                  <p className="text-sm text-gray-400 truncate max-w-full">
                    {profile.firstName || "Unknown"}
                  </p>
                </div>
              </div>
              <ProfileMenu data={profile} refetch={fetchProfiles} />
            </div>

            <div className="border-t border-[#828282]" />
            {/* Bottom - Actions */}
            <div className="flex justify-between text-sm px-4 sm:px-0 md:px-4 gap-4">
              <button
                onClick={() =>
                  router.push(`profile?profileId=${profile.profileUid}`)
                }
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <EyeIcon size={17} /> Preview
              </button>
              <button
                onClick={() => handleClick(`/editProfile/${profile.id}`)}
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <EditFilled className="w-[14px]" /> Edit profile
              </button>
            </div>
          </div>
        ))}

        {/* Create New Profile Card */}
        {isEmpty(profiles) && (
          <div
            onClick={() => handleClick("/createNewProfile")}
            className="bg-[#282828]  hover:border  hover:border-[#828282] rounded-xl h-[177px] flex flex-col items-center justify-center cursor-pointer transition"
          >
            <div className="flex flex-col items-center">
              <div className="text-2xl">＋</div>
              <p className="text-sm text-gray-300 mt-1">Create New Profile</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
