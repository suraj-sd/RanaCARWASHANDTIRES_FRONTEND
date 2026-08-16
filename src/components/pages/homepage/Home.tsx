import { useState } from "react";
import AboutSection from "./AboutSection";
import Hero from "./Hero";
import PricingSection from "./PricingSection";
import MonthlyPackage from "./MonthlyPackage";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import WhyChooseUsSection from "./WhyChooseUsSection";

const Home = () => {
  const [activePricing, setActivePricing] = useState<"regular" | "monthly">(
    "regular"
  );

  return (
    <main className="bg-[#0b1220] min-h-screen m-0 p-0">

      {/* SEO H1 (hidden visually but readable by Google) */}
      <h1 className="sr-only">
        Rana Car Wash & Tires - Professional Car Wash, Detailing & Tire Services
      </h1>

      <section>
        <Hero />
      </section>

      <section>
        <AboutSection />
      </section>

      <section>
        <ServicesSection />
      </section>

      {/* TOGGLE */}
      <section aria-label="Service Packages Toggle">
        <div className="flex justify-center gap-4 my-6">
          <button
            onClick={() => setActivePricing("regular")}
            className={`px-5 py-2 rounded-full border ${
              activePricing === "regular"
                ? "bg-cyan-500 text-white"
                : "text-gray-300 border-gray-600"
            }`}
          >
            Detailing Service Packages
          </button>

          <button
            onClick={() => setActivePricing("monthly")}
            className={`px-5 py-2 rounded-full border ${
              activePricing === "monthly"
                ? "bg-cyan-500 text-white"
                : "text-gray-300 border-gray-600"
            }`}
          >
            Monthly Service Packages
          </button>
        </div>
      </section>

      {/* PRICING */}
      <section>
        {activePricing === "regular" && <PricingSection />}
        {activePricing === "monthly" && <MonthlyPackage />}
      </section>

      <section>
        <WhyChooseUsSection />
      </section>

      <section>
        <TestimonialsSection />
      </section>
    </main>
  );
};

export default Home;