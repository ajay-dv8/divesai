
import { Card } from '../ui/card' 
import { useRealTime } from '@/hooks/use-chatbot'


interface RealTimeModeProps {
  chatRoomId: string
  setChats: React.Dispatch<
  React.SetStateAction<
  {
    role: 'user' | 'assistant'
    content: string
    link?: string | undefined
  }[]
  >
  >
}

const RealTimeMode = ({ chatRoomId, setChats }: RealTimeModeProps) => { 
  useRealTime(chatRoomId, setChats)

  return (
    <Card className="px-3 rounded-full py-1 bg-green font-bold text-white text-sm">
      Real Time
    </Card>
  )
}

export default RealTimeMode
