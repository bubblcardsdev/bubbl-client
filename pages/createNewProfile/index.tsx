import PostLoginLayout from "../../src/components/layout/postLoginLayout";
import EditProfile from "@/src/components/myprofile/components/editProfile";

export default function CreateNewProfile() {
    const pageData = {
        title: "Nyprofile",
        name: "myprofile",
    };
    return (
        <PostLoginLayout currentPage={pageData}>
            <EditProfile />
        </PostLoginLayout>
    );
}
