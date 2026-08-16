// import { useState } from "react";

// interface ScanResult {
//   valid: boolean;
//   orderId: string;
//   customerName: string;
//   amount: string;
//   paymentDate: Date;
//   expiryDate: Date;
//   daysLeft: number;
// }

// const BarcodeScanner = () => {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState<ScanResult | null>(null);
//   const [error, setError] = useState("");

//   // =====================================
//   // VALIDATE BARCODE
//   // =====================================

//   const handleScan = () => {
//     setError("");
//     setResult(null);

//     try {
//       const parts = input.trim().split("|");

//       if (parts.length < 4) {
//         setError("Invalid barcode format. Please scan again.");
//         return;
//       }

//       const orderId       = parts[0];
//       const expiryTs      = parseInt(parts[1]);
//       const customerName  = parts[2];
//       const amount        = parts[3];

//       if (isNaN(expiryTs)) {
//         setError("Corrupted barcode data.");
//         return;
//       }

//       const expiryDate  = new Date(expiryTs);
//       const now         = new Date();

//       // Payment date = expiry - 1 month
//       const paymentDate = new Date(expiryDate);
//       paymentDate.setMonth(paymentDate.getMonth() - 1);

//       const daysLeft = Math.ceil(
//         (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
//       );

//       setResult({
//         valid: now < expiryDate,
//         orderId,
//         customerName,
//         amount,
//         paymentDate,
//         expiryDate,
//         daysLeft,
//       });

//     } catch {
//       setError("Could not read barcode. Please try again.");
//     }
//   };

//   const formatDate = (date: Date) =>
//     date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
//       <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

//         {/* HEADER */}
//         <div className="text-center mb-6">
//           <div className="text-5xl mb-2">📷</div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Car Wash Pass Validator
//           </h1>
//           <p className="text-gray-400 text-sm mt-1">
//             Scan or paste the barcode value to validate
//           </p>
//         </div>

//         {/* INPUT */}
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             setResult(null);
//             setError("");
//           }}
//           placeholder="Scan or paste barcode here..."
//           className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//         />

//         {error && (
//           <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
//         )}

//         <button
//           onClick={handleScan}
//           disabled={!input.trim()}
//           className="w-full h-12 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all duration-300 mb-4"
//         >
//           🔍 Validate Pass
//         </button>

//         {/* CLEAR */}
//         {result && (
//           <button
//             onClick={() => {
//               setInput("");
//               setResult(null);
//             }}
//             className="w-full h-10 border-2 border-gray-200 text-gray-500 text-sm font-medium rounded-2xl hover:bg-gray-50 transition-all duration-300 mb-4"
//           >
//             🔄 Scan Another
//           </button>
//         )}

//         {/* ================================
//             RESULT CARD
//         ================================= */}
//         {result && (
//           <div
//             className={`rounded-2xl border-2 overflow-hidden ${
//               result.valid
//                 ? "border-green-300"
//                 : "border-red-300"
//             }`}
//           >

//             {/* STATUS BANNER */}
//             <div
//               className={`py-4 text-center ${
//                 result.valid ? "bg-green-600" : "bg-red-600"
//               }`}
//             >
//               <div className="text-4xl mb-1">
//                 {result.valid ? "✅" : "❌"}
//               </div>
//               <h2 className="text-white text-xl font-bold">
//                 {result.valid ? "VALID PASS" : "EXPIRED PASS"}
//               </h2>
//               {result.valid && (
//                 <p className="text-green-100 text-sm mt-1">
//                   Access Granted 🚗
//                 </p>
//               )}
//               {!result.valid && (
//                 <p className="text-red-100 text-sm mt-1">
//                   Access Denied — Please Renew
//                 </p>
//               )}
//             </div>

//             {/* DETAILS */}
//             <div className="bg-gray-50 p-5 space-y-3">

//               {/* CUSTOMER NAME */}
//               <div className="flex items-center gap-3 bg-white rounded-xl p-3">
//                 <span className="text-2xl">👤</span>
//                 <div>
//                   <p className="text-gray-400 text-xs">Customer Name</p>
//                   <p className="font-bold text-gray-800 text-sm">
//                     {result.customerName}
//                   </p>
//                 </div>
//               </div>

//               {/* ORDER ID */}
//               <div className="flex items-center gap-3 bg-white rounded-xl p-3">
//                 <span className="text-2xl">🧾</span>
//                 <div>
//                   <p className="text-gray-400 text-xs">Order ID</p>
//                   <p className="font-bold text-gray-800 text-sm break-all">
//                     {result.orderId}
//                   </p>
//                 </div>
//               </div>

//               {/* AMOUNT */}
//               <div className="flex items-center gap-3 bg-white rounded-xl p-3">
//                 <span className="text-2xl">💰</span>
//                 <div>
//                   <p className="text-gray-400 text-xs">Amount Paid</p>
//                   <p className="font-bold text-green-600 text-sm">
//                     ${result.amount}.00
//                   </p>
//                 </div>
//               </div>

//               {/* PACKAGE */}
//               <div className="flex items-center gap-3 bg-white rounded-xl p-3">
//                 <span className="text-2xl">🚗</span>
//                 <div>
//                   <p className="text-gray-400 text-xs">Package</p>
//                   <p className="font-bold text-gray-800 text-sm">
//                     Monthly Car Wash
//                   </p>
//                 </div>
//               </div>

//               {/* PAYMENT DATE */}
//               <div className="flex items-center gap-3 bg-white rounded-xl p-3">
//                 <span className="text-2xl">📅</span>
//                 <div>
//                   <p className="text-gray-400 text-xs">Payment Date</p>
//                   <p className="font-bold text-gray-800 text-sm">
//                     {formatDate(result.paymentDate)}
//                   </p>
//                 </div>
//               </div>

//               {/* EXPIRY DATE */}
//               <div className="flex items-center gap-3 bg-white rounded-xl p-3">
//                 <span className="text-2xl">⏳</span>
//                 <div>
//                   <p className="text-gray-400 text-xs">Expires On</p>
//                   <p
//                     className={`font-bold text-sm ${
//                       result.valid ? "text-red-500" : "text-red-700"
//                     }`}
//                   >
//                     {formatDate(result.expiryDate)}
//                   </p>
//                 </div>
//               </div>

//               {/* DAYS LEFT */}
//               <div
//                 className={`rounded-xl p-4 text-center ${
//                   result.valid
//                     ? result.daysLeft > 7
//                       ? "bg-green-100"
//                       : "bg-orange-100"
//                     : "bg-red-100"
//                 }`}
//               >
//                 <p className="text-gray-500 text-xs mb-1">
//                   {result.valid ? "Days Remaining" : "Status"}
//                 </p>
//                 <p
//                   className={`text-3xl font-bold ${
//                     result.valid
//                       ? result.daysLeft > 7
//                         ? "text-green-600"
//                         : "text-orange-500"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {result.valid ? `${result.daysLeft} days` : "Expired"}
//                 </p>
//               </div>

//             </div>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default BarcodeScanner;

// src/pages/BarcodeScanner.tsx

import { useEffect, useState } from "react";
import { decryptData } from "../../../utils/crypto";

interface ScanResult {
  valid: boolean;
  orderId: string;
  customerName: string;
  amount: string;
  paymentDate: Date;
  expiryDate: Date;
  daysLeft: number;

  // NEW
  encryptedCode: string;
}

const BarcodeScanner = () => {

  const [input, setInput] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.getElementById("barcode-input")?.focus();
  }, []);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleScan = () => {
    setError("");
    setResult(null);

    try {
      const raw = input.trim();

      if (!raw.includes("::")) {
        setError("Invalid QR format. Please scan again.");
        return;
      }

      const separatorIndex = raw.indexOf("::");

      const encryptedData = raw.substring(0, separatorIndex);
      const iv = raw.substring(separatorIndex + 2);

      if (!encryptedData || !iv) {
        setError("Incomplete QR data.");
        return;
      }

      // DECRYPT
      const decrypted = decryptData(encryptedData, iv);

      if (!decrypted) {
        setError("Could not decrypt QR. Data may be corrupted.");
        return;
      }

      const {
        orderId,
        expiryTs,
        customerName,
        amount,
      } = decrypted;

      if (!orderId || !expiryTs || !customerName) {
        setError("Missing data in QR code.");
        return;
      }

      const expiryDate = new Date(expiryTs);
      const now = new Date();

      const paymentDate = new Date(expiryDate);
      paymentDate.setMonth(paymentDate.getMonth() - 1);

      const daysLeft = Math.ceil(
        (expiryDate.getTime() - now.getTime()) /
        (1000 * 60 * 60 * 24)
      );

      setResult({
        valid: now < expiryDate,
        orderId,
        customerName,
        amount: amount || "59",
        paymentDate,
        expiryDate,
        daysLeft,

        // SHOW ENCRYPTED DATA
        encryptedCode: encryptedData,
      });

    } catch (err) {
      console.error("SCAN ERROR:", err);
      setError("Could not read QR code. Please try again.");
    }
  };

  // AUTO SCAN WHEN PASTED
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {

    const val = e.target.value;

    setInput(val);
    setResult(null);
    setError("");

    if (val.includes("::")) {
      setTimeout(() => {
        document.getElementById("validate-btn")?.click();
      }, 300);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-6">

          <div className="text-5xl mb-2">📷</div>

          <h1 className="text-2xl font-bold text-gray-800">
            Car Wash Pass Validator
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Scan QR code or paste value to validate
          </p>

          <div className="mt-2 inline-flex items-center gap-1 bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full">
            🔒 Encrypted Validation
          </div>

        </div>

        {/* INPUT */}
        <textarea
          id="barcode-input"
          value={input}
          onChange={handleChange}
          placeholder="Paste QR code value here or use a QR scanner..."
          rows={3}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-xs font-mono mb-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none break-all"
        />

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            ⚠️ {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          id="validate-btn"
          onClick={handleScan}
          disabled={!input.trim()}
          className="w-full h-12 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all duration-300 mb-3"
        >
          🔍 Validate Pass
        </button>

        {/* RESET BUTTON */}
        {result && (
          <button
            onClick={() => {
              setInput("");
              setResult(null);
            }}
            className="w-full h-10 border-2 border-gray-200 text-gray-500 text-sm font-medium rounded-2xl hover:bg-gray-50 transition-all duration-300 mb-4"
          >
            🔄 Scan Another
          </button>
        )}

        {/* RESULT */}
        {result && (

          <div
            className={`rounded-2xl border-2 overflow-hidden ${
              result.valid
                ? "border-green-300"
                : "border-red-300"
            }`}
          >

            {/* STATUS */}
            <div
              className={`py-4 text-center ${
                result.valid
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >

              <div className="text-4xl mb-1">
                {result.valid ? "✅" : "❌"}
              </div>

              <h2 className="text-white text-xl font-bold">
                {result.valid
                  ? "VALID PASS"
                  : "EXPIRED PASS"}
              </h2>

              <p className="text-sm mt-1 text-white/80">
                {result.valid
                  ? "Access Granted 🚗"
                  : "Access Denied — Please Renew"}
              </p>

            </div>

            {/* DETAILS */}
            <div className="bg-gray-50 p-5 space-y-3">

              {/* ENCRYPTED DATA */}
              <div className="bg-black rounded-xl p-3 overflow-hidden">

                <p className="text-green-400 text-xs mb-2 font-semibold">
                  🔐 Encrypted QR Data
                </p>

                <p className="text-green-300 text-[10px] font-mono break-all leading-5">
                  {result.encryptedCode}
                </p>

              </div>

              {/* CUSTOMER */}
              <div className="flex items-center gap-3 bg-white rounded-xl p-3">

                <span className="text-2xl">👤</span>

                <div>
                  <p className="text-gray-400 text-xs">
                    Customer Name
                  </p>

                  <p className="font-bold text-gray-800">
                    {result.customerName}
                  </p>
                </div>

              </div>

              {/* ORDER */}
              <div className="flex items-center gap-3 bg-white rounded-xl p-3">

                <span className="text-2xl">🧾</span>

                <div>
                  <p className="text-gray-400 text-xs">
                    Order ID
                  </p>

                  <p className="font-mono text-xs text-gray-700 break-all">
                    {result.orderId}
                  </p>
                </div>

              </div>

              {/* AMOUNT */}
              <div className="flex items-center gap-3 bg-white rounded-xl p-3">

                <span className="text-2xl">💰</span>

                <div>
                  <p className="text-gray-400 text-xs">
                    Amount Paid
                  </p>

                  <p className="font-bold text-green-600">
                    ${result.amount}.00
                  </p>
                </div>

              </div>

              {/* PACKAGE */}
              <div className="flex items-center gap-3 bg-white rounded-xl p-3">

                <span className="text-2xl">🚗</span>

                <div>
                  <p className="text-gray-400 text-xs">
                    Package
                  </p>

                  <p className="font-bold text-gray-800">
                    Monthly Car Wash
                  </p>
                </div>

              </div>

              {/* PAYMENT DATE */}
              <div className="flex items-center gap-3 bg-white rounded-xl p-3">

                <span className="text-2xl">📅</span>

                <div>
                  <p className="text-gray-400 text-xs">
                    Payment Date
                  </p>

                  <p className="font-bold text-gray-800 text-sm">
                    {formatDate(result.paymentDate)}
                  </p>
                </div>

              </div>

              {/* EXPIRY */}
              <div className="flex items-center gap-3 bg-white rounded-xl p-3">

                <span className="text-2xl">⏳</span>

                <div>
                  <p className="text-gray-400 text-xs">
                    Expires On
                  </p>

                  <p
                    className={`font-bold text-sm ${
                      result.valid
                        ? "text-red-500"
                        : "text-red-700"
                    }`}
                  >
                    {formatDate(result.expiryDate)}
                  </p>
                </div>

              </div>

              {/* DAYS LEFT */}
              <div
                className={`rounded-xl p-4 text-center ${
                  result.valid
                    ? result.daysLeft > 7
                      ? "bg-green-100"
                      : "bg-orange-100"
                    : "bg-red-100"
                }`}
              >

                <p className="text-gray-500 text-xs mb-1">
                  {result.valid
                    ? "Days Remaining"
                    : "Status"}
                </p>

                <p
                  className={`text-3xl font-bold ${
                    result.valid
                      ? result.daysLeft > 7
                        ? "text-green-600"
                        : "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  {result.valid
                    ? `${result.daysLeft} days`
                    : "Expired"}
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default BarcodeScanner;