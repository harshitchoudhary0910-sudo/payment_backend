import { Router} from "express";
import { authMiddleware } from "../middleware/auth.ts";
import { AccountModel ,UserModel} from "../models.ts";
import { validate } from "../middleware/validation.ts";
import { transferSchema } from "../schemas/user.Schema.ts";
import type { TransferInput } from "../schemas/user.Schema.ts";
import mongoose from "mongoose";



const router=Router();
router.get("/balance", authMiddleware,async (req,res) =>{
    try{
        const userId:String|undefined=res.locals.userId;
        const account=await AccountModel.findOne({userId});
        if(!account){
            return res.status(404).json({message:"Account not found"});
        }
        res.status(200).json({ balance: account.balance });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching balance" });
    }
})

router.post("/transfer",authMiddleware,validate(transferSchema),async (req,res)=>{

     const session = await mongoose.startSession();

        try {
            const { toUsername, amount } = req.body 
            const senderId = res.locals.userId as string;

            session.startTransaction();

            // Find sender account
            const senderAccount = await AccountModel.findOne({
                userId: senderId
            }).session(session);

            if (!senderAccount) {
                await session.abortTransaction();
                return res.status(404).json({
                    message: "Sender account not found"
                });
            }

            // Check balance
            if (senderAccount.balance < amount) {
                await session.abortTransaction();
                return res.status(400).json({
                    message: "Insufficient balance"
                });
            }

            // Find receiver
            const receiver = await UserModel.findOne({
                username: toUsername
            }).session(session);

            if (!receiver) {
                await session.abortTransaction();
                return res.status(404).json({
                    message: "Receiver not found"
                });
            }

            // Prevent self transfer
            if (receiver._id.toString() === senderId) {
                await session.abortTransaction();
                return res.status(400).json({
                    message: "Cannot transfer to yourself"
                });
            }

            // Find receiver account
            const receiverAccount = await AccountModel.findOne({
                userId: receiver._id
            }).session(session);

            if (!receiverAccount) {
                await session.abortTransaction();
                return res.status(404).json({
                    message: "Receiver account not found"
                });
            }

            // Debit sender
            senderAccount.balance -= amount;
            await senderAccount.save({ session });

            // Credit receiver
            receiverAccount.balance += amount;
            await receiverAccount.save({ session });

            // Commit transaction
            await session.commitTransaction();

            return res.status(200).json({
                message: "Transfer successful"
            });

        } catch (err) {
            await session.abortTransaction();

            return res.status(500).json({
                message: "Internal Server Error"
            });

        } finally {
            session.endSession();
        }
});
export default router;


    

    
  



