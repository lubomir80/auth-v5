"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { FormSuccess } from "./form-success"
import { FormError } from "./form-error"
import { newVerificationToken } from "@/actions/new-verification"
import CardWrapper from "./card-wrapper"


function VerifyEmailForm() {
   const [success, setSuccess] = useState<string | undefined>(undefined);
   const [error, setError] = useState<string | undefined>(undefined);
   const searchParams = useSearchParams()
   const token = searchParams.get("token")

   const onSubmit = useCallback(() => {
      if (success || error) {
         return
      }

      if (!token) {
         setError("No token provided")
         return
      }
      newVerificationToken(token).then((data) => {
         if (data.success) {
            setSuccess(data.success)
         }
         if (data.error) {
            setError(data.error)
         }
      }).catch((error) => {
         console.log(error);
         setError("An unexpected error occurred")
      })
   }, [token, success, error])


   useEffect(() => {
      onSubmit()
   }, [])

   return (
      <CardWrapper
         headerLabel="Confirming your email address"
         title="Confirming now..."
         backButtonHref="/auth/login"
         backButtonLabel="Back to login"
      >
         <div className="flex items-center w-full justify-center">
            {!success && !error && <span>Loading...</span>}
            <FormSuccess message={success} />
            {!success && <FormError message={error} />}
         </div>
      </CardWrapper>
   )
}

export default VerifyEmailForm