import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../common/modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { linkDevice } from "@/src/services/devices";

interface Props {
  visible: boolean;
  onHide: () => void;
  profiles: any[];
}

const CreateNewDevice = (props: Props) => {
  const { visible, onHide, profiles } = props;
  const [form, setForm] = useState({
    deviceUid: "",
    deviceNickName: "",
    profileId: null,
    uniqueName: "",
  });
  const { deviceUid, deviceNickName, profileId, uniqueName } = form;
  const handleSave = async () => {
    try {
      if (!deviceUid) return toast.error("Please enter device UID");
      if (!profileId) return toast.error("Please select a profile");
      if (!deviceNickName) return toast.error("Please enter device name");
      await linkDevice(deviceUid, profileId, uniqueName, deviceNickName);
      onHide();
    } catch (e) {
      console.error("rename error - ", e);
      toast.error("Something went wrong");
    }
  };
  console.log(profiles);
  return (
    <Modal
      visible={visible}
      showHeader
      title="Create New Device"
      headerClassName="border-b-0"
      bodyClassName="pt-0 pb-6"
      className="lg:max-w-md xl:max-w-md px-3 py-2"
      onClose={onHide}
      showFooter
      stickyFooter
      stickyHeader
      footerContent={
        <div className="grid grid-cols-2 items-center gap-6 w-full">
          <Button onClick={onHide} className="py-3 xs:bg-[#333333]">
            {"Cancel"}
          </Button>
          <Button className="py-3" onClick={() => handleSave()}>
            {"Save"}
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 items-center gap-3 w-full">
        <div className="flex flex-col">
          <p className="text-sm text-[#828282] mb-2">Your Device UID</p>
          <Input
            id="deviceUid"
            className="rounded-lg"
            value={deviceUid}
            onChange={(e) => setForm({ ...form, deviceUid: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-[#828282] mb-2">Your Device Name</p>
          <Input
            id="deviceName"
            className="rounded-lg"
            value={deviceNickName}
            onChange={(e) =>
              setForm({ ...form, deviceNickName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-[#828282] mb-2">
            Your Unique URL Name{" "}
            <span
              className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 
               text-transparent bg-clip-text text-[8px] font-bold uppercase 
               tracking-wider px-1 shrink-0 select-none"
            >
              PRO
            </span>
          </p>
          <Input
            id="deviceName"
            className="rounded-lg"
            value={deviceNickName}
            onChange={(e) =>
              setForm({ ...form, deviceNickName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-[#828282] mb-2">
            Your Unique URL Name{" "}
            <span
              className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 
               text-transparent bg-clip-text text-[8px] font-bold uppercase 
               tracking-wider px-1 shrink-0 select-none"
            >
              PRO
            </span>
          </p>
          <Input
            id="deviceName"
            className="rounded-lg"
            value={deviceNickName}
            onChange={(e) =>
              setForm({ ...form, deviceNickName: e.target.value })
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateNewDevice;
