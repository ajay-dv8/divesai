'use client'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

// data types for user type card
type UserTypeCardProps = {
  value: string // The value of the radio button
  title: string //title of the card
  text: string // the text description of the card
  register: UseFormRegister<FieldValues> // the register function from react-hook-form
  userType: 'owner' | 'student'
  // The function to update the user type
  setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}

// user type card component 
// to sow student and business owner card for user to choose from
const UserTypeCard = ({
  register,
  setUserType,
  text,
  title,
  userType,
  value,
}: UserTypeCardProps) => {
  return (
    <>
    <Label htmlFor={value}>
      <Card
        className={cn(
          'w-full cursor-pointer',
          userType == value && 'border-green'
        )}
      >
        <CardContent className="flex justify-between p-2">

          <div className="flex items-center gap-3">
            {/* The user icon card*/}
            <Card
              className={cn(
                'flex justify-center p-3',
                userType == value && 'border-green'
              )}
            >
              <User
                size={30}
                className={cn(
                  userType == value ? 'text-green' : 'text-gray-400'
                )}
              />
            </Card>

            {/* card description */}
            <div className="">
              <CardDescription className="text-iridium">
                {title}
              </CardDescription>
              <CardDescription className="text-gray-400">
                {text}
              </CardDescription>
            </div>
          </div>

          {/* te round indicator to sow option selected */}
          <div> 
            <div
              className={cn(
                'w-4 h-4 rounded-full',
                userType == value ? 'bg-green' : 'bg-transparent'
              )}
            >
              <Input
                {...register('type', { 
                  onChange: (event) => setUserType(event.target.value),
                })}
                value={value}
                id={value}
                className="hidden"
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
    </>
  )
}

export default UserTypeCard
