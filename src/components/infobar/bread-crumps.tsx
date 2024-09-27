'use client'
import useSideBar from "@/context/use-sidebar"
import { Loader } from "../loader";
import { Switch } from '../ui/switch'

export const BreadCrumps = () => {
  const { chatRoom, expand, loading, page, realtime, onSignOut, onActivateRealtime, onExpand } = useSideBar(); 
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="flex text-xl font-bold gap-5 items-center capitalize">{page}</h2>
        {/* if on conversation page render switch component */}
        {page === 'conversation' && chatRoom && (
          <Loader
            loading={loading}
            className="p-0 inline"
          >
            <Switch
              defaultChecked={realtime}
              onClick={(e) => onActivateRealtime(e)}
              className="data-[state=checked]:bg-green data-[state=unchecked]:bg-peach"
            />
          </Loader>
        )}
      </div>

      <p className="text-gray-500 text-sm"> 
        {/* change the title of the page depending on te page user navigate to   */}
        {
          page == 'settings'
          ? 'Manage your account settings, preferences and integrations'
          : page == 'dashboard'
          ? 'A detailed overview of your metrics, usage, customers and more'
          : page == 'appointment'
          ? 'View and edit all your appointments'
          : page == 'email-marketing'
          ? 'Send bulk emails to your customers'
          : page == 'integration'
          ? 'Connect third-party applications into Dives-AI'
          : 'Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to.'
        }

      </p>  
    </div>
  )
}
