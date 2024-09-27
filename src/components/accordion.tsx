import { AccordionContent, AccordionItem, AccordionTrigger, Accordion as ShadAccordion } from '@/components/ui/accordion'

interface AccordionProps {
  trigger: string
  content: string
}
export const Accordion = ({ trigger, content }: AccordionProps) => {
  return (
    <ShadAccordion 
      type='single' 
      collapsible
    >
      <AccordionItem value='item-1'>
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </ShadAccordion>
  )
}
