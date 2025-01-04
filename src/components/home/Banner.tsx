import { Button } from "@/components/ui/button"

export function Banner() {
  return (
    <div className="bg-indigo-700">
      <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="block">Try StockMaster for free.</span>
          <span className="block">3 months on us, no strings attached.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-indigo-200">
          Experience the power of flexible inventory management risk-free. Start your 3-month trial today and see the difference StockMaster can make for your business.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="mt-8 w-full sm:w-auto"
        >
          Start your free trial
        </Button>
      </div>
    </div>
  )
}

