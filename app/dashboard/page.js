"use client";

import cn from "classnames";
import CloseButton from "../../components/close-button";
import ConfContainer from "../../components/conf-container";
import Ticket from "../../components/ticket";
import { useSelector } from "react-redux";
import requireAuth from "../../lib/require-auth";

// export const metadata = {
//   title: "Dashboard",
//   description: "User: your ticket dashboard",
// };

const DashboardPage = () => {
  const { token, ticket } = useSelector(({ auth }) => auth);
  return (
    <ConfContainer>
      <CloseButton />
      <div className="mt-12 mb-12">
        <h1
          className={cn(
            "text-3xl tracking-tighter font-bold text-center md:text-4xl"
          )}
        >
          {ticket && ticket.payment_status !== "FAILED" && (
            <>
              {`You're`} <br /> Booked.
            </>
          )}
        </h1>
      </div>

      {ticket && ticket.payment_status !== "FAILED" ? (
        <Ticket />
      ) : (
        <div className="flex flex-1 flex-row h-full w-full items-center justify-center">
          <h1
            className={cn(
              "text-3xl tracking-tighter font-bold text-center md:text-4xl"
            )}
          >
            No ticket <br /> purchased
          </h1>
        </div>
      )}
    </ConfContainer>
  );
};

export default requireAuth(DashboardPage);
