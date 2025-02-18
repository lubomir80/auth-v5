"use server";

import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";


export const deleteTransaction = async (id: string) => {
   try {
      const newTransaction = await prisma.transaction.delete({
         where: { transactionId: id }
      })

      revalidatePath("/dashboard")
      return { success: "Transaction deleted" }
   } catch (error) {
      return { error: "An unexpected error occurred. Please try again later." }
   }

}