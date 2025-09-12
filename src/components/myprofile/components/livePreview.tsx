import React from "react";
import FreeTemplateOpal from "../../profile/components/FreeTemplateOpal";
import FreeTemplateRuby from "../../profile/components/FreeTemplateRuby";
import ProTemplateNeno from "../../profile/components/ProTemplateNeno";
import ProTemplateQuartz from "../../profile/components/ProTemplateQuartz";
import ProTemplateSaphire from "../../profile/components/ProTemplateSaphire";
const LivePreview = ({
  currentTemplate,
  formData,
  selectedTheme,
}: {
  currentTemplate: { label: string; value: string; image: string };
  formData: any;
  selectedTheme: string;
}) => {
  const templates: any = {
    opal: FreeTemplateOpal,
    ruby: FreeTemplateRuby,
    saphire: ProTemplateSaphire,
    quartz: ProTemplateQuartz,
    neno: ProTemplateNeno,
  };
  const Component = templates?.[currentTemplate?.value];
  return <Component formData={formData} selectedTheme={selectedTheme} />;
};

export default LivePreview;
