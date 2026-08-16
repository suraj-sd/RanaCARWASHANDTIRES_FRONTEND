// import { useEffect, useRef, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import JsBarcode from "jsbarcode";

// const PaymentSuccess = () => {
//   const navigate = useNavigate();
//   const [countdown, setCountdown] = useState(5);
//   const [searchParams] = useSearchParams();
//   const barcodeRef = useRef<SVGSVGElement>(null);

//   // =====================================
//   // GET DATA FROM URL PARAMS
//   // (Clover passes orderId in redirect URL)
//   // =====================================

//   const orderId =
//     searchParams.get("orderId") ||
//     searchParams.get("order_id") ||
//     `CW-${Date.now()}`;

//   const customerName =
//     searchParams.get("customer_name") || "Customer";

//   // =====================================
//   // DATES
//   // =====================================

//   const paymentDate = new Date();

//   const expiryDate = new Date(paymentDate);
//   expiryDate.setMonth(expiryDate.getMonth() + 1);

//   const formatDate = (date: Date) =>
//     date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//   // =====================================
//   // BARCODE DATA
//   // Encode: ORDERID|EXPIRY_TIMESTAMP
//   // =====================================

//   const barcodeData = `${orderId}|${expiryDate.getTime()}`;

//   // =====================================
//   // GENERATE BARCODE
//   // =====================================

//   useEffect(() => {
//     if (barcodeRef.current) {
//       JsBarcode(barcodeRef.current, barcodeData, {
//         format: "CODE128",
//         width: 2,
//         height: 80,
//         displayValue: false,
//         margin: 10,
//       });
//     }
//   }, [barcodeData]);

//   // =====================================
//   // COUNTDOWN
//   // =====================================

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           navigate("/");
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [navigate]);

//   // =====================================
//   // PRINT / DOWNLOAD
//   // =====================================

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-10">
//       <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">

//         {/* SUCCESS ICON */}
//         <div className="text-6xl mb-3">✅</div>

//         <h1 className="text-3xl font-bold text-green-600">
//           Payment Successful!
//         </h1>

//         <p className="text-gray-500 mt-1 mb-6">
//           Your monthly car wash package is confirmed.
//         </p>

//         {/* ================================
//             BARCODE CARD
//         ================================= */}
//         <div className="border-2 border-dashed border-green-300 rounded-2xl p-5 mb-6 bg-green-50 print:border-gray-400">

//           {/* HEADER */}
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <span className="text-2xl">🚗</span>
//             <span className="font-bold text-gray-800 text-lg">
//               Car Wash Pass
//             </span>
//           </div>

//           {/* CUSTOMER */}
//           <p className="text-gray-600 text-sm mb-1">
//             Customer:{" "}
//             <span className="font-semibold text-gray-800">
//               {customerName}
//             </span>
//           </p>

//           {/* ORDER ID */}
//           <p className="text-gray-400 text-xs mb-4">
//             Order ID: {orderId}
//           </p>

//           {/* BARCODE */}
//           <div className="bg-white rounded-xl p-3 inline-block w-full">
//             <svg ref={barcodeRef} className="w-full" />
//           </div>

//           {/* BARCODE VALUE (small) */}
//           <p className="text-gray-400 text-xs mt-2 break-all">
//             {barcodeData}
//           </p>

//           {/* DIVIDER */}
//           <div className="border-t border-dashed border-green-300 my-4" />

//           {/* VALIDITY */}
//           <div className="grid grid-cols-2 gap-3 text-sm">

//             <div className="bg-white rounded-xl p-3">
//               <p className="text-gray-400 text-xs mb-1">
//                 Payment Date
//               </p>
//               <p className="font-semibold text-gray-800">
//                 {formatDate(paymentDate)}
//               </p>
//             </div>

//             <div className="bg-white rounded-xl p-3">
//               <p className="text-gray-400 text-xs mb-1">
//                 Expires On
//               </p>
//               <p className="font-semibold text-red-500">
//                 {formatDate(expiryDate)}
//               </p>
//             </div>

//           </div>

//           {/* PACKAGE */}
//           <div className="mt-3 bg-green-600 text-white rounded-xl py-2 px-4">
//             <p className="text-xs opacity-80">Monthly Package</p>
//             <p className="text-xl font-bold">$59.00</p>
//           </div>

//         </div>

//         {/* PRINT BUTTON */}
//         <button
//           onClick={handlePrint}
//           className="w-full h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold mb-3 transition-all duration-300 print:hidden"
//         >
//           🖨️ Print / Save Barcode
//         </button>

//         {/* COUNTDOWN */}
//         <p className="text-gray-400 text-sm print:hidden">
//           Redirecting to home in{" "}
//           <span className="font-bold text-green-500">{countdown}</span>{" "}
//           second{countdown !== 1 ? "s" : ""}...
//         </p>

//         <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5 print:hidden">
//           <div
//             className="bg-green-500 h-1.5 rounded-full transition-all duration-1000"
//             style={{ width: `${(countdown / 5) * 100}%` }}
//           />
//         </div>

//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 text-sm text-green-600 underline hover:text-green-700 print:hidden"
//         >
//           Go to Home now
//         </button>

//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;






import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";

const PaymentSuccess = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const passRef = useRef<HTMLDivElement>(null);

  // =====================================
  // GET CLOVER DATA (NO DUMMY FALLBACK)
  // =====================================

  const orderId =
    searchParams.get("orderId") ||
    searchParams.get("order_id") ||
    searchParams.get("checkoutId") ||
    searchParams.get("transactionId");

  const customerName =
    searchParams.get("customer_name");

  const amount =
    searchParams.get("amount");

  // =====================================
  // BLOCK IF NO REAL DATA
  // =====================================

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl text-center shadow">
          <h2 className="text-xl font-bold text-red-600">
            Payment Data Missing
          </h2>
          <p className="text-gray-500 mt-2">
            No valid Clover payment information found.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // DEFAULT SAFE VALUES (ONLY IF REAL DATA EXISTS)
  // =====================================

  const finalCustomerName = customerName || "Customer";
  const finalAmount = amount || "0";

  // =====================================
  // DATES
  // =====================================

  const paymentDate = new Date();
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // =====================================
  // REAL QR DATA
  // =====================================

  const rawPayload = {
    orderId,
    customerName: finalCustomerName,
    amount: finalAmount,
    paymentDate: paymentDate.toISOString(),
    expiryDate: expiryDate.toISOString(),
    status: "ACTIVE",
  };

  const qrData = JSON.stringify(rawPayload);

  // =====================================
  // AUTO DOWNLOAD PASS
  // =====================================

  const downloadPass = async () => {

    if (!passRef.current) return;

    try {

      const canvas = await html2canvas(passRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `car-wash-pass-${orderId}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error("DOWNLOAD ERROR:", err);
    }
  };

  useEffect(() => {
    setTimeout(downloadPass, 600);
  }, []);

  // =====================================
  // UI
  // =====================================

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-10">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">

        <div className="text-6xl mb-3">✅</div>

        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>

        <p className="text-gray-500 mt-1 mb-6">
          Your payment has been confirmed.
        </p>

        {/* PASS CARD */}

        <div
          ref={passRef}
          className="border-2 border-dashed border-green-300 rounded-2xl p-5 mb-6 bg-green-50"
        >

          {/* HEADER */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🚗</span>
            <span className="font-bold text-gray-800 text-lg">
              Car Wash Pass
            </span>
          </div>

          {/* CUSTOMER */}
          <div className="bg-white rounded-xl p-3 mb-4 text-left">
            <p className="text-gray-500 text-xs">Customer</p>
            <p className="font-bold">{finalCustomerName}</p>

            <p className="text-gray-400 text-xs mt-2">Order ID</p>
            <p className="font-mono text-xs break-all">
              {orderId}
            </p>
          </div>

          {/* QR */}
          <div className="bg-white p-4 rounded-xl inline-block mb-3">
            <QRCodeSVG value={qrData} size={160} />
          </div>

          <p className="text-xs text-gray-400 mb-4">
            Scan to view pass details
          </p>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-3 text-xs">

            <div className="bg-white p-3 rounded-lg">
              <p className="text-gray-400">Payment</p>
              <p>{formatDate(paymentDate)}</p>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <p className="text-gray-400">Expires</p>
              <p className="text-red-500">
                {formatDate(expiryDate)}
              </p>
            </div>

          </div>

          {/* AMOUNT */}
          <div className="mt-4 bg-green-600 text-white rounded-xl py-2">
            <p className="text-sm">Amount</p>
            <p className="text-lg font-bold">${finalAmount}</p>
          </div>

        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
        >
          Go to Home
        </button>

      </div>

    </div>
  );
};

export default PaymentSuccess;