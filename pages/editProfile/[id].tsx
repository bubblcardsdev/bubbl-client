import EditProfile from "@/src/components/myprofile/components/editProfile";
import PostLoginLayout from "../../src/components/layout/postLoginLayout";
export default function EditProfileSection() {
  const pageData = {
    title: "Edit My Profile",
    name: "myprofile",
  };
  return (
    <PostLoginLayout currentPage={pageData}>
      <EditProfile />
    </PostLoginLayout>
  );
}
 