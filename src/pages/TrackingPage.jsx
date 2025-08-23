import { useState } from "react";
import Lottie from "lottie-react";

// استورد أي JSON عندك محمّله من LottieFiles
import confirmedAnim from "../assets/lotties/confirmed.json";
import processingAnim from "../assets/lotties/processing.json";
import deliveringAnim from "../assets/lotties/delivering.json";
import packagingAnim from "../assets/lotties/packaging.json";
import deliveredAnim from "../assets/lotties/delivered.json";
import cancelledAnim from "../assets/lotties/cancelled.json";

const statusAnimations = {
  confirmed: confirmedAnim,
  processing: processingAnim,
  packaging: packagingAnim,
  delivering: deliveringAnim,
  delivered: deliveredAnim,
  cancelled: cancelledAnim,
};

export default function TrackingPage() {
  const [status, setStatus] = useState("confirmed");

  return (
    <div className="flex flex-col items-center p-8">
      <p className="mt-3 text-2xl font-semibold capitalize">
        Your Order is {status}!
      </p>
      <Lottie
        animationData={statusAnimations[status]}
        loop={true}
        className="w-130 h-130"
      />

      {/* buttons للتجربة */}
      <div className="flex gap-2 mt-5">
        {Object.keys(statusAnimations).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className="px-3 py-1 rounded-md border bg-gray-100 hover:bg-gray-200"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
