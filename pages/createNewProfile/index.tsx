import PostLoginLayout from "../../src/components/layout/postLoginLayout";
import EditProfile from "@/src/components/myprofile/components/editProfile";

/**
 * Renders the EditProfile page inside the PostLoginLayout.
 *
 * The layout is provided a static `pageData` object: `{ title: "Nyprofile", name: "myprofile" }`.
 *
 * @returns The page's JSX element.
 */
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
