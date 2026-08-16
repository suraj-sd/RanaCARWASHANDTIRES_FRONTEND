import { Mail, Phone } from "lucide-react";
import Booking from "../bookingpage/Booking";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Contact Us | Rana Car Wash & Tires</title>
        <meta
          name="description"
          content="Contact Rana Car Wash & Tires for car wash, detailing, and tire services in Kingston, ON. Call, email, or visit us today."
        />
        <meta
          name="keywords"
          content="contact Rana Car Wash, Kingston car wash contact, auto service contact, tire shop Kingston, car wash phone, car wash email, Kingston ON"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | Rana Car Wash & Tires" />
        <meta
          property="og:description"
          content="Contact Rana Car Wash & Tires for professional car wash and tire services in Kingston, ON."
        />
        <meta property="og:url" content="https://ranacarwashandtires.com/contact" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:title" content="Contact Us | Rana Car Wash & Tires" />
        <meta
          name="twitter:description"
          content="Contact Rana Car Wash & Tires for professional car wash and tire services in Kingston, ON."
        />

        {/* JSON-LD ContactPage schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: "https://ranacarwashandtires.com/contact",
            name: "Contact Rana Car Wash & Tires",
            description:
              "Contact Rana Car Wash & Tires for car wash, detailing, and tire services in Kingston, ON. Call, email, or visit us today.",
            publisher: {
              "@type": "Organization",
              name: "Rana Car Wash & Tires",
              url: "https://ranacarwashandtires.com",
            },
            potentialAction: {
              "@type": "CommunicateAction",
              target: "https://ranacarwashandtires.com/contact",
            },
          })}
        </script>
      </Helmet>

      <div className="bg-[#06090d] overflow-hidden">
        <h1 className="sr-only">
          Contact Rana Car Wash & Tires | Car wash and tire services in Kingston, ON
        </h1>
        {/* Top Label */}
        <div className="inline-flex items-center gap-2 mb-8 mt-4 md:ml-20 lg:ml-40 xl:ml-60 md:mt-0">
          <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
          <span className="text-sm font-medium text-cyan-400 tracking-widest uppercase">
            Contact Us
          </span>
        </div>

        {/* Main Section */}
        <div className="min-h-[45vh] bg-gradient-to-br from-[#0d1528] via-[#0b1120] to-[#0b1120] flex items-center justify-center px-4">
          <div className="w-full mt-5 max-w-3xl">
            {/* Heading */}
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-10">
              Get in touch with us
            </h2>

            <div className="space-y-10">
              {/* Business Name */}
              <h3 className="text-3xl md:text-4xl font-semibold text-cyan-400">
                Rana Car Wash & Tires
              </h3>

              {/* Phone Section */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-cyan-400" strokeWidth={2} />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:6139001530"
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-full text-sm sm:text-base"
                  >
                    <Phone className="w-4 h-4" />
                    613-900-1530
                  </a>

                  <a
                    href="tel:18007965409"
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-full text-sm sm:text-base"
                  >
                    <Phone className="w-4 h-4" />
                    1-800-796-5409
                  </a>
                </div>
              </div>

              {/* Email Section */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-cyan-400" strokeWidth={2} />
                </div>

                <div>
                  <a
                    href="mailto:ranacarwashandtires@outlook.com"
                    className="text-xl sm:text-2xl font-medium text-cyan-400 break-all hover:underline"
                  >
                    ranacarwashandtires@outlook.com
                  </a>
                  <p className="text-gray-400 mt-1">Send Email</p>
                </div>
              </div>

              {/* Address Section */}
              <div className="flex items-start gap-6 mb-5">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-cyan-400 text-xl">📍</span>
                </div>

                <div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=1525+John+Counter+Blvd,+Kingston,+ON+K7M+8M9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl sm:text-2xl font-medium text-cyan-400 break-words hover:underline"
                  >
                    1525 John Counter Blvd, Kingston, ON K7M 8M9
                  </a>
                  <p className="text-gray-400 mt-1">Visit Us</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <Booking />
      </div>
    </>
  );
};

export default Contact;
