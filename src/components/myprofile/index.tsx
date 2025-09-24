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
import "react-toastify/dist/ReactToastify.css";
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
  const handleDuplicate = (id: string | number) => {
    DuplicateProfileApi(id)
      .then((res) => {
        toast.success("Profile duplicated successfully");
        if (res?.data) {
          // if backend returns duplicated profile object
          setProfiles((prev) => [res.data, ...prev]);
        } else {
          // fallback to refetch
          fetchProfiles();
        }
      })
      .catch((err: any) => {
        console.error("Failed to duplicate profile", err);
        toast.error("Failed to duplicate profile");
      })
      .finally(() => setOpenMenu(null));
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="text-white mt-4">
      <h2 className="text-xl font-semibold mb-1">Profiles</h2>
      <p className="text-sm text-gray-400 mb-6">
        Customize your profile to reflect your professional identity
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Profile Cards */}
        {profiles?.map((profile, i) => (
          <div
            key={i}
            className=" bg-[#282828] rounded-xl p-4 h-[180px] flex flex-col justify-between relative"
          >
            <div className="flex items-start justify-between relative">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <Image
                  src={profile?.profileImages?.[0]?.image || "/default-avatar.png"}
                  alt={profile.profileName || profile.firstName || "User"}
                  width={40}
                  height={40}
                  className="w-14 h-14 rounded-full border"
                />
                <div>
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

            {/* Bottom - Actions */}
            <div className="flex justify-between border-t border-[#828282] pt-3 text-sm">
              <button
                onClick={() =>
                  router.push(`profile?profileId=${profile.profileUid}`)
                }
                className="flex items-center gap-1 text-gray-300 hover:text-white"
              >
                <Share2 size={14} /> Preview
              </button>
              <button
                onClick={() => handleClick(`/editProfile/${profile.id}`)}
                className="flex items-center gap-1 text-gray-300 hover:text-white"
              >
                <Edit3 size={14} /> Edit profile
              </button>
            </div>
          </div>
        ))}

        {/* Create New Profile Card */}
        <div
          onClick={() => handleClick("/createNewProfile")}
          className="bg-[#282828]  hover:border  hover:border-[#828282] rounded-xl h-[180px] flex flex-col items-center justify-center cursor-pointer transition"
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
