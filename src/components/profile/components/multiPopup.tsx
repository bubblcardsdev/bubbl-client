import { email, call } from "@/src/utils/commonLogics";
import Modal from "../../common/modal";
import { isEmpty } from "lodash";
import { Arrow_icon } from "../../common/icons";

interface Props {
  visible: boolean;
  list: any[];
  onClose: () => void;
  title: string;
}

const MultiPopup = (props: Props) => {
  const { visible, list, onClose,title } = props;

  return (
    <Modal visible={visible} onClose={onClose} className="lg:max-w-md xl:max-w-md" showHeader title={title}>
      <div className="flex flex-col gap-3 pb-3">
        {!isEmpty(list) &&
          list.map((data: any, index: number) => (
            <div className="flex items-center justify-between cursor-pointer py-3" key={index}>
              {data?.emailId && (
                <span
                  className="text-sm w-full"
                  onClick={() => email(data.emailId)}
                >
                  {data?.emailId}
                </span>
              )}
              {data?.phoneNumber && (
                <span
                  className="text-sm w-full"
                  onClick={() =>
                    call(`${data.countryCode || "+91"}${data?.phoneNumber}`)
                  }
                >
                  {`${data.countryCode || "+91"}${data?.phoneNumber}`}
                </span>
              )}

              {data?.emailId && (
                <span
                  className="text-sm w-full"
                  onClick={() => email(data.emailId)}
                >
                  {data?.emailId}
                </span>
              )}

              <span className=" text-sm">
                <Arrow_icon />
              </span>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default MultiPopup;
