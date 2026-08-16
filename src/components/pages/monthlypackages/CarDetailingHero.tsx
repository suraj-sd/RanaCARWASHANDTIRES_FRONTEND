import { useState } from "react";
import packagesimg from "@/assets/packagesimg.png";

export default function CarDetailingHero() {
    const [open, setOpen] = useState(false);

    return (
        <section className="relative w-full h-screen bg-black overflow-hidden">

            {/* SEO (hidden, no UI change) */}
            <h2 className="sr-only">
                Premium Car Detailing Services - Interior & Exterior Car Care Experts
            </h2>

            {/* Background curved shapes */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-0 right-0 h-96">
                    <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                        <path
                            fill="#0d9488"
                            fillOpacity="0.6"
                            d="M0,160 C320,100 480,220 720,180 C960,140 1120,200 1440,160 L1440,320 L0,320 Z"
                        />
                    </svg>
                </div>

                <div className="absolute top-1/4 left-0 right-0">
                    <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none">
                        <path
                            stroke="#0d9488"
                            strokeWidth="2"
                            fill="none"
                            d="M0,50 C320,20 480,80 720,50 C960,20 1120,70 1440,40"
                        />
                    </svg>
                </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-64 left-20 w-4 h-4 rounded-full border-2 border-teal-500 opacity-60"></div>
            <div className="absolute top-72 right-32 w-3 h-3 rounded-full border-2 border-teal-400 opacity-50"></div>
            <div className="absolute top-96 right-80 w-3 h-3 rounded-full border-2 border-teal-500 opacity-40"></div>

            {/* Stars */}
            <div className="absolute top-80 left-32 text-cyan-400 text-4xl opacity-80">✦</div>
            <div className="absolute top-96 right-48 text-cyan-400 text-5xl opacity-90">✦</div>

            {/* Background image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src={packagesimg}
                    alt="Car detailing service background image"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full">
                <div className="flex items-start justify-between h-full px-20 pt-12">

                    {/* Left */}
                    <div className="max-w-2xl">
                        <h1 className="text-white font-bold text-6xl leading-tight mb-8">
                            Elevate Your Car's
                            <br />
                            Aesthetics Today!
                        </h1>
                    </div>

                    {/* Right */}
                    <div className="max-w-md text-right">
                        <p className="text-white text-base mb-6 leading-relaxed">
                            Our expert team uses high-quality products and proven
                            <br />
                            techniques to deliver results you can see and trust.
                        </p>

                        {/* Extra content */}
                        {open && (
                            <div className="text-white text-sm mb-6 space-y-3 leading-relaxed">
                                <p>
                                    We provide premium car detailing services including deep interior cleaning,
                                    ceramic coating, paint protection, and scratch removal.
                                </p>
                                <p>
                                    Every service is handled by trained professionals using industry-grade tools
                                    and eco-friendly products.
                                </p>
                                <p>
                                    Our goal is to restore your car’s original shine and keep it protected for longer.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => setOpen(!open)}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200"
                        >
                            {open ? "Show Less" : "Learn More"}
                        </button>
                    </div>

                </div>
            </div>

            {/* Gradient overlay (FIXED) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none"></div>

        </section>
    );
}