/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { toast } from "sonner"
import productManagement from "../../BackendFunctions/ProductManagement"
import { Button } from "../../components"


function AdminProductCard({id}) {

    const updateProduct=async ()=>{
        console.log("update is clicked")
        

    }

    const deleteProduct=async ()=>{
        try {
            const response=await productManagement.deleteProduct(id);
            console.log("response in delete is: ",response);
            if (response) {
                toast.success('Product deleted successfully')
                
            }
            
            
        } catch (error) {
            console.log("Error in deleting product",error);
            throw new error;
            
        }
    }
  return (
    <div className=" border border-slate-950 flex w-1/2 p-3 justify-between items-center">
     <div
     className="bg-blue-700 rounded p-3"
     >
        image
     </div>
     <div>
        description
     </div>

     <div className="flex gap-2 rounded">
        <Button 
        className="bg-yellow-500 p-3"
        childText='Update'
        type="button"
        onClick={updateProduct}
        />
        <Button 
         className="bg-red-700 p-3"
        childText='Delete'
        type="button"
        onClick={deleteProduct}
        />
     </div>
    </div>
  )
}

export default AdminProductCard
