import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orderRequests", user?.chefId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/chef/${user.chefId}`);
      return res.data;
    },
    enabled: !!user?.chefId,
  });

  const updateStatus = async (id, status) => {
    const res = await axiosSecure.patch(`/orders/status/${id}`, { status });

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: `Order ${status}!`,
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  return (
    <>
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-5">Order Requests</h2>

        <div className="grid lg:grid-cols-2 gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-5 rounded-xl shadow-lg border bg-white"
            >
              <h3 className="text-xl font-semibold mb-2">{order.mealName}</h3>

              <p>
                <span className="font-semibold">Price:</span> ${order.price}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {order.quantity}
              </p>
              <p>
                <span className="font-semibold">User Email:</span>{" "}
                {order.userEmail}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {order.userAddress}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentStatus}
              </p>
              <p className="font-semibold">
                Order Status:
                <span className="ml-1 capitalize">{order.orderStatus}</span>
              </p>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                {/* Cancel */}
                <button
                  className="btn btn-error btn-sm"
                  disabled={order.orderStatus !== "pending"}
                  onClick={() => updateStatus(order._id, "cancelled")}
                >
                  Cancel
                </button>

                {/* Accept */}
                <button
                  className="btn btn-success btn-sm"
                  disabled={order.orderStatus !== "pending"}
                  onClick={() => updateStatus(order._id, "accepted")}
                >
                  Accept
                </button>

                {/* Deliver */}
                <button
                  className="btn btn-primary btn-sm"
                  disabled={order.orderStatus !== "accepted"}
                  onClick={() => updateStatus(order._id, "delivered")}
                >
                  Deliver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
