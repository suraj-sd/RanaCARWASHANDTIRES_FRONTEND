import carImage from "../../../assets/car.png";
import stripesPattern from "../../../assets/stripes.png";
import platformShadow from "../../../assets/platform-shadow.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <header className="relative w-full min-h-[85vh] bg-[#06090d] overflow-hidden">

      {/* SEO H1 (hidden visually, important for ranking) */}
      <h1 className="sr-only">
        Rana Car Wash & Tires - Premium Car Wash, Tire Services and Oil Change in Your Area
      </h1>

      {/* Background */}
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <img
          src={stripesPattern}
          alt="car wash background pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="
          relative z-30
          max-w-7xl mx-auto
          px-6 sm:px-10 lg:px-16
          py-16 md:py-20
          flex flex-col md:flex-row
          items-center md:items-start
          gap-12
        "
      >
        {/* LEFT */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            More Than Just a Wash — It's a Transformation.
          </h2>
        </div>

        {/* RIGHT */}
        <div className="flex-1 text-center md:text-left space-y-5">
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            Premium car wash, tire services, and oil changes —
            delivered with care, quality, and attention to detail.
          </p>

          <p className="text-white font-semibold text-lg">
            Book your service today and drive out with confidence.
          </p>

          {/* Button Animation */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              asChild
              className="mt-4 h-12 px-8 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full"
            >
              <Link
                to="/booking"
                className="flex items-center justify-center w-full h-full"
              >
                Book Now!
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Platform Shadow */}
      <div
        className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[90%] sm:w-[60%] md:w-[65%] lg:w-[70%] max-w-[900px]"
        aria-hidden="true"
      >
        <img
          src={platformShadow}
          alt="car shadow effect under vehicle"
          className="w-full opacity-60"
        />
      </div>

      {/* Car Image */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-20 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[55%] max-w-[900px]"
      >
        <img
          src={carImage}
          alt="premium car after professional car wash service"
          className="w-full drop-shadow-2xl"
        />
      </motion.div>
    </header>
  );
};

export default Hero;