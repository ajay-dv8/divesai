
import { cn } from '@/lib/utils'
import { Spinner } from './spinner'

interface LoaderProps {
  loading: boolean
  children: React.ReactNode
  className?: string
  noPadding?: boolean
}

// loader component
export const Loader = ({
  loading,
  children,
  noPadding,
  className,
}: LoaderProps) => {
  return loading ? (
    <div className={cn(className || 'w-full py-5 flex justify-center')}>
      <Spinner noPadding={noPadding} />
    </div>
  ) : (
    children
  )
}
