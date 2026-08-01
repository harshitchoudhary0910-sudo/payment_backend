import type { Request, Response } from "express";
import AccountModel from "../models/AccountModel.ts";
import type { CreateTransactionInput } from "../schemas/transaction.Schema.ts";
import transactionModel from "../models/TransactionModel.ts";
import ledgerModel from "../models/LedgerModel.ts";
import mongoose from "mongoose";
export async function createTransactionController(
    req: Request,
    res: Response
) {

    const session = await mongoose.startSession();
    let transaction = null;

    try {

        const {
            fromAccountNumber,
            toAccountNumber,
            amount,
            idempotencyKey
        } = req.body;

        const userId = res.locals.userId;


        const fromAccount = await AccountModel.findOne({
            accountNumber: fromAccountNumber,
            userId
        });

        if (!fromAccount) {
            return res.status(404).json({
                message: "Sender account not found"
            });
        }



        const toAccount = await AccountModel.findOne({
            accountNumber: toAccountNumber
        });

        if (!toAccount) {
            return res.status(404).json({
                message: "Receiver account not found"
            });
        }



        if (fromAccount._id.equals(toAccount._id)) {
            return res.status(400).json({
                message: "Cannot transfer to yourself"
            });
        }

        if (
            fromAccount.status !== "active" ||
            toAccount.status !== "active"
        ) {
            return res.status(400).json({
                message: "Inactive account"
            });
        }



        try {

            transaction = await transactionModel.create({
                fromAccount: fromAccount._id,
                toAccount: toAccount._id,
                amount,
                idempotencyKey,
                status: "PENDING"
            });

        }
        catch(err:any){

            if(err.code===11000){

                const existing =
                    await transactionModel.findOne({
                        idempotencyKey
                    });

                return res.status(409).json({
                    transaction: existing
                });
            }

            throw err;
        }



        session.startTransaction();

  

        const debitResult =
            await AccountModel.updateOne(

                {
                    _id: fromAccount._id,

                    balance:{
                        $gte:amount
                    }

                },

                {
                    $inc:{
                        balance:-amount
                    }
                },

                {
                    session
                }

            );

        if(debitResult.modifiedCount===0){

            throw new Error("Insufficient balance");
        }


        await AccountModel.updateOne(

            {
                _id:toAccount._id
            },

            {
                $inc:{
                    balance:amount
                }
            },

            {
                session
            }

        );

  

        await ledgerModel.create([{

            account:fromAccount._id,
            amount,
            transaction:transaction._id,
            type:"DEBIT"

        }],{session});



        await ledgerModel.create([{

            account:toAccount._id,
            amount,
            transaction:transaction._id,
            type:"CREDIT"

        }],{session});

        transaction.status="COMPLETED";

        await transaction.save({
            session
        });



        await session.commitTransaction();

        return res.status(201).json({

            message:"Success",

            transaction

        });

    }
    catch(err:any){

        await session.abortTransaction();

        if(transaction){

            transaction.status="FAILED";

            await transaction.save();
        }

        return res.status(500).json({

            message:err.message

        });

    }
    finally{

        session.endSession();

    }

}