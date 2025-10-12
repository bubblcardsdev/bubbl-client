import { MyDevice, ThreeDotMenuOption } from "@/src/lib/interface";
import ThreeDotMenu from "../../common/threeDotMenu";

import { toast } from "react-toastify";
import Modal from "../../common/modal";
import { useShowHide } from "@/src/hooks/useShowHide";
import PopupConfirm from "../../common/popupConfirm";
import {
  deactivateDevice,
  reactivateDevice,
  removeDevice,
} from "@/src/services/devices";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { useEffect, useState } from "react";

interface Props {
  data: MyDevice;
  refetch: () => void;
  inActive: boolean | null;
}

const DeviceMenu = (props: Props) => {
  const { data, refetch, inActive } = props;

  const initial = {
    remove: false,
    deactivate: false,
    rename: false,
    uniqueName: false,
    claim:false
  };

  const { visible, onShow, onHide } = useShowHide(initial);

  const [deviceName, setDeviceName] = useState(data.deviceNickName || "");

  console.log(data, "deviceMenu");

  const deactivate = async () => {
    try {
      const response = await deactivateDevice(data.accountDeviceLinkId);
      if (response) {
        toast.success("Device De-activated Successfully");
        refetch();
        onHide();
      }
    } catch (e) {
      console.error("deactivate error - ", e);
      toast.error("Something went wrong");
    }
  };

  const reactivate = async () => {
    try {
      const response = await reactivateDevice(data.accountDeviceLinkId);
      if (response) {
        toast.success("Device Re-activated Successfully");
        refetch();
        onHide();
      }
    } catch (e) {
      console.error("reactivate error - ", e);
      toast.error("Something went wrong");
    }
  };

  const remove = async () => {
    try {
      const response = await removeDevice(
        data.accountDeviceLinkId,
        data.deviceUid
      );
      if (response) {
        refetch();
        onHide();
      }
    } catch (e) {
      console.error("removeDevice error - ", e);
      toast.error("Something went wrong");
    }
  };

  const activateDeavtivate = inActive
    ? {
        label: "Reactivate Device",
        onClick: reactivate,
      }
    : {
        label: "deactivate Device",
        onClick: () => onShow("deactivate"),
      };

  const menuOptions: ThreeDotMenuOption[] = [
    { label: "Rename Device", onClick: () => onShow("rename") },
    { label: "Claim Name", onClick: () => onShow("claim"), isPro: true },
    activateDeavtivate,
    {
      label: "Remove Device",
      onClick: () => onShow("remove"),
      className: "text-red-400",
    },
  ];

  useEffect(() => {
    setDeviceName(data.deviceNickName || "");
  }, [visible]);

  return (
    <>
      <ThreeDotMenu options={menuOptions} />
      <PopupConfirm
        message="Are you Sure Do you want to remove your Device from your account?"
        visible={visible.remove}
        onCancel={onHide}
        onConfirm={remove}
      />
      <PopupConfirm
        message="Are you Sure Do you want to de-activate your Device from your account?"
        visible={visible.deactivate}
        onCancel={onHide}
        onConfirm={deactivate}
      />
      <Modal
        showHeader
        title="Rename Device"
        visible={visible.rename}
        headerClassName="border-b-0"
        bodyClassName="pt-0 pb-6"
        className="lg:max-w-xl xl:max-w-xl px-3 py-2"
        onClose={onHide}
      >
        <p className="text-sm text-[#828282] mb-2">Enter your Device name</p>
        <Input id={data.deviceUid} className="rounded-lg" value={deviceName} onChange={(e) => setDeviceName(e.target.value)}/>
        <div className="grid grid-cols-2 items-center gap-6 w-full mt-6">
          <Button onClick={onHide} className="py-3 xs:bg-[#333333]">
            {"Cancel"}
          </Button>
          <Button className="py-3">{"Save"}</Button>
        </div>
      </Modal>
      <Modal
        showHeader
        title="Claim Device"
        visible={visible.claim}
        headerClassName="border-b-0"
        bodyClassName="pt-0 pb-6"
        className="lg:max-w-xl xl:max-w-xl px-3 py-2"
        onClose={onHide}
      >
        <p className="text-sm text-[#828282] mb-2">Enter your Device Claim name</p>
        <Input id={data.deviceUid} className="rounded-lg" />
        <div className="grid grid-cols-2 items-center gap-6 w-full mt-6">
          <Button onClick={onHide} className="py-3 xs:bg-[#333333]">
            {"Cancel"}
          </Button>
          <Button className="py-3">{"Save"}</Button>
        </div>
      </Modal>
    </>
  );
};

export default DeviceMenu;
