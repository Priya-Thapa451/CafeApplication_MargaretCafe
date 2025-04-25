import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const transactionUuid = queryParams.get("transaction_uuid");
  const orderId = queryParams.get("orderId");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Processing...");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/payment/order-details`,
          {
            params: { transaction_uuid: transactionUuid, orderId },
          }
        );

        if (res.data && res.data.order) {
          setPaymentStatus("✅ Payment successful!");
          setOrderDetails(res.data.order);
        } else {
          throw new Error("Order details not found");
        }
      } catch (err) {
        console.error("❌ Error fetching order details:", err);
        setError("There was an error fetching your order details.");
      } finally {
        setLoading(false);
      }
    };

    if (transactionUuid || orderId) {
      fetchOrderDetails();
    } else {
      setError("Missing transaction UUID or order ID.");
      setLoading(false);
    }
  }, [transactionUuid, orderId]);

  return (
    <div className="max-w-md mx-auto px-4 py-10 font-mono">
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl text-center font-bold mb-4 border-b border-dashed pb-2">
          Margaret CafeReceipt
        </h1>

        {loading && (
          <p className="text-blue-500 text-center text-sm animate-pulse">
            Processing your payment...
          </p>
        )}

        {error && (
          <p className="text-red-500 text-center text-sm">
             Error: {error}
          </p>
        )}

        {!loading && !error && orderDetails && (
          <>
            <div className="mb-4 text-sm">
              <div className="mb-2">
                <strong>Status:</strong> {paymentStatus}
              </div>
              <div className="mb-1">
                <strong>Order ID:</strong> {orderDetails.id}
              </div>
              <div className="mb-1">
                <strong>Transaction UUID:</strong>
                <div className="break-all text-xs">{transactionUuid}</div>
              </div>
              <div className="mb-1">
                <strong>Payment Method:</strong> {orderDetails.paymentMethod}
              </div>
            </div>

            <div className="border-t border-dashed pt-2 text-sm">
              <div className="flex justify-between mb-1">
                <span>Total Amount:</span>
                <span>Rs. {orderDetails.totalAmount}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Delivery Charge:</span>
                <span>Rs. {orderDetails.deliveryCharge}</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-dashed pt-2">
                <span>Grand Total:</span>
                <span>
                  Rs.{" "}
                  {Number(orderDetails.totalAmount) +
                    Number(orderDetails.deliveryCharge)}
                </span>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 mt-6">
              Thank you for ordering with Margaret Café!
              <br />
              Please keep this receipt for your records.
            </p>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/customer/home")}
                className="mt-4 bg-black text-white px-4 py-1 text-sm rounded hover:bg-gray-800 transition"
              >
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Success;
