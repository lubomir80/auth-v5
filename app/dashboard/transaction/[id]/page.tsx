import { unstable_noStore as noStore } from "next/cache";
import EditTransactionForm from "@/components/edit-transaction-form";
import { getTransactionById } from "@/data/transactions";
import Link from "next/link";

type PageProps = {
   params: {
      id: string;
   };
};




async function SingleTransactionPage({ params }: PageProps) {
   noStore()
   const { id } = await params
   const transaction = await getTransactionById(id)

   if (!transaction) {
      return (
         <div>
            Not transaction found!
         </div>
      )
   }



   return (
      <div className="container">
         <div className="flex items-center gap-5 mb-5">
            <h1 className="text-xl font-bold">Transaction Details</h1>
            <Link
               className="bg-black text-white p-2 hover:bg-slate-800 rounded-md"
               href={"/dashboard"}>
               Back
            </Link>
         </div>

         <div className="transaction-detail">
            <p><strong>Transaction ID:</strong> {transaction?.transactionId}</p>
         </div>

         <div className="transaction-detail">
            <p><strong>User ID:</strong> {transaction?.userId}</p>
         </div>

         <div className="transaction-detail">
            <p><strong>Amount:</strong> ${transaction?.amount}</p>
         </div>

         <div className="transaction-detail">
            <p><strong>Type: </strong>
               <span className={transaction?.type === "INCOME" ? "text-green-500" : "text-red-600"}>
                  {transaction?.type}
               </span>
            </p>
         </div>
         <div className="transaction-detail">
            <p><strong>Created At:</strong> {transaction?.createdAt.toDateString()}</p>
         </div>

         <div className="transaction-detail">
            <p><strong>Updated At:</strong> {transaction?.updatedAt.toDateString()}</p>
         </div>


         <EditTransactionForm transaction={transaction} />

      </div>
   )
}

export default SingleTransactionPage