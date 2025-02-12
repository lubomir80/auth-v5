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

   if (transactions?.length === 0) {
      return (
         <Table>
            <TableCaption>The table is empty</TableCaption>
         </Table>
      )
   }


   return (
      <Table className="max-w-[600px] mx-auto ">
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
                     <TableCell>
                        <Link
                           className="bg-black text-white rounded-md p-2 hover:bg-black/85"
                           href={`dashboard/transaction/${item.transactionId}`}>
                           Open
                        </Link>
                     </TableCell>
                  </TableRow>
               )
            })}
         </TableBody>
      </Table>
   )
}

export default TransactionsList