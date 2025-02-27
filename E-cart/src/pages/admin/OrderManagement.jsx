/* eslint-disable no-unused-vars */
import { useState } from "react"
import OrderCard from "../../components/OrderCard"


function OrderManagement() {

  const [allOrders, setallOrders] = useState([])
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-2xl ">Order Management</h1>
      <div className="flex justify-between gap-2 border border-gray-400 bg-black shadow-slate-400 p-2 rounded-md font-bold">
      <div>
        image
      </div>

      <div>
        id
      </div>

      <div>

      </div>

      <div>
        date
      </div>

      <div>
        payment
      </div>

      <div>
        delivery status
      </div>

      <div>
        More
      </div>
    </div>


      <div>
        <OrderCard />
      </div>
    </div>
  )
}

export default OrderManagement
