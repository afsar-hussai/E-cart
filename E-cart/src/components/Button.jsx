
/* eslint-disable react/prop-types */


function Button({
    childText,
    type='submit',
    className='',
    ...props
}) {
  return (
    <div>
        <button
       type={type}
        className={` p-2 rounded-sm ${className || ""}`}
        {...props}
        >{childText || props.children}</button>
      
    </div>
  )
}

export default Button
