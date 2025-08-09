import { useState } from "react";
import "./AdviceFetch.css";

function AdviceFetch() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getAdvice() {
    try {
      setLoading(true);
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip.advice);
      setCount((c) => c + 1);
    } catch (error) {
      console.error("Failed to fetch advice:", error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(function () {
  //   getAdvice();
  // }, []);

  return (
    <div className="card">
      <h2 className="title">💡 A Tip On The Go!</h2>
      <p className="text">{advice}</p>
      <button className="btn" onClick={getAdvice} disabled={loading}>
        {loading ? "Loading..." : "Grab an advice!"}
      </button>
      <p className="counter">
        You have read <strong> {count}</strong> pieces of advice
      </p>
    </div>
  );
}

export default AdviceFetch;
