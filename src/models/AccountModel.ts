import mongoose from "mongoose";
const AccountSchema=new mongoose.Schema({
    
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true
},
accountNumber: {
    type: String,
    unique: true,
    required: true
},
    balance: {
        type: Number,
        default: 0
    },
status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active"
}
})

 const AccountModel=mongoose.model("accounts",AccountSchema);
 export default AccountModel;