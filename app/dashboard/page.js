import cn from "classnames";
import CloseButton from "../../components/close-button";
import ConfContainer from "../../components/conf-container";
import Ticket from "../../components/ticket";

export const metadata = {
  title: "Dashboard",
  description: "User: your ticket dashboard",
};

export default function DashboardPage() {
  return (
    <ConfContainer>
      <CloseButton />
      <div className="mt-12 mb-12">
        <h1
          className={cn(
            "text-3xl tracking-tighter font-bold text-center md:text-4xl"
          )}
        >
          {`You're`}
          <br /> Booked.
        </h1>
      </div>
      <Ticket />
    </ConfContainer>
  );
}
