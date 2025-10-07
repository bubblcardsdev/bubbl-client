"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GetAllProfile,
  DeleteProfileApi,
  DuplicateProfileApi,
} from "../../../src/services/profileApi";
import Image from "next/image";
import { MoreVertical, Edit3, Share2 } from "lucide-react";
import { toast } from "react-toastify";
import { ProfileIcon } from "../common/icons";

export default function MyprofilePage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      setError("Failed to fetch profiles");
      toast.error("Failed to fetch profiles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
    console.log("Profiles fetched:", profiles);
  }, []);

  // ✅ click outside handler to close menu
  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
      if (res?.data) {
        setProfiles((prev) => [res.data, ...prev]);
        toast.success("Profile duplicated successfully");
      }
    } catch (err) {
      console.error("Duplicate failed", err);
      toast.error("Failed to duplicate profile");
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="text-white mt-4">
      <h2 className="text-xl font-semibold mb-1">Profiles</h2>
      <p className="text-sm text-gray-400 mb-6">
        Customize your profile to reflect your professional identity
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Profile Cards */}
        {profiles?.map((profile, i) => (
          <div
            key={i}
            className=" bg-[#282828] rounded-xl p-6 flex flex-col gap-6"
          >
            <div className="flex items-start justify-between ">
              <div className="flex items-center gap-7">
                {/* Avatar */}
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
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold">
                    {profile.profileName || "Client"}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {profile.firstName || "Unnamed"}
                  </p>
                </div>
              </div>

              {/* Three dot menu */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <MoreVertical
                  size={18}
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setOpenMenu(openMenu === i ? null : i)}
                />
                {openMenu === i && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#2a2a2a] rounded-lg shadow-lg border border-[#828282] z-10">
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
                className="flex items-center gap-3 text-gray-300 hover:text-white"
              >
                <Share2 size={14} /> Preview
              </button>
              <button
                onClick={() => handleClick(`/editProfile/${profile.id}`)}
                className="flex items-center gap-3 text-gray-300 hover:text-white"
              >
                <Edit3 size={14} /> Edit profile
              </button>
            </div>
          </div>
        ))}

        {/* Create New Profile Card */}
        <div
          onClick={() => handleClick("/createNewProfile")}
          className="bg-[#282828]  hover:border  hover:border-[#828282] rounded-xl h-[177px] flex flex-col items-center justify-center cursor-pointer transition"
        >
          <div className="flex flex-col items-center">
            <div className="text-2xl">＋</div>
            <p className="text-sm text-gray-300 mt-1">Create New Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}
