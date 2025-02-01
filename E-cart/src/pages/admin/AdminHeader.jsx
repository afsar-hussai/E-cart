import { useDispatch } from "react-redux";
import adminApisForBackendCommunication from "../../BackendFunctions/AdminApis";
import { updateStateToFalse } from "../../store/authSlice";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";
import Button from "../../components/Button";



function AdminHeader() {
    const dispatch = useDispatch();




    const handleLogout = async () => {
        try {
            const response = await adminApisForBackendCommunication.logout();
            console.log("response of logout is: ", response)
            toast.success('Logged out successfully');
            dispatch(updateStateToFalse());


        } catch (error) {
            console.log("Error in Logout", error);
            throw error;

        }
    }

    return (
        <div className="flex justify-between items-center bg-red-800 p-3 gap-5"
        >

            <NavLink
                to='/admin/dashboard'
                end
                className={({ isActive }) => `duration-200 ${isActive ? 'bg-blue-500' : 'bg-orange-500'}`}
            >





                <Button
                    type="button"
                >
                    Dashboard
                </Button>

            </NavLink>



            <NavLink
                to='/admin/dashboard/product-management'
               
                className={({ isActive }) => `duration-200 ${isActive ? 'bg-blue-500' : 'bg-orange-500'}`}
            >

                <Button
                    type="button"

                >
                    Product Management
                </Button>
            </NavLink>


            <NavLink
            to='order-management'

            className={({ isActive }) => `duration-200 ${isActive ? 'bg-blue-500' : 'bg-orange-500'}`}
            
            >



                <Button
                    type="button"
                >
                    Order Management
                </Button>
            </NavLink>


            <NavLink
            to='content-management'

            className={({ isActive }) => `duration-600 ${isActive ? 'bg-blue-500' : 'bg-orange-500'}`}
            >



                <Button
                    type="button"
                >
                    Content Management
                </Button>
            </NavLink>


            <Button
                type="button"
                onClick={handleLogout}
            >
                Logout
            </Button>

        </div>
    )
}

export default AdminHeader
