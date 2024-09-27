'use client'
import { useAuthContextHook } from '@/context/use-auth-context'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import TypeSelectionForm from './type-selection-form'
import dynamic from 'next/dynamic'
// import { Spinner } from '@/components/spinner'

// this component is imported dynamically so it is only loaded when its called
const DetailForm = dynamic(() => import('./account-details-form'), {
  ssr: false,
  // loading: Spinner, //TODO: ajay find and fix loading error
})
// this component is imported dynamically so it is only loaded when its called
const OTPForm = dynamic(() => import('./otp-form'), {
  ssr: false,
  // loading: Spinner, //TODO: ajay find and fix loading error
})

type Props = {}

const RegistrationFormStep = (props: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  // get the current registration step of te user
  const { currentStep } = useAuthContextHook()
  // state to store otp
  const [onOTP, setOnOTP] = useState<string>('')
  // state to store user type if owner or user
  const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner')

  setValue('otp', onOTP)

  // switch statement to render the correct form based on the current step
  switch (currentStep) {
    case 1:
      // render the type selection form
      // select form to show if user is owner or student
      return (
        <TypeSelectionForm  
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      )
    case 2:
      return (
        <DetailForm
          errors={errors}
          register={register} 
        />
      )
    case 3:
      return (
        <OTPForm
          onOTP={onOTP}
          setOTP={setOnOTP}
        />
      )
  }

  return <div>RegistrationFormStep</div>
}

export default RegistrationFormStep
