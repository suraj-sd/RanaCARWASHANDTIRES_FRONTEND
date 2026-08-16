import { Helmet } from "react-helmet-async";
import PricingSection from "../homepage/PricingSection";
import TestimonialsSection from "../homepage/TestimonialsSection";
import CarDetailingHero from "./CarDetailingHero";

const Packages = () => {
    return (
        <>
            <Helmet>
                <title>Car Detailing Packages | Rana Car Wash & Tires</title>
                <meta
                    name="description"
                    content="Explore our car detailing service packages at Rana Car Wash & Tires in Kingston, ON. Choose from premium detailing plans to keep your vehicle looking its best."
                />
                <meta
                    name="keywords"
                    content="car detailing packages, detailing service packages, auto detailing Kingston, Rana Car Wash packages, car detailing plans"
                />

                <meta property="og:title" content="Car Detailing Packages | Rana Car Wash & Tires" />
                <meta
                    property="og:description"
                    content="Explore our car detailing service packages at Rana Car Wash & Tires in Kingston, ON. Choose from premium detailing plans to keep your vehicle looking its best."
                />
                <meta property="og:url" content="https://ranacarwashandtires.com/packages/detailing" />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="Car Detailing Packages | Rana Car Wash & Tires" />
                <meta
                    name="twitter:description"
                    content="Explore our car detailing service packages at Rana Car Wash & Tires in Kingston, ON. Choose from premium detailing plans to keep your vehicle looking its best."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Car Detailing Packages",
                        "description": "Premium car detailing service packages at Rana Car Wash & Tires in Kingston, ON.",
                        "provider": {
                            "@type": "Organization",
                            "name": "Rana Car Wash & Tires",
                            "url": "https://ranacarwashandtires.com",
                        },
                        "serviceType": "Car Detailing",
                        "areaServed": {
                            "@type": "City",
                            "name": "Kingston",
                            "containedIn": "Ontario, Canada",
                        },
                    })}
                </script>
            </Helmet>

            <main className="bg-[#111828] overflow-hidden min-h-screen pt-14">

            {/* SEO H1 (hidden, does NOT affect UI) */}
            <h1 className="sr-only">
                Car Detailing Service Packages - Pricing, Plans & Offers | Rana Car Wash & Tires
            </h1>

            {/* Minimal label */}
            <div className="inline-flex items-center gap-2 mb-8 mt-4 md:ml-45 md:mt-0">
                <div className="h-px w-12 bg-linear-to-r from-cyan-500 to-transparent" />
                <span className="text-sm font-medium text-cyan-400 tracking-widest uppercase">
                    Detailing Service Packages
                </span>
            </div>

            {/* Sections */}
            <section>
                <PricingSection />
            </section>

            <section>
                <TestimonialsSection />
            </section>

            <section>
                <CarDetailingHero />
            </section>

        </main>
        </>
    );
};

export default Packages;