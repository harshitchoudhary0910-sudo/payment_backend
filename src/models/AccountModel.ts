import mongoose from "mongoose";
const AccountSchema=new mongoose.Schema({
    
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true
},
status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active"
}
})

 const AccountModel=mongoose.model("accounts",AccountSchema);
 export default AccountModel;