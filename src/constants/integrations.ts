type IntegrationsListItemProps = {
  id: string
  // TODO: name should be stripe or momo
  name: 'stripe'
  logo?: string | any
  description?: string
  title?: string
  modalDescription?: string
}

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: '1',
    name: 'stripe',
    description:
      'Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.',
    logo: '914be637-39bf-47e6-bb81-37b553163945',
    title: 'Connect Stripe Account',
    modalDescription:
      'The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.',
  },

  // {
  //   id: '2',
  //   name: 'mobile money',
  //   description: 'mobile money allows you to integrate payment with your mobile network service provider',
  //   logo: '',
  //   title: 'Connect Mobile Money Account',
  //   modalDescription: 'Easiest way to make payments straight from your phone'
  // }
]
