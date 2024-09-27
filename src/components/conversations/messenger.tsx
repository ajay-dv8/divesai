'use client'
import { useChatWindow } from '@/hooks/use-conversation'
import { Loader } from '../loader'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { PaperclipIcon, SendHorizonal } from 'lucide-react'
import Bubble from '../chatbot/bubble'


const Messenger = () => {
  const {
    messageWindowRef,
    chats,
    loading,
    chatRoom,
    onHandleSentMessage,
    register,
  } = useChatWindow();
  return (
    <div className="flex-1 flex flex-col relative">
      <div className="flex-1 w-full flex flex-col">
        <Loader loading={loading}>
          <div
            ref={messageWindowRef}
            className="w-full flex-1 flex flex-col gap-3 pl-5 py-5 chat-window overflow-y-auto"
          >
            {chats.length ? (
              chats.map((chat) => (
                <Bubble
                  key={chat.id}
                  message={{
                    role: chat.role!,
                    content: chat.message,
                  }}
                  createdAt={chat.createdAt}
                />
              ))
            ) : (
              <div>No Chat Selected</div>
            )}
          </div>
        </Loader>
      </div>

      {/* send message form */}
      <form
        onSubmit={onHandleSentMessage}
        className="flex px-3 pt-3 pb-10 flex-col backdrop-blur-sm bg-muted w-full"
      >
        <div className="flex justify-between items-center gap-x-3">
          <span>
            <PaperclipIcon className='text-muted-foreground hover:scale-105 transition-all duration-300 ease-in-out'/>
          </span>

          <Input
            {...register('content')}
            placeholder="Type your message..."
            className="focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-muted rounded-none outline-none border-none"
          />

          <Button
            variant='ghost'
            type="submit"
            className="mt-3 p-2 rounded-full hover:scale-105 transition-all duration-300 ease-in-out"
            // disabled={!chatRoom}
          >
            <SendHorizonal />
          </Button>
        </div>

      </form>
    </div>
  )
}

export default Messenger
