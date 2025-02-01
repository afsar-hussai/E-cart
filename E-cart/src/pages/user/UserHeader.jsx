/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateStateToFalse } from "../../store/authSlice"
import { toast, } from "sonner"


function UserHeader({children}) {
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
        <div className="flex justify-between items-center bg-red-800 p-3 gap-5">

            

            <div className="flex justify-between gap-5 items-center">
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
            </div>
    )
}

export default UserHeader
