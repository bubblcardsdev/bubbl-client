import { ThreeDotMenuOption } from "@/src/lib/interface";
import ThreeDotMenu from "../../common/threeDotMenu";
import {
  DeleteProfileApi,
  DuplicateProfileApi,
} from "@/src/services/profileApi";
import { toast } from "react-toastify";

interface Props {
  data: any;
  refetch: () => void;
}

const ProfileMenu = (props: Props) => {
  const { data, refetch } = props;

  //  delete profile
  const deleteProfile = async () => {
    await DeleteProfileApi(data.id)
      ?.then(() => {
        toast.success("Profile deleted successfully");
        refetch();
      })
      ?.catch((err: any) => {
        console.error("Delete failed", err);
        toast.error("Failed to delete profile");
      });
  };

  //  duplicate profile
  const handleDuplicate = async () => {
    try {
      const res = await DuplicateProfileApi(data.id);
      console.log(res);
      if (res?.profile) {
        refetch();
        toast.success("Profile duplicated successfully");
      }
    } catch (err) {
      console.error("Duplicate failed", err);
      toast.error("Failed to duplicate profile");
    }
  };
  const menuOptions: ThreeDotMenuOption[] = [
    { label: "Duplicate Profile", onClick: handleDuplicate },
    {
      label: "Delete Profile",
      onClick: deleteProfile,
      className: "text-red-400",
    },
  ];

  return <ThreeDotMenu options={menuOptions} />;
};

export default ProfileMenu;
