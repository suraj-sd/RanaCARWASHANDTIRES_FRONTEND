import React, { useEffect, useState } from "react";
import axios from "axios";
import "./customerDetails.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { encryptData, decryptData } from "../../../utils/crypto";

const API_URL = import.meta.env.VITE_API_URL;

interface Customer {
  service_name: any;
  addOns: any;
  serviceDetails: any;
  _id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  booking_date: string;
  booking_time: string;
  service_price: string;
  plan_expiry_date: string;
  customer_note: string;
  service_status: boolean;
  planType: string;
}

const CustomerDetails: React.FC = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState<Customer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [planFilter, setPlanFilter] = useState<string>("all");

  const fetchData = async (p: number, selectedPlan = planFilter) => {
    try {
      setLoading(true);

      setError("");

      // =================================
      // ENCRYPT REQUEST
      // =================================

      const encryptedPayload = encryptData({
        page: p,
        limit: 5,
        planType: selectedPlan,
      });

      // =================================
      // API CALL
      // =================================

      const res = await axios.post(
        `${API_URL}/customerDetail/getCustomer`,
        encryptedPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // =================================
      // DECRYPT RESPONSE
      // =================================

      const decrypted = decryptData(res.data.encryptedData, res.data.iv);

      console.log("DECRYPTED:", decrypted);

      setData(decrypted.data);

      setTotalPages(decrypted.pagination.totalPages);

      setPage(decrypted.pagination.currentPage);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {
      // ==================================
      // ENCRYPT PAYLOAD
      // ==================================

      const encryptedPayload = encryptData({
        _id: id,
      });

      // ==================================
      // API CALL
      // ==================================

      const res = await axios.post(
        `${API_URL}/customerDetail/deleteCustomer`,
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

      console.log("DELETE RESPONSE:", decryptedResponse);

      if (decryptedResponse.success) {
        toast.success(decryptedResponse.message);

        fetchData(page);
      }
    } catch (error: any) {
      console.log(error);

      // ==================================
      // DECRYPT ERROR RESPONSE
      // ==================================

      try {
        const decryptedError = decryptData(
          error.response.data.encryptedData,
          error.response.data.iv,
        );

        toast.error(decryptedError.message);
      } catch {
        toast.error("Delete failed");
      }
    }
  };

const handleComplete = async (id: string) => {
  try {
    // ==========================================
    // ✅ ENCRYPT REQUEST
    // ==========================================

    const encryptedPayload = encryptData({
      _id: id,
    });

    // ==========================================
    // ✅ API CALL
    // ==========================================

    const res = await axios.put(
      `${API_URL}/customerDetail/updateCustomer/${id}`,
      encryptedPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // ==========================================
    // ✅ DECRYPT RESPONSE
    // ==========================================

    const decrypted = decryptData(
      res.data.encryptedData,
      res.data.iv,
    );

    console.log("DECRYPTED RESPONSE:", decrypted);

    if (decrypted.success) {
      toast.success("Service Completed ✅");

      fetchData(page);
    } else {
      toast.error(decrypted.message);
    }
  } catch (error: any) {
    console.error(error);

    // ==========================================
    // ✅ DECRYPT ERROR RESPONSE
    // ==========================================

    if (
      error.response?.data?.encryptedData &&
      error.response?.data?.iv
    ) {
      const decryptedError = decryptData(
        error.response.data.encryptedData,
        error.response.data.iv,
      );

      toast.error(decryptedError.message);
    } else {
      toast.error("Failed to update ❌");
    }
  }
};

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <>
      <Helmet>
        <title>Customer Booking Details | Admin Dashboard</title>
      </Helmet>

      <div className="page">
        <div className="table-container">
          <h2 className="title">
            <b>Customer Booking Details</b>
          </h2>

          {/* ✅ PLAN FILTER */}
          <div style={{ marginBottom: "15px" }}>
            <select
              value={planFilter}
              onChange={(e) => {
                const value = e.target.value;
                setPlanFilter(value);
                fetchData(1, value);
              }}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="all">All Plans</option>
              <option value="Monthly Plan">Monthly Plan</option>
              <option value="Premium Plan">Premium Plan</option>
              <option value="Basic Wash">Basic Wash</option>
              <option value="Tire Service">Tire Service</option>
              <option value="Oil Change">Oil Change</option>


            </select>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Plan</th>
                  <th>Service Price</th>
                  <th>Service Name</th>
                  <th>Booking Date</th>
                  <th>Booking Time</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.customer_name}</td>
                    <td>{item.customer_email}</td>
                    <td>{item.customer_phone}</td>
                    <td>{item.planType}</td>
                    {/* <td>{item.service_price}</td> */}
                    <td>
  {item.planType === "Monthly Plan" || item.planType === "Basic Wash" || item.planType === "Tire Service" || item.planType === "Oil Change"
    ? `$${item.service_price}`
    : item.service_price}
</td>
                    <td>{item?.service_name}</td>
                    <td>{item.booking_date}</td>
                    <td>{item.booking_time}</td>
                    <td>
                      {item.planType === "Monthly Plan"
                        ? item.plan_expiry_date
                        : "-"}
                    </td>{" "}
                    <td>
                      <span
                        className={
                          item.service_status
                            ? "status completed"
                            : "status pending"
                        }
                      >
                        {item.service_status ? "Completed" : "Pending"}
                      </span>
                    </td>
                    {/* ACTIONS */}
                    <td>
                      <button
                        className="btn view"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowModal(true);
                        }}
                      >
                        View
                      </button>

                      {/* ✅ DISABLED COMPLETE BUTTON */}
                      <button
                        className="btn complete"
                        disabled={item.service_status}
                        title={
                          item.service_status
                            ? "Service already completed"
                            : "Mark as completed"
                        }
                        onClick={() =>
                          !item.service_status && handleComplete(item._id)
                        }
                        style={{
                          opacity: item.service_status ? 0.5 : 1,
                          cursor: item.service_status
                            ? "not-allowed"
                            : "pointer",
                        }}
                      >
                        {item.service_status ? "Completed" : "Complete"}
                      </button>

                      <button
                        className="btn delete"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            <button
              disabled={page === 1 || loading}
              onClick={() => fetchData(page - 1)}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages || loading}
              onClick={() => fetchData(page + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* MODAL */}
        {showModal && selectedItem && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h2>
                <b>Service Details</b>
              </h2>

              <p>
                <b>Service Name:</b>{" "}
                {selectedItem?.service_name}
              </p>

              <p>
                <b>Service Price:</b>{" "}
                {selectedItem?.service_price}
              </p>

              <p>
                <b>Plan Type:</b> {selectedItem.planType}
              </p>
              <p>
                <b>Customer Note:</b> {selectedItem.customer_note}
              </p>

              <hr />

              <h2>
                <b><ul>Add Ons</ul></b>
              </h2>

              {selectedItem?.addOns?.length ? (
                <ul>
                  {selectedItem.addOns.map((addon: any) => (
                    <li key={addon._id}>
                      {addon.name} - ${addon.price}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No add-ons</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerDetails;
