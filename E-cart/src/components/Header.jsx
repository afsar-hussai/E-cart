
/* eslint-disable react/prop-types */


function Header({children}) {
  return (
    <header className="flex justify-start items-center bg-red-400 p-4 gap-10" >
         <div className=" bg-green-800 rounded-full p-2">
                Logo
            </div>
        <div>
            {children}
        </div>

    </header>
  )
}

export default Header
