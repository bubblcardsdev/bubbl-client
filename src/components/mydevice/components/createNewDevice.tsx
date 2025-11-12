import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../common/modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { linkDevice } from "@/src/services/devices";
import DropDown from "../../common/dropDown";
import { DropdownOption } from "@/src/lib/interface";
import { useRouter } from "next/router";

interface Props {
  visible: boolean;
  onHide: () => void;
  profiles: DropdownOption[];
  refetch: () => void; 
}

const CreateNewDevice = (props: Props) => {
  const { visible, onHide, profiles } = props;
  const router = useRouter();
  const defaultUID = router?.query?.deviceUid;
  const [form, setForm] = useState<any>({
    deviceUid: defaultUID || "",
    deviceNickName: "",
    profileId: null,
    uniqueName: "",
  });
  const { deviceUid, deviceNickName, profileId, uniqueName } = form;
  const [dropDown, setDropdown] = useState(false);
  const [loading,setLoading] = useState(false);
  const handleSave = async () => {
    setLoading(true);
    try {
      if(loading) return;
      if (!deviceUid) return toast.error("Please enter device UID");
      // if (!profileId) return toast.error("Please select a profile");
      if (!deviceNickName) return toast.error("Please enter device name");
      const response = await await linkDevice(deviceUid, profileId, uniqueName, deviceNickName);
      if (response) {
        toast.success("Device Linked Successfully");
        router.push("/mydevice");
        onHide();
        props.refetch();
      }
      
    } catch (e) {
      console.error("rename error - ", e);
      toast.error("Something went wrong");
    }
    finally{
      setLoading(false);
    }
  };
  
  return (
    <Modal
      visible={visible}
      showHeader
      closeOnBackdrop={false}
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
            className={`rounded-lg ${defaultUID && "cursor-not-allowed bg-opacity-40"}`}
            value={deviceUid}
            onChange={(e) => setForm({ ...form, deviceUid: e.target.value })}
            placeholder="Enter Device UID"
            {...defaultUID && { disabled: true }}
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
            placeholder="Enter Device Name"
          />
        </div>
        <DropDown
          options={[...profiles, { label: "Create New Profile", value: 0 }]}
          onShow={() => setDropdown(true)}
          onHide={() => setDropdown(false)}
          label="Select Your Profile"
          visible={dropDown}
          labelClassName="xs:text-sm text-[#828282] mb-2"
          onSelect={(p: DropdownOption) =>{
            if (p.value === 0) {
              router.push("/createNewProfile");
            }
            setForm({ ...form, profileId: Number(p.value) })
          }
          }
          value={form?.profileId || ""}

        />
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
            value={uniqueName}
            onChange={(e) =>
              setForm({ ...form, uniqueName: e.target.value })
            }
            placeholder="Enter Unique Name"
          />
        </div>
        
      </div>
    </Modal>
  );
};

export default CreateNewDevice;
