import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import {
  encryptData,
  decryptData,
} from "../../../utils/crypto";

const API_URL = import.meta.env.VITE_API_URL;

export default function EmailPage() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


const sendOtp = async () => {
    console.log("========== SEND OTP API HIT ==========");

  try {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      return toast.error("Enter email");
    }

    setLoading(true);

    // ==========================================
    // ✅ ENCRYPT PAYLOAD
    // ==========================================
    const encryptedPayload = encryptData({
      email: cleanEmail,
    });

    console.log("EMAIL:", cleanEmail);
    console.log(
      "ENCRYPTED PAYLOAD:",
      encryptedPayload
    );

    // ==========================================
    // ✅ API CALL
    // ==========================================
    const res = await axios.post(
      `${API_URL}/customerDetail/sendOtp`,
      encryptedPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API RESPONSE:", res.data);

    // ==========================================
    // ✅ DECRYPT RESPONSE
    // ==========================================
    const decryptedResponse = decryptData(
      res.data.encryptedData,
      res.data.iv
    );

    console.log(
      "DECRYPTED RESPONSE:",
      decryptedResponse
    );

    if (!decryptedResponse.success) {
      return toast.error(
        decryptedResponse.message
      );
    }

    // ==========================================
    // ✅ SUCCESS
    // ==========================================
    localStorage.setItem(
      "email",
      cleanEmail
    );

    toast.success(
      decryptedResponse.message
    );

    setTimeout(() => {
      navigate("/verify-otp");
    }, 1000);

  } catch (err: any) {
    console.error(
      "FULL ERROR:",
      err
    );

    try {
      if (
        err?.response?.data?.encryptedData &&
        err?.response?.data?.iv
      ) {
        // ==========================================
        // ✅ DECRYPT ERROR RESPONSE
        // ==========================================
        const decryptedError =
          decryptData(
            err.response.data.encryptedData,
            err.response.data.iv
          );

        console.log(
          "DECRYPTED ERROR:",
          decryptedError
        );

        toast.error(
          decryptedError.message
        );
      } else {
        console.log(
          "RAW ERROR:",
          err.response?.data
        );

        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Failed to send OTP"
        );
      }
    } catch (error) {
      console.error(
        "ERROR DECRYPTING:",
        error
      );

      toast.error(
        "Failed to send OTP"
      );
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Helmet>
        <title>
          Login with Email | OTP Verification
        </title>

        <meta
          name="description"
          content="Enter your email to receive OTP and securely verify your account."
        />
      </Helmet>

      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#0a192f] via-[#0b1f3a] to-[#081426]">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-80">

          <h2 className="text-xl font-bold mb-4">
            Enter Email
          </h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded mb-4"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={loading}
          />

          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </>
            ) : (
              "Send OTP"
            )}
          </button>

        </div>

      </div>
    </>
  );
}