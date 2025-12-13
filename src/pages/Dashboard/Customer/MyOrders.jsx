import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaClock, FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { ChefHatIcon } from "lucide-react";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    },
  });
  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          My Orders
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 rounded-2xl overflow-hidden group"
            >
              {/* Card Header - Status Badge */}
              <div className="px-6 pt-5 flex justify-between items-start">
                <div
                  className={`badge badge-lg font-medium ${
                    order.orderStatus === "accepted"
                      ? "badge-success"
                      : order.orderStatus === "pending"
                      ? "badge-warning"
                      : order.orderStatus === "delivered"
                      ? "badge-info"
                      : "badge-ghost"
                  }`}
                >
                  {order.orderStatus}
                </div>

                <div
                  className={`badge badge-lg font-medium ${
                    order.paymentStatus === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {order.paymentStatus === "paid" ? (
                    <FaCheckCircle className="mr-1" />
                  ) : (
                    <FaCreditCard className="mr-1" />
                  )}
                  {order.paymentStatus}
                </div>
              </div>

              <div className="card-body pt-4">
                <h2 className="card-title text-2xl font-bold text-primary group-hover:text-orange-600 transition">
                  {order.mealName}
                </h2>

                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mt-2">
                  <span className="text-2xl">${order.price}</span>
                  <span className="text-gray-500">× {order.quantity}</span>
                  <span className="ml-auto text-xl font-bold text-success">
                    ${(order.price * order.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="divider my-3"></div>

                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <ChefHatIcon className="text-orange-500" />
                    <span className="font-medium">Chef ID:</span> {order.chefId}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaClock className="text-blue-500" />
                    {new Date(order.orderTime).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {order.orderStatus === "accepted" &&
                  order.paymentStatus === "pending" && (
                    <div className="card-actions mt-5">
                      <Link
                        to={`/payment/${order._id}`}
                        className="btn btn-primary btn-block rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      >
                        Pay Now → Complete Your Order
                      </Link>
                    </div>
                  )}

                {order.orderStatus === "delivered" && (
                  <div className="mt-4 text-center">
                    <p className="text-success font-bold text-lg">
                      Delivered Successfully
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
