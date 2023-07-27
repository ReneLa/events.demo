"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PaymentRedirectHandler = () => {
  const router = useRouter();

  useEffect(() => {
    // This function will run every time the URL changes
    const handlePaymentCompletion = () => {
      console.log("router", router);
      // Check if the current URL contains the expected parameter indicating payment completion or cancellation
      //   const isPaymentCompleted = router.query.paymentStatus === "completed";
      //   const isPaymentCancelled = router.query.paymentStatus === "cancelled";

      //   if (isPaymentCompleted) {
      //     // Handle payment completion logic here
      //     // For example, show a success message or update the UI
      //     console.log("Payment completed successfully!");
      //   } else if (isPaymentCancelled) {
      //     // Handle payment cancellation logic here
      //     // For example, show a cancellation message or update the UI
      //     console.log("Payment was cancelled.");
      //   }
    };

    // Call the function to check the payment status initially (on page load/redirect)
    handlePaymentCompletion();

    // Listen for URL changes when the user is redirected back to your page
    router.events.on("routeChangeComplete", handlePaymentCompletion);

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off("routeChangeComplete", handlePaymentCompletion);
    };
  }, [router]);

  return null; // This component doesn't render anything on the UI
};

export default PaymentRedirectHandler;
