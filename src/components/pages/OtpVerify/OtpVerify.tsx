import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import {
  encryptData,
  decryptData,
} from "../../../utils/crypto";

const API_URL = import.meta.env.VITE_API_URL;

export default function OtpVerify() {

  const [otp, setOtp] = useState<string[]>(
    new Array(6).fill("")
  );

  const [loading, setLoading] =
    useState<boolean>(false);

  const [timer, setTimer] =
    useState<number>(30);

  const [success, setSuccess] =
    useState<boolean>(false);

  const inputs = useRef<
    (HTMLInputElement | null)[]
  >([]);

  const navigate = useNavigate();

  const email =
    localStorage.getItem("email");

  // ==========================================
  // TIMER
  // ==========================================

  useEffect(() => {

    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {

    const value = e.target.value;

    if (!/^[0-9]?$/.test(value))
      return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newOtp.join("").length === 6) {
      verifyOtp(newOtp.join(""));
    }
  };

  // ==========================================
  // HANDLE BACKSPACE
  // ==========================================

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ==========================================
  // VERIFY OTP
  // ==========================================

  const verifyOtp = async (
    finalOtp: string
  ) => {

    try {

      setLoading(true);

      const encryptedPayload =
        encryptData({
          email,
          otp: finalOtp,
        });

      const res = await axios.post(
        `${API_URL}/customerDetail/verifyOtp`,
        encryptedPayload,
        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      const decryptedResponse =
        decryptData(
          res.data.encryptedData,
          res.data.iv
        );

      console.log(
        "DECRYPTED RESPONSE:",
        decryptedResponse
      );

      if (decryptedResponse.success) {

        toast.success(
          decryptedResponse.message
        );

        setSuccess(true);

        // ✅ SAVE LOGIN
        localStorage.setItem(
          "isAuthenticated",
          "true"
        );

        // OPTIONAL TOKEN
        if (decryptedResponse.token) {
          localStorage.setItem(
            "token",
            decryptedResponse.token
          );
        }

        localStorage.removeItem("email");

        // ✅ REDIRECT
        setTimeout(() => {
          navigate("/customers");
        }, 1500);

      } else {

        toast.error(
          decryptedResponse.message
        );
      }

    } catch (err: any) {

      console.error(err);

      try {

        const decryptedError =
          decryptData(
            err.response.data.encryptedData,
            err.response.data.iv
          );

        toast.error(
          decryptedError.message
        );

      } catch {

        toast.error(
          "Invalid OTP ❌"
        );
      }

    } finally {

      setLoading(false);
    }
  };

  // ==========================================
  // RESEND OTP
  // ==========================================

  const resendOtp = async () => {
  console.log("========== resendOtp OTP API HIT ==========");

    try {

      const encryptedPayload =
        encryptData({
          email,
        });

      const res = await axios.post(
        `${API_URL}/customerDetail/sendOtp`,
        encryptedPayload,
        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      const decryptedResponse =
        decryptData(
          res.data.encryptedData,
          res.data.iv
        );

      toast.success(
        decryptedResponse.message
      );

      setTimer(30);

    } catch (err: any) {

      console.error(err);

      try {

        const decryptedError =
          decryptData(
            err.response.data.encryptedData,
            err.response.data.iv
          );

        toast.error(
          decryptedError.message
        );

      } catch {

        toast.error(
          "Failed to resend OTP"
        );
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>
          OTP Verification | Secure Login
        </title>

        <meta
          name="description"
          content="Verify your OTP securely to continue your booking or account access."
        />

        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Helmet>

      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600">

        <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-80">

          {success ? (

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-green-600 text-2xl font-bold"
            >
              ✅ Verified!
            </motion.div>

          ) : (

            <>
              <h2 className="text-2xl font-bold mb-2">
                Verify OTP
              </h2>

              <p className="text-gray-500 mb-6">
                Enter 6 digit code
              </p>

              <div className="flex justify-between mb-6">

                {otp.map((val, i) => (

                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={val}
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    onChange={(e) =>
                      handleChange(e, i)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, i)
                    }
                    className="w-10 h-12 text-center border rounded-lg text-lg focus:border-blue-500 outline-none"
                  />

                ))}

              </div>

              <button
                onClick={() =>
                  verifyOtp(otp.join(""))
                }
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded mb-3 hover:bg-blue-700"
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>

              {timer > 0 ? (

                <p className="text-gray-500 text-sm">
                  Resend OTP in {timer}s
                </p>

              ) : (

                <button
                  onClick={resendOtp}
                  className="text-blue-600 text-sm"
                >
                  Resend OTP
                </button>

              )}
            </>

          )}

        </div>

      </div>
    </>
  );
}