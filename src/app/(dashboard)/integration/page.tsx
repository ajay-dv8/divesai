import { onGetPaymentConnected } from "@/actions/settings";
import { InfoBar } from "@/components/infobar"
import { IntegrationsList } from "@/components/integrations";

const IntegrationPage = async () => {
  // server action to get data on user stripe connection (if user strip is connected or not)
  const payment = await onGetPaymentConnected();

  // an object for connections
  const connections = {
    stripe: payment ? true : false,
  }

  return (
    <>
      <InfoBar />
      <IntegrationsList connections={connections} />
    </>
  )
}

export default IntegrationPage;