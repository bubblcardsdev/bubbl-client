import PostLoginLayout from "../../src/components/layout/postLoginLayout";
import Overview from "@/src/components/overview";
export default function DashboardSection() {
  const pageData = {
    title: "Overview",
    name: "overview",
  };
  return (
    <PostLoginLayout currentPage={pageData}>
      <Overview />
    </PostLoginLayout>
  );
}
