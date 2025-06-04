import React from 'react'
interface InputProps{
    className?:string
    placeholder?:string
    onChange?:(arg:any)=>void
    type?:string
    value?:any
    defaultValue?:any
    name?:string
    key?:any
    id?:string | number
    ref?:any
    style?:any

}

const Input:React.FC<InputProps> = (props?:any) => {
    const{className,...rest}=props
  return (
   <input className={`w-full h-11 rounded-[14px] p-[10px_10px] outline-none bg-[#333333] font-inter text-base transition duration-500 focus:border-gray-300 ${className}`} {...rest}/> 
  )
}

export default Input
