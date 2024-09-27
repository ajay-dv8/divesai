import { Navbar } from "@/components/navbar"; 
import { PricingCard } from "@/components/pricing-cards";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="sticky top-0">
        <Navbar />
      </div>

      <section className="">
        <div className="flex via items-center justify-center flex-col gap-4 mt-18">
          <span className="text-green mt-10 text-sm bg-green/20 px-3 py-1 rounded-full text-center">
            An ai-powered business rep
          </span>

          <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
            <h1 className="text-7xl text-green">Dives AI</h1>

            <p className="text-center max-w-[500px] mb-8 text-muted-foreground text-gray-600">
              Your AI powered sales assistant! Embed Dives AI into any website
              with just a snippet of code!
            </p>

            <Button className="bg-green hover:bg-green/80 font-bold text-white px-4 mb-4">
              Start For Free
            </Button>

            <div >
              <Image
                src="/images/landin.png"
                width={800}
                height={350}
                alt="lpimg"
                className="max-w-2xl object-contain"
              /> 
            </div>
          </div> 
        </div>
      </section>

      <section className="flex justify-center items-center flex-col gap-4 mt-28">
        
        <h2 className="text-4xl text-gray-800 font-semibold text-center"> Choose whats right for your business</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-lg">
          We have a straight forward pricing plans tailored to meet your needs. You can get started for free If {" you're"} not ready to commit.
        </p>

        
        <h2 className="text-3xl font-semibold text-gray-800 text-center animate-pulse"> Coming Soon</h2>
        <div className="opacity-50 mb-12">
          <PricingCard />
        </div>

      </section>

      {/* Feature blog post component here */}

    </main>
  );
}
