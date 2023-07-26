import cn from "classnames";
import ConfContainer from "../../components/conf-container";
import PayChoice from "../../components/pay-choice-container";
import styleUtils from "../../components/utils.module.css";

export const metadata = {
  title: "Payment",
  description: "Payment for your event",
};

export default function PaymentPage() {
  return (
    <ConfContainer>
      <div className="md:w-1/2 self-center">
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
    </ConfContainer>
  );
}
