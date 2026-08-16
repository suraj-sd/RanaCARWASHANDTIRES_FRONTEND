import { useEffect, useState, useRef } from "react";
import type { FormEvent } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import { encryptData, decryptData } from "../../../utils/crypto";

const API_URL = import.meta.env.VITE_API_URL;

/* ---------- TYPES ---------- */

interface AddOn {
  _id: string;
  name: string;
  price: number;
}

interface AddOnService {
  _id: string;
  serviceName: string;
  addOns: AddOn[];
}

interface BookingForm {
  service_name: string;
  service_price: string;
  planType: string;
  addOns: string[];
  vehicle_type: "" | "Sedan" | "SUV" | "Truck/Van";

  booking_date: string;
  booking_time: string;

  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_note: string;
}

interface Status {
  type: "" | "success" | "error";
  message: string;
}

/* ---------- INITIAL FORM ---------- */

const initialForm: BookingForm = {
  service_name: "",
  service_price: "",
  planType: "",
  addOns: [],
  vehicle_type: "",
  booking_date: "",
  booking_time: "",

  customer_name: "",
  customer_phone: "",
  customer_email: "",
  customer_note: "",
};

/* ---------- TIME FORMAT ---------- */

function formatTo12Hour(time24: string): string {
  const [hourStr, min] = time24.split(":");

  const hour = parseInt(hourStr, 10);

  const period = hour >= 12 ? "PM" : "AM";

  const h12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

  return `${h12}:${min} ${period}`;
}

/* ---------- COMPONENT ---------- */

export default function Booking() {
  const location = useLocation();

  /* ---------- STATE FROM ROUTER ---------- */

  const serviceNameFromState =
    location.state && typeof location.state === "object"
      ? location.state.serviceName
      : "";

  const servicePriceFromState =
    location.state && typeof location.state === "object"
      ? location.state.servicePrice
      : "";

  const planTypeFromState =
    location.state && typeof location.state === "object"
      ? location.state.planType
      : "";

  /* ---------- MAIN STATES ---------- */

  const [form, setForm] = useState<BookingForm>({
    ...initialForm,
    service_name: serviceNameFromState || "",
    service_price: servicePriceFromState || "",
    planType: planTypeFromState || "",
  });

  const [, setServiceName] = useState<string>(
    serviceNameFromState || "",
  );

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<Status>({
    type: "",
    message: "",
  });

  const [services, setServices] = useState<any[]>([]);

  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  const [slotsLoading, setSlotsLoading] = useState(false);

  const [addOnServices, setAddOnServices] = useState<AddOnService[]>([]);

  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- UPDATE FORM FROM STATE ---------- */

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      service_name: serviceNameFromState || "",
      service_price: servicePriceFromState || "",
      planType: planTypeFromState || "",
    }));

    setServiceName(serviceNameFromState || "");
  }, [
    serviceNameFromState,
    servicePriceFromState,
    planTypeFromState,
  ]);

  /* ---------- ADDON TIMER ---------- */

  const resetCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  };

  /* ---------- SELECTED ADDONS ---------- */

  const selectedNames = addOnServices
    .flatMap((s) => s.addOns)
    .filter((a) => selectedAddOns.includes(a._id))
    .map((a) => a.name)
    .join(", ");

  /* ---------- TOGGLE ADDON ---------- */

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id],
    );

    resetCloseTimer();
  };

  /* ---------- AUTO CLOSE ---------- */

  useEffect(() => {
    if (isOpen) {
      resetCloseTimer();
    }

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [isOpen]);

  /* ---------- FETCH SLOTS ---------- */

  useEffect(() => {
    if (!form.booking_date) {
      setAvailableTimeSlots([]);

      return;
    }

    const fetchSlots = async () => {
      setSlotsLoading(true);

      try {
        const res = await axios.get(
          `${API_URL}/customerDetail/getAvailableSlots`,
          {
            params: {
              date: form.booking_date,
            },

            timeout: 10000,
          },
        );

        const slots: string[] = Array.isArray(res.data?.available)
          ? res.data.available
          : [];

        setAvailableTimeSlots(slots);
      } catch (err) {
        console.error("Error fetching available slots:", err);

        setAvailableTimeSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlots();
  }, [form.booking_date]);

  /* ---------- FETCH SERVICES ---------- */

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const encryptedPayload = encryptData({
          request: "getAllService",
        });

        const res = await axios.post(
          `${API_URL}/carService/getAllService`,
          encryptedPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const decryptedResponse = decryptData(
          res.data.encryptedData,
          res.data.iv,
        );

        setServices(
          Array.isArray(decryptedResponse?.data)
            ? decryptedResponse.data
            : [],
        );
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };

    if (!serviceNameFromState) {
      fetchAllServices();
    }
  }, [serviceNameFromState]);

  /* ---------- FETCH ADDONS ---------- */

  useEffect(() => {
    const getAddOnServices = async () => {
      try {
        const encryptedPayload = encryptData({
          request: "get_addon_services",
        });

        const res = await axios.post(
          `${API_URL}/carService/getAddON`,
          encryptedPayload,
          {
            timeout: 20000,

            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const decryptedResponse = decryptData(
          res.data.encryptedData,
          res.data.iv,
        );

        setAddOnServices(
          Array.isArray(decryptedResponse?.data)
            ? decryptedResponse.data
            : [],
        );
      } catch (err) {
        console.error(err);
      }
    };

    getAddOnServices();
  }, []);

  /* ---------- CLOSE DROPDOWN ---------- */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  /* ---------- MIN DATE ---------- */

  const getMinDate = () => {
    const now = new Date();

    if (now.getHours() >= 17) {
      const tomorrow = new Date(now);

      tomorrow.setDate(tomorrow.getDate() + 1);

      return tomorrow.toISOString().split("T")[0];
    }

    return now.toISOString().split("T")[0];
  };

  /* ---------- UPDATE FIELD ---------- */

  const updateField = <K extends keyof BookingForm>(
    key: K,
    value: BookingForm[K],
  ) => {
    if (key === "booking_date") {
      setForm((prev) => ({
        ...prev,
        [key]: value,
        booking_time: "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  /* ---------- RESET FORM ---------- */

  const resetForm = () => {
    setForm({
      ...initialForm,
      service_name: serviceNameFromState || "",
      service_price: servicePriceFromState || "",
      planType: planTypeFromState || "",
    });

    setStatus({
      type: "",
      message: "",
    });

    setAvailableTimeSlots([]);

    setSelectedAddOns([]);

    setIsOpen(false);

    setServiceName(serviceNameFromState || "");
  };

  /* ---------- VALIDATION ---------- */

  const validate = (): string | null => {
    if (!form.service_name) return "Select a service";

    if (!form.booking_date) return "Select date";

    if (!form.booking_time) return "Select time";
if (!form.vehicle_type) return "Select vehicle type";
    if (!form.customer_name.trim()) return "Enter name";

    if (!/^\d{10,12}$/.test(form.customer_phone))
      return "Phone must be 10, 11, or 12 digits";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customer_email))
      return "Invalid email";

    return null;
  };

  /* ---------- SUBMIT ---------- */

  const submitBooking = async (e: FormEvent) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      setStatus({
        type: "error",
        message: error,
      });

      return;
    }

    try {
      setLoading(true);

      setStatus({
        type: "",
        message: "",
      });

      const finalData = {
        ...form,

        addOns: addOnServices
          .flatMap((s) => s.addOns)
          .filter((a) => selectedAddOns.includes(a._id)),
      };

      const { iv, encryptedData } = encryptData(finalData);

      const res = await axios.post(
        `${API_URL}/customerDetail/addCustomer`,
        { iv, encryptedData },
        {
          timeout: 10000,

          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const decryptedResponse = decryptData(
        res.data.encryptedData,
        res.data.iv,
      );

      const confirmMsg =
        decryptedResponse?.message || "Booking successful";

      setStatus({
        type: "success",
        message: confirmMsg,
      });

      toast.success(confirmMsg);

      resetForm();
    } catch (err: unknown) {
      let message = "Something went wrong";

      if (axios.isAxiosError(err)) {
        if (
          err.response?.data?.encryptedData &&
          err.response?.data?.iv
        ) {
          try {
            const decryptedError = decryptData(
              err.response.data.encryptedData,
              err.response.data.iv,
            );

            message =
              decryptedError?.message || "Something went wrong";
          } catch {
            message = "Unable to decrypt error";
          }
        } else if (err.response?.data?.message) {
          message = err.response.data.message;
        } else if (err.code === "ECONNABORTED") {
          message = "Request timed out. Please try again.";
        } else if (err.message) {
          message = err.message;
        }
      }

      setStatus({
        type: "error",
        message,
      });

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- SLOT READY ---------- */

  const slotsReady =
    !!form.booking_date && !slotsLoading;

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e1a] via-[#0b1120] to-[#0d1528] pt-14 px-4 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Card className="max-w-2xl mx-auto bg-linear-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl relative overflow-hidden">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>

        {/* Glow effect on top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent"></div>

        <CardHeader className="relative">
          <CardTitle className="text-4xl md:text-5xl font-bold bg-linear-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-2 tracking-tight">
            Book Your Service
          </CardTitle>
          <p className="text-cyan-200/60 text-sm">
            <b>Choose your preferred service package first</b>, then proceed to
            complete your appointment details{" "}
          </p>
        </CardHeader>

        <CardContent className="relative">
          <form onSubmit={submitBooking} className="space-y-6">
            {/* Service & Employee Row */}
            {/* ================= SERVICE ================= */}
          <div className="grid grid-cols-1 gap-2">
  <Field label="Service">
    {serviceNameFromState ? (
      <Input
        value={form.service_name || "Loading service..."}
        disabled
        className="
          h-12
          bg-slate-950/60
          border
          border-cyan-500/30
          text-white
          placeholder:text-gray-400
          disabled:opacity-100
        "
      />
    ) : (
      <Select
        value={form.service_name}
        onValueChange={(value) => {
          const selected = services.find(
            (s) => s.service_name === value,
          );

          setForm((prev) => ({
            ...prev,
            service_name: selected?.service_name || "",
            service_price: selected?.service_price || "",
            planType: selected?.planType || "",
          }));

          setServiceName(selected?.service_name || "");
        }}
      >
        {/* SELECT BUTTON */}
        <SelectTrigger
          className="
            h-12
            w-full
            bg-slate-950/60
            border
            border-cyan-500/30
            text-gray-200
            px-3
          "
        >
          <SelectValue placeholder="Select a service" />
        </SelectTrigger>

        {/* DROPDOWN */}
        <SelectContent
          className="
            bg-slate-900
            border
            border-cyan-500/30
            max-h-60
            overflow-y-auto
            p-1
          "
        >
          {services.map((s) => (
            <SelectItem
              key={s._id}
              value={s.service_name}
              className="
                text-gray-200
                focus:bg-cyan-500/20
                focus:text-cyan-300
                rounded-md
                cursor-pointer
              "
            >
              {s.service_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )}
  </Field>
</div>

            {/* {serviceName !== "Monthly Automatic Car Wash" && ( */}
            <div className="grid grid-cols-1 gap-5">
              <Field label="Choose Add-On Services (Optional)" icon="+">
                <div ref={dropdownRef} className="relative">
                  {/* INPUT BOX */}
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full h-12 flex items-center justify-between px-3 rounded-xl bg-slate-950/60 border border-cyan-500/30 cursor-pointer hover:border-cyan-400/60"
                  >
                    <span className="text-gray-200 text-sm truncate">
                      {selectedNames || "Choose Add-On Services"}
                    </span>

                    <span className="text-cyan-400 text-sm">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  {/* DROPDOWN */}
                  {isOpen && (
                    <div className="absolute z-50 mt-2 w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-4 max-h-60 overflow-y-auto shadow-lg">
                      {addOnServices.length > 0 ? (
                        addOnServices.map((service) => (
                          <div key={service._id} className="mb-3">
                            <p className="text-cyan-300 text-sm font-semibold mb-2">
                              {service.serviceName}
                            </p>

                            <div className="space-y-2">
                              {service.addOns.map((addon) => (
                                <label
                                  key={addon._id}
                                  className="flex items-center justify-between bg-slate-900/60 px-3 py-2 rounded-lg cursor-pointer hover:bg-cyan-500/10 transition"
                                >
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="checkbox"
                                      checked={selectedAddOns.includes(
                                        addon._id,
                                      )}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        toggleAddOn(addon._id);
                                      }}
                                      className="w-4 h-4 accent-cyan-500 cursor-pointer"
                                    />
                                    <span className="text-gray-200 text-sm">
                                      {addon.name}
                                    </span>
                                  </div>

                                  <span className="text-cyan-400 text-sm font-medium">
                                    ${addon.price}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-400 text-sm">
                          No Add-On Services Available
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Field>
            </div>
            {/* )} */}

{/* ================= VEHICLE TYPE ================= */}
<div className="grid grid-cols-1 gap-5">
  <Field label="Vehicle Type *" icon="🚗">
    <Select
  value={form.vehicle_type}
  onValueChange={(v) =>
    updateField(
      "vehicle_type",
      v as BookingForm["vehicle_type"]
    )
  }
>
      <SelectTrigger
        className="
          w-full !h-12 rounded-xl
          bg-slate-950/60
          border border-cyan-500/30
          hover:border-cyan-400/60
          focus:border-cyan-400
          focus:ring-2 focus:ring-cyan-400/20
          text-gray-200 px-3
          transition-all duration-300
        "
      >
        <SelectValue placeholder="Select vehicle type" />
      </SelectTrigger>

      <SelectContent className="bg-slate-900 border border-cyan-500/30 rounded-xl">
        <SelectItem
          value="Sedan"
          className="text-gray-200 focus:bg-cyan-500/20 focus:text-cyan-300"
        >
          🚘 Sedan
        </SelectItem>

        <SelectItem
          value="SUV"
          className="text-gray-200 focus:bg-cyan-500/20 focus:text-cyan-300"
        >
          🚙 SUV
        </SelectItem>

        <SelectItem
          value="Truck/Van"
          className="text-gray-200 focus:bg-cyan-500/20 focus:text-cyan-300"
        >
          🚚 Truck / Van
        </SelectItem>
      </SelectContent>
    </Select>
  </Field>
</div>
            {/* ================= DATE + TIME ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* DATE */}
              <Field label="Date *" icon="📅">
                <Input
                  type="date"
                  min={getMinDate()}
                  value={form.booking_date}
                  onChange={(e) => updateField("booking_date", e.target.value)}
                  onClick={(e) => {
                    const input = e.target as HTMLInputElement;
                    if (input.showPicker) {
                      input.showPicker();
                    }
                  }}
                  className="w-full !h-12 rounded-xl bg-slate-950/60 border border-cyan-500/30 hover:border-cyan-400/60 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-200 px-3 transition-all duration-300 cursor-pointer"
                />
              </Field>

              {/* TIME */}
              <Field label="Time *" icon="⏰">
                <Select
                  disabled={!slotsReady}
                  value={form.booking_time}
                  onValueChange={(v) => updateField("booking_time", v)}
                >
                  <SelectTrigger className="w-full !h-12 rounded-xl bg-slate-950/60 border border-cyan-500/30 hover:border-cyan-400/60 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-200 px-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    <SelectValue
                      placeholder={
                        !form.booking_date
                          ? "Select date first"
                          : slotsLoading
                            ? "Loading slots..."
                            : "Select time slot"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent className="bg-slate-900 border border-cyan-500/30 rounded-xl max-h-60">
                    {availableTimeSlots.length > 0 ? (
                      availableTimeSlots.map((slot) => (
                        <SelectItem
                          key={slot}
                          value={slot}
                          className="text-gray-200 focus:bg-cyan-500/20 focus:text-cyan-300"
                        >
                          {formatTo12Hour(slot)}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="text-center py-2 text-gray-400 text-sm">
                        {slotsLoading ? "Loading..." : "No available slots"}
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            {/* <Field label="Employee" icon="👤">
                                <Select
                                    // value={form.employee_id}
                                    // onValueChange={(v) =>
                                    //     updateField("employee_id", v)
                                    // }
                                >
                                    <SelectTrigger className="bg-slate-950/50 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 focus:ring-2 focus:ring-cyan-400/20 text-gray-200">
                                        <SelectValue placeholder="Select employee" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-cyan-500/30">
                                        {employees.map((e) => (
                                            <SelectItem
                                                key={e._id}
                                                value={e._id}
                                                className="text-gray-200 focus:bg-cyan-500/20 focus:text-cyan-300"
                                            >
                                                {e.employee_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field> */}

            {/* Date & Time Row */}

            {/* Customer Details Section */}
            <div className="pt-4 border-t border-cyan-500/10">
              <h3 className="text-lg font-semibold text-cyan-300/90 mb-4">
                Customer Details
              </h3>

              <div className="space-y-5">
                <Field label="Full Name *" icon="✏️">
                  <Input
                    value={form.customer_name}
                    onChange={(e) =>
                      updateField("customer_name", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="bg-slate-950/50 border-cyan-500/30 hover:border-cyan-400/50 focus:border-cyan-400 transition-all duration-300 focus:ring-2 focus:ring-cyan-400/20 text-gray-200 placeholder:text-gray-500"
                  />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Phone Number *" icon="📱">
                    <Input
                      type="tel"
                      inputMode="numeric"
                      maxLength={12}
                      value={form.customer_phone}
                      onChange={(e) => {
                        const digitsOnly = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 12);
                        updateField("customer_phone", digitsOnly);
                      }}
                      placeholder="Enter Valid Number"
                      className="bg-slate-950/50 border-cyan-500/30 hover:border-cyan-400/50 focus:border-cyan-400 transition-all duration-300 focus:ring-2 focus:ring-cyan-400/20 text-gray-200 placeholder:text-gray-500"
                    />
                  </Field>

                  <Field label="Email Address *" icon="📧">
                    <Input
                      type="email"
                      value={form.customer_email}
                      onChange={(e) =>
                        updateField("customer_email", e.target.value)
                      }
                      placeholder="Enter Valid EmailID ( your@gmail.com )"
                      className="bg-slate-950/50 border-cyan-500/30 hover:border-cyan-400/50 focus:border-cyan-400 transition-all duration-300 focus:ring-2 focus:ring-cyan-400/20 text-gray-200 placeholder:text-gray-500"
                    />
                  </Field>
                </div>

                <Field label="Additional Notes *" icon="📝">
                  <Textarea
                    value={form.customer_note}
                    onChange={(e) =>
                      updateField("customer_note", e.target.value)
                    }
                    placeholder="Any special requests or notes..."
                    className="bg-slate-950/50 border-cyan-500/30 hover:border-cyan-400/50 focus:border-cyan-400 transition-all duration-300 focus:ring-2 focus:ring-cyan-400/20 text-gray-200 placeholder:text-gray-500 min-h-25 resize-none"
                  />
                </Field>
              </div>
            </div>
            {/* {serviceName === "Monthly Automatic Car Wash" && (
              <Field label="Payment Method *" icon="💳">
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_method"
                      value="online"
                      checked={form.payment_method === "online"}
                      onChange={(e) =>
                        updateField(
                          "payment_method",
                          e.target.value as "online",
                        )
                      }
                      className="accent-cyan-500 w-4 h-4"
                    />
                    <span className="text-white text-sm">Online Payment</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_method"
                      value="Pay at center"
                      checked={form.payment_method === "Pay at center"}
                      onChange={(e) =>
                        updateField(
                          "payment_method",
                          e.target.value as "Pay at center",
                        )
                      }
                      className="accent-cyan-500 w-4 h-4"
                    />
                    <span className="text-white text-sm">Cash on Delivery</span>
                  </label>
                </div>
              </Field>
            )} */}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="border-cyan-500/40 text-gray-900 hover:text-gray-200 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300 font-medium"
              >
                Reset Form
              </Button>

              <Button
                disabled={loading}
                className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </form>

          {/* Status Message */}
          {status.message && (
            <div
              className={`mt-6 p-4 rounded-lg text-center font-medium transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
                status.type === "success"
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">
                  {status.type === "success" ? "✓" : "⚠"}
                </span>
                <span>{status.message}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- FIELD ---------- */

interface FieldProps {
  label: string;
  icon?: string;
  children: React.ReactNode;
}

function Field({
  label,
  icon,
  children,
}: FieldProps) {
  return (
    <div className="space-y-2 group">
      <label className="text-sm font-medium text-cyan-300/90 flex items-center gap-2">
        {icon && <span>{icon}</span>}

        {label}
      </label>

      {children}
    </div>
  );
}