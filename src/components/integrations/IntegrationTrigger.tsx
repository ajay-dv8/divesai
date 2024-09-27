import { Card } from '../ui/card'
import { CloudIcon } from 'lucide-react'
import { Separator } from '../ui/separator'
import { IntegrationModalBody } from './integration-modal-body'
import Modal from '../modal'


interface IntegrationTriggerProps {
  name: 'stripe'
  logo: string | any
  title: string | any
  description: string | any
  connections: {
    [key in 'stripe']: boolean
  }
}

const IntegrationTrigger = ({
  name,
  logo,
  title,
  description,
  connections,
}: IntegrationTriggerProps) => {
  return (
    <Modal
      title={title}
      type="Integration"
      logo={logo}
      description={description}
      trigger={
        <Card className="px-3 py-2 cursor-pointer flex gap-2">
          <CloudIcon />
          {connections[name] ? 'connected' : 'connect'}
        </Card>
      }
    >
      <Separator orientation="horizontal" />
      <IntegrationModalBody
        connections={connections}
        type={name}
      />
    </Modal>
  )
}

export default IntegrationTrigger
