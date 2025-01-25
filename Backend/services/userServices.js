class Service{
    Users;
    constructor() {
        this.Users=require('../models/userModel');

        
    }


    async createUser(userData){
        return await this.Users.create(userData)
    }

    async getUser(userData){

        return await this.Users.findOne(userData)

    }

    async updateUser(search,userData){

        return await this.Users.findOneAndUpdate({email:search},userData,{new:true})

    }
    async deleteUser(id){

        return await this.Users.findOneAndDelete(id)

    }


}

const dbService=new Service();

module.exports=dbService;