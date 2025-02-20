/* eslint-disable react/prop-types */

// import { toast } from "sonner"
// import productManagement from "../../BackendFunctions/ProductManagement"
import { Button } from "../../components"
import { useDispatch } from "react-redux"
import { deleteProduct } from "../../store/productSlice";



function AdminProductCard({
    id,
    product,
    setValue,
    setAddState,
    setEditMode,
    setCurrentProduct,
    
}) {

   


    const dispatch=useDispatch();
    

    const updateProduct=async ()=>{
      
        setAddState(true);
        // setEditMode((prev)=>!prev);
        setEditMode(true);
       
        console.log("product id in AdminProductCard is: ",id)
        
        
        console.log("updateProduct clicked");
        setCurrentProduct(product);
        
        setValue('title',product.title);
        setValue('description',product.description);
        setValue('price',product.price);
        setValue('category',product.category);
        setValue('quantity',product.quantity);
       
        

    }

    
  return (
    <div className=" border border-slate-950 flex w-1/2 p-3 justify-between items-center">
     <div
     className="bg-blue-700 rounded p-3"
     >
        image
     </div>
     <div>
        {product.description}
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
        onClick={()=>dispatch(deleteProduct(id))}
        />
     </div>
    </div>
  )
}

export default AdminProductCard
