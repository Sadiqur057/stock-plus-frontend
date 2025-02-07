import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroImg from "@/assets/images/heroImg.jpg";
import Link from "next/link";

const stats = [
  { value: "10+", label: "Active Users" },
  { value: "100%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

export function Hero() {
  return (
    <section className="heroSection relative overflow-hidden">
      <div className="heroBackgroundPattern absolute inset-0 opacity-50" />
      <div className="gradientCircle topRight" />
      <div className="gradientCircle bottomLeft" />

      <div className="container heroContainer relative grid">
        <div className="flex flex-col items-center md:items-start mx-0 md:text-left justify-center m-auto">
          <span
            className="badge"
            aria-label="Inventory Management and Invoicing solution"
          >
            Inventory Management and Invoicing solution
          </span>

          <h1 className="title font-bold">
            Transform Your Inventory Management Today
          </h1>

          <p className="subtitle mb-6">
            Take control of your business with our comprehensive inventory
            management solution. Generate Invoice in just 20 seconds efficiently
            and effective. A fully user friendly stock management and Invoicing
            solutions that your business needs.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button
                className="px-5 sm:px-8"
                size="lg"
                aria-label="Click to get started"
              >
                Get Started
              </Button>
            </Link>
            <Button
              className="px-5 sm:px-8"
              variant="outline"
              size="lg"
              aria-label="Watch a demo of the inventory management solution"
            >
              Watch Demo
            </Button>
          </div>

          <div className="statsContainer">
            {stats.map((stat) => (
              <div key={stat.label} className="statItem">
                <div className="statValue">{stat.value}</div>
                <div className="statLabel">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <div className="imageContainer">
            <Image
              src={HeroImg}
              alt="Inventory Management and Invoicing solution Image"
              width={800}
              height={800}
              className="mainImage"
              priority
            />
            <div className="floatingCard cardTop" tabIndex={0} aria-label="Revenue increased by 32.5% this month">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 text-green-600"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Revenue</div>
                  <div className="text-xs text-gray-500">+32.5% this month</div>
                </div>
              </div>
            </div>

            <div className="floatingCard cardBottom">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 text-blue-600"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Stock Level</div>
                  <div className="text-xs text-gray-500">100% optimal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
