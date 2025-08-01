import React from 'react'
import {FreeTemplateOpal,FreeTemplateRuby,ProTemplateNeno,ProTemplateSpahire,ProTemplateQuartz} from '../../profile/index'
const LivePreview = ({currentTemplate,formData,selectedTheme}:{
    currentTemplate:{ label: string; value: string; image: string };
    formData:any ,selectedTheme:string
}) => {
    const templates:any={
ruby:FreeTemplateRuby,
opal:FreeTemplateOpal,
saphire:ProTemplateSpahire,
neno:ProTemplateNeno,
quartz:ProTemplateQuartz,
    }
    const Component=templates?.[currentTemplate?.value]
  return (
    <div>
      <Component formData={formData} selectedTheme={selectedTheme}/>
    </div>
  )
}

export default LivePreview
