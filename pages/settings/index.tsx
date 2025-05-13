import React from "react";
import PostLoginLayoutPage from "@/src/components/layout/postLoginLayout";
import Settingspage from "../../src/components/settings/index";
const pageData = {
  title: "Settings",
  name: "settings",
};
function Settings() {
  return (
    <PostLoginLayoutPage currentPage={pageData}>
      <Settingspage/>
    </PostLoginLayoutPage>
  );
}

export default Settings;
