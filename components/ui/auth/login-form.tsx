"use client";
import { useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, TLoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CardWrapper from "./card-wrapper";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { login } from "@/actions/login";
import GoogleButton from "./google-button";



const LoginForm = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");


   const form = useForm<TLoginSchema>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = async (data: TLoginSchema) => {
      setLoading(true);
      login(data).then((res) => {
         if (res?.error) {
            setError(res?.error);
            setLoading(false);
         } else {
            setError("");
            setLoading(false);
         }
      });
   };


   return (
      <CardWrapper
         headerLabel="Create an account"
         title="login"
         backButtonHref="/register"
         backButtonLabel="Don't have an account"
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 placeholder="johndoe@email.com"
                                 type="email"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input {...field} placeholder="******" type="password" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormError message={error} />
               <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading..." : "Login"}
               </Button>
            </form>
         </Form>
         <GoogleButton />
      </CardWrapper>
   );
};
export default LoginForm;