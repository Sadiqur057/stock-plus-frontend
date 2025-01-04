import { ArrowRight, BarChart3, Clock, TrendingUp } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Maximize Your Profits",
    description:
      "Transform your inventory data into actionable insights. Our advanced analytics help you identify top-performing products and optimize stock levels for maximum profitability.",
    stat: "37%",
    statText: "average profit increase",
  },
  {
    icon: Clock,
    title: "Save Precious Time",
    description:
      "Automate routine tasks and streamline your workflow. Our intelligent system handles stock updates, reorder notifications, and report generation automatically.",
    stat: "12hrs",
    statText: "saved per week",
  },
  {
    icon: BarChart3,
    title: "Scale Your Business",
    description:
      "From small shops to large enterprises, our flexible platform grows with you. Manage multiple locations, currencies, and product lines from a single dashboard.",
    stat: "2.5x",
    statText: "faster scaling",
  },
];

export function Specialties() {
  return (
    <section className="enhanced-features-bg py-24 sm:py-32">
      <div className="relative container">
        <div className="mx-auto lg:max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 animate-fadeInUp">
            Advanced Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl animate-fadeInUp animate-delay-100">
            Everything you need to manage your inventory smarter
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 animate-fadeInUp animate-delay-200">
            Take control of your business with our comprehensive inventory
            management solution. Boost efficiency, reduce costs, and drive
            growth with powerful features designed for modern businesses.
          </p>
        </div>

        <div className="mx-auto mt-16 sm:mt-20 lg:mt-24">
          <div className="grid gap-x-20 gap-y-20 lg:grid-cols-2 2xl:grid-cols-7">
            <div className="flex flex-col gap-12 2xl:col-span-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`relative flex flex-col gap-4 animate-fadeInLeft animate-delay-${
                    (index + 2) * 100
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm font-medium text-indigo-600">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                  <div className="absolute right-0 top-0 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-indigo-600">
                      {feature.stat}
                    </span>
                    <span className="text-sm text-gray-500">
                      {feature.statText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative lg:ml-4 2xl:col-span-4 h-fit">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-white shadow-xl h-fit">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                <div className="relative h-fit w-full p-8">
                  <div className="h-full rounded-xl bg-white p-6 shadow-lg">
                    <div className="mb-6 flex items-center justify-between">
                      <h4 className="text-lg font-semibold">
                        Dashboard Overview
                      </h4>
                      <div className="flex gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-400" />
                        <div className="h-2 w-2 rounded-full bg-yellow-400" />
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="h-32 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 p-4">
                        <div className="mb-2 text-sm font-medium text-gray-600">
                          Monthly Revenue
                        </div>
                        <div className="flex h-16 items-end gap-2">
                          {[40, 70, 55, 80, 60, 90, 75].map((height, i) => (
                            <div
                              key={i}
                              className="chart-bar"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[...Array(4)].map((item, index) => (
                          <div key={index}>
                            <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4">
                              <div className="text-sm font-medium text-gray-600">
                                In Stock
                              </div>
                              <div className="mt-2 text-2xl font-bold text-gray-900">
                                2,431
                              </div>
                            </div>
                            <div className="rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 p-4">
                              <div className="text-sm font-medium text-gray-600">
                                Low Stock
                              </div>
                              <div className="mt-2 text-2xl font-bold text-gray-900">
                                12
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="floatingCard cardTop">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-white">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                     System Status
                    </div>
                    <div className="text-xs text-gray-500"> Optimal</div>
                  </div>
                </div>
              </div>

              <div className="floatingCard cardBottom">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Efficiency Score
                    </div>
                    <div className="text-xs text-gray-500">98% improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
