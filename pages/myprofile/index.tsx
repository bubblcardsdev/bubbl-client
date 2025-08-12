import PostLoginLayout from "../../src/components/layout/postLoginLayout";
import MyProfile from "../../src/components/myprofile/index"
/**
 * Page component that renders the profile editing UI within the authenticated layout.
 *
 * Renders <MyProfile /> wrapped by <PostLoginLayout />, passing page metadata (title: "EditProfile", name: "Editprofile") via the `currentPage` prop.
 *
 * @returns The JSX element for the profile-editing page.
 */
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
 