import Image from 'next/image'

export const PortalBanner = () => {
  return (
    <div className='w-full flex items-center gap-x-4 py-2 px-10 bg-muted'>
      <Image
        src="/images/logo.svg"
        alt="LOGO"
        sizes="100vw"
        style={{
          width: '30px',
          height: 'auto',
        }}
        width={0}
        height={0}
      />

      <h2 className='text-2xl '>Dives AI</h2>
    </div>
  )
}
