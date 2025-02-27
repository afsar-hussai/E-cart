class Service{
    Orders;

    constructor(){
        this.Orders=require('../models/orderModel')
    }

    async createOrder(OrdersData){
        return await this.Orders.create(OrdersData)
    }

    async getOrder(OrdersData){

        return await this.Orders.findOne(OrdersData)

    }

    async getAllOrders(){

        return await this.Orders.find();

    }

    async updateOrders(search,OrdersData){

        return await this.Orders.findByIdAndUpdate(search,OrdersData,{new:true})

    }
    async deleteOrders(id){

        return await this.Orders.findOneAndDelete(id)

    }

}

const orderServices=new Service();
module.exports=orderServices;