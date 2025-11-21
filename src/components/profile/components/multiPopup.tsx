import { email, call, openInNewTab } from "@/src/utils/commonLogics";
import Modal from "../../common/modal";
import { isEmpty } from "lodash";
import { Arrow_icon } from "../../common/icons";
import { createTap } from "@/src/services/profileApi";

interface Props {
  visible: boolean;
  list: any[];
  onClose: () => void;
  title: string;
  deviceId?: string;
  actionId?: number;
}

const MultiPopup = (props: Props) => {
  const { visible, list, onClose, title, deviceId, actionId } = props;
  console.log(deviceId, actionId, "???");

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      className="sm:max-w-md lg:max-w-md xl:max-w-md"
      showHeader
      title={title}
    >
      <div className="flex flex-col gap-3 pb-3">
        {!isEmpty(list) &&
          list.map((data: any, index: number) => {
            return (
              <div
                className="flex items-center justify-between cursor-pointer py-3"
                key={index}
              >
                {data?.phoneNumber && (
                  <span
                    className="text-sm w-full"
                    onClick={ () => {
                      call(`${data.countryCode || "+91"}${data?.phoneNumber}`);

                      if (deviceId && Number.isFinite(actionId)) {
                         createTap(actionId as number, deviceId);
                      }
                      // await createTap()
                    }}
                  >
                    {`${data.countryCode || "+91"}${data?.phoneNumber}`}
                  </span>
                )}

                {data?.emailId && (
                  <span
                    className="text-sm w-full"
                    onClick={ () => {
                      email(data.emailId);

                      if (deviceId && Number.isFinite(actionId)) {
                         createTap(actionId as number, deviceId);
                      }
                    }}
                  >
                    {data.emailId}
                  </span>
                )}

                {data?.website && (
                  <span
                    className="text-sm w-full"
                    onClick={() => openInNewTab(data.website)}
                  >
                    {data?.website}
                  </span>
                )}

                <span className=" text-sm">
                  <Arrow_icon />
                </span>
              </div>
            );
          })}
      </div>
    </Modal>
  );
};

export default MultiPopup;
