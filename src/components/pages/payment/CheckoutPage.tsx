// import { useEffect, useState } from "react";
// import type { FormEvent } from "react";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const API_URL = import.meta.env.VITE_API_URL;

// const stripePromise = loadStripe(
//   import.meta.env.VITE_Stripe_Publishable_key
// );

// // ==============================
// // 🧾 Checkout Form
// // ==============================
// const CheckoutForm: React.FC<{
//   clientSecret: string;
//   bookingData: any;
// }> = ({ clientSecret, bookingData }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [processing, setProcessing] = useState(false);
//   const [message, setMessage] = useState("");
//   const [cardReady, setCardReady] = useState(false);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements || processing || !cardReady) return;

//     setProcessing(true);
//     setMessage("");

//     try {
//       const cardElement = elements.getElement(CardElement);

//       if (!cardElement) {
//         throw new Error("Card element not found");
//       }

//       // ✅ STEP 1: Stripe Payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       if (result.error) {
//         throw new Error(result.error.message);
//       }

//       if (result.paymentIntent?.status !== "succeeded") {
//         throw new Error("Payment not successful");
//       }

//       // ✅ STEP 2: Confirm Payment (Backend)
//       await axios.post(
//         `${API_URL}/payment/confirmPayment`,
//         { paymentIntentId: result.paymentIntent.id },
//         { timeout: 10000 }
//       );

//       // ✅ STEP 3: Save Booking
//       await axios.post(
//         `${API_URL}/customerDetail/addCustomer`,
//         bookingData,
//         { timeout: 10000 }
//       );

//       toast.success("Booking successful");

//       // ✅ STEP 4: Navigate to success
//       navigate("/success", {
//         replace: true,
//         state: { bookingData },
//       });

//     } catch (err: any) {
//       console.error("❌ Payment Error:", err);
//       setMessage(err.message || "Payment failed");
//       setProcessing(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white rounded-2xl shadow-xl p-6 space-y-5"
//     >
//       <h3 className="text-2xl font-semibold text-gray-800 text-center">
//         Payment Details
//       </h3>

//       <div className="text-sm text-gray-600 space-y-1">
//         <p><b>Email:</b> {bookingData.customer_email}</p>
//         <p><b>Amount:</b> ${bookingData.service_price}</p>
//       </div>

//       <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
//         <CardElement
//           onReady={() => setCardReady(true)}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || !cardReady || processing}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-medium"
//       >
//         {processing ? "Processing..." : `Pay $${bookingData.service_price}`}
//       </button>

//       {message && (
//         <p className="text-center text-sm text-red-500">{message}</p>
//       )}
//     </form>
//   );
// };

// // ==============================
// // 🧾 Main Page
// // ==============================
// const CheckoutPage: React.FC = () => {
//   const location = useLocation();
//   const bookingData = location.state?.bookingData;

//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     if (bookingData) {
//       createPayment();
//     }
//   }, [bookingData]);

//   const createPayment = async () => {
//     try {
//       // ✅ FIX: handle "starting at $79"
//       const cleanAmount = Number(
//         String(bookingData.service_price).replace(/[^0-9]/g, "")
//       );

//       const res = await axios.post(
//         `${API_URL}/payment/paymentGateway`,
//         {
//           amount: cleanAmount,
//           customer_email: bookingData.customer_email,
//         },
//         { timeout: 10000 }
//       );

//       setClientSecret(res.data.clientSecret);
//     } catch (err) {
//       console.error("Payment init error:", err);
//     }
//   };

//   // ❌ Block direct access
//   if (!bookingData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>No booking data found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-lg">

//         {clientSecret ? (
//           <Elements
//             stripe={stripePromise}
//             options={{ clientSecret }}
//             key={clientSecret} // ✅ FIX STRIPE ERROR
//           >
//             <CheckoutForm
//               clientSecret={clientSecret}
//               bookingData={bookingData}
//             />
//           </Elements>
//         ) : (
//           <p className="text-center text-gray-600">
//             Initializing payment...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;




import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import {
  encryptData,
  decryptData,
} from "../../../utils/crypto";

const API_URL =
  import.meta.env.VITE_API_URL;

// =====================================
// TYPES
// =====================================

interface BookingData {
  customer_name: string;
  customer_email: string;
  service_price: string;
  [key: string]: any;
}

// =====================================
// CHECKOUT PAGE
// =====================================

const CheckoutPage = () => {

  const location = useLocation();

  const bookingData =
    location.state?.bookingData as BookingData;

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // NO BOOKING DATA
  // =====================================

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            No Booking Found
          </h2>

          <p className="text-gray-500">
            Please create booking first.
          </p>
        </div>
      </div>
    );
  }

  // =====================================
  // CLEAN AMOUNT
  // =====================================

  const cleanAmount = Number(
    String(
      bookingData.service_price
    ).replace(/[^0-9.]/g, "")
  );

  // =====================================
  // HANDLE PAYMENT
  // =====================================

  const handlePayment = async () => {

    try {

      setLoading(true);

      // =====================================
      // ENCRYPT REQUEST
      // =====================================

      const encryptedPayload =
        encryptData({
          amount: cleanAmount,

          customer_email:
            bookingData.customer_email,

          customer_name:
            bookingData.customer_name,
        });

      // =====================================
      // API CALL
      // =====================================

      const res = await axios.post(
        `${API_URL}/cloverPayment/cloverPayment`,
        encryptedPayload,
        {
          timeout: 20000,

          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      // =====================================
      // DECRYPT RESPONSE
      // =====================================

      const decryptedResponse =
        decryptData(
          res.data.encryptedData,
          res.data.iv
        );

      console.log(
        "DECRYPTED PAYMENT RESPONSE:",
        decryptedResponse
      );

      // =====================================
      // SUCCESS
      // =====================================

      if (
        decryptedResponse?.success &&
        decryptedResponse?.checkoutUrl
      ) {

        toast.success(
          "Redirecting to Clover..."
        );

        // =====================================
        // REDIRECT TO CLOVER
        // =====================================

        window.location.href =
          decryptedResponse.checkoutUrl;

      } else {

        toast.error(
          decryptedResponse?.message ||
          "Payment failed"
        );
      }

    } catch (err: any) {

      console.error(
        "PAYMENT ERROR:",
        err
      );

      // =====================================
      // TRY DECRYPT ERROR
      // =====================================

      try {

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
          decryptedError?.message ||
          "Payment failed"
        );

      } catch {

        toast.error(
          err?.response?.data?.message ||
          err?.message ||
          "Payment failed"
        );
      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-lg">

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          {/* HEADER */}

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Clover Secure Payment
            </h1>

            <p className="text-gray-500 mt-2">
              Complete your booking securely
            </p>

          </div>

          {/* BOOKING DETAILS */}

          <div className="bg-gray-50 rounded-2xl p-5 space-y-3 mb-6">

            <div className="flex justify-between items-center">
              <span className="text-gray-500">
                Customer
              </span>

              <span className="font-semibold text-gray-800">
                {bookingData.customer_name}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">
                Email
              </span>

              <span className="font-semibold text-gray-800 break-all">
                {bookingData.customer_email}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">
                Amount
              </span>

              <span className="text-2xl font-bold text-cyan-600">
                ${cleanAmount}
              </span>
            </div>

          </div>

          {/* SECURITY */}

          <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-4 mb-6">

            <div className="flex items-center gap-3">

              <div className="text-2xl">
                🔒
              </div>

              <div>

                <h3 className="font-semibold text-gray-800">
                  Secure Clover Checkout
                </h3>

                <p className="text-sm text-gray-500">
                  You will be redirected to Clover
                  secure payment gateway.
                </p>

              </div>

            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Redirecting..."
              : `Pay $${cleanAmount}`}
          </button>

        </div>

      </div>

    </div>
  );
};

export default CheckoutPage;