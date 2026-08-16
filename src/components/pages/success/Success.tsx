import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.bookingData;

  const currentDate = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // ❌ BLOCK DIRECT ACCESS
  useEffect(() => {
    if (!booking) {
      navigate("/");
    }
  }, [booking, navigate]);

  // ✅ AUTO DOWNLOAD + REDIRECT ONLY IF DATA EXISTS
  useEffect(() => {
    if (!booking) return;

    // 👉 Generate invoice
    generateInvoice();

    // 👉 Auto redirect after 5 sec
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [booking]);

  // ✅ INVOICE FUNCTION
  const generateInvoice = () => {
    const content = `
      -------- INVOICE --------
      Status: Successful
      Date: ${currentDate}

      Customer: ${booking?.customer_name}
      Email: ${booking?.customer_email}
      Service: ${booking?.planType}
      Amount: ${booking?.service_price}

      Thank you for choosing our service!
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.txt";
    link.click();

    window.URL.revokeObjectURL(url);
  };

  // ⛔ IF NO DATA, SHOW NOTHING (avoids flash)
  if (!booking) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-purple-100 via-gray-100 to-orange-100 rounded-2xl shadow-xl p-6">

        {/* ✅ ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full text-white text-2xl">
            ✓
          </div>
        </div>

        {/* ✅ TITLE */}
        <h2 className="text-2xl font-bold text-center text-blue-900">
          Payment Successful!
        </h2>

        <p className="text-center text-gray-600 mt-2">
          We have received your booking request.
        </p>

        <hr className="my-4 border-gray-300" />

        {/* ✅ DETAILS */}
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Status</p>
            <p className="text-green-600 font-semibold">✔ Successful</p>
          </div>

          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium">{currentDate}</p>
          </div>

          <div>
            <p className="text-gray-500">Customer</p>
            <p className="font-medium">{booking?.customer_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Service</p>
            <p className="font-medium">{booking?.planType}</p>
          </div>

          <div>
            <p className="text-gray-500">Amount</p>
            <p className="font-medium">${booking?.service_price}</p>
          </div>
        </div>

        {/* ✅ PAYMENT CARD */}
        <div className="mt-5 bg-indigo-100 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-full"></div>
          <div>
            <p className="font-semibold text-gray-800">Card Payment</p>
            <p className="text-sm text-gray-600">Ending in ****</p>
          </div>
        </div>

        {/* ✅ AUTO REDIRECT TEXT */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Redirecting to home page in 5 seconds...
        </p>

      </div>
    </div>
  );
};

export default Success;