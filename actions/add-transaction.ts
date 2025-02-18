"use server";

import { prisma } from "@/prisma/prisma";
import { TAddTransactionSchema } from "@/schemas";
import { revalidatePath } from "next/cache";


export const addTransaction = async (transaction: TAddTransactionSchema, userId: string | undefined) => {
   if (!userId) return

   try {
      const { amount, type, category } = transaction;
      const newTransaction = await prisma.transaction.create({
         data: {
            amount,
            type,
            category,
            userId
         }
      })

      revalidatePath("/dashboard")
      return { success: "New transaction added" }
   } catch (error) {
      return { error: "An unexpected error occurred. Please try again later." }
   }

}