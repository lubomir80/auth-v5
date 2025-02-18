"use client"
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { deleteTransaction } from "@/actions/delete-transaction";

type Transaction = {
   transactionId: string;
   userId: string;
   amount: number;
   type: "INCOME" | "EXPENSE"; // Extend if needed
   category: string;
   createdAt: Date;
   updatedAt: Date;
};

type Transactions = {
   transactions: Transaction[] | null
}




function TransactionsList({ transactions }: Transactions) {
   async function handleDelete(id: string) {
      await deleteTransaction(id)
   }



   if (transactions?.length === 0) {
      return (
         <Table>
            <TableCaption>The table is empty</TableCaption>
         </Table>
      )
   }

   return (
      <Table>
         <TableCaption>A list of your transactions.</TableCaption>
         <TableHeader >
            <TableRow >
               <TableHead className="text-center text-[18px] font-bold">Amount</TableHead>
               <TableHead className="text-center text-[18px] font-bold">Type</TableHead>
               <TableHead className="text-center text-[18px] font-bold">Category</TableHead>
               <TableHead className="text-center text-[18px] font-bold"></TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {transactions?.map((item) => {
               return (
                  <TableRow key={item.transactionId}>
                     <TableCell className="font-bold">{item.amount} $</TableCell>
                     <TableCell
                        className={item.type === "INCOME" ? "text-green-500" : "text-red-600"}>
                        {item.type}
                     </TableCell>
                     <TableCell>{item.category}</TableCell>
                     <TableCell className="flex items-center gap-4">
                        <Link
                           className="bg-black text-white rounded-md p-2 hover:bg-black/85"
                           href={`dashboard/transaction/${item.transactionId}`}>
                           Open
                        </Link>
                        <form action={() => handleDelete(item.transactionId)}>
                           <button
                              type='submit'
                              className='bg-red-500 rounded-md p-2 text-white hover:bg-red-700'>
                              Delete
                           </button>
                        </form>
                     </TableCell>
                  </TableRow>
               )
            })}
         </TableBody>
      </Table>
   )
}

export default TransactionsList