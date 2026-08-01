import type { Request, Response } from "express";
import AccountModel from "../models/AccountModel.ts";
import CounterModel from "../models/CounterModel.ts";


export async function createAccountController(req: Request, res: Response) {
    try {

        const newAccount = await AccountModel.create({
            userId: res.locals.userId,
            accountNumber: await generateAccountNumber(),
        });

        res.status(201).json({
            accountNumber: newAccount.accountNumber
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error creating account"
        });
    }
}


export async function getUserAccountsController(req:Request, res:Response){
    try{
        const UserAccounts=await AccountModel.find({userId:res.locals.userId});
        if(UserAccounts.length===0){
            return res.status(404).json({
                message:"No accounts found for the user"
            });
        }
        const response=UserAccounts.map(account=>({
            accountNumber:account.accountNumber,
            status:account.status
        }));

        res.status(200).json(response);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching user accounts"
        });
    }
}


async function generateAccountNumber() {
    const counter = await CounterModel.findOneAndUpdate(
        { _id: "accountNumber" },
        { $inc: { seq: 1 } },
        {
            new: true,
            upsert: true
        }
    );

    return counter.seq.toString();
}