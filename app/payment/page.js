"use client";
import cn from "classnames";
import ConfContainer from "../../components/conf-container";
import PayChoice from "../../components/pay-choice-container";
import styleUtils from "../../components/utils.module.css";
import CloseButton from "../../components/close-button";
import requireAuth from "../../lib/require-auth";

// export const metadata = {
//   title: "Payment",
//   description: "Payment for your event",
// };

const PaymentPage = () => {
  return (
    <ConfContainer>
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <CloseButton />
        <div className="md:w-1/2 ">
          <div className="mt-12 mb-12">
            <h1
              className={cn(
                styleUtils.appear,
                styleUtils["appear-first"],
                "text-3xl tracking-tighter font-bold text-center md:text-5xl"
              )}
            >
              Payment
            </h1>
          </div>
          <PayChoice />
        </div>
      </div>
    </ConfContainer>
  );
};

export default requireAuth(PaymentPage);
