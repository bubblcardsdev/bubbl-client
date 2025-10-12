import Button from "./Button";
import Modal from "./modal";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
}

const PopupConfirm = (props: Props) => {
  const { visible, onCancel, onConfirm, message, cancelText, confirmText, } =
    props;
  return (
    <Modal
      visible={visible}
      onClose={onCancel}
      className="lg:max-w-sm xl:max-w-sm"
    >
      <div className="flex flex-col gap-2 py-3 lg:py-5">
        <h1 className="text-base text-center mb-4 max-w-xs mx-auto leading-[1.6]">{message}</h1>
        <div className="grid grid-cols-2 items-center gap-6 px-8 w-full sm:max-w-md mx-auto">
          <Button onClick={onCancel} className="py-3 xs:bg-[#333333]">
            {cancelText || "Cancel"}
          </Button>
          <Button onClick={onConfirm} className="py-3">
            {confirmText || "Confirm"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PopupConfirm;
