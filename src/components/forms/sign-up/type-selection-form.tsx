import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'

// data types for type selection form
type TypeSelectionFormProps = {
  register: UseFormRegister<FieldValues>
  userType: 'owner' | 'student'
  setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}

const TypeSelectionForm = ({ register, setUserType, userType }: TypeSelectionFormProps) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold text-center">Create an account</h2>

      <p className="md:text-sm text-center">
        Tell us about yourself and what you do? Let’s tailor your
        <br /> experience so it best suits you.
      </p>

      {/* card for business owner selection */} 
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="owner"
        title="I own a business"
        text="Setting up a account for my company."
      />

      {/* card for student selection */}
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="student"
        title="Im a test user"
        text="Looking to learn about the tool."
      />
    </>
  )
}
export default TypeSelectionForm