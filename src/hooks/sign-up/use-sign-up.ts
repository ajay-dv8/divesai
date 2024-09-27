'use client'
import { useToast } from '@/components/ui/use-toast'
import {
  UserRegistrationProps,
  UserRegistrationSchema, 
} from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { onCompleteUserRegistration } from '@/actions/auth'

// this hoot handles everything about clerk auth {loading,}

export const useSignUpForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false) 
  const { signUp, isLoaded, setActive } = useSignUp() 
  const router = useRouter()
  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: 'owner',
    },
    mode: 'onChange',
  })

  // used to generate otp for user on sign up
  const onGenerateOTP = async (
    // take the email and password and if user clicked next button  
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    // if email and pass is not loaded return nothing
    if (!isLoaded) return

    try {
      // when email and pass is loaded create a new user with the email and pass
      await signUp.create({
        emailAddress: email,
        password: password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      onNext((prev) => prev + 1)
    } catch (error: any) {
      // show toast if there is an error
      toast({
        title: 'Error',
        description: error.errors[0].longMessage,
      })
    }
  }

  // to submit user registration data to db
  const onHandleSubmit = methods.handleSubmit(
    // user registration data is in values
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return

      try {
        // pass the otp as verification code wen signing up user
        setLoading(true)
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        })

        // if the sign up status was not set to complete or user is not verified return an error message
        if (completeSignUp.status !== 'complete') {
          return { message: 'Something went wrong!' }
        }

        // if the sign up status is complete and user is verified, complete the user registration
        if (completeSignUp.status == 'complete') {
          if (!signUp.createdUserId) return

          const registered = await onCompleteUserRegistration(
            values.fullname,
            signUp.createdUserId,
            values.type
          )

          // if the user registration is successful, redirect to dashboard
          if (registered?.status == 200 && registered.user) {
            await setActive({
              session: completeSignUp.createdSessionId,
            })

            // goto (dashboard) settings page
            setLoading(false)
            router.push('/settings')
          }

          // if the user registration is not successful, show an error message
          if (registered?.status == 400) {
            toast({
              title: 'Error',
              description: 'Something went wrong!',
            })
          }
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.errors[0].longMessage,
        })
      }
    }
  )
  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  }
}
