import { pricingCards } from '@/constants/landing-page'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Link from 'next/link'

export const PricingCard = () => {
  return (
    <div className="flex  justify-center gap-4 flex-wrap mt-6">
      { pricingCards.map((card) => (
        <Card 
          key={card.title}
          className={cn('w-[300px] flex flex-col justify-between', {
            'border-2 border-green/70': card.title === 'Ultimate',
          })}
        >

          <CardHeader>
            <CardTitle className="text-green">{card.title}</CardTitle>
            <CardDescription>
              {pricingCards.find((c) => c.title === card.title)?.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              <span className="text-muted-foreground">
                <span>/ month</span>
              </span>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex gap-2"
                  >
                    <Check />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/dashboard?plan=${card.title}`}
                className="bg-green/30 border-green border-2 p-2 w-full text-center font-bold rounded-md hover:bg-green/70 transition-all ease-in-out duration-500"
              >
                Get Started
              </Link>
            </CardFooter>
        </Card>
      ))}
    </div>
  )
}
