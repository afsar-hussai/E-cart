/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateStateToFalse } from "../store/authSlice"
import { toast, } from "sonner"


function Header({children}) {
    const [user, setUser] = useState(false)
    const userStatus = useSelector(state => state.auth.status)

    const dispatch = useDispatch()

    const logoutClick = () => {
        dispatch(updateStateToFalse())
        localStorage.clear();
        toast.success('logged out successfully!!', {
            duration: 1000
        })


    }

    useEffect(() => {

        setUser(userStatus)


    }, [userStatus])
    return (
        <header className="flex justify-between bg-red-400 p-4">

            <div className=" bg-green-800 rounded-full p-2">
                Logo
            </div>

            <div className="flex justify-between">
                <div>
                    <select name="Departments" >
                        <option value="department1">Department 1</option>
                        <option value="department2">Department 2</option>

                    </select>
                </div>
                <div>
                    <input type="text" name="Search" />
                </div>
                <div>
                    search icon
                </div>
            </div>

            <nav className="flex justify-center items-center gap-5">
                {user ?

                    <div className="flex gap-5">

                        <button onClick={logoutClick}>Logout</button>

                        <Link to='/profile'>
                            <button>Profile</button>
                        </Link>
                    </div>



                    : <Link to='/sign-in' >
                        <button >Sign in</button>
                    </Link>}

                    {
                        user?null:<Link to='admin/dashboard'>
                        Admin?
                        </Link>
                    }

                    
            </nav>


            <div>
                Cart
            </div>
        </header>
    )
}

export default Header
