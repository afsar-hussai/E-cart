import { Link } from "react-router-dom"


function Home() {
  return (
    <div>
      This is Home

      <Link to='/product-details'>
      <button>To Product Details</button>
      </Link>
    </div>
  )
}

export default Home
