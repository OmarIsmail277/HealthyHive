import Lottie from "lottie-react";
import { useOrder } from "../hooks/useUser";
import { useParams } from "react-router-dom";

import confirmedAnim from "../assets/lotties/confirmed.json";
import processingAnim from "../assets/lotties/processing.json";
import deliveringAnim from "../assets/lotties/delivering.json";
import packagingAnim from "../assets/lotties/packaging.json";
import deliveredAnim from "../assets/lotties/delivered.json";
import cancelledAnim from "../assets/lotties/cancelled.json";
import Spinner from "../components/Spinner/Spinner";

const statusAnimations = {
  confirmed: confirmedAnim,
  processing: processingAnim,
  packaging: packagingAnim,
  delivering: deliveringAnim,
  delivered: deliveredAnim,
  cancelled: cancelledAnim,
};

export default function TrackingPage() {
  const { order: orderIdParam } = useParams();

  console.log(orderIdParam);
  const orderId = Number(orderIdParam);
  console.log(orderId);
  const { data: orderData, isLoading, isError } = useOrder(orderId);
  console.log(orderData);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Something went wrong</p>;
  if (!orderData) return <p>Order not found</p>;

  const status = orderData.status;
  const createdAt = new Date(orderData.created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="flex flex-col items-center p-8 text-center">
      <h2 className="text-2xl font-semibold capitalize">
        Your Order is currently{" "}
        <span className="text-indigo-600">{status}</span>!
      </h2>

      <p className="mt-2 text-gray-600">
        Placed on <span className="font-medium">{createdAt}</span>
      </p>

      <Lottie
        animationData={statusAnimations[status]}
        loop={true}
        className="w-[500px] h-[500px] mt-6"
      />
    </div>
  );
}
