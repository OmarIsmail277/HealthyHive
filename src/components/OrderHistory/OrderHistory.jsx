// OrderHistory.jsx
import { useState } from "react";

export default function OrderHistory() {
  const orders = [
    { id: "#123456", date: "July 15, 2023", total: "$85.00", status: "Delivered" },
    { id: "#789012", date: "June 20, 2023", total: "$120.50", status: "Delivered" },
    { id: "#345678", date: "May 5, 2023", total: "$55.75", status: "Delivered" },
    { id: "#901234", date: "April 10, 2023", total: "$95.20", status: "Cancelled" },
    { id: "#567890", date: "March 1, 2023", total: "$70.00", status: "Delivered" },
    { id: "#111111", date: "February 1, 2023", total: "$50.00", status: "Delivered" },
    { id: "#222222", date: "January 1, 2023", total: "$99.99", status: "Delivered" },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">Order History</h1>
          <p className="text-gray-600">Review your current and past purchases and their details.</p>
        </div>
      </div>

      {/* Current Order */}
      <div className="p-4 border rounded-lg flex flex-col gap-4 sm:flex-row items-center justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-600">Order Number</p>
          <p className="font-semibold">#987654</p>
        </div>
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-600">Expected Delivery</p>
          <p className="font-semibold">August 5, 2023</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
          Track Order
        </button>
      </div>

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
                <th className="py-3 px-4 font-medium text-sm">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, idx) => (
                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{order.id}</td>
                  <td className="py-3 px-4 text-green-600 text-sm">{order.date}</td>
                  <td className="py-3 px-4 text-sm">{order.total}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-green-600 hover:text-green-800 text-sm hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, orders.length)} of {orders.length} orders
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
