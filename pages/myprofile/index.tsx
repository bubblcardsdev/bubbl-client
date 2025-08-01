import PostLoginLayout from "../../src/components/layout/postLoginLayout";
import MyProfile from "../../src/components/myprofile/index"
export default function Profilesection() {
  const pageData = {
    title: "EditProfile",
    name: "Editprofile",
  };
  return (
    <PostLoginLayout currentPage={pageData}>
      <MyProfile />
    </PostLoginLayout>
  );
}
 