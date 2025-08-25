// OrderHistory.jsx
import { useState } from "react";
import { useOrders } from "../../hooks/useUser";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const { data: orders = [], isLoading, isError } = useOrders();
  const [currentPage, setCurrentPage] = useState(1);
  console.log(orders);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load orders.</p>;

  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const statusColors = {
    confirmed: "bg-blue-600",
    processing: "bg-yellow-500",
    packaging: "bg-orange-500",
    delivering: "bg-green-500",
    delivered: "bg-emerald-600",
    cancelled: "bg-red-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Order History
          </h1>
          <p className="text-gray-600">
            Review your current and past purchases and their details.
          </p>
        </div>
      </div>

      {/* Current Order */}
      {orders
        ?.filter((o) => o.status !== "delivered" && o.status !== "cancelled")
        .map((order) => {
          const expectedDelivery = new Date(order.created_at);
          expectedDelivery.setHours(expectedDelivery.getHours() - 2);
          return (
            <div
              key={order.order_id}
              className="p-4 border rounded-lg flex flex-col gap-4 sm:flex-row items-center justify-between"
            >
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-semibold">{order.order_id}</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600">Expected Delivery</p>
                <p className="font-semibold">
                  {expectedDelivery.toLocaleString()}{" "}
                </p>
              </div>
              <Link to={`/tracking/${order.order_id}`}>
                <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary transition">
                  Track Order
                </button>
              </Link>
            </div>
          );
        })}

      {/* Past Orders Table */}
      <div className="min-w-0">
        <h2 className="text-lg font-semibold mb-4">Past Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-700">
                <th className="py-3 px-4 font-medium text-sm">ORDER ID</th>
                <th className="py-3 px-4 font-medium text-sm">DATE</th>
                <th className="py-3 px-4 font-medium text-sm">TOTAL</th>
                <th className="py-3 px-4 font-medium text-sm">STATUS</th>
                <th className="py-3 px-4 font-medium text-sm">TIME</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => {
                const date = new Date(order.created_at);

                // subtract 3 hours
                date.setHours(date.getHours() - 3);
                const orderDateTime = date.toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // change to true for AM/PM
                });

                return (
                  <tr
                    key={order.order_id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-sm">
                      {order.order_id}
                    </td>
                    <td className="py-3 px-4 text-green-600 text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm">{order.total}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`${
                          statusColors[order.status]
                        } px-2 py-1 rounded-full text-xs text-white`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-green-600 text-sm">{orderDateTime}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, orders.length)} of{" "}
          {orders.length} orders
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
