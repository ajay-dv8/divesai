import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card } from "../ui/card"
import { BreadCrumps } from "./bread-crumps"
import { Headphones, Star, Trash } from "lucide-react"

export const InfoBar = () => {
  return(
    <div className="w-full flex justify-between items-center py-1 mb-8 sticky top-0 backdrop-blur-md bg-white/30 z-50">
      <BreadCrumps />

      {/* <div className="flex gap-3 items-center">
        <div className="">
          <Card className="rounded-xl flex gap-3 py-2 px-4 text-ghost">
            <Trash />
            <Star />
          </Card>
        </div>

        <Avatar>
          <AvatarFallback className="bg-green text-white">
            <Headphones />
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div> */}
    </div>
  )
}