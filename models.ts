import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
username: {
    type:String, 
    unique:true
  } , 
  password: String,
  firstName: String,
  lastName: String

});

const AccountSchema=new mongoose.Schema({
    
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
},
  balance: Number
})

export const UserModel=mongoose.model("users",UserSchema);
export const AccountModel=mongoose.model("accounts",AccountSchema);