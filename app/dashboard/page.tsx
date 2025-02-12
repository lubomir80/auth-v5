
import { auth } from "@/auth"
import TransactionsList from "@/components/TransactionsList";
import { getTransactionsByUserId } from "@/data/transactions";



async function DashboardPage() {
   const session = await auth();
   const transactions = await getTransactionsByUserId(session?.user?.id)


   return (
      <div className="w-full text-center">
         <p>Hi, {session?.user?.name}</p>
         <TransactionsList transactions={transactions} />
      </div>
   )
}

export default DashboardPage
