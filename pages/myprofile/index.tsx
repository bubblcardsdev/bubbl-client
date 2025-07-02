import PostLoginLayout from "../../src/components/layout/postLoginLayout";
import MyProfile from "../../src/components/myprofile/index"
export default function Leadssection() {
  const pageData = {
    title: "MyProfile",
    name: "myprofile",
  };
  return (
    <PostLoginLayout currentPage={pageData}>
      <MyProfile />
    </PostLoginLayout>
  );
}
 