import React from "react";
import PostLoginLayoutPage from "@/src/components/layout/postLoginLayout";
import Pricings from "../../src/components/pricings/index";
const pageData = {
  title: "Pricings",
  name: "pricings",
};
function Pricingsection () {
  return (
    <PostLoginLayoutPage currentPage={pageData}>
      <Pricings/>
    </PostLoginLayoutPage>
  );
}

export default Pricingsection;
