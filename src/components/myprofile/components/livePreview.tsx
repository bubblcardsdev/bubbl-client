import React from "react";
import { FreeTemplateOpal } from "../../profile/components/FreeTemplateOpal";
import { FreeTemplateRuby } from "../../profile/components/FreeTemplateRuby";
import { ProTemplateNeno } from "../../profile/components/ProTemplateNeno";
import { ProTemplateQuartz } from "../../profile/components/ProTemplateQuartz";
import { ProTemplateSpahire } from "../../profile/components/ProTemplateSaphire";
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
    ruby: FreeTemplateRuby,
    opal: FreeTemplateOpal,
    saphire: ProTemplateSpahire,
    neno: ProTemplateNeno,
    quartz: ProTemplateQuartz,
  };
  const Component = templates?.[currentTemplate?.value];
  return (
    <div>
      <Component formData={formData} selectedTheme={selectedTheme} />
    </div>
  );
};

export default LivePreview;
