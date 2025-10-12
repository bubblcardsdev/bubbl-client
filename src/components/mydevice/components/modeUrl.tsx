import { MyDevice } from "@/src/lib/interface";
import DynamicModal from "../../common/modal";

interface Props {
  deviceData: MyDevice;
}

const ModeUrlWindow = (props: Props) => {
  console.log(props);
  return (
    <DynamicModal
      visible={true}
      // onClose={onHide}
      title="Dynamic Pop-up"
      showHeader
    ></DynamicModal>
  );
};

export default ModeUrlWindow;