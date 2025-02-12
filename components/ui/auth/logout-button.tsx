"use client"

import { Button } from "../button"
import { signOut } from "next-auth/react";

function LogOutButton() {


   return (
      <Button
         type="submit"
         onClick={() => signOut()}>
         Log out
      </Button>
   )
}

export default LogOutButton 
