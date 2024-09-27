import { FieldValues, UseFormRegister } from "react-hook-form"

interface ConversationSearchProps {
  register: UseFormRegister<FieldValues>
  domains?:
    | {
        name: string
        id: string
        icon: string
      }[]
    | undefined
}

export const ConversationSearch = ({ register, domains }: ConversationSearchProps) => {
  return(
    <div className="flex flex-col py-4">
      <select
        {...register('domain')}
        className="px-3 py-4 text-sm border-[1px] rounded-lg mr-5"
      >
        <option
          disabled
          selected
        >
          Domain name
        </option>
        {domains?.map((domain) => (
          <option
            value={domain.id}
            key={domain.id}
          >
            {domain.name}
          </option>
        ))}
      </select>
    </div>
  )
}
