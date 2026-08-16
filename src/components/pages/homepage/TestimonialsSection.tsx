import React from "react";
import avatar1 from "@/assets/sample person 1.png";
import avatar2 from "@/assets/sample person 2.png";
import avatar3 from "@/assets/sample person 3.png";
import avatar4 from "@/assets/sample person 1.png";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  title: string;
  content: string;
  avatar: string;
  avatarBgColor: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Pevita Milo",
    role: "Customer",
    title: "Transformed to Brand New!",
    content:
      "I was amazed by how fresh and polished my car looked after the service. The team clearly knows what they’re doing, and the attention to detail really shows.",
    avatar: avatar1,
    avatarBgColor: "bg-cyan-400",
    rating: 5,
  },
  {
    id: 2,
    name: "Ethan McLeod",
    role: "Customer",
    title: "Truly a Premium Experience!",
    content:
      "From start to finish, the service felt top-notch. The staff was professional, and my car received the kind of care you’d expect from a high-end detailing service.",
    avatar: avatar2,
    avatarBgColor: "bg-blue-400",
    rating: 5,
  },
  {
    id: 3,
    name: "Liam O’Connor",
    role: "Customer",
    title: "Impressive Results with a Green Touch!",
    content:
      "It’s great to see a service that cares about the environment while still delivering excellent results. My car looks fantastic, and I feel good about the eco-friendly approach.",
    avatar: avatar3,
    avatarBgColor: "bg-orange-400",
    rating: 4,
  },
  {
    id: 4,
    name: "Sophie Dubois",
    role: "Customer",
    title: "Crystal Clear Finish!",
    content:
      "The detailing made a noticeable difference, especially with visibility and shine. Driving at night feels much better now—highly recommend their thorough work!",
    avatar: avatar4,
    avatarBgColor: "bg-purple-400",
    rating: 5,
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="bg-linear-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="shrink-0">
          <div
            className={`w-24 h-24 rounded-2xl overflow-hidden ${testimonial.avatarBgColor} p-1`}
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="mt-3">
            <h4 className="text-white font-semibold text-sm">
              {testimonial.name}
            </h4>
            <p className="text-gray-400 text-xs">{testimonial.role}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-2">
          <h3 className="text-white text-xl font-bold mb-1">
            {testimonial.title}
          </h3>

          {/* ⭐ Star Rating */}
          <div className="flex mb-3">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-sm mr-1" />
            ))}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            {testimonial.content}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <div className="bg-linear-to-b from-black via-gray-950 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
              Testimonials
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-lg">
            More Than a Decade of Excellence in Car Care
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button className="bg-linear-to-r from-cyan-400 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
            <Link to="/contact">All Testimonials</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;