import PostLoginLayout from "../../src/components/layout/postLoginLayout";
import Analytics from "../../src/components/analytics/index"
export default function Leadssection() {
  const pageData = {
    title: "Analytics",
    name: "analytics",
  };
  return (
    <PostLoginLayout currentPage={pageData}>
      <Analytics />
    </PostLoginLayout>
  );
}
 