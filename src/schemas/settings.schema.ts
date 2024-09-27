import { z } from 'zod'

// Define the maximum upload size for files (2MB)
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2 // 2MB

// Define the accepted file types for uploads
export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg', 'svg']

// Define the type for DomainSettingsProps
export type DomainSettingsProps = {
  domain?: string // Optional domain name
  image?: any // Optional image file
  welcomeMessage?: string // Optional welcome message
}

// Define the type for HelpDeskQuestionsProps
export type HelpDeskQuestionsProps = {
  question: string 
  answer: string 
}

// Define the type for AddProductProps
export type AddProductProps = {
  name: string 
  image: any  
  price: string 
}

// Define the type for FilterQuestionsProps
export type FilterQuestionsProps = {
  question: string // The question to filter help desk questions
}

// Schema to validate adding a domain with image
export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: 'A domain must have at least 3 characters' }) 
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ''), 
      'This is not a valid domain'
    ),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, { // Check file size
      message: 'Your file size must be less than 2MB',
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), { // Check file type
      message: 'Only JPG, JPEG & PNG are accepted file formats',
    }),
})

// Schema to validate updating domain settings
export const DomainSettingsSchema = z
  .object({
    domain: z
      .string()
      .min(4, { message: 'A domain must have at least 3 characters' })  
      .refine(
        (value) =>
          /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ''), 
        'This is not a valid domain'
      )
      .optional() // Domain is optional
      .or(z.literal('').transform(() => undefined)), // Transform empty string to undefined
    image: z.any().optional(), // Image is optional
    welcomeMessage: z
      .string()
      .min(6, 'The message must be at least 6 characters') 
      .optional()
      .or(z.literal('').transform(() => undefined)), 
  })
  .refine(
    (schema) => {
      // Custom validation for image file type and size
      if (schema.image?.length) {
        if (
          ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) &&
          schema.image?.[0].size <= MAX_UPLOAD_SIZE
        ) {
          return true // Image is valid
        }
      }
      if (!schema.image?.length) {
        return true // No image provided
      }
    },
    {
      message:
        'The file must be less than 2MB, and only PNG, JPEG & JPG files are accepted', 
      path: ['image'],
    }
  )

// Schema to validate help desk questions
export const HelpDeskQuestionsSchema = z.object({
  question: z.string().min(1, { message: 'Please ask a question' }), 
  answer: z.string().min(1, { message: 'Answer cannot be left empty' }), 
})

// Schema to validate filtering questions
// filter questions are questions to be fed to ai api 
export const FilterQuestionsSchema = z.object({
  question: z.string().min(1, { message: 'Please ask a question' }), 
})

// Schema to validate adding a product
export const AddProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'The name must have at least 3 characters' }), 
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, { 
      message: 'Your file size must be less than 2MB',
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), { // Check file type
      message: 'Only JPG, JPEG & PNG are accepted file formats',
    }),
  price: z.string(), // Price of the product
})
