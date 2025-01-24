/* eslint-disable react/prop-types */


import { forwardRef, useId } from "react"


function Input({
    type='text',
    label, 
    placeholder='Enter...',
    className='',
    ...props
},ref) {
  const id=useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
        <input 
        id={id}
        ref={ref}
        type={type} 
        className={`${className}`}
        placeholder={placeholder}
        {...props}
        />
      
    </div>
  )
}

export default forwardRef(Input)
