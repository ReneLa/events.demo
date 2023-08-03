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
  const { token } = useSelector(({ auth }) => auth);
  return (
    <ConfContainer>
      <CloseButton />
      <div className="mt-12 mb-12">
        <h1
          className={cn(
            "text-3xl tracking-tighter font-bold text-center md:text-4xl"
          )}
        >
          {token ? (
            <>
              {`You're`} <br /> Booked.
            </>
          ) : (
            <>No ticket</>
          )}
        </h1>
      </div>
      <Ticket />
    </ConfContainer>
  );
};

export default requireAuth(DashboardPage);
