
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


function Header({children}) {
  return (
    <header className="flex justify-start items-center bg-red-400 p-4 gap-10" >

      <Link to='/'>
      
         <div className=" bg-green-800 rounded-full p-2">
                Logo
            </div>

         </Link>
        <div>
            {children}
        </div>

    </header>
  )
}

export default Header
