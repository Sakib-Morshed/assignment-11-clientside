import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const order = useLoaderData();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    const { data } = await axiosSecure.post("/create-payment-intent", {
      price: order.price * order.quantity,
    });

    const clientSecret = data.clientSecret;

    const card = elements.getElement(CardElement);
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.paymentMethod.id,
    });

    if (confirmPayment.paymentIntent.status === "succeeded") {
      await axiosSecure.patch(`/orders/payment/${order._id}`);

      Swal.fire({
        title: "Payment Successful!",
        icon: "success",
      });

      navigate("/dashboard/my-orders");
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto mt-10 border p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Complete Your Payment</h1>

        <p className="mb-4">
          Total Price:
          <span className="font-semibold">
            {" "}
            ${order.price * order.quantity}
          </span>
        </p>

        <form onSubmit={handlePayment}>
          <CardElement className="border p-3 rounded" />

          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
            type="submit"
          >
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentPage;
