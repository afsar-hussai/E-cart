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

    async updateUser(userData){

        return await this.Users.findOneAndUpdate(userData,{new:true})

    }
    async deleteUser(id){

        return await this.Users.findOneAndDelete(id)

    }


}

const dbService=new Service();

module.exports=dbService;