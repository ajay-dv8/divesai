import { cn } from '@/lib/utils'
import Link from 'next/link' 

type MenuItemProps = {
  size: 'max' | 'min'
  label: string
  icon: JSX.Element
  path?: string
  current?: string
  onSignOut?(): void
}

const MenuItem = ({ size, path, icon, label, current, onSignOut }: MenuItemProps) => {
  // switch case to check if size is max or min and show sidebar accordingly
  switch (size) {
    case 'max':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center gap-2 px-1 py-2 my-1 hover:scale-105 rounded-full transition-all duration-300 ease-in-out cursor-pointer',
            !current
              ? 'text-gray-500'
              : current == path
              ? 'bg-green/80 font-bold text-black'
              : 'text-gray-500'
          )}
          href={path ? `/${path}` : '#'}
        >
          {icon} {label}
        </Link>
      )
    case 'min':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center justify-center',
            !current
              ? 'text-gray-500'
              : current == path
              ? 'bg-green/80 font-bold text-black'
              : 'text-gray-500',
            'rounded-lg py-2 my-1'
          )}
          href={path ? `/${path}` : '#'}
        >
          {icon}
        </Link>
      )
    default:
      return null
  }
}

export default MenuItem
