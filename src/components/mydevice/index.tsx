import DeviceCard from "./components/deviceCard";
import AddDeviceCard from "./components/addDeviceCard";

export default function DevicesPage() {
  return (
    <div className=" text-white px-0 py-2">
      <h1 className="text-xl font-semibold mb-1">My Device</h1>
      <p className="text-gray-400 mb-6">
        Customize your profile to reflect your professional identity
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        <DeviceCard />
        <DeviceCard />
        <DeviceCard />
        <AddDeviceCard />
      </div>
      <div></div>
    </div>
  );
}
