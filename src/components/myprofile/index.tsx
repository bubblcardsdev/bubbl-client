"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GetAllProfile,
  DeleteProfileApi,
  DuplicateProfileApi,
} from "../../../src/services/profileApi";
import Image from "next/image";
import { MoreVertical, EyeIcon } from "lucide-react";
import { toast } from "react-toastify";
import { EditFilled, ProfileIcon } from "../common/icons";
import { isEmpty } from "lodash";

export default function MyprofilePage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  //  delete profile
  const deleteProfile = async (id: string | number) => {
    await DeleteProfileApi(id)
      ?.then(() => {
        toast.success("Profile deleted successfully");
        fetchProfiles();
      })
      ?.catch((err: any) => {
        console.error("Delete failed", err);
        toast.error("Failed to delete profile");
      })
      .finally(() => setOpenMenu(null));
  };

  //  duplicate profile
  const handleDuplicate = async (id: string | number) => {
    try {
      const res = await DuplicateProfileApi(id);
      console.log(res);
      if (res?.profile) {
        // setProfiles((prev) => [res.data, ...prev]);
        fetchProfiles();
        toast.success("Profile duplicated successfully");
      }
    } catch (err) {
      console.error("Duplicate failed", err);
      toast.error("Failed to duplicate profile");
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  return (
    <div className="text-white mt-4">
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
                      className="w-[60px] h-[60px] rounded-full"
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

              {/* Three dot menu (fixed at the right) */}
              <div
                className="relative shrink-0 ml-3 mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical
                  size={18}
                  className="text-gray-400 cursor-pointer focus:outline-none"
                  onClick={() => setOpenMenu(openMenu === i ? null : i)}
                  onBlur={() => setOpenMenu(null)}
                  tabIndex={0}
                />
                {openMenu === i && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#1D1D1D] rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => deleteProfile(profile.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-[#3a3a3a] w-full"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleDuplicate(profile.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#3a3a3a] w-full"
                    >
                      Duplicate
                    </button>
                  </div>
                )}
              </div>
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
