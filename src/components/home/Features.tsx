import {
  BarChart3,
  Clock,
  TrendingUp,
  Search,
  FileText,
  ShieldCheck,
} from "lucide-react";
import styles from "./Features.module.scss";

const features = [
  {
    name: "Real-time Analytics",
    description:
      "Get instant insights into your inventory performance with our powerful analytics dashboard.",
    icon: BarChart3,
  },
  {
    name: "Automated Reordering",
    description:
      "Never run out of stock again with our smart reordering system that predicts when you need to restock.",
    icon: Clock,
  },
  {
    name: "Multi-channel Integration",
    description:
      "Seamlessly manage inventory across multiple sales channels, from e-commerce to brick-and-mortar stores.",
    icon: TrendingUp,
  },
  {
    name: "Advanced Search",
    description:
      "Find any product in your inventory instantly with our powerful search and filter capabilities.",
    icon: Search,
  },
  {
    name: "Custom Reporting",
    description:
      "Generate detailed reports tailored to your business needs for better decision-making.",
    icon: FileText,
  },
  {
    name: "Secure Data Management",
    description:
      "Rest easy knowing your inventory data is protected with enterprise-grade security measures.",
    icon: ShieldCheck,
  },
];

export function Features() {
  return (
    <section className="featuresSection relative overflow-hidden">
      <div className="container">
        <div className="header">
          <h2 className="subheading">Powerful Features</h2>
          <h3 className="heading">
            Everything you need to manage your inventory efficiently
          </h3>
          <p className="subtitle">
            Our comprehensive set of features is designed to streamline your
            inventory management process, increase efficiency, and boost your
            bottom line.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="feature-card bg-white ">
              <div className="iconWrapper items-center justify-center flex text-white">
                <feature.icon size={24} />
              </div>
              <h4 className="featureTitle">{feature.name}</h4>
              <p className="featureDescription">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
