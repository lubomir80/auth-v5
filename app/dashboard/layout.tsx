import Navbar from "@/components/Navbar"


function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex flex-col min-h-screen">
         <Navbar />
         <main className="flex-grow container mx-auto p-4">
            {children}
         </main>
         <footer className="bg-gray-800 text-white text-center p-4 mt-4">
            <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
         </footer>
      </div>
   )
}

export default DashboardLayout