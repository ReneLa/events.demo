import ConfContainer from "../../components/conf-container";
import Ticket from "../../components/ticket";
import cn from "classnames";
import CloseButton from "./close-button";

export const metadata = {
  title: "Dashboard",
  description: "User: your ticket dashboard",
};

export default function DashboardPage() {
  return (
    <ConfContainer>
      <div className="mt-12 mb-12">
        <CloseButton />
        <h1
          className={cn(
            "text-3xl tracking-tighter font-bold text-center md:text-4xl"
          )}
        >
          My Ticket
        </h1>
      </div>
      <Ticket />
    </ConfContainer>
  );
}
