import React, { useState, useEffect } from "react";
import {
  Check,
  Phone,
  Sparkles,
  Droplet,
  Star,
  ChevronLeft,
  ChevronRight,
  Crown,
  Gem,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceFeature {
  name: string;
}

interface PricingTier {
  id: string;
  name: string;
  type: string;
  planType:string;
  startAt: string;
  price: number;
  description: string;
  features: ServiceFeature[];
  icon: React.ReactNode;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: "698e0be2879fd9948369a188",
    name: "BASIC INTERIOR CLEAN",
    price: 39,
    type: "Sedan $39 | SUV $49 | Truck/Van $59",
    planType:"Premium Plan",
    startAt: "Starting at",
    description:
      "Perfect for regular maintenance and keeping your vehicle clean.",
    icon: <Droplet className="w-8 h-8" />,
    features: [
      { name: "Quick interior wipe" },
      { name: "Dashboard & cup holder wipe" },
      { name: "Quick vacuum seats, mats, and floor" },
      { name: "Air freshener spray" },
    ],
  },
  {
    id: "698e0c1d879fd9948369a18a",
    name: "ADVANCED INTERIOR CLEAN",
    startAt: "Starting at",
    type: "Sedan $49 | SUV $59 | Truck/Van $69",
    planType:"Premium Plan",
    price: 49,
    description:
      "Deep interior cleaning that removes dirt and restores a fresh, like-new feel.",
    icon: <Star className="w-8 h-8" />,
    popular: true,
    features: [
      { name: "Quick vacuum seats & floor" },
      { name: "Wash floor mats" },
      { name: "Dashboard, cup holder, windows, door jambs" },
      { name: "Vent wipe & air purge" },
      { name: "Rim cleaning & tire shine" },
    ],
  },
  {
    id: "698e0dc6879fd9948369a18f",
    name: "ULTRA ADVANCED INTERIOR",
    price: 79,
    type: "Sedan $79 | SUV $89 | Truck/Van $99",
    planType:"Premium Plan",
    startAt: "Starting at",
    description: "Ultimate restoration for a showroom-like finish.",
    icon: <Sparkles className="w-8 h-8" />,
    features: [
      { name: "Detailed vacuum seats & floor" },
      { name: "Wash mats" },
      { name: "Door panels, vents & crevices" },
      { name: "Dashboard & cup holder" },
      { name: "Windows, behind seats, trunk vacuum" },
      { name: "Rim clean, tire shine, perfume spray" },
    ],
  },
  {
    id: "69dfc9684fc0f100ddb49877",
    name: "PREMIUM INTERIOR RESTORATION",
    price: 129,
    type: "Sedan $129 | SUV $149 | Truck/Van $169",
    planType:"Premium Plan",
    startAt: "Starting at",
    description:
      "Complete interior and exterior detailing that restores showroom shine.",
    icon: <Award className="w-8 h-8" />,
    features: [
      { name: "Exterior hand wash" },
      { name: "Bug & tar removal" },
      { name: "Wash mats" },
      { name: "Detailed vacuum seats & floor" },
      { name: "Door panels, vents & crevices" },
      { name: "Dashboard & cup holder" },
      { name: "Windows, trunk vacuum" },
      { name: "Rim clean & tire shine" },
    ],
  },
  {
    id: "69dfc9824fc0f100ddb49878",
    name: "ULTRA PREMIUM INTERIOR RESTORATION",
    price: 189,
    type: "Sedan $189 | SUV $209 | Truck/Van $229",
    planType:"Premium Plan",
    startAt: "Starting at",
    description:
      "Deep interior restoration for a pristine, fresh, like-new cabin.",
    icon: <Gem className="w-8 h-8" />,
    features: [
      { name: "Full interior shampoo" },
      { name: "Leather clean & condition" },
      { name: "Dash, console, door jambs" },
      { name: "Vinyl dressing" },
      { name: "Windows, trunk, rims & tires" },
      { name: "Stain removal" },
    ],
  },
  {
    id: "69dfc9944fc0f100ddb49879",
    name: "FULL INTERIOR + EXTERIOR PREMIUM",
    price: 249,
    type: "Sedan $249 | SUV $279 | Truck/Van $300",
    planType:"Premium Plan",
    startAt: "Starting at",
    description: "Complete interior & exterior detailing with premium finish.",
    icon: <Crown className="w-8 h-8" />,
    features: [
      { name: "Full interior shampoo" },
      { name: "Leather clean & condition" },
      { name: "Dash, console, door jambs" },
      { name: "Vinyl dressing" },
      { name: "Windows, trunk, rims & tires" },
      { name: "Bug & stain removal" },
      { name: "Full exterior hand wash" },
      { name: "Premium wax & finish" },
    ],
  },
];

const PricingCard: React.FC<{ tier: PricingTier }> = ({ tier }) => {
  return (
    <article
      className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-105 flex flex-col h-full ${
        tier.popular
          ? "bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border-2 border-cyan-400 shadow-xl shadow-cyan-500/20"
          : "bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50"
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white px-5 py-1 rounded-full text-xs sm:text-sm font-semibold">
          Most Popular
        </div>
      )}

      <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-white">
        {tier.icon}
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white text-center min-h-[56px] flex items-center justify-center">
        {tier.name}
      </h3>

      <p className="text-gray-400 text-center text-sm mt-2 min-h-[60px]">
        {tier.description}
      </p>

      <div className="flex items-baseline justify-center mt-4 gap-2 min-h-[50px]">
        <span className="text-xs sm:text-sm text-gray-400">Starting at</span>
        <span className="text-3xl sm:text-4xl font-bold text-white">
          ${tier.price}
        </span>
      </div>

      <div className="text-center text-gray-400 text-xs sm:text-sm mt-2 min-h-[40px]">
        {tier.type}
      </div>

      <div className="space-y-3 mt-4 flex-grow">
        {tier.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-cyan-400 mt-1" />
            <span className="text-gray-300 text-sm">{feature.name}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
      <Link
  to="/booking"
  state={{
    serviceId: tier.id,
    planType: tier.planType,
    serviceName: tier.name,
    servicePrice: tier.price,
  }}
  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg text-sm sm:text-base"
>
  Book Now
</Link>
      </div>
    </article>
  );
};

const PricingSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItems = () => {
      if (typeof window === "undefined") return;

      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };

    updateItems();
    window.addEventListener("resize", updateItems);

    return () => window.removeEventListener("resize", updateItems);
  }, []);

  // 🔧 FIX: prevent invalid startIndex when screen size changes
  useEffect(() => {
    if (startIndex > pricingTiers.length - itemsPerPage) {
      setStartIndex(Math.max(0, pricingTiers.length - itemsPerPage));
    }
  }, [itemsPerPage]);

  const nextSlide = () => {
    if (startIndex + itemsPerPage < pricingTiers.length) {
      setStartIndex((prev) => prev + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(0, prev - itemsPerPage));
    }
  };

  const visibleTiers = pricingTiers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-14 sm:py-20 px-3 sm:px-6">

      {/* SEO (hidden, no UI change) */}
      <h2 className="sr-only">
        Car Detailing Pricing Plans and Packages
      </h2>

      <div className="max-w-7xl mx-auto">

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

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 text-center mb-8 sm:mb-12">
          Pricing Plan
        </h3>

        {/* Slider */}
        <div className="relative">

          <button
            onClick={prevSlide}
            disabled={startIndex === 0}
            aria-label="Previous pricing plans"
            className="flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full"
          >
            <ChevronLeft className="text-white" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:px-10">
            {visibleTiers.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={startIndex + itemsPerPage >= pricingTiers.length}
            aria-label="Next pricing plans"
            className="flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full"
          >
            <ChevronRight className="text-white" />
          </button>

        </div>

      </div>
    </section>
  );
};

export default PricingSection;