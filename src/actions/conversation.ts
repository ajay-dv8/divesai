'use server'

import { client } from '@/lib/prisma'
import { pusherServer } from '@/lib/utils' 

// Function to toggle realtime mode for a specific chat room
export const onToggleRealtime = async (id: string, state: boolean) => {
  try {
    // Update the chat rooms live status in the database
    const chatRoom = await client.chatRoom.update({
      where: {
        id,
      },
      data: {
        live: state,
      },
      select: {
        id: true,
        live: true,
      },
    })

    // Return a message based on the new 'live' status
    if (chatRoom) {
      return {
        status: 200,
        message: chatRoom.live
          ? 'Realtime mode enabled'
          : 'Realtime mode disabled',
        chatRoom,
      }
    }
  } catch (error) {
    // Log any errors that occur during the update
    console.log(error)
  }
}

// Function to get if current mode is live or not of a specific chat room
export const onGetConversationMode = async (id: string) => {
  try {
    // Retrieve the 'live' status of the chat room from the database
    const mode = await client.chatRoom.findUnique({
      where: {
        id,
      },
      select: {
        live: true,
      },
    })
    console.log(mode)
    return mode
  } catch (error) { 
    console.log(error)
  }
}

// Function to get all chat rooms associated with a specific domain
export const onGetDomainChatRooms = async (id: string) => {
  try {
    // Retrieve the chat rooms and the most recent message for each chat room in a domain
    const domains = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        customer: {
          select: {
            email: true,
            chatRoom: {
              select: {
                createdAt: true,
                id: true,
                message: {
                  select: {
                    message: true,
                    createdAt: true,
                    seen: true,
                  },
                  orderBy: {
                    createdAt: 'desc',
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    })

    if (domains) {
      return domains
    }
  } catch (error) { 
    console.log(error)
  }
}

// Function to get all messages from a specific chat room
export const onGetChatMessages = async (id: string) => {
  try {
    // Retrieve all messages from a chat room ordered by creation time
    const messages = await client.chatRoom.findMany({
      where: {
        id,
      },
      select: {
        id: true,
        live: true,
        message: {
          select: {
            id: true,
            role: true,
            message: true,
            createdAt: true,
            seen: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (messages) {
      return messages
    }
  } catch (error) { 
    console.log(error)
  }
}

// Function to mark all messages in a chat room as read (seen)
export const onViewUnReadMessages = async (id: string) => {
  try {
    // Update all messages in a chat room to set 'seen' to true
    await client.chatMessage.updateMany({
      where: {
        chatRoomId: id,
      },
      data: {
        seen: true,
      },
    })
  } catch (error) { 
    console.log(error)
  }
}

// Function to handle realtime chat updates using Pusher
export const onRealTimeChat = async (
  chatroomId: string,
  message: string,
  id: string,
  role: 'assistant' | 'user'
) => {
  
  // Trigger a realtime event to update the chatroom with a new message 
  pusherServer.trigger(chatroomId, 'realtime-mode', {
    chat: {
      message,
      id,
      role,
    },
  })
}

// Function for the chat room owner to send a message
export const onOwnerSendMessage = async (
  chatroom: string,
  message: string,
  role: 'assistant' | 'user'
) => {
  try {
    // Update the chat room with a new message
    const chat = await client.chatRoom.update({
      where: {
        id: chatroom,
      },
      data: {
        message: {
          create: {
            message,
            role,
          },
        },
      },
      select: {
        message: {
          select: {
            id: true,
            role: true,
            message: true,
            createdAt: true,
            seen: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    })

    if (chat) {
      return chat
    }
  } catch (error) { 
    console.log(error)
  }
}
