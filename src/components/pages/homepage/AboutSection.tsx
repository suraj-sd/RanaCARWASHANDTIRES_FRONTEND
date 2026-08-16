import { motion, useInView } from "motion/react";
import { useRef } from "react";
import baseImg from "../../../assets/cleaning car.png";
import leftOverlap from "../../../assets/oil filling.png";
import rightOverlap from "../../../assets/wheel fitting.png";
import p1 from "../../../assets/sample person 1.png";
import p2 from "../../../assets/sample person 2.png";
import p3 from "../../../assets/sample person 3.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CarWashHero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section className="min-h-[60vh] bg-[#06090d] px-6 py-16 lg:px-16">

            {/* SEO H1 (hidden, does NOT affect UI) */}
            <h1 className="sr-only">
                Professional Car Wash, Detailing, Tire & Oil Change Services by Rana Car Wash & Tires
            </h1>

            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-44 items-center">

                    {/* Left Side - Images */}
                    <div ref={ref} className="relative h-125 lg:h-150" aria-hidden="true">

                        {/* Base Image */}
                        <motion.div
                            initial={{ x: -200, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute left-0 sm:left-6 top-1/2 -translate-y-1/2 w-[85%] h-[70%] rounded-3xl overflow-hidden shadow-2xl z-10"
                        >
                            <img
                                src={baseImg}
                                alt="Professional car washing service being performed"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Overlapping Image 1 */}
                        <motion.div
                            initial={{ x: -150, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="absolute left-0 top-8 w-48 h-48 rounded-full overflow-hidden shadow-xl z-20"
                        >
                            <img
                                src={leftOverlap}
                                alt="Car engine oil filling service close-up"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Overlapping Image 2 */}
                        <motion.div
                            initial={{ x: -180, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : { x: -180, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="absolute right-4 max-sm:right-0 bottom-4 h-48 z-10 w-max"
                        >
                            <img
                                src={rightOverlap}
                                alt="Professional wheel fitting and tire service"
                                className="w-full h-full object-cover object-center"
                            />
                        </motion.div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-8">

                        {/* Customer Avatars */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="inline-flex items-center gap-3 px-5 py-3 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm"
                        >
                            <div className="flex -space-x-3">
                                <img src={p1} alt="Happy car wash customer" className="w-10 h-10 rounded-full border-2 border-[#06090d] object-cover" />
                                <img src={p2} alt="Satisfied service customer" className="w-10 h-10 rounded-full border-2 border-[#06090d] object-cover" />
                                <img src={p3} alt="Regular car service customer" className="w-10 h-10 rounded-full border-2 border-[#06090d] object-cover" />
                            </div>
                            <span className="text-slate-300 text-sm font-medium">
                                Mostly clients happy!
                            </span>
                        </motion.div>

                        {/* About Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">
                                About us
                            </span>
                        </motion.div>

                        {/* Heading (now SEO-friendly hierarchy) */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-4xl lg:text-4xl xl:text-6xl font-bold text-white leading-tight"
                        >
                            More than Just a
                            <span className="block">Car Wash</span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-slate-300 text-lg leading-relaxed max-w-xl"
                        >
                            Rana Car Wash & Tires is a professional car wash and automotive
                            service center dedicated to keeping your vehicle
                            clean, safe, and road-ready. From expert car washes
                            to reliable tire and oil change services, we focus
                            on quality workmanship and customer satisfaction
                            every time you visit.
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <Button className="w-auto h-12 mb-12 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full mt-4">
                                <Link to="/services">Learn more</Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CarWashHero;