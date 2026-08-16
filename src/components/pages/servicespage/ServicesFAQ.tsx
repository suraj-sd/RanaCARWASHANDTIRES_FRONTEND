import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "Do I need an appointment for services?",
        answer: "Walk-ins are welcome, but we recommend booking in advance to avoid waiting.",
    },
    {
        question: "Do you accept online payments?",
        answer: "No, payments are made on-site after the service is completed.",
    },
    {
        question: "How long does a car wash take?",
        answer: "A standard car wash typically takes 30-45 minutes, depending on the level of service and the size of the vehicle.",
    },
    {
        question: "Do you offer monthly packages?",
        answer: "Yes, we offer monthly service packages. Details are available on our website or at the shop.",
    },
];

export default function FAQComponent() {
const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggleFAQ = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="min-h-[55vh] bg-black text-white py-8 md:py-16">

            {/* SEO H2 (important for ranking, no UI change) */}
            <h2 className="sr-only">
                Frequently Asked Questions about Car Wash and Automotive Services
            </h2>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Left Section */}
                    <div className="space-y-6 text-center lg:text-left">

                        <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
                            FAQ
                        </p>

                        <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                            Communication Is Everything
                        </h3>

                        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                            We believe great service starts with clear
                            communication. From booking to finish, we keep you
                            informed every step of the way—so you always know
                            what your vehicle needs and what to expect.
                        </p>

                        <div className="flex justify-center lg:justify-start">
                            <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-6 rounded-full text-base transition-all duration-300">
                                <Link to="/contact">Learn More</Link>
                            </Button>
                        </div>

                    </div>

                    {/* Right Section - FAQ Accordion */}
                    <div className="w-full space-y-4">

                        {faqData.map((faq, index) => (
                            <article
                                key={index}
                                className="rounded-3xl overflow-hidden transition-all duration-300"
                            >

                                <button
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={openIndex === index}
                                    className={`w-full text-left px-5 sm:px-6 py-4 sm:py-5 transition-all duration-300 ${
                                        openIndex === index
                                            ? "bg-cyan-500 text-black"
                                            : "bg-[#0a2a2a] text-white hover:bg-[#0d3535]"
                                    }`}
                                >
                                    <div className="flex justify-between items-center gap-3">

                                        <span className="font-semibold text-sm sm:text-base">
                                            Q: {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                                                openIndex === index ? "rotate-180" : ""
                                            }`}
                                        />

                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openIndex === index
                                            ? "max-h-48"
                                            : "max-h-0"
                                    }`}
                                >
                                    <div className="px-5 sm:px-6 py-4 sm:py-5 bg-cyan-500 text-black">
                                        <p className="text-sm sm:text-base leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>

                            </article>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
}