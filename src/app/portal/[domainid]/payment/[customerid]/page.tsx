import {
  onDomainCustomerResponses,
  onGetAllDomainBookings,
} from '@/actions/appointment'
import { onGetDomainProductsAndConnectedAccountId } from '@/actions/payments' 
import PortalForm from '@/components/forms/portal/portal-form' 

const CustomerPaymentPage = async ({
  params,
}: {
  params: { domainid: string; customerid: string }
}) => {
  const questions = await onDomainCustomerResponses(params.customerid)
  const products = await onGetDomainProductsAndConnectedAccountId(
    params.domainid
  )

  if (!questions) return null

  return (
    <div>
    <PortalForm
      type="Payment"
      email={questions.email!}
      amount={products?.amount}
      domainid={params?.domainid}
      products={products?.products}
      stripeId={products?.stripeId!}
      customerId={params?.customerid}
      questions={questions?.questions}
    />
    </div>
  )
}

export default CustomerPaymentPage
