"use client";
import { useChangePassword } from "@/hooks/settings/use-settings"
import { SectionLabel } from "../section-label";
import FormGenerator from "../forms/form-generator";
import { Button } from "../ui/button";
import { Loader } from "../loader";

export const ChangePassword = () => {
  const { register, errors, onChangePassword, loading } = useChangePassword()
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
      <div className="lg:col-span-1">
        <SectionLabel
          label="Change Password"
          message="Update your password."
        />
      </div>

      <form 
        onSubmit={onChangePassword} 
        className="lg:col-span-4"
      >

        <div className="lg:w-[500px] flex flex-col gap-4">
          <FormGenerator
            inputType="input"
            type="text"
            name="password"
            placeholder="New Password"
            register={register}
            errors={errors}
          />
          <FormGenerator
            inputType="input"
            type="text"
            name="confirmPassword"
            placeholder="Confirm New Password"
            register={register}
            errors={errors}
          />

          <Button className="bg-green/70 text-gray-700 font-semibold border border-green hover:bg-green">
            <Loader loading={loading}>Change Password</Loader>
          </Button>
        </div>

      </form>
    </div>
  )
}
