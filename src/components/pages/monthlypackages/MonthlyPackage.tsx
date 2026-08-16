import MonthlySection from "../homepage/MonthlyPackage";
import TestimonialsSection from "../homepage/TestimonialsSection";
import CarDetailingHero from "./CarDetailingHero";

const MonthlyPackage = () => {
    return (
        <main className="bg-[#111828] overflow-hidden min-h-screen pt-14">

            {/* SEO (hidden, no UI change) */}
            <h1 className="sr-only">
                Monthly Car Service Packages - Car Wash Subscription Plans
            </h1>

            {/* Minimal label */}
            <div className="inline-flex items-center gap-2 mb-8 mt-4 md:ml-45 md:mt-0">

                <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />

                <span className="text-sm font-medium text-cyan-400 tracking-widest uppercase">
                    Monthly Service Packages
                </span>

            </div>

            <section>
                <MonthlySection />
            </section>

            <section>
                <TestimonialsSection />
            </section>

            <section>
                <CarDetailingHero />
            </section>

        </main>
    );
};

export default MonthlyPackage;