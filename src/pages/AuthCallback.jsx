import { useEffect } from "react";
import supabase from "../services/supabase";

export default function AuthCallback() {
  useEffect(() => {
    const handleAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
        return;
      }

      if (session) {
        // ✅ ابعت session للتاب الأصلية
        window.opener.postMessage(
          { type: "oauth-success", session },
          window.location.origin
        );

        window.close(); // ⛔ اقفل الـ popup
      }
    };

    handleAuth();
  }, []);

  return <p>Loading...</p>;
}
