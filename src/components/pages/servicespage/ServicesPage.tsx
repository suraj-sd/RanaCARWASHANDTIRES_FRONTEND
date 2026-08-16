import { Helmet } from "react-helmet-async";
import ServicesSection from "../homepage/ServicesSection";
import WhyChooseUs from "../homepage/WhyChooseUsSection";
import ServicesFAQ from "./ServicesFAQ";

const ServicesPage = () => {
    return (
        <>
            {/* ── Per-page SEO ──────────────────────────────────────────────── */}
            <Helmet>
                <title>Our Services</title>
                <meta
                    name="description"
                    content="Explore all services at Rana Car Wash And Tires in Kingston, ON — car wash, auto detailing, tire repair, tire replacement, oil change, and more. Professional results every time."
                />
                <meta
                    name="keywords"
                    content="car wash Kingston ON, auto detailing Kingston, tire repair Kingston, tire replacement Ontario, oil change Kingston, wheel alignment, full service car wash, Rana Car Wash services"
                />

                {/* ── Open Graph ──────────────────────────────────────────── */}
                <meta property="og:title"       content="Our Services | Rana Car Wash And Tires" />
                <meta property="og:description" content="Professional car wash, auto detailing, tire repair, tire replacement, and oil change services in Kingston, ON. Book your appointment today." />
                <meta property="og:url"         content="https://ranacarwashandtires.com/services" />
                <meta property="og:type"        content="website" />

                {/* ── Twitter Card ────────────────────────────────────────── */}
                <meta name="twitter:title"       content="Our Services | Rana Car Wash And Tires" />
                <meta name="twitter:description" content="Professional car wash, auto detailing, tire repair, tire replacement, and oil change services in Kingston, ON." />

                {/* ── JSON-LD: ServicePage + FAQPage + BreadcrumbList ─────── */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [

                            // 1. ServicePage — tells Google this is a services page
                            {
                                "@type":    "ServicePage",
                                "@id":      "https://ranacarwashandtires.com/services#webpage",
                                url:        "https://ranacarwashandtires.com/services",
                                name:       "Car Wash, Detailing & Tire Services — Rana Car Wash And Tires",
                                description:
                                    "Full-service car wash, auto detailing, tire repair, tire replacement, oil change, and wheel alignment in Kingston, Ontario.",
                                isPartOf:  { "@id": "https://ranacarwashandtires.com/#website" },
                                provider:  { "@id": "https://ranacarwashandtires.com/#business" },
                                breadcrumb: { "@id": "https://ranacarwashandtires.com/services#breadcrumb" },
                            },

                            // 2. BreadcrumbList — shows "Home › Services" in Google results
                            {
                                "@type": "BreadcrumbList",
                                "@id":   "https://ranacarwashandtires.com/services#breadcrumb",
                                itemListElement: [
                                    {
                                        "@type":  "ListItem",
                                        position: 1,
                                        name:     "Home",
                                        item:     "https://ranacarwashandtires.com",
                                    },
                                    {
                                        "@type":  "ListItem",
                                        position: 2,
                                        name:     "Services",
                                        item:     "https://ranacarwashandtires.com/services",
                                    },
                                ],
                            },

                            // 3. Individual Service schemas — boosts rich result eligibility
                            {
                                "@type":       "Service",
                                "@id":         "https://ranacarwashandtires.com/services#carwash",
                                name:          "Car Wash",
                                description:   "Full-service exterior and interior car wash in Kingston, ON. Spotless results with every visit.",
                                provider:      { "@id": "https://ranacarwashandtires.com/#business" },
                                areaServed:    { "@type": "City", name: "Kingston", containedIn: "Ontario, Canada" },
                                serviceType:   "Car Wash",
                            },
                            {
                                "@type":       "Service",
                                "@id":         "https://ranacarwashandtires.com/services#detailing",
                                name:          "Auto Detailing",
                                description:   "Professional interior and exterior vehicle detailing services in Kingston, Ontario.",
                                provider:      { "@id": "https://ranacarwashandtires.com/#business" },
                                areaServed:    { "@type": "City", name: "Kingston", containedIn: "Ontario, Canada" },
                                serviceType:   "Auto Detailing",
                            },
                            {
                                "@type":       "Service",
                                "@id":         "https://ranacarwashandtires.com/services#tires",
                                name:          "Tire Services",
                                description:   "Expert tire repair, replacement, rotation, balancing, and wheel alignment in Kingston, ON.",
                                provider:      { "@id": "https://ranacarwashandtires.com/#business" },
                                areaServed:    { "@type": "City", name: "Kingston", containedIn: "Ontario, Canada" },
                                serviceType:   "Tire Repair and Replacement",
                            },
                            {
                                "@type":       "Service",
                                "@id":         "https://ranacarwashandtires.com/services#oilchange",
                                name:          "Oil Change",
                                description:   "Fast and reliable oil change service to keep your vehicle running smoothly.",
                                provider:      { "@id": "https://ranacarwashandtires.com/#business" },
                                areaServed:    { "@type": "City", name: "Kingston", containedIn: "Ontario, Canada" },
                                serviceType:   "Oil Change",
                            },

                            // 4. FAQPage — FAQ rich results in Google Search
                            {
                                "@type": "FAQPage",
                                "@id":   "https://ranacarwashandtires.com/services#faq",
                                mainEntity: [
                                    {
                                        "@type":          "Question",
                                        name:             "What car wash services do you offer?",
                                        acceptedAnswer: {
                                            "@type": "Answer",
                                            text:    "We offer full exterior and interior car wash, auto detailing, hand wash, and express wash packages at our Kingston, ON location.",
                                        },
                                    },
                                    {
                                        "@type":          "Question",
                                        name:             "Do you offer tire repair and replacement in Kingston?",
                                        acceptedAnswer: {
                                            "@type": "Answer",
                                            text:    "Yes! Rana Car Wash And Tires provides tire repair, replacement, rotation, balancing, and wheel alignment services in Kingston, Ontario.",
                                        },
                                    },
                                    {
                                        "@type":          "Question",
                                        name:             "How long does an oil change take?",
                                        acceptedAnswer: {
                                            "@type": "Answer",
                                            text:    "Our oil change service is fast and typically completed within 20–30 minutes, so you can get back on the road quickly.",
                                        },
                                    },
                                    {
                                        "@type":          "Question",
                                        name:             "Where is Rana Car Wash And Tires located?",
                                        acceptedAnswer: {
                                            "@type": "Answer",
                                            text:    "We are located at 1525 John Counter Blvd, Kingston, ON K7M 8M9. Call us at 613-900-1530 to book your appointment.",
                                        },
                                    },
                                ],
                            },

                        ],
                    })}
                </script>
            </Helmet>

            <main className="bg-[#06090d] overflow-hidden min-h-screen">

                {/* SEO H1 (hidden, does NOT affect UI) */}
                <h1 className="sr-only">
                    Car Wash, Detailing, Tire and Oil Change Services in Kingston, ON — Rana Car Wash & Tires
                </h1>

                {/* Minimal "Services" label */}
                <div className="inline-flex items-center gap-2 mb-8 mt-4 md:ml-45 md:mt-0">
                    <div className="h-px w-12 bg-linear-to-r from-cyan-500 to-transparent" />
                    <span className="text-sm font-medium text-cyan-400 tracking-widest uppercase">
                        Services
                    </span>
                </div>

                {/* Services Section */}
                <section aria-label="Our Car Wash and Tire Services">
                    <ServicesSection />
                </section>

                {/* Why Choose Us */}
                <section aria-label="Why Choose Rana Car Wash And Tires">
                    <WhyChooseUs />
                </section>

                {/* FAQ */}
                <section aria-label="Frequently Asked Questions">
                    <ServicesFAQ />
                </section>

            </main>
        </>
    );
};

export default ServicesPage;