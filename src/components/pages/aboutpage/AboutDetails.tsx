import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Sparkles, Award } from "lucide-react";
import LogoCardComponent from "./LogoCardComponent";
import { Link } from "react-router-dom";

const AboutDetails = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleReadMore = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const features = [
        {
            icon: <Car className="w-12 h-12 stroke-2" />,
            title: "Our Vision",
            description:
                "To become a trusted and recognized automotive service provider known for quality, reliability, and customer satisfaction.",
        },
        {
            icon: <Sparkles className="w-12 h-12 stroke-2" />,
            title: "Our Mission",
            description:
                "To deliver professional car wash, tire, and oil change services using high-quality products, skilled technicians, and honest practices — ensuring every vehicle leaves in its best condition.",
        },
        {
            icon: <Award className="w-12 h-12 stroke-2" />,
            title: "Award Winning",
            description:
                "Our commitment to excellence, customer care, and service quality sets us apart. We continuously strive to maintain high standards that earn customer trust and long-term loyalty.",
        },
    ];

    return (
        <section className="relative bg-[#175064] sm:px-6 lg:px-8">

            {/* SEO H2 (hidden, important for Google ranking) */}
            <h2 className="sr-only">
                About Rana Car Wash & Tires - Vision, Mission and Service Excellence
            </h2>

            <LogoCardComponent />

            <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Left Content */}
                    <div className="space-y-6 text-white">

                        <p className="text-cyan-300 text-xs uppercase tracking-widest font-medium">
                            we are the best
                        </p>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            We Are the Best —<br />
                            Trust the Professionals
                            <br />
                            for Car Wash
                        </h2>

                        <p className="text-slate-200 text-base leading-relaxed max-w-xl">
                            At Rana Car Wash & Tires, we combine expertise,
                            modern equipment, and attention to detail to deliver
                            exceptional automotive services. Our goal is to
                            provide a clean, comfortable, and trustworthy
                            experience for every customer.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button
                                size="lg"
                                className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold px-8 py-6 rounded-full text-base"
                            >
                                <Link to="/services">Learn More</Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white hover:bg-slate-100 text-slate-900 font-semibold px-8 py-6 rounded-full border-0 text-base"
                            >
                                <Link to="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-4 lg:space-y-5">

                        {features.map((feature, index) => (
                            <article key={index}>
                                <Card
                                    className="bg-[#2ea0c9] border-0 hover:shadow-xl transition-shadow duration-300 rounded-3xl"
                                >
                                    <CardContent className="p-8">

                                        <div className="flex gap-5 items-start">

                                            <div className="shrink-0 text-slate-900" aria-hidden="true">
                                                {feature.icon}
                                            </div>

                                            <div className="flex-1">

                                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                                    {feature.title}
                                                </h3>

                                                <p className="text-slate-900 text-sm leading-relaxed mb-4">
                                                    {feature.description}
                                                </p>

                                                {/* EXTRA CONTENT */}
                                                {openIndex === index && (
                                                    <div className="mb-4 text-slate-900 text-sm leading-relaxed space-y-2">
                                                        {feature.title === "Our Vision" && (
                                                            <>
                                                                <p>
                                                                    We aim to become a leading automotive service brand across multiple cities.
                                                                </p>
                                                                <p>
                                                                    Our vision is to build long-term trust through consistent quality and innovation.
                                                                </p>
                                                            </>
                                                        )}

                                                        {feature.title === "Our Mission" && (
                                                            <>
                                                                <p>
                                                                    We deliver affordable, high-quality car care using modern techniques.
                                                                </p>
                                                                <p>
                                                                    Our mission is to ensure customer satisfaction through honest and reliable service.
                                                                </p>
                                                            </>
                                                        )}

                                                        {feature.title === "Award Winning" && (
                                                            <>
                                                                <p>
                                                                    Recognized for excellence in service quality and customer satisfaction.
                                                                </p>
                                                                <p>
                                                                    Our dedication has earned us strong trust and industry recognition.
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => toggleReadMore(index)}
                                                    className="text-slate-900 font-bold text-sm hover:underline"
                                                    aria-label={`Toggle more information about ${feature.title}`}
                                                >
                                                    {openIndex === index ? "Read less" : "Read more"}
                                                </button>

                                            </div>

                                        </div>

                                    </CardContent>
                                </Card>
                            </article>
                        ))}

                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutDetails;