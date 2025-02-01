/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Button, Input } from "../../components"
import { useForm } from "react-hook-form";
import productManagement from "../../BackendFunctions/ProductManagement";
import { toast } from "sonner";


function ProductManagement() {
  const [addState, setAddState] = useState(false);
  const {
    register,
    handleSubmit,
    formState:{errors},
    reset

  } = useForm();

  const submitProduct=async (data)=>{
    try {
    
      
      const response=await productManagement.createProduct(data);
     
      toast.success(response.message)
      reset()
      
      
    } catch (error) {
      console.log("Error in ProjectManagement: ",error)
      
      
    }

  }

  
  // title
  // description
  // price
  // category
  // quantity
  return (
    <div>
      <h1>Product Management</h1>

      <div
       className="flex flex-col gap-3">
        
      <Button
      onClick={()=>setAddState(true)}
      
      type="button"
      className="bg-blue-500 p-2 rounded"
      
      >
        Add Product?
      </Button>

      <div 
      className="bg-slate-400"
      >
       {addState && (


        <form onSubmit={handleSubmit(submitProduct)}
        className="flex gap-3 flex-col p-3"
        >

          <div
          className="flex"
          >

          <Input
          label="Product Title:"
          placeholder='Enter Product title'
          {...register('title',{
            required:'Please Enter Title'
          })}
          />


          <Input
          label="Product Description:"
          placeholder='Enter Product Description'
          {...register('description',{
            required:'Please Enter Title'
          })}
          />


          <Input
          label="Product Price:"
          placeholder='Enter Product Price'
          type='number'
          {...register('price',{
            required:'Please Enter Price'
          })}
          />


          <Input
          label="Product Category:"
          placeholder='Enter Product category'
          {...register('category',{
            required:'Please Enter category'
          })}
          />


          <Input
          label="Product quantity:"
          placeholder='Enter Product quantity'
          type='number'
          {...register('quantity',{
            required:'Please Enter Title'
          })}
          />
          <Input
          label="Product image:"
         
          type='file'
          {...register('image',{
            required:'Please Enter Title'
          })}
          />


          </div>

          <div 
          className="flex gap-3 justify-center items-center"
          >


          <Button
          className="bg-blue-400 rounded"
          type="submit"
          >
            Add

          </Button>

          <Button
          type="button"
          className="bg-blue-400 rounded"
          onClick={()=> setAddState(false)}
          >
            ⇐Back
          
          </Button>

          </div>

          


        </form>
       )}
      </div>
      

      </div>

      
    </div>
  )
}

export default ProductManagement
