// import ProfileCard from "./components/profilecard";
import { useRouter } from 'next/router';
// const profiles = [
//   { title: "Personal", name: "Padhu" },
//   { title: "Client", name: "Kishore" },
//   { title: "Portfolio", name: "kalai" },
//   { title: "Client", name: "Tharun" },
/**
 * MyprofilePage component — renders the Profiles UI and a card to create a new profile.
 *
 * Renders a header and a responsive grid of profile tiles. Currently the dynamic list of
 * profile cards is disabled; a static "Create New Profile" tile is shown. Clicking that tile
 * performs client-side navigation to "/createNewProfile".
 *
 * @returns The Profiles page JSX.
 */
export default function MyprofilePage() {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };
  return (
    <div>
      <div className=" text-white  md:p-0 mt-4">
        <h2 className="text-xl font-semibold mb-1">Profiles</h2>
        <p className="text-sm text-gray-400 mb-6">
          Customize your profile to reflect your professional identity
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* {profiles.map((profile, i) => (
            <ProfileCard key={i} title={profile.title} name={profile.name} />
          ))} */}
          <div className="bg-[#1e1e1e] border border-gray-600 rounded-xl h-[180px] flex flex-col items-center justify-center cursor-pointer hover:border-white transition">
            <div className="text-center" onClick={() => handleClick('/createNewProfile')}>
              <div className="text-2xl">＋</div>
              <p className="text-sm text-gray-300 mt-1">Create New Profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
