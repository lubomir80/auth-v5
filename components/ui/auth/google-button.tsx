"use client"

import { googleAuthenticate } from "@/actions/google-login"
import { useActionState } from "react"
import { Button } from "../button"
import { BsGoogle } from "react-icons/bs"


function GoogleButton() {
   const [errorMsgGoogle, dispatchGoogle] = useActionState(googleAuthenticate, undefined)

   return (
      <form className="flex mt-4" action={dispatchGoogle}>
         <Button className="flex flex-row items-center gap-3 w-full" variant='outline'>
            <BsGoogle />
            Google Sign In
         </Button>
         <p>{errorMsgGoogle}</p>
      </form>
   )
}

export default GoogleButton