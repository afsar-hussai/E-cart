// import { Link } from "react-router-dom"

import ProductCard from "../components/ProductCard"


function Home() {
  return (
    <div className="min-h-screen flex flex-wrap">
     

      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />

      {/* <Link to='/product-details'>
      <button>To Product Details</button>
      </Link> */}

      
    </div>
  )
}

export default Home
