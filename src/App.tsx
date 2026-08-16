import { Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

import Layout from "./layout";
import Home from "./components/pages/homepage/Home";
import AboutPage from "./components/pages/aboutpage/AboutPage";
import ServicesPage from "./components/pages/servicespage/ServicesPage";
import Packages from "./components/pages/monthlypackages/Packages";
import MonthlySection from "./components/pages/monthlypackages/MonthlyPackage";
import Booking from "./components/pages/bookingpage/Booking";
import Contact from "./components/pages/contactpage/Contact";
import CustomerList from "./components/pages/customerDetails/customerDetails";
import ScrollToTop from "./lib/ScrollToTop";
import EmailPage from "./components/pages/EmailPage/EmailPage";
import OtpVerify from "./components/pages/OtpVerify/OtpVerify";
import ProtectedRoute from "./components/ProtectedRoute";
import Payment from "./components/pages/payment/CheckoutPage";
// import Success from "./components/pages/success/Success";
import PaymentSuccess from "./components/pages/SuccessOrFailed/PaymentSuccess";
import PaymentFailed from "./components/pages/SuccessOrFailed/PaymentFailed";
import BarCode from "./components/pages/Barcode/BarCode";

function App() {
  const location = useLocation();

  const seoData: Record<string, { title: string; description: string }> = {
    "/": {
      title: "Home | ranacarwashandtires",
      description:
        "Welcome to Rana Car Wash & Tires. High quality car wash, detailing, and tire services tailored for you.",
    },
    "/about": {
      title: "About Us | ranacarwashandtires",
      description:
        "Learn more about Rana Car Wash & Tires, our mission, and commitment to vehicle care excellence.",
    },
    "/services": {
      title: "Services | ranacarwashandtires",
      description:
        "Explore professional car wash, detailing, and tire services we offer.",
    },
    "/booking": {
      title: "Book Now | ranacarwashandtires",
      description:
        "Book your car wash or tire service online quickly and easily.",
    },
    "/contact": {
      title: "Contact Us | ranacarwashandtires",
      description:
        "Get in touch with Rana Car Wash & Tires for support or inquiries.",
    },
  };

  const currentSEO = seoData[location.pathname] || {
    title: "ranacarwashandtires",
    description:
      "Rana Car Wash & Tires - Professional car wash and automotive services.",
  };

  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  return (
    <HelmetProvider>
      <Helmet>
        {/* Basic SEO */}
        <title>{currentSEO.title}</title>
        <meta name="description" content={currentSEO.description} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph (Facebook / WhatsApp) */}
        <meta property="og:title" content={currentSEO.title} />
        <meta property="og:description" content={currentSEO.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="ranacarwashandtires" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentSEO.title} />
        <meta name="twitter:description" content={currentSEO.description} />

        {/* Optional Structured Data (Google SEO boost) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoWash",
            name: "Rana Car Wash & Tires",
            url: canonicalUrl,
            description: currentSEO.description,
          })}
        </script>
      </Helmet>

      <ScrollToTop />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/packages/detailing" element={<Packages />} />
          <Route path="/packages/monthly" element={<MonthlySection />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<EmailPage />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/payment" element={<Payment />} />
          {/* <Route path="/success" element={<Success />} /> */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/scanner" element={<BarCode />} />


          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <CustomerList />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
