import { getVerificationTokenByEmail } from '@/data/verification-token';
import { prisma } from '@/prisma/prisma';
import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = async (email: string) => {
   const token = uuidv4();
   const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000 * 2);

   //Check if a token already exists
   const existingToken = await getVerificationTokenByEmail(email)





   if (existingToken) {
      await prisma.verificationToken.delete({
         where: {
            id: existingToken.id
         }
      })
   }

   const verificationToken = await prisma.verificationToken.create({
      data: {
         email: email,
         token: token,
         expires: oneHourFromNow
      }
   })

   return verificationToken;
}