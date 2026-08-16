// import React from "react";
// import { Users, Package, Clock, DollarSign } from "lucide-react";

// import bgImage from "@/assets/bgimg.png";
// import bottomLeftImage from "@/assets/cleaning car.png";
// import bottomRightImage from "@/assets/technician img.png";
// import topCarImage from "@/assets/fogcar.png";
// import carwashsImage from "@/assets/carwashs.jpg";
// import circleImage from "@/assets/circleimg.png";
// import tyres1Image from "@/assets/tyres1.jpg";
// import tyres5Image from "@/assets/tyres5.jpg";
// import tyres3Image from "@/assets/tyres3.jpg";
// import tyres2Image from "@/assets/tyres2.jpg";
// import oil1Image from "@/assets/oil1.jpg";
// import oil2Image from "@/assets/oil2.jpg";
// import oil3Image from "@/assets/oil3.jpg";
// import oil4Image from "@/assets/oil4.jpg";
// import tyrec from "@/assets/tyreschange.avif";
// import oilc from "@/assets/oilc.jpg"

// interface Feature {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   color: "gray" | "cyan";
// }

// const features: Feature[] = [
//   {
//     icon: <Users className="w-8 h-8" />,
//     title: "Professional & Experienced Staff",
//     description: "Skilled technicians you can trust with your vehicle",
//     color: "gray",
//   },
//   {
//     icon: <Package className="w-8 h-8" />,
//     title: "Quality Products & Equipment",
//     description: "Safe, effective, and vehicle-friendly solutions",
//     color: "cyan",
//   },
//   {
//     icon: <Clock className="w-8 h-8" />,
//     title: "Quick & Reliable Service",
//     description: "Minimal wait times without compromising quality",
//     color: "cyan",
//   },
//   {
//     icon: <DollarSign className="w-8 h-8" />,
//     title: "Customer-First Approach",
//     description: "Honest pricing and dependable service every visit",
//     color: "gray",
//   },
// ];

// const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
//   const isCyan = feature.color === "cyan";

//   return (
//     <article
//       className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
//         isCyan ? "bg-cyan-500/90 text-black" : "bg-gray-700/90 text-white"
//       }`}
//     >
//       <div className="mb-4">{feature.icon}</div>
//       <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//       <p className={`text-sm ${isCyan ? "text-gray-900" : "text-gray-300"}`}>
//         {feature.description}
//       </p>
//     </article>
//   );
// };

// const WhyChooseUs: React.FC = () => {
//   return (
//     <section className="relative min-h-screen bg-black overflow-hidden">
//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="absolute inset-0 bg-black/60" />
//       </div>

//       <div className="relative z-10 px-4 py-24 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-20">
//           <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
//             Why choose us
//           </span>

//           <h2 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-4">
//             Why We Stand Out?
//           </h2>

//           <p className="text-gray-300 text-lg">
//             More Than a Decade of Excellence in Car Care
//           </p>
//         </div>

//         {/* Features */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//           {features.map((feature, index) => (
//             <FeatureCard key={index} feature={feature} />
//           ))}
//         </div>

//         <div className="relative">
//           {/* Row 1 - Car Wash images */}
//           <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               bottomLeftImage,
//               bottomRightImage,
//               carwashsImage,
//               topCarImage,
//             ].map((img, i) => (
//               <div
//                 key={i}
//                 className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
//               >
//                 <img src={img} className="w-full h-full object-cover" alt="" />
//               </div>
//             ))}
//             {/* Circle 1 */}
//             <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl z-20 border-4 border-white animate-blinkGlow">
//               <img
//                 src={circleImage}
//                 className="w-full h-full object-cover"
//                 alt=""
//               />
//               <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-3">
//                 <p className="text-white text-sm font-black leading-tight mt-1">
//                   Touchless Car Wash
//                 </p>
//                 <p className="text-cyan-400 text-2xl font-black mt-1">$5.99</p>
//                 <p className="text-white text-sm font-bold">per wash</p>
//               </div>
//             </div>
//           </div>

//           {/* Row 2 - Tyres images */}
//           <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
//             {[tyres3Image, tyres1Image, tyres2Image, tyres5Image].map(
//               (img, i) => (
//                 <div
//                   key={i}
//                   className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
//                 >
//                   <img
//                     src={img}
//                     className="w-full h-full object-cover"
//                     alt=""
//                   />
//                 </div>
//               ),
//             )}
//             {/* Circle 2 */}
//             <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl z-20 border-4 border-white animate-blinkGlow">
//               <img
//                 src={tyrec}
//                 className="w-full h-full object-cover"
//                 alt=""
//               />
//               <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-3">
//                 <p className="text-white text-sm font-black leading-tight mt-1">
//                   Tire Change
//                 </p>
//                 <p className="text-white text-sm font-bold">Starts From</p>
//                 <p className="text-cyan-400 text-2xl font-black mt-1">
//                   $499.99
//                 </p>
//                 <p className="text-white text-sm font-bold leading-tight mt-1">
//                   Including Installation
//                 </p>
//                 <p className="text-white text-sm font-bold leading-tight">
//                   & Balancing
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Row 3 - Oil images */}
//           <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
//             {[oil1Image, oil2Image, oil3Image, oil4Image].map((img, i) => (
//               <div
//                 key={i}
//                 className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
//               >
//                 <img src={img} className="w-full h-full object-cover" alt="" />
//               </div>
//             ))}
//             {/* Circle 3 */}
//             <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl z-20 border-4 border-white animate-blinkGlow">
//               <img
//                 src={oilc}
//                 className="w-full h-full object-cover"
//                 alt=""
//               />
//               <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-3">
//                 <p className="text-white text-sm font-black leading-tight mt-1">
//                   Full Synthetic Oil Change
//                 </p>
//                 <div className="mt-1">
//                   <p className="text-cyan-400 text-2xl font-black">$79.99</p>
//                   <p className="text-white text-sm font-bold">Excluding Filter</p>
//                 </div>
//                 <div className="mt-1">
//                   <p className="text-cyan-400 text-2xl font-black">$89.99</p>
//                   <p className="text-white text-sm font-bold">Including Filter</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

import React from "react";
import { Users, Package, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

import bgImage from "@/assets/bgimg.png";
import bottomLeftImage from "@/assets/cleaning car.png";
import bottomRightImage from "@/assets/technician img.png";
import topCarImage from "@/assets/fogcar.png";
import carwashsImage from "@/assets/carwashs.jpg";
import circleImage from "@/assets/circleimg.png";
import tyres1Image from "@/assets/tyres1.jpg";
import tyres5Image from "@/assets/tyres5.jpg";
import tyres3Image from "@/assets/tyres3.jpg";
import tyres2Image from "@/assets/tyres2.jpg";
import oil1Image from "@/assets/oil1.jpg";
import oil2Image from "@/assets/oil2.jpg";
import oil3Image from "@/assets/oil3.jpg";
import oil4Image from "@/assets/oil4.jpg";
import tyrec from "@/assets/tyreschange.avif";
import oilc from "@/assets/oilc.jpg";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "gray" | "cyan";
}

interface OilPrice {
  price: string;
  label: string;
}

interface CircleConfig {
  image: string;

  serviceName: string;
  servicePrice: string;
  planType: string;

  label: string;
  price: string | null;
  sub: string | null;
  extra: string | null;

  oilPrices?: OilPrice[];
}

// ── Data ──────────────────────────────────────────────────────────────────────
const features: Feature[] = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Professional & Experienced Staff",
    description: "Skilled technicians you can trust with your vehicle",
    color: "gray",
  },
  {
    icon: <Package className="w-8 h-8" />,
    title: "Quality Products & Equipment",
    description: "Safe, effective, and vehicle-friendly solutions",
    color: "cyan",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Quick & Reliable Service",
    description: "Minimal wait times without compromising quality",
    color: "cyan",
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: "Customer-First Approach",
    description: "Honest pricing and dependable service every visit",
    color: "gray",
  },
];

const circles: CircleConfig[] = [
  {
    image: circleImage,
    serviceName: "Touchless Car Wash",
    label: "Touchless Car Wash",

    price: "$5.99",
    sub: "per wash",
    extra: null,

    servicePrice: "5.99",
    planType: "Basic Wash",
  },

  {
    image: tyrec,
    serviceName: "Tire Change",
    label: "Tire Change",

    price: "$499.99",
    sub: "Including Installation & Balancing",
    extra: "Starts From",

    servicePrice: "499.99",
    planType: "Tire Service",
  },

  {
    image: oilc,
    serviceName: "Full Synthetic Oil Change",
    label: "Full Synthetic Oil Change",

    price: null,
    sub: null,
    extra: null,

    servicePrice: "79.99",
    planType: "Oil Change",

    oilPrices: [
      {
        price: "$79.99",
        label: "Excluding Filter",
      },
      {
        price: "$89.99",
        label: "Including Filter",
      },
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const isCyan = feature.color === "cyan";
  return (
    <article
      className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
        isCyan ? "bg-cyan-500/90 text-black" : "bg-gray-700/90 text-white"
      }`}
    >
      <div className="mb-4">{feature.icon}</div>
      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      <p className={`text-sm ${isCyan ? "text-gray-900" : "text-gray-300"}`}>
        {feature.description}
      </p>
    </article>
  );
};

interface CircleProps {
  circle: CircleConfig;
  onClick: () => void;
}

const CircleBadge: React.FC<CircleProps> = ({ circle, onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
               w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl
               z-20 border-4 border-white animate-blinkGlow cursor-pointer
               hover:scale-105 transition-transform duration-300
               hover:border-cyan-400 hover:shadow-cyan-400/40"
  >
    <img
      src={circle.image}
      className="w-full h-full object-cover"
      alt={circle.label}
    />

    <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-3">
      {/* Label */}
      <p className="text-white text-sm font-black leading-tight mt-1">
        {circle.label}
      </p>

      {/* Oil Change — two prices */}
      {circle.oilPrices ? (
        <>
          {circle.oilPrices.map((op, i) => (
            <div key={i} className="mt-1">
              <p className="text-cyan-400 text-2xl font-black">{op.price}</p>
              <p className="text-white text-sm font-bold">{op.label}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          {circle.extra && (
            <p className="text-white text-sm font-bold mt-1">{circle.extra}</p>
          )}
          <p className="text-cyan-400 text-2xl font-black mt-1">
            {circle.price}
          </p>
          {circle.sub && (
            <p className="text-white text-sm font-bold leading-tight mt-1">
              {circle.sub}
            </p>
          )}
        </>
      )}

      {/* Tap hint */}
      <p className="text-cyan-300 text-xs font-semibold mt-2 animate-pulse">
        Tap to Book →
      </p>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const WhyChooseUs: React.FC = () => {
  const navigate = useNavigate();

  const handleCircleClick = (circle: CircleConfig) => {
    navigate("/booking", {
      state: {
        serviceName: circle.serviceName,
        servicePrice: circle.servicePrice,
        planType: circle.planType,
      },
    });
  };

  const rows: { images: string[]; circle: CircleConfig }[] = [
    {
      images: [bottomLeftImage, bottomRightImage, carwashsImage, topCarImage],
      circle: circles[0],
    },
    {
      images: [tyres3Image, tyres1Image, tyres2Image, tyres5Image],
      circle: circles[1],
    },
    {
      images: [oil1Image, oil2Image, oil3Image, oil4Image],
      circle: circles[2],
    },
  ];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 px-4 py-24 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
            Why choose us
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-4">
            Why We Stand Out?
          </h2>
          <p className="text-gray-300 text-lg">
            More Than a Decade of Excellence in Car Care
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* Image Rows with Circles */}
        <div className="relative space-y-6">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="relative grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {row.images.map((img, i) => (
                <div
                  key={i}
                  className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              ))}

              <CircleBadge
                circle={row.circle}
                onClick={() => handleCircleClick(row.circle)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
