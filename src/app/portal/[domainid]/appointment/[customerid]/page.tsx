import { onDomainCustomerResponses, onGetAllDomainBookings } from "@/actions/appointment";
import PortalForm from "@/components/forms/portal/portal-form";

interface CustomerSignUpProps { params: {
  customerid: string;
  domainid: string;
}}

const CustomerSignUpForm = async ({ params }: CustomerSignUpProps) => {

  const questions = await onDomainCustomerResponses(params.customerid)
  const bookings = await onGetAllDomainBookings(params.customerid)

  if (!questions) return null
  
  return (
    <div>
      <PortalForm
        type="Appointment"
        email={questions.email!}
        domainid={params.domainid}
        bookings={bookings}
        customerId={params.customerid}
        questions={questions.questions}
      />
    </div>
  )
}
export default CustomerSignUpForm