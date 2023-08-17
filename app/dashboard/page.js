"use client";

import cn from "classnames";
import CloseButton from "../../components/close-button";
import ConfContainer from "../../components/conf-container";
import Ticket from "../../components/ticket";
import { useSelector } from "react-redux";
import requireAuth from "../../lib/require-auth";
import {
  useGetUserTicketsQuery,
  useLazyGetUserTicketsQuery,
} from "../../redux/ticket/ticket.slice";
import LoadingDots from "../../components/loading-dots";
import { useEffect } from "react";

// export const metadata = {
//   title: "Dashboard",
//   description: "User: your ticket dashboard",
// };

const DashboardPage = () => {
  // const { isLoading } = useGetUserTicketsQuery();
  const [getTickets, { isLoading }] = useLazyGetUserTicketsQuery();
  const { ticket } = useSelector(({ ticket }) => ticket);
  useEffect(() => {
    console.log("is re fetching");
    getTickets();
  }, []);

  return (
    <ConfContainer>
      <CloseButton />
      {isLoading ? (
        <div className="flex flex-1 flex-col h-52 w-full mt-12 mb-12 items-center justify-center">
          <p className="text-gray-300 text-[15px] mb-4 text-center">
            Wait, loading...
          </p>
          <LoadingDots />
        </div>
      ) : (
        <>
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
        </>
      )}
    </ConfContainer>
  );
};

export default requireAuth(DashboardPage);
