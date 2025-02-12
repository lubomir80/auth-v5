
import { auth } from "@/auth"
import LogOut from "@/components/ui/auth/logout-button";


async function DashboardPage() {
   const session = await auth();
   console.log(session);


   return (
      <div className="w-full text-center">
         <p>Hi, {session?.user?.name}</p>
         <LogOut />
      </div>
   )
}

export default DashboardPage
