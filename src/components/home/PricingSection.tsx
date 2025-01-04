"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type BillingInterval = "monthly" | "annual";
type PlanTier = "starter" | "growth" | "premium";

interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  buttonColor: string;
  titleColor: string;
  bgColor: string;
  features: string[];
}

const plans: Record<PlanTier, PricingPlan> = {
  starter: {
    name: "Starter",
    description:
      "Perfect for small businesses and solo entrepreneurs getting started with webinars.",
    price: {
      monthly: 49,
      annual: 499,
    },
    buttonColor: "bg-[#0085FF] hover:bg-[#0074E0]",
    titleColor: "text-[#0085FF]",
    bgColor: "bg-[#F5F9FF]",
    features: [
      "Basic inventory tracking",
      "Single warehouse management",
      "Email support",
      "Basic reporting",
      "Up to 2 team members",
    ],
  },
  growth: {
    name: "Growth",
    description:
      "Ideal for growing companies that need more brand control, bigger rooms, and multiple Hosts.",
    price: {
      monthly: 89,
      annual: 899,
    },
    buttonColor: "bg-[#00BA81] hover:bg-[#00A371]",
    titleColor: "text-[#00BA81]",
    bgColor: "bg-[#F5FBF9]",
    features: [
      "Basic inventory tracking",
      "Single warehouse management",
      "Email support",
      "Basic reporting",
      "Up to 2 team members",
    ],
  },
  premium: {
    name: "Premium",
    description:
      "A white-glove experience for hosting engaging webinars with dedicated account support.",
    price: {
      monthly: 349,
      annual: 3300,
    },
    buttonColor: "bg-[#0085FF] hover:bg-[#0074E0]",
    titleColor: "text-[#0085FF]",
    bgColor: "bg-[#F5F9FF]",
    features: [
      "Basic inventory tracking",
      "Single warehouse management",
      "Email support",
      "Basic reporting",
      "Up to 2 team members",
    ],
  },
};

export function PricingSection() {
  const [interval, setInterval] = useState<BillingInterval>("monthly");

  const handlePlanSelection = async (plan: PlanTier) => {
    try {
      console.log("Selected plan:", {
        plan,
        interval,
        price:
          interval === "monthly"
            ? plans[plan].price.monthly
            : plans[plan].price.annual,
      });
      alert(`Thank you for selecting the ${plan} plan!`);
    } catch (error) {
      console.error("Error processing plan selection:", error);
      alert("There was an error processing your request. Please try again.");
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <h2 className="text-[2.5rem] font-bold text-center text-[#1E2B3A]">
          Flexible Pricing Plans for
          <br />
          Any Business
        </h2>

        {/* Billing interval toggle */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-full bg-green-200 p-1">
            <button
              onClick={() => setInterval("monthly")}
              className={`relative rounded-full px-[72px] py-4 text-sm font-medium transition-colors
                ${interval === "monthly" ? "text-white bg-green-600" : "text-green-800"}`}
            >
              Monthly
              {interval === "monthly" && (
                <div
                  className="absolute inset-0 bg-[#00BA81] rounded-full"
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
            <button
              onClick={() => setInterval("annual")}
              className={`relative rounded-full px-8 py-4 text-sm font-medium transition-colors
                ${interval === "annual" ?"text-white bg-green-600" : "text-green-800"}`}
            >
              Annual Save 30%
              {interval === "annual" && (
                <div
                  className="absolute inset-0 bg-[#00BA81] rounded-full"
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {(Object.entries(plans) as [PlanTier, PricingPlan][]).map(
            ([tier, plan]) => (
              <div
                key={tier}
                className={`flex flex-col rounded-2xl ${plan.bgColor} p-8`}
              >
                <div className="mb-6">
                  <h3 className={`text-xl font-semibold ${plan.titleColor}`}>
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      $
                      {interval === "monthly"
                        ? plan.price.monthly
                        : plan.price.annual}
                    </span>
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      /{interval === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {interval === "monthly"
                      ? "Per Host / Paid Monthly"
                      : "Per Host / Paid Yearly"}
                  </div>
                </div>
                <ul className="space-y-4 mb-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                      <span className="ml-3 text-sm text-gray-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanSelection(tier)}
                  className={`${plan.buttonColor} text-white rounded-lg py-3 px-4 text-sm font-medium transition-colors mt-auto`}
                >
                  Get This Plan
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
