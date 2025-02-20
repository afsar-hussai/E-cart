
import { useState, useEffect } from "react";
import { Button, Input } from "../../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import productManagement from "../../BackendFunctions/ProductManagement";
import { fetchAllProducts, updateProduct } from "../../store/productSlice";
import AdminProductCard from "./AdminProductCard";
import { toast } from "sonner";

function ProductManagement() {
  const [addState, setAddState] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { products, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
   
  } = useForm();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const submitProductToAdd = async (data) => {
    // console.log("Adding product:", data);
    // toast.success("Product added successfully");
    

        console.log("submitProductToAdd is clicked");
    console.log("and data is: ",data)
    
    
    const {image,...rest}=data;
    try {
    
      
      const response=await productManagement.createProduct(rest);
      
      
      console.log("response in pm fron  is: ",response)
      

      if (response ) {
       
        
        dispatch(fetchAllProducts())
        
       
        try {
          const imageResponse=await productManagement.uploadImage(image,response.product._id);
          if (imageResponse) {
            
            toast.success("image uploaded successfully")
            
            
          }
         
         

          
        } catch (error) {
          console.log("Error in ProjectManagement while uploading images: ",error)
          toast.error(error?.message)
        }

        reset()
        
      }
     
     
      
      
    } catch (error) {
      console.log("Error in ProjectManagement: ",error)
      toast.error(error?.message)
      
    }
    toast.success("product uploaded successfully")

    reset();
    setAddState(false);
  };

  const submitProductToUpdate = async (data) => {
    console.log("Updating product:", data);
    // dispatch(updateProduct({ id: currentProduct._id, updatedData: data }));

    const {image,...rest}=data;
    
    try {
    
      
      const response=await dispatch(updateProduct({ id: currentProduct?._id, updatedData: rest }))
      console.log("response in productManagement update is: ",response)
      
      
      
      console.log("response in pm fron  is: ",response);
     
      

      if (response ) {
     
        
        dispatch(fetchAllProducts())
        
        try {
          const imageResponse=await productManagement.uploadImage(image,response?.payload?.data?._id);
          if (imageResponse) {
            
            toast.success('image uploaded successfully')
            
            
          }
         
         

          
        } catch (error) {
          console.log("Error in ProjectManagement while uploading images: ",error)
          toast.error(error?.message)
        }
        
      }
     
     
      
      
    } catch (error) {
      console.log("Error in ProjectManagement: ",error)
      toast.error(error?.message)
      
    }


    toast.success("Product updated successfully");
    setEditMode(false);
    reset();
    setAddState(false);
  };

  return (
    <div>
      <h1>Product Management</h1>
      <Button onClick={() => setAddState(true)} className="bg-blue-500 p-2 rounded">
        {editMode ? "Edit Product" : "Add Product"}
      </Button>

      {addState && (
        <form
          onSubmit={handleSubmit(editMode ? submitProductToUpdate : submitProductToAdd)}
          className="flex flex-col gap-3 p-3 bg-gray-200 rounded"
        >

<div   className="flex">
          <Input label="Title" {...register("title", { required: true })} />
          <Input label="Description" {...register("description", { required: true })} />
          <Input label="Price" type="number" {...register("price", { required: true })} />
          <Input label="Category" {...register("category", { required: true })} />
          <Input label="Quantity" type="number" {...register("quantity", { required: true })} />
          <Input label="Image" type="file" {...register("image")} multiple />

          


          </div>

          <div className="flex gap-3 justify-center">
            <Button className="bg-blue-400 rounded" type="submit">
              {editMode ? "Update" : "Add"}
            </Button>
            <Button className="bg-gray-500 rounded" onClick={() => setAddState(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>

        {products?.length===0 && <div>No Products to show</div>}
        {products?.map((product) => (
          <AdminProductCard
            key={product._id}
            id={product._id}
            product={product}
            setValue={setValue}
            setAddState={setAddState}
            setEditMode={setEditMode}
            setCurrentProduct={setCurrentProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductManagement;
