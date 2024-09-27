'use client'
import { Separator } from '@/components/ui/separator'
import { useSettings } from '@/hooks/settings/use-settings' 
import { DomainUpdate } from './domain-update'
import CodeSnippet from './code-snippet'
import PremiumBadge from '@/icons/premium-badge'
import EditChatbotIcon from './edit-chatbot-icon'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader' 
import { AlertTriangle } from 'lucide-react'

// used dynamic import for welcome message
// component will be called/rendered only when needed
const WelcomeMessage = dynamic (
  () => import('./greetings-message').then((props) => props.default),
  {
    ssr: false,
  }
)

type Props = {
  id: string
  name: string
  // TODO: change standard to free
  plan?: 'STANDARD' | 'PRO' | 'ULTIMATE' 
  chatBot: {
    id: string
    icon: string | null
    welcomeMessage: string | null
  } | null
}

const SettingsForm = ({ id, name, chatBot, plan }: Props) => {
  const {
    register,
    onUpdateSettings,
    errors,
    onDeleteDomain,
    deleting,
    loading,
  } = useSettings(id)
  return (
    <form
      className="flex flex-col gap-8 pb-10"
      onSubmit={onUpdateSettings}
    >
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-2xl">Domain Settings</h2>
        <Separator orientation="horizontal" />

        <DomainUpdate
          name={name}
          register={register}
          errors={errors}
        />
        
        {/* code snippet to integrate AI bot */}
        <CodeSnippet id={id} />
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <div className="flex gap-4 items-center">
          <h2 className="font-bold text-2xl">Chatbot Settings</h2>
          <div className="flex gap-1 bg-cream rounded-full dark:text-gray-500 px-3 py-1 text-xs items-center font-bold">
            <PremiumBadge />
            Premium
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="grid md:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-5 order-last md:order-first">
            <EditChatbotIcon
              chatBot={chatBot}
              register={register}
              errors={errors}
            />
            <WelcomeMessage
              message={chatBot?.welcomeMessage!}
              register={register}
              errors={errors}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-end">
        <div className="">
          <Button
            //onClick={onDeleteDomain}
            variant="destructive"
            type="button"
            className="px-10 h-[50px]"
          >
            <Loader loading={deleting}>Delete Domain</Loader>
          </Button>
          <p className="flex gap-x-2 mt-3 items-center">
            <AlertTriangle className='text-red-500'/>
            Deleted domains <br/> can not be recovered.
          </p>  
        </div>  
        <Button
          type="submit"
          className="w-[100px] h-[50px]"
        >
          <Loader loading={loading}>Save</Loader>
        </Button>
      </div> 
    </form>
  )
}

export default SettingsForm
