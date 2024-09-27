import { PortalBanner } from "@/components/portal-banner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col md:h-screen">
      <PortalBanner />
      <div className="container flex flex-1 justify-center mt-12">
        {children}
      </div>
    </div>
  )
}

export default Layout