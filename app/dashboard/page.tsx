
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth"
import { getTransactionsByUserId } from "@/data/transactions";
import AddTransactionForm from "@/components/add-transaction-form";
import TransactionsList from "@/components/TransactionsList";



async function DashboardPage() {
   noStore();
   const session = await auth();
   const userId = session?.user?.id
   const transactions = await getTransactionsByUserId(userId)


   return (
      <div className="flex gap-5  p-5 w-full">
         <div className=" flex-[2]">
            <p>Hi, {session?.user?.name}</p>
            <AddTransactionForm userId={userId} />
         </div>
         <div className="flex-[6]">
            <TransactionsList transactions={transactions} />
         </div>
      </div>
   )
}

export default DashboardPage
