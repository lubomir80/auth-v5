"use server";

import { prisma } from "@/prisma/prisma";
import { LoginSchema, TLoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";



export const login = async (data: TLoginSchema) => {

   // 1) Validate the input data
   const validatedData = LoginSchema.parse(data);

   if (!validatedData) {
      return { error: "Invalid input data" };
   }
   //  2) Destructure the validated data
   const { email, password } = validatedData;

   // 3)Check to see if user already exists
   const userExists = await prisma.user.findFirst({
      where: {
         email,
      },
   });

   if (!userExists || !userExists.password || !userExists.email) {
      return { error: "User doesn't exist, please make registration." };
   }

   try {
      // 4) Sign in
      await signIn("credentials", {
         email: userExists.email,
         password: password,
         redirectTo: "/dashboard"
      })

   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin":
               return { error: "Invalid credentials" };
            default:
               return { error: "Please confirm your email address" }
         }
      }
      throw error;
   }
   return { success: "User logged in successfully" }
};