import { ZodType, z } from 'zod' 
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from './settings.schema' 

// Type definition for ConversationSearchProps
export type ConversationSearchProps = {
  query: string 
  domain: string 
}

// Type definition for ChatBotMessageProps
export type ChatBotMessageProps = {
  content?: string 
  image?: any 
}

// Schema definition for validating ConversationSearchProps using Zod
export const ConversationSearchSchema: ZodType<ConversationSearchProps> = z.object({
  query: z.string().min(1, { message: 'You must enter a search query' }), 
  domain: z.string().min(1, { message: 'You must select a domain' }), 
})

// Schema definition for validating ChatBotMessageProps using Zod
export const ChatBotMessageSchema: ZodType<ChatBotMessageProps> = z.object({
  content: z
    .string()
    .min(1) 
    .optional() 
    .or(z.literal('').transform(() => undefined)),
  image: z.any().optional(),
})
.refine((schema) => {
  if (schema.image?.length) { // If there is an image
    if (
      ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) && 
      schema.image?.[0].size <= MAX_UPLOAD_SIZE 
    ) {
      return true // Image is valid
    }
  }
  if (!schema.image?.length) {
    return true 
  }
  return false 
})


