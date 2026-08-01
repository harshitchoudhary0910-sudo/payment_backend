import mongoose from "mongoose";
const counterSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    seq: {
        type: Number,
        default: 100000000000
    }
});

const CounterModel=mongoose.model("counters", counterSchema);
export default CounterModel;