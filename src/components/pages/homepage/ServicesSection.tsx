import React, { useState } from "react";
import bubbles from "@/assets/bubbles.jpg";
import carWashIcon from "@/assets/carwash service icon.png";
import tireIcon from "@/assets/tyre sales and service icon.png";
import oilChangeIcon from "@/assets/oil change service icon.png";
import windowIcon from "@/assets/window.png";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  fullDescription: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  fullDescription,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-cyan-500/80 backdrop-blur-sm rounded-2xl p-8 hover:bg-cyan-500/90 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group flex flex-col h-full">
      <div className="bg-black/90 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <img src={icon} alt={`${title} icon`} className="w-7 h-7" />
      </div>

      <h3 className="text-white text-3xl font-semibold mb-4">{title}</h3>

      <p className="text-white/90 text-sm leading-relaxed mb-6 grow transition-all duration-300">
        {expanded ? fullDescription : description}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-white font-semibold hover:underline transition-all text-left"
        aria-label={`Toggle more information about ${title}`}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </article>
  );
};

const ComprehensiveServices: React.FC = () => {
  const services = [
    {
      icon: carWashIcon,
      title: "Car Wash Service",
      description:
        "Professional exterior and interior cleaning using safe products to restore your car's shine and cleanliness.",
      fullDescription:
        "Professional exterior and interior cleaning using safe products to restore your car's shine and cleanliness. Our comprehensive car wash includes hand washing, waxing, interior vacuuming, dashboard cleaning, and window detailing. We use eco-friendly products that are safe for your vehicle's paint and interior materials. Choose from our basic wash, deluxe wash, or premium detailing packages to keep your car looking its best.",
    },
    {
      icon: tireIcon,
      title: "Tire Sales & Services",
      description:
        "Quality tires, fitting, and basic tire services to keep your vehicle safe and road-ready.",
      fullDescription:
        "Quality tires, fitting, and basic tire services to keep your vehicle safe and road-ready. We offer a wide selection of tires from top brands, including all-season, winter, and performance tires. Our services include tire mounting, balancing, rotation, and repair. We also provide tire pressure monitoring system installation and alignment services to ensure optimal handling and fuel efficiency. Let our experts help you choose the right tires for your driving needs and budget.",
    },
    {
      icon: oilChangeIcon,
      title: "Oil Change Service",
      description:
        "Quick and reliable oil change services to improve engine performance and extend vehicle life.",
      fullDescription:
        "Quick and reliable oil change services to improve engine performance and extend vehicle life. We use high-quality synthetic and conventional oils from trusted brands, along with premium filters to ensure maximum protection. Our service includes oil and filter replacement, multi-point inspection, and fluid level checks. We can accommodate all vehicle types and offer same-day service for most appointments. Regular oil changes are essential for maintaining your engine's health and warranty compliance.",
    },
    {
      icon: windowIcon,
      title: "Window Tinting, Decals & Rust Proofing",
      description:
        "Professional window tinting, custom decals, and oil-based rust protection to enhance and protect your vehicle.",
      fullDescription:
        "Protect your vehicle, enhance its appearance, and customize it to match your style—all in one place. Our professional window tinting services provide increased privacy, UV protection, heat reduction, and a sleek appearance. We also offer custom window and door stickers and decals to give your vehicle a personalized touch. In addition, our oil-based rust proofing treatment helps safeguard your vehicle against rust, corrosion, road salt, moisture, and harsh Canadian weather conditions. Whether you want added protection or a custom look, our experienced team delivers quality products and reliable service to keep your vehicle looking its best.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-16">
      {/* SEO H1 */}
      <h1 className="sr-only">
        Car Wash, Tire Service and Oil Change Services - Rana Car Wash & Tires
      </h1>

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={bubbles}
          alt="car wash water bubbles background"
          className="w-full h-full object-cover opacity-92 scale-150"
        />
        <div className="absolute inset-0 bg-[#17556d]/70"></div>
      </div>

      {/* Decorative curve */}
      <div
        className="absolute top-0 left-0 right-0 h-38 bg-[#06090d] rounded-b-[100%] shadow-2xl z-10"
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        {/* Header */}
        <header className="text-center mb-12">
          <p className="text-white/80 text-sm tracking-wider uppercase mb-3">
            Our services
          </p>

          <h2 className="text-white text-5xl md:text-6xl font-bold leading-tight">
            Our Comprehensive
            <br />
            Services
          </h2>
        </header>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              fullDescription={service.fullDescription}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveServices;