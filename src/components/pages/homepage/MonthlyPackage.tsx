import React from "react";
import { Check, Phone, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingTier {
  id: string;
  price: number;
  name: string;
  planType: string;
  description: string;
  features: { name: string }[];
  icon: React.ReactNode;
  type: string;
  popular: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: "69ebc0a8a3b99ecdf5fc55fc",
    name: "Monthly Automatic Car Wash",
    type: "",
    price: 59,
    planType: "Monthly Plan",
    description:
      "⚡ Monthly Automatic Car Wash – Clean in Minutes, Shine for Days",
    icon: <Star className="w-8 h-8" />,
    popular: true,
    features: [
      { name: "🚿 High-pressure automatic wash" },
      { name: "🫧 Premium foam cleaning" },
      { name: "💨 Spot-free drying system" },
      { name: "✨ Streak-free shine every time" },
      { name: "⏱️ Service completed in minutes" },
    ],
  },
];

const PricingCard: React.FC<{ tier: PricingTier }> = ({ tier }) => {
  return (
    <div className="relative rounded-2xl p-8 sm:p-10 flex flex-col bg-gray-800/50 border border-gray-700 min-h-[520px]">
      {/* ICON */}
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-white">
        {tier.icon}
      </div>

      {/* TITLE */}
      <h3 className="text-2xl font-bold text-white text-center">{tier.name}</h3>

      {/* DESCRIPTION */}
      <p className="text-gray-400 text-center text-sm mt-3 leading-relaxed">
        {tier.description}
      </p>

      {/* PRICE */}
      <div className="text-center mt-6 text-4xl font-bold text-white">
        ${tier.price}
      </div>

      {/* FEATURES */}
      <div className="space-y-3 mt-8 flex-1">
        {tier.features.map((feature, index) => (
          <div
            key={index}
            className="flex gap-3 text-gray-300 text-sm items-start"
          >
            <Check className="w-4 h-4 text-cyan-400 mt-1" />
            <span className="leading-relaxed">{feature.name}</span>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-8">
        <Link
          to="/booking"
          state={{
            serviceId: tier.id,
            planType: tier.planType,
            serviceName: tier.name,
            servicePrice: tier.price,
          }}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg w-full text-center"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

const MonthlySection: React.FC = () => {
  const tier = pricingTiers[0];

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col py-14 sm:py-20 px-3 sm:px-6">
      {/* SEO H1 (hidden, no UI change) */}
      <h1 className="sr-only">
        Monthly Car Wash Subscription Plan - Automatic Car Cleaning Service
      </h1>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Call Button */}
        <div className="flex justify-center sm:justify-end mb-6">
          <a
            href="tel:6139001530"
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-full text-sm sm:text-base"
          >
            <Phone className="w-4 h-4" />
            6139001530
          </a>
        </div>

        {/* Title (UNCHANGED TEXT) */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 text-center mb-10">
          Monthly Pricing Plan
        </h2>

        {/* CENTER CARD */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md">
            <PricingCard tier={tier} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlySection;
