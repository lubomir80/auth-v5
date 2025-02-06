"use server"


import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/prisma/prisma"






export const newVerificationToken = async (token: string) => {
   const existingToken = await getVerificationTokenByToken(token)

   if (!existingToken) {
      return { error: "Invalid token" }
   }

   const hasExpired = new Date(existingToken.expires) < new Date()

   if (hasExpired) {
      return { error: "Token has expired" }
   }

   const existUser = await getUserByEmail(existingToken.email)

   if (!existUser) {
      return { error: "User not found" }
   }

   await prisma.user.update({
      where: {
         id: existUser.id
      },
      data: {
         emailVerified: new Date(),
         email: existingToken.email
      }
   })
   await prisma.verificationToken.delete({
      where: {
         id: existingToken.id
      }
   })

   return { success: "Email verified" }
}