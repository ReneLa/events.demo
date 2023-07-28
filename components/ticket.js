/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cn from "classnames";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import isMobileOrTablet from "../lib/is-mobile-or-tablet";
import { scrollTo } from "../lib/smooth-scroll";
import { useGetUserTicketsQuery } from "../redux/user/auth.slice";
import TicketActions from "./ticket-actions";
import TicketVisual from "./ticket-visual";
import styles from "./ticket.module.css";

export default function Ticket({ username }) {
  const { data } = useGetUserTicketsQuery();
  const ticketRef = useRef(null);
  const divRef = useRef(null);
  const searchParams = useSearchParams();
  const cardStatus = searchParams.get("data");

  useEffect(() => {
    if (JSON.parse(cardStatus) && JSON.parse(cardStatus).data) {
      toast.success(`${JSON.parse(cardStatus).message}`, {
        id: "card_success",
      });
    }
  }, [cardStatus]);

  useEffect(() => {
    if (divRef && divRef.current && isMobileOrTablet()) {
      scrollTo(divRef.current, -30);
    }
  }, [divRef]);

  if (data?.data.length > 0) {
    return (
      <div className="pt-12 flex flex-col items-center justify-center">
        <div ref={ticketRef} className={cn(styles["ticket-visual"])}>
          <TicketVisual username={username} />
        </div>
        <div>
          <div className={styles["ticket-actions"]}>
            <TicketActions username={username} />
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}
