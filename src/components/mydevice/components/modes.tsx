import { DropdownOption, MyDevice } from "@/src/lib/interface";
import Modal from "../../common/modal";
import Input from "../../common/Input";
import { useState } from "react";
import Button from "../../common/Button";
import { toast } from "react-toastify";
import { MODES } from "@/src/lib/constant";
import DropDown from "../../common/dropDown";
import { useShowHideWithRecord } from "@/src/hooks/useShowHideWithRecord";
import { useShowHide } from "@/src/hooks/useShowHide";

interface Props {
  data: MyDevice;
  onSave: (
    device: MyDevice,
    mode: { label: string; value: number | string },
    modeUrl?: string
  ) => void; // <-- new
}

const ModeUrlWindow = (props: Props) => {
  const { data, onSave } = props;
  const [url, setUrl] = useState("");
  const initial = {
    modeUrlVisible: false,
    modeUrlData: "",
    title: "",
  };
  const { object, onShow, onHide } = useShowHideWithRecord(initial);

  const { visible, onShow: showPopup, onHide: hidePopup } = useShowHide(false);
  const device = data;

  const validateAndSave = (mode: { label: string; value: number | string },url?: string) => {
    const trimmed = url && url.trim();
    if (!trimmed && mode.value !== 2) {
      toast.error("URL is required.");
      return;
    }
    try {
      if(mode.value === 3 && trimmed) new URL(trimmed); // throws if invalid
      onSave(device, mode, trimmed);
      onHide();
    } catch {
      toast.error("Please enter a valid URL (e.g., https://example.com).");
      return;
    }
  };

  return (
    <>
      <DropDown
        options={MODES}
        onShow={() => showPopup("modeUrlVisible")}
        onHide={hidePopup}
        label="Switch modes"
        visible={visible}
        onSelect={(m: DropdownOption) => {
          if (m.value === 2) {
            onSave(device, m);
            return;
          }
          onShow("modeUrlVisible", "modeUrlData", device?.deviceId, "");
        }}
        value={device?.modeId || ""}
      />
      <Modal
        showHeader
        title="Direct URL"
        visible={object.modeUrlVisible}
        headerClassName="border-b-0"
        bodyClassName="pt-0 pb-6"
        className="lg:max-w-md xl:max-w-md px-3 py-2"
        onClose={onHide}
      >
        <p className="text-sm text-[#828282] mb-2">Enter your Direct URL</p>
        <Input
          id={data?.deviceUid}
          className="rounded-lg"
          value={url}
          onChange={(e: any) => setUrl(e.target.value)}
          placeholder="https://your-link.com"
        />
        <div className="grid grid-cols-2 items-center gap-6 w-full mt-6">
          <Button onClick={onHide} className="py-3 xs:bg-[#333333]">
            Cancel
          </Button>
          <Button
            onClick={() =>{
              validateAndSave({ label: "Direct URL", value: 3 }, url)
              onHide()
            }}
            className="py-3"
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModeUrlWindow;
