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
   <input className={`common-input-style ${className}`} {...props}/> 
  )
}

export default Input
