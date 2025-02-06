"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import toast from "react-hot-toast";

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
      monthly: 150,
      annual: 1500,
    },
    buttonColor: "bg-gray-700 hover:bg-gray-800",
    titleColor: "text-[#0085FF]",
    bgColor: "bg-[#F5F9FF]",
    features: [
      "Basic inventory tracking",
      "Customizable product options",
      "Invoice generation and download",
      "Basic Filtering features",
      "Basic Non Customizable dashboard",
    ],
  },
  growth: {
    name: "Growth",
    description:
      "Ideal for growing companies that need more brand control, bigger rooms, and multiple Hosts.",
    price: {
      monthly: 300,
      annual: 3000,
    },
    buttonColor: "bg-green-700 hover:bg-green-800",
    titleColor: "text-[#00BA81]",
    bgColor: "bg-[#F5FBF9]",
    features: [
      "Advanced Inventory tracking",
      "Customizable product options",
      "Invoice generation and download",
      "Powerful Filtering features",
      "Customizable dashboard",
      "Add up to 3 employees",
    ],
  },
  premium: {
    name: "Premium",
    description:
      "A white-glove experience for hosting engaging webinars with dedicated account support.",
    price: {
      monthly: 500,
      annual: 5000,
    },
    buttonColor: "bg-blue-700 hover:bg-blue-800",
    titleColor: "text-[#0085FF]",
    bgColor: "bg-[#F5F9FF]",
    features: [
      "Advanced Inventory tracking",
      "Sales Report generation",
      "Customizable product options",
      "Invoice generation and download",
      "Advanced Filtering features",
      "Customizable dashboard",
      "Add up to 7 employees",
    ],
  },
};

export function PricingSection() {
  const [interval, setInterval] = useState<BillingInterval>("monthly");

  const handlePlanSelection = async () => {
    try {
      toast.error("Under maintenance. Will be added soon");
    } catch (error) {
      console.error("Error processing plan selection:", error);
      alert("There was an error processing your request. Please try again.");
    }
  };

  return (
    <section id="pricing" className="pt:20 lg:pt-24 bg-white">
      <div className="container">
        <SectionHeading
          subtitle="Flexible Pricing Plans"
          title="Choose the plan that's right for you."
          description="
          Choose the plan that's right for you. Our flexible pricing plans are perfect for all type of business."
        />

        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-full bg-green-100 p-1">
            <button
              onClick={() => setInterval("monthly")}
              className={`relative rounded-full px-12 lg:px-[72px] py-3 lg:py-4 text-sm font-medium transition-colors
        ${
          interval === "monthly" ? "text-white bg-green-700" : "text-green-900"
        }`}
            >
              Monthly
              {interval === "monthly" && (
                <div
                  className="absolute inset-0 bg-green-700 rounded-full"
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
            <button
              onClick={() => setInterval("annual")}
              className={`relative rounded-full px-[56px] lg:px-[84px] py-3 lg:py-4  text-sm font-medium transition-colors
        ${
          interval === "annual" ? "text-white bg-green-700" : "text-green-900"
        }`}
            >
              Yearly
              {interval === "annual" && (
                <div
                  className="absolute inset-0 bg-green-700 rounded-full"
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {(Object.entries(plans) as [PlanTier, PricingPlan][]).map(
            ([tier, plan]) => (
              <div
                key={tier}
                className={`flex flex-col rounded-2xl ${plan.bgColor} p-8`}
              >
                <div className="mb-6">
                  <h3
                    className={`text-xl font-semibold BDT. {plan.titleColor}`}
                  >
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      BDT. &nbsp;
                      {interval === "monthly"
                        ? plan.price.monthly
                        : plan.price.annual}
                    </span>
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      /{interval === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {interval === "monthly" ? "Paid Monthly" : "Paid Yearly"}
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
                  onClick={() => handlePlanSelection()}
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
