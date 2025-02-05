"use server";

import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { RegisterSchema, TRegisterSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/token";
import sendVerificationEmail from "@/lib/mail";


export const register = async (data: TRegisterSchema) => {
   try {
      // 1) Validate the input data
      const validatedData = RegisterSchema.parse(data);

      if (!validatedData) {
         return { error: "Invalid input data" };
      }
      //  2) Destructure the validated data
      const { email, name, password, passwordConfirmation } = validatedData;

      if (password !== passwordConfirmation) {
         return { error: "Passwords do not match" };
      }
      // 3) Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 4)Check to see if user already exists
      const userExists = await prisma.user.findFirst({
         where: {
            email,
         },
      });

      if (userExists) {
         return { error: "Email already is in use. Please try another one." };
      }

      const lowerCaseEmail = email.toLowerCase();
      // Create the user
      const user = await prisma.user.create({
         data: {
            email: lowerCaseEmail,
            name,
            password: hashedPassword,
         },
      });

      // Generate Verification Token
      const verificationToken = await generateVerificationToken(email)
      await sendVerificationEmail(lowerCaseEmail, verificationToken.token)


      return { success: "Email Verification was sent" };
   } catch (error) {
      // Handle the error, specifically check for a 503 error
      console.error("Database error:", error);
      if ((error as { code: string }).code === "ETIMEDOUT") {
         return {
            error: "Unable to connect to the database. Please try again later.",
         };
      } else if ((error as { code: string }).code === "503") {
         return {
            error: "Service temporarily unavailable. Please try again later.",
         };
      } else {
         return { error: "An unexpected error occurred. Please try again later." };
      }
   }
};