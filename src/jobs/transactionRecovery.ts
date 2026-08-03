import transactionModel  from "../models/TransactionModel.ts";
export async function recoverPendingTransactions() {

    const fiveMinutesAgo =
        new Date(Date.now() - 5 * 60 * 1000);

    await transactionModel.updateMany(

        {
            status: "PENDING",
            createdAt: {
                $lt: fiveMinutesAgo
            }
        },

        {
            $set: {
                status: "FAILED"
            }
        }

    );

}