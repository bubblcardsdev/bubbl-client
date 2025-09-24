import React from "react";
import FreeTemplateOpal from "../../profile/components/FreeTemplateOpal";
import FreeTemplateRuby from "../../profile/components/FreeTemplateRuby";
import ProTemplateNeno from "../../profile/components/ProTemplateNeno";
import ProTemplateQuartz from "../../profile/components/ProTemplateQuartz";
import ProTemplateSaphire from "../../profile/components/ProTemplateSaphire";
import { downloadVCard } from "../../../utils/downloadVcard";
import { generateVCard } from "../../../utils/generateVCard";
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
  const contact = {
    name:formData?.firstName+" "+formData?.lastName,
    countryCode: "+91",
    mobileNumbers:formData?.phoneNumbers,
    emails:formData?.emailIds,
    websites:formData?.websites,
  };
  const handleSave = () => {
    const vcard = generateVCard(contact);
    downloadVCard(vcard, `${contact.name}.vcf`);
  };
  return <Component formData={formData} selectedTheme={selectedTheme}  handleSave={handleSave}/>;
};
export default LivePreview;
