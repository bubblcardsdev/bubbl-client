import EditProfile from "@/src/components/myprofile/components/editProfile";
import PostLoginLayout from "../../src/components/layout/postLoginLayout";
/**
 * Page component that renders the EditProfile form inside the authenticated PostLoginLayout.
 *
 * Renders PostLoginLayout with currentPage set to `{ title: "Edit My Profile", name: "myprofile" }`
 * and nests the EditProfile component. The dynamic route parameter (`[id]`) implied by the file path
 * is not used by this component.
 *
 * @returns The page's JSX element.
 */
export default function EditPrrofilesection() {
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
 