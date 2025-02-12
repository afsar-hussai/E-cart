/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { useState } from "react"
// import { Button, Input } from "../../components"
// import { useForm } from "react-hook-form";
// import productManagement from "../../BackendFunctions/ProductManagement";
// import { toast } from "sonner";
// import AdminProductCard from "./AdminProductCard";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllProducts, updateProduct } from "../../store/productSlice";


// function ProductManagement() {
//   const [addState, setAddState] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentProductToUpdate, setCurrentProductToUpdate] = useState({})
//   const {products,loading,error}=useSelector(state=>state.product);
//   const dispatch=useDispatch();
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState:{errors},
//     reset

//   } = useForm();

  
  
//   // console.log("products state in productManagement is: ",products)
//   // console.log("currentProductToUpdate state in productManagement is: ",currentProductToUpdate)
//   // console.log("products.length is in productManagement is: ",products.length)
//   console.log("editMode before submitProductToUpdate is: ",editMode)

//   const submitProductToAdd=async (data)=>{
//     console.log("submitProductToAdd is clicked");
//     console.log("and data is: ",data)
    
    
//     // const {image,...rest}=data;
//     // try {
    
      
//     //   const response=await productManagement.createProduct(rest);
      
      
//     //   console.log("response in pm fron  is: ",response)
      

//     //   if (response ) {
       
        
//     //     dispatch(fetchAllProducts())
       
//     //     try {
//     //       const imageResponse=await productManagement.uploadImage(image,response.product._id);
//     //       if (imageResponse) {
            
//     //         toast.success(response.message)
            
            
//     //       }
         
         

          
//     //     } catch (error) {
//     //       console.log("Error in ProjectManagement while uploading images: ",error)
//     //       toast.error(error?.message)
//     //     }

//     //     reset()
        
//     //   }
     
     
      
      
//     // } catch (error) {
//     //   console.log("Error in ProjectManagement: ",error)
//     //   toast.error(error?.message)
      
//     // }

//   }
 
  

//   // const submitProductToUpdate=(data)=>{
//   //   console.log("submitProductToUpdate is clicked");
//   //   console.log("and data is: ",data)
    
//     // const {image,...rest}=data;
    
//     // try {
    
      
//     //   const response=await dispatch(updateProduct({ id: currentProductToUpdate._id, updatedData: rest }))
//     //   console.log("response in productManagement update is: ",response)
      
      
      
//     //   console.log("response in pm fron  is: ",response);
//     //   setEditMode(false)
      

//     //   if (response ) {
//     //     dispatch(fetchAllProducts())
//     //     reset()
//     //     try {
//     //       const imageResponse=await productManagement.uploadImage(image,response.product._id);
//     //       if (imageResponse) {
            
//     //         toast.success(response.message)
            
            
//     //       }
         
         

          
//     //     } catch (error) {
//     //       console.log("Error in ProjectManagement while uploading images: ",error)
//     //       toast.error(error?.message)
//     //     }
        
//     //   }
     
     
      
      
//     // } catch (error) {
//     //   console.log("Error in ProjectManagement: ",error)
//     //   toast.error(error?.message)
      
//     // }

//   // }


//   //products Listing logic

//   // {products?.length===0?
        
//   //   (
//   //     <div>No Products to show</div>
//   //   ):
//   //   (
//   //     <div className="flex flex-col gap-3" >
//   //       {products?.map(product=>(
//   //         <div key={product._id}>
            
//   //         <AdminProductCard
//   //          id={product._id} 
//   //          product={product}
//   //          setValue={setValue}
//   //          setAddState={setAddState}
//   //          setEditMode={setEditMode}
//   //          setCurrentProductToUpdate={setCurrentProductToUpdate}
//   //          editMode={editMode}
//   //          />
//   //         </div>
//   //       ))}
//   //     </div>
//   //   )
    
//   //   }

//   const up=(data)=>{

//     console.log("submitProductToUpdate is clicked");
//     console.log("and data is: ",data)
//   }

//   useEffect(()=>{
//     console.log("useEffect executed")
    
//     dispatch(fetchAllProducts());
//     setEditMode((prev)=>prev)
    
 
    
    
//   },[dispatch, editMode])

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

  
  
//   return (
//     <div>
//       <h1>Product Management</h1>

//       <div
//        className="flex flex-col gap-3">
        
//       <Button
//       onClick={()=>setAddState(true)}
      
//       type="button"
//       className="bg-blue-500 p-2 rounded"
      
//       >
//         Add Product?
//       </Button>

//       <div 
//       className="bg-slate-400"
//       >
//        {addState && (
//         <form onSubmit={handleSubmit(up)}
//         className="flex gap-3 flex-col p-3"
//         >

//           <div
//           className="flex"
//           >

//           <Input
//           label="Product Title:"
//           placeholder='Enter Product title'
//           {...register('title',{
//             required:'Please Enter Title'
//           })}
//           />


//           <Input
//           label="Product Description:"
//           placeholder='Enter Product Description'
//           {...register('description',{
//             required:'Please Enter Title'
//           })}
//           />


//           <Input
//           label="Product Price:"
//           placeholder='Enter Product Price'
//           type='number'
//           {...register('price',{
//             required:'Please Enter Price'
//           })}
//           />


//           <Input
//           label="Product Category:"
//           placeholder='Enter Product category'
//           {...register('category',{
//             required:'Please Enter category'
//           })}
//           />


//           <Input
//           label="Product quantity:"
//           placeholder='Enter Product quantity'
//           type='number'
//           {...register('quantity',{
//             required:'Please Enter Title'
//           })}
//           />
//           <Input
//           label="Product image:"
         
//           type='file'
//           {...register('image',{
//             required:'Please Enter Title'
//           })}

//           multiple
//           />


//           </div>

//           <div 
//           className="flex gap-3 justify-center items-center"
//           >


// : 
         
//          {/* <Button
//           className="bg-blue-400 rounded"
//           type="submit"
//           >
//             Add

//           </Button> */}
         
//          <Button
//          className="bg-blue-400 rounded"
//           type="submit"
//          >
//           Update
//          </Button>

//           <Button
//           type="button"
//           className="bg-blue-400 rounded"
//           onClick={()=> setAddState(false)}
//           >
//             ⇐Back
          
//           </Button>

//           </div>

          


//         </form>
//        )}
//       </div>


       
//       <div  >
//         <AdminProductCard 
//         id='67a20b0dcc3050cebe7d22a6'
//         product={{
//           title: 'first',
//           description: 'first desc',
//           price: 35,
//           category: 'cosmotics',
//           quantity: 3521,
//           imageUrl: [],
//           imageId: [],
//         }}
//         setValue={setValue}
//         setAddState={setAddState}
//         setEditMode={setEditMode}
//         setCurrentProductToUpdate={setCurrentProductToUpdate}
//         editMode={editMode}
//         />

//       </div>
      

//       </div>

      
//     </div>
//   )
// }

// export default ProductManagement




//chatgpt code


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
    formState: { errors },
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
            
            toast.success(response.message)
            
            
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

    reset();
    setAddState(false);
  };

  const submitProductToUpdate = async (data) => {
    console.log("Updating product:", data);
    // dispatch(updateProduct({ id: currentProduct._id, updatedData: data }));

    const {image,...rest}=data;
    
    try {
    
      
      const response=await dispatch(updateProduct({ id: currentProduct._id, updatedData: rest }))
      console.log("response in productManagement update is: ",response)
      
      
      
      console.log("response in pm fron  is: ",response);
     
      

      if (response ) {
        dispatch(fetchAllProducts())
        
        try {
          const imageResponse=await productManagement.uploadImage(image,response.payload?.data?._id);
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
