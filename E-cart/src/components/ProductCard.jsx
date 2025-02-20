/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


function ProductCard({
    product

}) {
  return (
    <div className="border border-black p-3 m-2  min-w-[320px] max-w-[1200px]" >
      <div className="flex flex-col items-center">
     <div className="border border-black p-2 w-full flex  justify-center items-center">
        Image
     </div>

     <div>
        Details
     </div>
      </div>
    </div>
  )
}

export default ProductCard
