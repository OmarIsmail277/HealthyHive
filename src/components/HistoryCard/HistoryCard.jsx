"use client";
import { useState } from "react";

export default function HistoryCard() {
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
        <div className="profile w-4/5 2xl:w-3/5 m-auto p-12 flex flex-col bg-[#f8faf4] mt-12 rounded-2xl shadow-lg gap-12 ">
            <h1 className="text-2xl font-bold text-green-700 mb-2">Order History</h1>
            <p className="text-gray-600 mb-6">Review your current and past purchases and their details.</p>

            {/* Current Order */}
            <div className="mb-6 p-4 border rounded-lg flex flex-col gap-7 text-center sm:flex-row items-center justify-between">
                <div>
                    <p className="text-gray-600">Order Number</p>
                    <p className="font-semibold">#987654</p>
                </div>
                <div>
                    <p className="text-gray-600">Expected Delivery</p>
                    <p className="font-semibold">August 5, 2023</p>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Track Order
                </button>
            </div>

            {/* Past Orders Table */}
            <h2 className="text-lg font-semibold mb-4">Past Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-green-50 text-left text-gray-700">
                            <th className="py-3 px-4">ORDER ID</th>
                            <th className="py-3 px-4">DATE</th>
                            <th className="py-3 px-4">TOTAL</th>
                            <th className="py-3 px-4">STATUS</th>
                            <th className="py-3 px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((order, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="py-3 px-4 font-semibold">{order.id}</td>
                                <td className="py-3 px-4 text-green-600">{order.date}</td>
                                <td className="py-3 px-4">{order.total}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${order.status === "Delivered"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-green-600 cursor-pointer hover:underline">
                                    View Details
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-4 justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(startIndex + itemsPerPage, orders.length)} of {orders.length} orders
                </p>
                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-4 py-2 border rounded-lg text-gray-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-4 py-2 border rounded-lg text-gray-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
