
import { SectionLabel } from '@/components/section-label'
import UploadButton from '@/components/upload-button'
import { BotIcon } from '@/icons/bot-icon'

import Image from 'next/image'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type EditChatbotProps = {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  chatBot?: {
    id: string
    icon: string | null
    welcomeMessage: string | null
  } | null
}

// allow user to to change the icon of the chatbar
const EditChatbotIcon = ({ register, errors, chatBot }: EditChatbotProps) => {
  return (
    <div className="py-5 flex flex-col gap-5 items-start">
      <SectionLabel
        label="Chatbot icon"
        message="Change the icon for the chatbot."
      />

      {chatBot?.icon ? (
        <div className="rounded-full overflow-hidden">
          <Image
            src={`https://ucarecdn.com/${chatBot.icon}/`}
            alt="bot"
            width={80}
            height={80}
          />
        </div>
      ) : (
        <div className="rounded-full cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-green/70">
          <BotIcon />
        </div>
      )}

      <UploadButton
        label="Edit Image"
        register={register}
        errors={errors}
      />
    </div>
  )
}

export default EditChatbotIcon
