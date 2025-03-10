import React from 'react'
import './css/DropDown.css'
interface DropdownProps {
    options: any[];
    onChange: (selected: any) => void;
    value?: any;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    label?: string;
  }
const DropDown: React.FC<DropdownProps> = (props?:any) => {
    const{className}=props
  return (
    <div>
        <select className={`common-dropdown ${className}`} {...props}>
            <option> dropdown </option>
            <option> option 1</option>
        </select>
    </div>
  )
}

export default DropDown
