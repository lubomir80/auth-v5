"use client";
import { useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { AddTransactionSchema, TAddTransactionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { FormError } from "./ui/auth/form-error";
import { Button } from "./ui/button";
import { FormSuccess } from "./ui/auth/form-success";
import { editTransaction } from "@/actions/edit-transaction";


type TransactionProps = {
   transactionId: string;
   userId: string;
   amount: number;
   type: 'INCOME' | 'EXPENSE';
   category: string;
   createdAt: Date;
   updatedAt: Date;
}




function EditTransactionForm({ transaction }: { transaction: TransactionProps }) {
   const {
      transactionId,
      userId,
      amount,
      type,
      category,
      createdAt,
      updatedAt,
   } = transaction


   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");


   const form = useForm<TAddTransactionSchema>({
      resolver: zodResolver(AddTransactionSchema),
      defaultValues: {
         amount: amount,
         type: type,
         category: category
      },
   });

   const onSubmit = async (data: TAddTransactionSchema) => {
      const updatedTransaction = {
         ...data,
         transactionId,
         userId,
         createdAt,
         updatedAt: new Date()
      }
      await editTransaction(updatedTransaction).then((res) => {
         if (!res) return
         if (res.error) {
            setLoading(false);
            setError(res.error);
            setSuccess("");
         }
         if (res.success) {
            setLoading(false);
            setError("");
            setSuccess(res.success);
         }
         setLoading(false)
      })
   };



   return (


      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
               <FormField
                  control={form.control}
                  name="amount"
                  render={({ field: { value, onChange } }) => (
                     <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                           <Input
                              type="number"
                              value={value}
                              onChange={(e) => onChange(Number(e.target.value))}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>

                  )}
               />
               <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                           <Input {...field} placeholder="Type" type="text" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                           <Input {...field} placeholder="category" type="text" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={loading}>
               {loading ? "Loading..." : "Edit"}
            </Button>
         </form>
      </Form>
   )
}

export default EditTransactionForm