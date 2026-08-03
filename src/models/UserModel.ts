import mongoose from "mongoose";
import { lowercase } from "zod";
const UserSchema=new mongoose.Schema({
username: {
    type:String, 
    unique:true,
    trim:true,
    lowercase:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email format"]

  } , 
  password: String,
  firstName: String,
  lastName: String,
  admin:{
    type:Boolean,
    default:false,
    immutable:true
  }
 
},
{
    timestamps: true
});
 const UserModel=mongoose.model("users",UserSchema);
 export default UserModel;