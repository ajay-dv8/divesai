'use client' 
import { useFormContext } from 'react-hook-form'
import FormGenerator from '../form-generator'
import { USER_LOGIN_FORM } from '@/constants/forms'

type Props = {}

/**
 * Renders a login form component that uses the `react-hook-form` library to manage form state and validation.
 * The form is generated using the `FormGenerator` component, which maps over the `USER_LOGIN_FORM` array and renders the appropriate form fields.
 * The form includes a heading and a brief description.
 *
 * @param props - The component props (currently empty).
 * @returns The rendered login form component.
 */
const LoginForm = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <>
      <h2 className="text-gravel md:text-4xl text-center font-bold">Login</h2>
      <p className="text-iridium md:text-sm text-center mb-4">
        You will receive a one time password
      </p>
      {USER_LOGIN_FORM.map((field) => (
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

export default LoginForm
