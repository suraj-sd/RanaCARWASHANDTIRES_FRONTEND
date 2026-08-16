import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

import bgImg from "../../assets/footer background.png";
import logo from "../../assets/logo.png";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Facebook, Instagram } from "lucide-react";
import { toast } from "react-toastify";

// ✅ IMPORT CRYPTO
import { encryptData, decryptData } from "../../utils/crypto";

const Footer = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  // ======================================
  // SUBSCRIBE
  // ======================================

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      setMessage("");

      // ==================================
      // ENCRYPT PAYLOAD
      // ==================================

      const encryptedPayload = encryptData({
        email,
      });

      // ==================================
      // API CALL
      // ==================================

      const res = await axios.post(
        `${API_URL}/carService/email`,
        encryptedPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // ==================================
      // DECRYPT RESPONSE
      // ==================================

      const decryptedResponse = decryptData(
        res.data.encryptedData,
        res.data.iv,
      );

      console.log("DECRYPTED RESPONSE:", decryptedResponse);

      // ==================================
      // SUCCESS
      // ==================================

      toast.success(decryptedResponse.msg || "Subscribed successfully!");

      setEmail("");
    } catch (err: any) {
      console.log(err);

      // ==================================
      // DECRYPT ERROR RESPONSE
      // ==================================

      try {
        const decryptedError = decryptData(
          err.response.data.encryptedData,
          err.response.data.iv,
        );

        toast.error(decryptedError.message || "Something went wrong");
      } catch {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full md:h-screen lg:h-[40vh]">
        {/* BACKGROUND */}
        <div
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(4px)",
          }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* CONTENT */}
        <div className="relative text-white flex flex-col items-center justify-center pt-6 sm:pt-10 px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-center items-center h-full gap-6 sm:gap-8 lg:gap-12 w-full">
            {/* LOGO */}
            <div className="flex flex-col items-center md:items-start max-w-xs sm:max-w-sm md:max-w-[30vw]">
              <img
                src={logo}
                alt="Logo"
                className="h-16 sm:h-20 w-auto mx-auto md:mx-0 mb-4"
              />

              <span className="text-xs sm:text-sm text-center md:text-left">
                Rana Car Wash & Tires is a professional automotive service
                center dedicated to keeping your vehicle clean, safe, and
                road-ready.
              </span>

              {/* SOCIAL MEDIA */}
            {/* SOCIAL MEDIA */}
<div className="flex items-center gap-4 mt-4 justify-center md:justify-start">

  {/* Facebook */}
  <a
    href="https://www.facebook.com/RanaCarWashAndTires"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1877F2] hover:scale-110 transition-all duration-300"
  >
    <Facebook
      size={22}
      className="text-[#1877F2]"
    />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/@ranacarwashandtires"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-10 h-10 rounded-full border border-pink-500 hover:scale-110 transition-all duration-300"
  >
    <Instagram
      size={22}
      className="text-pink-500"
    />
  </a>

</div>
            </div>

            {/* LINKS */}
            <div className="text-center md:text-left">
              <h4 className="text-base sm:text-lg font-semibold mb-2">
                Other pages
              </h4>

              <ul className="text-xs sm:text-sm space-y-1">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/services">Service</Link>
                </li>
                <li>
                  <Link to="/packages/detailing">Packages</Link>
                </li>
                <li>
                  <Link to="/booking">Booking system</Link>
                </li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div className="w-full sm:w-80 md:max-w-md text-white flex flex-col gap-2">
              <h4 className="text-base sm:text-lg font-semibold text-center md:text-left">
                Newsletter
              </h4>

              <span className="text-xs sm:text-sm text-gray-300 text-center md:text-left">
                Subscribe to our newsletter
              </span>

              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-black placeholder:text-gray-500 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md text-sm"
              />

              <Button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full mt-2 text-sm"
              >
                {loading ? "Submitting..." : "Subscribe"}
              </Button>

              {message && (
                <p className="text-xs mt-1 text-center md:text-left">
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="mt-8 sm:my-12 lg:mt-20 text-center px-2">
            <p className="text-xs sm:text-sm">
              Copyright &copy; {new Date().getFullYear()} Rana Car Wash & Tires
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
