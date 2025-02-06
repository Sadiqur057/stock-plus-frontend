import {
  BarChart3,
  Clock,
  TrendingUp,
  Search,
  FileText,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const features = [
  {
    name: "Real-time Analytics",
    description:
      "Get instant insights into your inventory statistics with our powerful analytics dashboard.",
    icon: BarChart3,
  },
  {
    name: "Automated Updating",
    description:
      "Keep your inventory up-to-date with our automated inventory management system.",
    icon: Clock,
  },
  {
    name: "Revenue Monitoring",
    description:
      "Monitor your revenue growth and profitability with our detailed revenue tracking features.",
    icon: TrendingUp,
  },
  {
    name: "Advanced Search",
    description:
      "Find any product or anything in your inventory instantly with our powerful search and filter capabilities.",
    icon: Search,
  },
  {
    name: "Custom Invoicing",
    description:
      "Generate customized invoices for your customers with our user-friendly invoicing system.",
    icon: FileText,
  },
  {
    name: "Secure Data Management",
    description:
      "Your data is completely safe and secure with our robust security measures in our system.",
    icon: ShieldCheck,
  },
];

export function Features() {
  return (
    <section
      className="featuresSection relative overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div className="container">
        <SectionHeading
          subtitle="Powerful Features"
          title="Unleash the Power of Inventory Management"
          description="Our comprehensive set of features is designed to streamline your inventory management process, increase efficiency, and boost your bottom line."
        />
        <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6 lg:mt-16">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="feature-card bg-white p-4 lg:p-8"
              tabIndex={0}
            >
              <div className="iconWrapper items-center justify-center flex text-white">
                <feature.icon size={24} aria-hidden={true} />
              </div>
              <h3 className="featureTitle">{feature.name}</h3>
              <p className="featureDescription">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
