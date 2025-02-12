
import Link from 'next/link'
import LogOutButton from './ui/auth/logout-button'


function Navbar() {
   return (
      <nav className="bg-blue-600 text-white p-4">
         <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">MyApp</h1>
            <div className='flex items-center justify-center gap-5'>
               <div className="space-x-4">
                  <Link href="/" className="hover:underline">Home</Link>
                  <Link href="/about" className="hover:underline">About</Link>
                  <Link href="/contact" className="hover:underline">Contact</Link>
               </div>
               <LogOutButton />
            </div>
         </div>
      </nav>
   )
}

export default Navbar