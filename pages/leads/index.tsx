import PostLoginLayout from "../../src/components/layout/postLoginLayout";
import Leads from "../../src/components/leads/index"
export default function Leadssection() {
  const pageData = {
    title: "Leads",
    name: "leads",
  };
  return (
    <PostLoginLayout currentPage={pageData}>
      <Leads />
    </PostLoginLayout>
  );
}
 