import { getTransactionById } from "@/data/transactions";

type PageProps = {
   params: {
      id: string;
   };
};




async function SingleTransactionPage({ params }: PageProps) {
   const transaction = await getTransactionById(params.id)

   return (
      <div className="container">
         <h1>Transaction Details</h1>

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




      </div>
   )
}

export default SingleTransactionPage