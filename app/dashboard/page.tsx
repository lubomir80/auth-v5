import { auth } from "@/auth"

async function DashboardPage() {
   const session = await auth();
   console.log(session);


   return (
      <div>Dashboard Page</div>
   )
}

export default DashboardPage