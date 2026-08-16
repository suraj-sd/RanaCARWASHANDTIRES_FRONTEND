
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center">

        <div className="text-6xl mb-4">❌</div>

        <h1 className="text-3xl font-bold text-red-600">
          Payment Failed
        </h1>

        <p className="text-gray-500 mt-2">
          Please try again.
        </p>

        <p className="text-gray-400 mt-6 text-sm">
          Redirecting to home in{" "}
          <span className="font-bold text-red-500">{countdown}</span>{" "}
          second{countdown !== 1 ? "s" : ""}...
        </p>

        {/* Progress bar */}
        <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-red-500 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: `${(countdown / 5) * 100}%` }}
          />
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 text-sm text-red-600 underline hover:text-red-700"
        >
          Go to Home now
        </button>

      </div>
    </div>
  );
};

export default PaymentFailed;