"use server";

import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

type Transaction = {
   transactionId: string;
   userId: string;
   amount: number;
   type: 'INCOME' | 'EXPENSE';
   category: string;
   createdAt: Date;
}



export const editTransaction = async (data: Transaction) => {
   const {
      transactionId,
      userId,
      amount,
      type,
      category,
      createdAt,
   } = data


   try {
      const newTransaction = await prisma.transaction.update({
         where: { transactionId: transactionId },
         data: {
            userId: userId,
            amount: amount,
            type: type,
            category: category,
            createdAt: createdAt,
            updatedAt: new Date()
         }
      })

      revalidatePath(`/transaction/${transactionId}`)
      return { success: "Transaction updated" }
   } catch (error) {
      return { error: "An unexpected error occurred. Please try again later." }
   }

}