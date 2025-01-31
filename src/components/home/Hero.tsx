import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroImg from "@/assets/images/heroImg.jpg";
import Link from "next/link";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "95%", label: "Customer Satisfaction" },
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
          <div className="badge">The most comprehensive inventory solution</div>

          <h1 className="title font-bold">
            Transform Your Inventory Management Today
          </h1>

          <p className="subtitle mb-6">
            Streamline your business operations with our powerful stock
            management system. Track products, generate invoices, and make
            data-driven decisions with real-time analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard">
              <Button size="lg">Get Started</Button>
            </Link>
            <Button variant="outline" size="lg">
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
              alt="Dashboard Preview"
              width={800}
              height={800}
              className="mainImage"
              priority
            />
            <div className="floatingCard cardTop">
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
                  <div className="text-xs text-gray-500">98% optimal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
