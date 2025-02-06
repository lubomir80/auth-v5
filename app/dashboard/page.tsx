
import { auth } from "@/auth"
import LogOut from "@/components/ui/auth/logout-button";


async function DashboardPage() {
   const session = await auth();
   console.log(session);


   return (
      <div className="w-full text-center">
         <p> Dashboard Page</p>
         <LogOut />
      </div>
   )
}

export default DashboardPage