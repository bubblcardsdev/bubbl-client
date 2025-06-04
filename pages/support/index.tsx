import PostLoginLayout from "../../src/components/layout/postLoginLayout";
import Support from "@/src/components/support";
export default function Supportsection() {
  const pageData = {
    title: "Support",
    name: "support",
  };
  return (
    <PostLoginLayout currentPage={pageData}>
      <Support />
    </PostLoginLayout>
  );
}
