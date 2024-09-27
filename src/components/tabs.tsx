import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

interface TabsMenuProps { 
  triggers: {
    label: string
    icon?: JSX.Element | any
  }[]
  children: React.ReactNode
  className?: string
  button?: JSX.Element
}

export const TabsMenu = ({ triggers, children, className, button }: TabsMenuProps) => {
  return (
    <Tabs
      defaultValue={triggers[0].label}
      className="w-full"
    >

      <TabsList className={cn('pr-5', className)}>
        {/* here we render a trigger for each tab */}
        {triggers.map((trigger, key) => (
          <TabsTrigger
            key={key}
            value={trigger.label}
            className="capitalize flex gap-2 font-semibold"
          >
            {/* each tab will have an icon and label */}
            {trigger.icon && trigger.icon}
            {trigger.label}
          </TabsTrigger>
        ))}
        {button}
      </TabsList>
      {children}

    </Tabs>
  )
}
