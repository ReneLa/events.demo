/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cn from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import isMobileOrTablet from "../lib/is-mobile-or-tablet";
import { scrollTo } from "../lib/smooth-scroll";
import {
  setCredentials,
  useGetUserTicketsQuery,
} from "../redux/user/auth.slice";
import TicketActions from "./ticket-actions";
import TicketVisual from "./ticket-visual";
import styles from "./ticket.module.css";
import Tilt from "vanilla-tilt";
import { useSelector, useDispatch } from "react-redux";

export default function Ticket({ username, sharePage }) {
  const { ticket } = useSelector(({ auth }) => auth);
  const router = useRouter();
  const { data, isError } = useGetUserTicketsQuery();
  const ticketRef = useRef(null);
  const divRef = useRef(null);
  const searchParams = useSearchParams();
  const cardStatus = searchParams.get("data");
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(cardStatus) && JSON.parse(cardStatus).data) {
      dispatch(setCredentials(JSON.parse(cardStatus).data.token));
      toast.success(`${JSON.parse(cardStatus).message}`, {
        id: "card_success",
      });
    }
  }, [cardStatus]);

  useEffect(() => {
    if (isError) {
      router.replace("/");
    }
  }, [isError]);
  useEffect(() => {
    if (ticketRef.current && !window.matchMedia("(pointer: coarse)").matches) {
      Tilt.init(ticketRef.current, {
        glare: true,
        max: 5,
        "max-glare": 0.16,
        "full-page-listening": true,
      });
    }
  }, [ticketRef]);

  useEffect(() => {
    if (!sharePage && divRef && divRef.current && isMobileOrTablet()) {
      scrollTo(divRef.current, -30);
    }
  }, [divRef, sharePage]);

  
  if (data) {
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
