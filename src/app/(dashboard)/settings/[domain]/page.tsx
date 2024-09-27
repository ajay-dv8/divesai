import { onGetCurrentDomainInfo } from "@/actions/settings"
import BotTrainingForm from "@/components/forms/settings/bot-training";
import SettingsForm from "@/components/forms/settings/form";
import { InfoBar } from "@/components/infobar";
import { ProductTable } from "@/components/products";
import { redirect } from "next/navigation"; 

interface DomainSettingsProps {
  params : {
    domain: string
  }
}

const DomainSettingsPage = async ({ params }: DomainSettingsProps) => {
  // get info about the current domain of the user
  const domain = await onGetCurrentDomainInfo(params.domain);

  if (!domain) redirect('/dashboard')
  return (
    <div>
      <InfoBar />

      <div className="flex-1 overflow-y-auto w-full chat-window">
        <SettingsForm
          id={domain.domains[0].id}
          name={domain.domains[0].name}
          // TODO: fix issues wid plan frm comp/settings/form (it has been given an optional type for now)
          plan={domain.subscription?.plan} 
          chatBot={domain.domains[0].chatBot}
        />
        {/* id issues fixed  */}
        <BotTrainingForm id={domain.domains[0].id} />

        {/* component to display and sell products */}
        <ProductTable 
          id={domain.domains[0].id} 
          products={domain.domains[0].products || []}
        />
      </div>
    </div>
  )
}

export default DomainSettingsPage