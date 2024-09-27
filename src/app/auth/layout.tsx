import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'  

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  // Check if user is logged in
  const user = await currentUser()

  // Redirect to home page if user is already logged in
  // if (user) redirect('/')

  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] ld:w-full flex flex-col items-start p-6">

        {/* header logo */}
        <Link href={'/'} className="flex gap-3">
          <Image
            src="/images/logo.svg"
            alt="LOGO"
            sizes="100vw"
            style={{
              width: '20%',
              height: 'auto',
            }}
            width={0}
            height={0}
          />
          <h2 className="font-semibold">Dives AI</h2>
        </Link>

        {children}
      </div>

      {/*auth side info div */}
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream  flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hi, I’m your AI powered business rep.
        </h2>
        
        <p className="text-iridium md:text-sm mb-28">
          Dives AI is capable of capturing lead information without a form...{' '}
          <br />
          something never done before 😉
        </p>

        {/* <Image
          src="/images/app-ui.png"
          alt="app image"
          loading="lazy"
          sizes="30"
          className="shrink-0 !w-[1600px]"
          width={0}
          height={0}
        /> */}
      </div>

    </div>
  )
}

export default Layout
