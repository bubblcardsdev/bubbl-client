import React from 'react'
import './css/Input.css'
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
    const{className}=props
  return (
   <input className={`w-full h-11 rounded-[1vh] px-5 outline-none bg-gray-100 font-inter text-base transition duration-500 focus:border-gray-300 ${className}`} {...props}/> 
  )
}

export default Input
