import { prisma } from "@/prisma/prisma";

export const getTransactionsByUserId = async (userId: string | undefined) => {
   try {
      const transactions = await prisma.transaction.findMany({
         where: { userId: userId },
      })

      return transactions

   } catch (error) {
      console.error(error)
      return null
   }
}

export const getTransactionById = async (transactionId: string) => {
   try {
      const transaction = await prisma.transaction.findUnique({
         where: { transactionId: transactionId },
      })

      return transaction

   } catch (error) {
      console.error(error)
      return null
   }
}