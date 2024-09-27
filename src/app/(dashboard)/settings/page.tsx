import { InfoBar } from '@/components/infobar' 
import BillingSettings from '@/components/settings/billing-settings'
import { DarkModeToggle } from '@/components/settings/dark-mode'
import { ChangePassword } from '@/components/settings/change-password'

import '@/app/globals.css'

const page = () => {
  return (
    <div>
      <InfoBar />

      <div className="w-full overflow-y-auto chat-window flex flex-1 flex-col gap-10">
        {/* <BillingSettings /> */}
        <DarkModeToggle />
        <ChangePassword />
      </div>
    </div>
  )
}

export default page