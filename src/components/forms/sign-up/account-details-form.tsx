import { USER_REGISTRATION_FORM } from '@/constants/forms' 
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'

// props for AccountDetailsForm component
type AccountDetailsFormProps = {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

function AccountDetailsForm({ errors, register }: AccountDetailsFormProps) {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Account details</h2>
      <p className="text-iridium md:text-sm">Enter your email and password</p>
      {/* form generator component is used to generate user reg form */}
      {USER_REGISTRATION_FORM.map((field: any) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  )
}

export default AccountDetailsForm
